package com.example.ticket_management_system.concurrency;

import org.springframework.stereotype.Component;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.PriorityBlockingQueue;

@Component
public class TicketQueueManager {

    private final BlockingQueue<TicketTask> ticketQueue = new PriorityBlockingQueue<>();

    public void enqueue(TicketTask task) {
        try {
            ticketQueue.put(task);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public TicketTask dequeue() throws InterruptedException {
        return ticketQueue.take();
    }

    public int size() {
        return ticketQueue.size();
    }
}