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

    @Override
    public int compareTo(TicketTask other) {
        int priorityComparison = other.priority.ordinal() - this.priority.ordinal();
        if (priorityComparison != 0) {
            return priorityComparison;
        }
        return this.enqueuedAt.compareTo(other.enqueuedAt);
    }
}