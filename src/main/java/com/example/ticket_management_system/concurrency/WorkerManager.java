package com.example.ticket_management_system.concurrency;

import com.example.ticket_management_system.Repository.TicketRepository;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.springframework.stereotype.Component;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@Component
public class WorkerManager {

    private static final int WORKER_COUNT =5;

    private final TicketQueueManager queueManager;
    private final TicketRepository ticketRepository;
    private final ActiveProcessingTracker tracker;
    private final ProcessingStats stats;
    private ExecutorService executorService;


    public WorkerManager(TicketQueueManager queueManager, TicketRepository ticketRepository, ActiveProcessingTracker tracker, ProcessingStats stats) {
        this.queueManager = queueManager;
        this.ticketRepository = ticketRepository;
        this.tracker = tracker;
        this.stats = stats;
    }

    @PostConstruct
    public void startWorkers() {
        executorService = Executors.newFixedThreadPool(WORKER_COUNT);
        for (int i = 1; i <= WORKER_COUNT; i++) {
            executorService.submit(new TicketWorker(queueManager, ticketRepository, tracker, stats, i));
        }
    }

    @PreDestroy
    public void stopWorkers() {
        executorService.shutdownNow();
    }
}
