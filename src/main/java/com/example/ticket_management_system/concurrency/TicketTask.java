package com.example.ticket_management_system.concurrency;

import com.example.ticket_management_system.Model.TicketPriority;

import java.time.LocalDateTime;

public class TicketTask implements Comparable<TicketTask> {

    private final Long ticketId;
    private final TicketPriority priority;
    private final LocalDateTime enqueuedAt;

    public TicketTask(Long ticketId, TicketPriority priority) {
        this.ticketId = ticketId;
        this.priority = priority;
        this.enqueuedAt = LocalDateTime.now();
    }

    public Long getTicketId() {
        return ticketId;
    }

    public TicketPriority getPriority() {
        return priority;
    }

    public LocalDateTime getEnqueuedAt() {
        return enqueuedAt;
    }

    @Override
    public int compareTo(TicketTask other) {
        if (other == null) return 1;
        int priorityComparison = other.priority.ordinal() - this.priority.ordinal();
        if (priorityComparison != 0) {
            return priorityComparison;
        }
        int timeComparison = this.enqueuedAt.compareTo(other.enqueuedAt);
        if (timeComparison != 0) {
            return timeComparison;
        }
        if (this.ticketId != null && other.ticketId != null) {
            return this.ticketId.compareTo(other.ticketId);
        }
        return 0;
    }
}