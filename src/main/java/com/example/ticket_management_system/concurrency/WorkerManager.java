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
    private ExecutorService executorService;


    public WorkerManager(TicketQueueManager queueManager, TicketRepository ticketRepository) {
        this.queueManager = queueManager;
        this.ticketRepository = ticketRepository;
    }

    @PostConstruct //as soon as the app starts we want this
    public void startWorkers(){
        executorService= Executors.newFixedThreadPool(WORKER_COUNT);
        for(int i=1;i<=WORKER_COUNT;i++){
            executorService.submit(new TicketWorker(queueManager,ticketRepository,i));
        }
        System.out.println("Started "+ WORKER_COUNT+ " ticket workers.");
    }
    @PreDestroy
    public void stopWorkers(){
        System.out.println("Shutting down ticket workers..");
        executorService.shutdown();
    }
}
