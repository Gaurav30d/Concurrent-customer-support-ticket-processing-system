package com.example.ticket_management_system.concurrency;

import com.example.ticket_management_system.Model.ProcessingStatus;
import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Repository.TicketRepository;

import java.sql.SQLOutput;

public class TicketWorker implements Runnable{

    private final TicketQueueManager queueManager;
    private final TicketRepository ticketRepository;
    private final int workerId;

    public TicketWorker(TicketQueueManager queueManager, TicketRepository ticketRepository, int workerId) {
        this.queueManager = queueManager;
        this.ticketRepository = ticketRepository;
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
        Ticket ticket=ticketRepository.findById(ticketId).orElse(null);
        if(ticket==null){
            System.out.println("Worker- "+workerId+ ": ticket " + ticketId + " no longer exists, skipping.");
            return;
        }

        System.out.println("Worker- "+workerId+ ": processing ticket " + ticketId + " ...");
        ticket.setProcessingStatus(ProcessingStatus.PROCESSING);
        ticketRepository.save(ticket);

        try{
            Thread.sleep(1000);

            ticket.setProcessingStatus(ProcessingStatus.PROCESSED);
            ticketRepository.save(ticket);
            System.out.println("Worker-" + workerId + " finished ticket " + ticketId);
        }catch (Exception e){
            ticket.setProcessingStatus(ProcessingStatus.FAILED);
            ticketRepository.save(ticket);
            System.out.println("Worker-" + workerId+ ": failed to process ticket " + ticketId + ": " + e.getMessage());
        }
    }
}
