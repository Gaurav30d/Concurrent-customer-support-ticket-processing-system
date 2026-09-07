package com.example.ticket_management_system.concurrency;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.LinkedHashMap;
import java.util.Map;

@Component
public class DashboardBroadcaster {

    private final SimpMessagingTemplate messagingTemplate;
    private final TicketQueueManager queueManager;
    private final ActiveProcessingTracker tracker;
    private final ProcessingStats stats;

    public DashboardBroadcaster(SimpMessagingTemplate messagingTemplate, TicketQueueManager queueManager,
                                ActiveProcessingTracker tracker, ProcessingStats stats) {
        this.messagingTemplate = messagingTemplate;
        this.queueManager = queueManager;
        this.tracker = tracker;
        this.stats = stats;
    }

    @Scheduled(fixedRate = 2000) // broadcast every 2 seconds
    public void broadcastStats() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("queueSize", queueManager.size());
        status.put("activeWorkers", tracker.activeCount());
        status.put("processedTickets", stats.getProcessed());
        status.put("failedTickets", stats.getFailed());

        messagingTemplate.convertAndSend("/topic/concurrency-stats", (Object) status);
    }
}