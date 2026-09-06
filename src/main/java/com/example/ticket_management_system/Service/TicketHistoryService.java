package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Exception.TicketNotFoundException;
import com.example.ticket_management_system.Exception.UserNotFoundException;
import com.example.ticket_management_system.Model.*;
import com.example.ticket_management_system.Repository.TicketHistoryRepository;
import com.example.ticket_management_system.Repository.TicketRepository;
import com.example.ticket_management_system.Repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketHistoryService {

    private final TicketHistoryRepository ticketHistoryRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketAccessService ticketAccessService;

    public TicketHistoryService(TicketHistoryRepository ticketHistoryRepository,
                                TicketRepository ticketRepository,
                                UserRepository userRepository,
                                TicketAccessService ticketAccessService) {
        this.ticketHistoryRepository = ticketHistoryRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.ticketAccessService = ticketAccessService;
    }

    public void recordStatusChange(Long ticketId, Long changedBy, TicketStatus oldStatus, TicketStatus newStatus, String action) {
        TicketHistory history = TicketHistory.builder()
                .ticketId(ticketId)
                .changedBy(changedBy)
                .oldStatus(oldStatus)
                .newStatus(newStatus)
                .action(action)
                .build();
        ticketHistoryRepository.save(history);
    }

    public void recordPriorityChange(Long ticketId, Long changedBy, TicketPriority oldPriority, TicketPriority newPriority, String action) {
        TicketHistory history = TicketHistory.builder()
                .ticketId(ticketId)
                .changedBy(changedBy)
                .oldPriority(oldPriority)
                .newPriority(newPriority)
                .action(action)
                .build();
        ticketHistoryRepository.save(history);
    }

    public List<TicketHistory> getHistory(Long ticketId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));

        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        ticketAccessService.verifyCustomerOrAssignedAgent(ticket, user);

        return ticketHistoryRepository.findByTicketIdOrderByTimestampAsc(ticketId);
    }
}