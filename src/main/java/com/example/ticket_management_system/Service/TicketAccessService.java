package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Model.User;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class TicketAccessService {

    public void verifyCustomerOrAssignedAgent(Ticket ticket, User user) {
        boolean isOwner = ticket.getCustomerId().equals(user.getId());
        boolean isAssignedAgent = user.getId().equals(ticket.getAssignedAgentId());

        if (!isOwner && !isAssignedAgent) {
            throw new AccessDeniedException("You do not have access to this ticket");
        }
    }
}