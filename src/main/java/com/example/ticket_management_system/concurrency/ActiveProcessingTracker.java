package com.example.ticket_management_system.concurrency;

import org.springframework.stereotype.Component;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ActiveProcessingTracker {
    private final Map<Long, String> ticketToWorker = new ConcurrentHashMap<>();

    public void markProcessing(Long ticketId, String workerId) {
        ticketToWorker.put(ticketId, workerId);
    }

    public void markDone(Long ticketId) {
        ticketToWorker.remove(ticketId);
    }

    public int activeCount() {
        return ticketToWorker.size();
    }
}