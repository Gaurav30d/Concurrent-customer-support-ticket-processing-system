package com.example.ticket_management_system.concurrency;

import com.example.ticket_management_system.Model.ProcessingStatus;
import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Repository.TicketRepository;

import java.sql.SQLOutput;

public class TicketWorker implements Runnable{
    
    private final TicketQueueManager queueManager;
    private final TicketRepository ticketRepository;
    private final ActiveProcessingTracker tracker;
    private final ProcessingStats stats;
    private final int workerId;

    public TicketWorker(TicketQueueManager queueManager, TicketRepository ticketRepository,
                        ActiveProcessingTracker tracker, ProcessingStats stats, int workerId) {
        this.queueManager = queueManager;
        this.ticketRepository = ticketRepository;
        this.tracker = tracker;
        this.stats = stats;
        this.workerId = workerId;
    }
    @Override
    public void run() {
        System.out.println("Worker-" + workerId + " started, waiting for tickets...");

        while (!Thread.currentThread().isInterrupted()) {
            try {
                TicketTask task = queueManager.dequeue(); // blocks until a task arrives
                processTicket(task.getTicketId());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }
        System.out.println("Worker-" + workerId + " shutting down.");
    }

    private void processTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket == null) return;

        tracker.markProcessing(ticketId, "Worker-" + workerId);
        ticket.setProcessingStatus(ProcessingStatus.PROCESSING);
        ticketRepository.save(ticket);

        try {
            Thread.sleep(1000);
            ticket.setProcessingStatus(ProcessingStatus.PROCESSED);
            ticketRepository.save(ticket);
            stats.incrementProcessed();
        } catch (Exception e) {
            ticket.setProcessingStatus(ProcessingStatus.FAILED);
            ticketRepository.save(ticket);
            stats.incrementFailed();
        } finally {
            tracker.markDone(ticketId);
        }
    }
}
