package com.example.ticket_management_system.concurrency;

import org.springframework.stereotype.Component;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class ProcessingStats {
    private final AtomicInteger processed = new AtomicInteger(0);
    private final AtomicInteger failed = new AtomicInteger(0);

    public void incrementProcessed() { processed.incrementAndGet(); }
    public void incrementFailed() { failed.incrementAndGet(); }
    public int getProcessed() { return processed.get(); }
    public int getFailed() { return failed.get(); }
}