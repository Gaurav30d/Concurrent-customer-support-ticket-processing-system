package com.example.ticket_management_system.concurrency;

import com.example.ticket_management_system.Repository.TicketRepository;
import com.example.ticket_management_system.Service.TicketHistoryService;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class WorkerManager {

    private static final int WORKER_COUNT = 5;

    private final TicketQueueManager queueManager;
    private final TicketRepository ticketRepository;
    private final TicketHistoryService ticketHistoryService;
    private final ActiveProcessingTracker tracker;
    private final ProcessingStats stats;
    private ExecutorService executorService;

    public WorkerManager(TicketQueueManager queueManager,
                         TicketRepository ticketRepository,
                         TicketHistoryService ticketHistoryService,
                         ActiveProcessingTracker tracker,
                         ProcessingStats stats) {
        this.queueManager = queueManager;
        this.ticketRepository = ticketRepository;
        this.ticketHistoryService = ticketHistoryService;
        this.tracker = tracker;
        this.stats = stats;
    }

    @PostConstruct
    public void startWorkers() {
        executorService = Executors.newFixedThreadPool(WORKER_COUNT);
        for (int i = 1; i <= WORKER_COUNT; i++) {
            executorService.submit(new TicketWorker(
                    queueManager, ticketRepository, ticketHistoryService, tracker, stats, i));
        }
        System.out.println("Started " + WORKER_COUNT + " ticket workers.");
    }

    @PreDestroy
    public void stopWorkers() {
        System.out.println("Shutting down ticket workers...");
        executorService.shutdownNow();
    }
}