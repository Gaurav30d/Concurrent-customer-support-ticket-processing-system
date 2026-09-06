package com.example.ticket_management_system.Service;


import com.example.ticket_management_system.DTOs.CreateTicketRequest;
import com.example.ticket_management_system.DTOs.UpdateTicketRequest;
import com.example.ticket_management_system.Exception.InvalidStatusTransitionException;
import com.example.ticket_management_system.Exception.TicketNotFoundException;
import com.example.ticket_management_system.Exception.UserNotFoundException;
import com.example.ticket_management_system.Model.Role;
import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Model.TicketStatus;
import com.example.ticket_management_system.Model.User;
import com.example.ticket_management_system.Repository.TicketRepository;
import com.example.ticket_management_system.Repository.UserRepository;
import com.example.ticket_management_system.concurrency.TicketQueueManager;
import com.example.ticket_management_system.concurrency.TicketTask;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import org.springframework.security.access.AccessDeniedException;
import java.util.List;

@Service
@Transactional
public class TicketService {

    private final TicketHistoryService ticketHistoryService;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketStatusValidator statusValidator;
    private final TicketQueueManager queueManager;

    public TicketService(TicketHistoryService ticketHistoryService, TicketRepository ticketRepository, UserRepository userRepository, TicketStatusValidator statusValidator, TicketQueueManager queueManager) {
        this.ticketHistoryService = ticketHistoryService;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.statusValidator = statusValidator;
        this.queueManager = queueManager;
    }

    public Ticket createTicket(CreateTicketRequest request) {
        String email= SecurityContextHolder.getContext().getAuthentication().getName();

        User customer = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        Ticket ticket = Ticket.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .category(request.getCategory())
                .customerId(customer.getId())
                .status(TicketStatus.OPEN)
                .build();

        Ticket saved = ticketRepository.save(ticket);
        queueManager.enqueue(new TicketTask(saved.getId(), saved.getPriority()));
        return saved;
    }
    public Ticket getTicketById(Long ticketId) throws AccessDeniedException {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        // Ownership check — customers can only view their own tickets
        if (currentUser.getRole() == Role.CUSTOMER && !ticket.getCustomerId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to view this ticket");
        }

        return ticket;
    }

    public List<Ticket> getMyTickets() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        return ticketRepository.findByCustomerId(currentUser.getId());
    }

    public Ticket closeTicket(Long ticketId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        if (!ticket.getCustomerId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to close this ticket");
        }

        TicketStatus oldStatus = ticket.getStatus();
        TicketStatus newStatus = TicketStatus.CLOSED;
        if (!statusValidator.isValidTransition(oldStatus, newStatus)) {
            throw new InvalidStatusTransitionException("Invalid status transition: " + oldStatus + " -> " + newStatus);
        }

        ticket.setStatus(newStatus);
        Ticket saved = ticketRepository.save(ticket);

        ticketHistoryService.recordStatusChange(ticketId, currentUser.getId(), oldStatus, newStatus, "TICKET_CLOSED");

        return saved;
    }
    public Ticket cancelTicket(Long ticketId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        if (!ticket.getCustomerId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to cancel this ticket");
        }

        TicketStatus oldStatus = ticket.getStatus();
        TicketStatus newStatus = TicketStatus.CANCELLED;
        if (!statusValidator.isValidTransition(oldStatus, newStatus)) {
            throw new InvalidStatusTransitionException("Invalid status transition: " + oldStatus + " -> " + newStatus);
        }

        ticket.setStatus(newStatus);
        Ticket saved = ticketRepository.save(ticket);

        ticketHistoryService.recordStatusChange(ticketId, currentUser.getId(), oldStatus, newStatus, "TICKET_CANCELLED");

        return saved;
    }
    public Ticket updateTicket(Long ticketId, UpdateTicketRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        if (!ticket.getCustomerId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You do not have permission to edit this ticket");
        }

        if (ticket.getStatus() != TicketStatus.OPEN) {
            throw new InvalidStatusTransitionException("Ticket can only be edited while OPEN");
        }

        ticket.setTitle(request.getTitle());
        ticket.setDescription(request.getDescription());
        return ticketRepository.save(ticket);
    }

}
