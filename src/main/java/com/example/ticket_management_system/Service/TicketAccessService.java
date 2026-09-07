package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Model.Role;
import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Model.User;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

@Service
public class TicketAccessService {

    public void verifyCustomerOrAssignedAgent(Ticket ticket, User user) {
        if (user == null) {
            throw new AccessDeniedException("User not authenticated");
        }
        if (user.getRole() == Role.ADMIN) {
            return;
        }

        boolean isOwner = ticket.getCustomerId() != null && ticket.getCustomerId().equals(user.getId());
        boolean isAssignedAgent = user.getId() != null && user.getId().equals(ticket.getAssignedAgentId());

        if (!isOwner && !isAssignedAgent) {
            throw new AccessDeniedException("You do not have access to this ticket");
        }
    }
}