package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Exception.*;
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
    private final NotificationService notificationService;

    public AgentService(TicketRepository ticketRepository, UserRepository userRepository, TicketStatusValidator statusValidator, TicketHistoryService ticketHistoryService, NotificationService notificationService) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.statusValidator = statusValidator;
        this.ticketHistoryService = ticketHistoryService;
        this.notificationService = notificationService;
    }

    protected User getCurrentAgent(){
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(()->new UserNotFoundException("Authenticated user not found"));
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
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        if (ticket.getAssignedAgentId() != null) {
            throw new TicketAlreadyAssignedException("Ticket is already assigned to another agent");
        }
        if (ticket.getStatus() != TicketStatus.OPEN) {
            throw new InvalidStatusTransitionException("Only OPEN tickets can be claimed");
        }

        TicketStatus oldStatus = ticket.getStatus();
        ticket.setAssignedAgentId(agent.getId());
        ticket.setStatus(TicketStatus.ASSIGNED);

        Ticket saved;
        try {
            saved = ticketRepository.save(ticket);
        } catch (org.springframework.orm.ObjectOptimisticLockingFailureException e) {
            throw new TicketConflictException(
                    "This ticket was just claimed by another agent. Please refresh and try a different ticket.");
        }

        ticketHistoryService.recordStatusChange(ticketId, agent.getId(), oldStatus, TicketStatus.ASSIGNED, "TICKET_CLAIMED");
        return saved;
    }
    public Ticket updateStatus(Long ticketId, TicketStatus newStatus) {
        User agent = getCurrentAgent();
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        if (!agent.getId().equals(ticket.getAssignedAgentId())) {
            throw new AccessDeniedException("You can only update tickets assigned to you");
        }
        if (!statusValidator.isValidTransition(ticket.getStatus(), newStatus)) {
            throw new InvalidStatusTransitionException("Invalid status transition: " + ticket.getStatus() + " -> " + newStatus);
        }

        TicketStatus oldStatus = ticket.getStatus();
        ticket.setStatus(newStatus);
        if (newStatus == TicketStatus.RESOLVED) {
            ticket.setResolvedAt(LocalDateTime.now());
        }
        Ticket saved = ticketRepository.save(ticket);

        ticketHistoryService.recordStatusChange(ticketId, agent.getId(), oldStatus, newStatus, "STATUS_UPDATED");

        if (newStatus == TicketStatus.RESOLVED) {
            notificationService.sendTicketResolvedNotification(ticketId, saved.getCustomerId());
        }

        return saved;
    }

    }
