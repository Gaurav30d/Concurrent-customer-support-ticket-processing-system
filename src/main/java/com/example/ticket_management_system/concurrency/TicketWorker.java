package com.example.ticket_management_system.concurrency;

import com.example.ticket_management_system.Model.*;
import com.example.ticket_management_system.Repository.TicketRepository;
import com.example.ticket_management_system.Service.TicketHistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

public class TicketWorker implements Runnable {

    private static final Logger log = LoggerFactory.getLogger(TicketWorker.class);

    private static final List<String> URGENT_KEYWORDS = List.of(
            "urgent", "immediately", "asap", "not working", "down", "critical", "emergency"
    );

    private final TicketQueueManager queueManager;
    private final TicketRepository ticketRepository;
    private final TicketHistoryService ticketHistoryService;
    private final ActiveProcessingTracker tracker;
    private final ProcessingStats stats;
    private final int workerId;

    public TicketWorker(TicketQueueManager queueManager, TicketRepository ticketRepository,
                        TicketHistoryService ticketHistoryService, ActiveProcessingTracker tracker,
                        ProcessingStats stats, int workerId) {
        this.queueManager = queueManager;
        this.ticketRepository = ticketRepository;
        this.ticketHistoryService = ticketHistoryService;
        this.tracker = tracker;
        this.stats = stats;
        this.workerId = workerId;
    }

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                TicketTask task = queueManager.dequeue();
                processTicket(task.getTicketId());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                break;
            } catch (Exception e) {
                log.error("Worker-{} encountered an unhandled error: {}", workerId, e.getMessage(), e);
            }
        }
    }

    private void processTicket(Long ticketId) {
        Ticket ticket = ticketRepository.findById(ticketId).orElse(null);
        if (ticket == null) {
            try {
                Thread.sleep(50);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                return;
            }
            ticket = ticketRepository.findById(ticketId).orElse(null);
            if (ticket == null) {
                log.warn("Worker-{}: Ticket {} not found in database, skipping task.", workerId, ticketId);
                return;
            }
        }

        tracker.markProcessing(ticketId, "Worker-" + workerId);
        ticket.setProcessingStatus(ProcessingStatus.PROCESSING);
        ticketRepository.save(ticket);

        try {
            TicketPriority originalPriority = ticket.getPriority();
            TicketPriority finalPriority = detectEscalation(ticket, originalPriority);

            if (finalPriority != originalPriority) {
                ticket.setPriority(finalPriority);
                ticketHistoryService.recordPriorityChange(
                        ticketId, ticket.getCustomerId(), originalPriority, finalPriority, "AUTO_ESCALATED");
            }

            ticket.setDueBy(calculateSlaDeadline(finalPriority, ticket));
            ticket.setProcessingStatus(ProcessingStatus.PROCESSED);
            ticketRepository.save(ticket);
            stats.incrementProcessed();

        } catch (Exception e) {
            log.error("Worker-{} failed processing ticket {}: {}", workerId, ticketId, e.getMessage(), e);
            try {
                Ticket freshTicket = ticketRepository.findById(ticketId).orElse(ticket);
                freshTicket.setProcessingStatus(ProcessingStatus.FAILED);
                ticketRepository.save(freshTicket);
            } catch (Exception saveEx) {
                log.error("Worker-{} failed to update status to FAILED for ticket {}: {}", workerId, ticketId, saveEx.getMessage());
            }
            stats.incrementFailed();
        } finally {
            tracker.markDone(ticketId);
        }
    }

    private TicketPriority detectEscalation(Ticket ticket, TicketPriority current) {
        String text = (ticket.getTitle() + " " + ticket.getDescription()).toLowerCase();
        boolean hasUrgentLanguage = URGENT_KEYWORDS.stream().anyMatch(text::contains);

        if (hasUrgentLanguage && current != TicketPriority.URGENT) {
            return TicketPriority.URGENT;
        }
        return current;
    }

    private LocalDateTime calculateSlaDeadline(TicketPriority priority, Ticket ticket) {
        LocalDateTime baseTime = ticket.getCreatedAt() != null ? ticket.getCreatedAt() : LocalDateTime.now();
        return switch (priority) {
            case URGENT -> baseTime.plusHours(2);
            case HIGH -> baseTime.plusHours(8);
            case MEDIUM -> baseTime.plusHours(24);
            case LOW -> baseTime.plusHours(72);
        };
    }
}