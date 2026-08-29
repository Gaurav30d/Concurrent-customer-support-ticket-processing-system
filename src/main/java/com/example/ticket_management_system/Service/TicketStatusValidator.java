package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Model.TicketStatus;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

@Component
public class TicketStatusValidator {

    private final Map<TicketStatus, Set<TicketStatus>> allowedTransitions = new EnumMap<>(TicketStatus.class);

    public TicketStatusValidator() {
        allowedTransitions.put(TicketStatus.OPEN, EnumSet.of(TicketStatus.ASSIGNED, TicketStatus.CANCELLED));
        allowedTransitions.put(TicketStatus.ASSIGNED, EnumSet.of(TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED));
        allowedTransitions.put(TicketStatus.IN_PROGRESS, EnumSet.of(TicketStatus.RESOLVED, TicketStatus.CANCELLED));
        allowedTransitions.put(TicketStatus.RESOLVED, EnumSet.of(TicketStatus.CLOSED));
        allowedTransitions.put(TicketStatus.CLOSED, EnumSet.noneOf(TicketStatus.class));
        allowedTransitions.put(TicketStatus.CANCELLED, EnumSet.noneOf(TicketStatus.class));
    }

    public boolean isValidTransition(TicketStatus from, TicketStatus to) {
        return allowedTransitions.getOrDefault(from, EnumSet.noneOf(TicketStatus.class)).contains(to);
    }
}
