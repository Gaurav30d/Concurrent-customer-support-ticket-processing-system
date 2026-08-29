package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Model.TicketStatus;
import com.example.ticket_management_system.Model.User;
import com.example.ticket_management_system.Repository.TicketRepository;
import com.example.ticket_management_system.Repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgentService {

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketStatusValidator statusValidator;
    private final TicketHistoryService ticketHistoryService;

    public AgentService(TicketRepository ticketRepository, UserRepository userRepository, TicketStatusValidator statusValidator, TicketHistoryService ticketHistoryService) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.statusValidator = statusValidator;
        this.ticketHistoryService = ticketHistoryService;
    }

    protected User getCurrentAgent(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(()->new IllegalStateException("Authenticated user not found"));
    }

    public List<Ticket> getAvailableTickets() {
        return ticketRepository.findByAssignedAgentIdIsNull();
    }

    public List<Ticket> getMyAssignedTickets() {
        User agent = getCurrentAgent();
        return ticketRepository.findByAssignedAgentId(agent.getId());
    }

    public Ticket claimTicket(Long ticketId) {
        User agent = getCurrentAgent();
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalStateException("Ticket not found"));

        if (ticket.getAssignedAgentId() != null) {
            throw new IllegalStateException("Ticket is already assigned to another agent");
        }
        if (ticket.getStatus() != TicketStatus.OPEN) {
            throw new IllegalStateException("Only OPEN tickets can be claimed");
        }

        TicketStatus oldStatus = ticket.getStatus();
        ticket.setAssignedAgentId(agent.getId());
        ticket.setStatus(TicketStatus.ASSIGNED);
        Ticket saved = ticketRepository.save(ticket);

        ticketHistoryService.recordStatusChange(ticketId, agent.getId(), oldStatus, TicketStatus.ASSIGNED, "TICKET_CLAIMED");

        return saved;
    }
    public Ticket updateStatus(Long ticketId, TicketStatus newStatus) {
        User agent = getCurrentAgent();
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new IllegalStateException("Ticket not found"));

        if (!agent.getId().equals(ticket.getAssignedAgentId())) {
            throw new AccessDeniedException("You can only update tickets assigned to you");
        }
        if (!statusValidator.isValidTransition(ticket.getStatus(), newStatus)) {
            throw new IllegalStateException("Invalid status transition: " + ticket.getStatus() + " -> " + newStatus);
        }

        TicketStatus oldStatus = ticket.getStatus();
        ticket.setStatus(newStatus);
        if (newStatus == TicketStatus.RESOLVED) {
            ticket.setResolvedAt(LocalDateTime.now());
        }
        Ticket saved = ticketRepository.save(ticket);

        ticketHistoryService.recordStatusChange(ticketId, agent.getId(), oldStatus, newStatus, "STATUS_UPDATED");

        return saved;
    }

    }
