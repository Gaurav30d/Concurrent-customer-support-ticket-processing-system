package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Model.*;
import com.example.ticket_management_system.Repository.TicketRepository;
import com.example.ticket_management_system.Repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class AutoAssignmentService {

    private static final Logger log = LoggerFactory.getLogger(AutoAssignmentService.class);

    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketHistoryService ticketHistoryService;

    public AutoAssignmentService(TicketRepository ticketRepository, UserRepository userRepository,
                                 TicketHistoryService ticketHistoryService) {
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.ticketHistoryService = ticketHistoryService;
    }

    @Scheduled(fixedDelay = 10000) // waits 10s AFTER previous run finishes — never overlaps itself
    public void assignUnclaimedTickets() {
        List<Ticket> unclaimed = ticketRepository.findByAssignedAgentIdIsNullAndStatus(TicketStatus.OPEN);
        if (unclaimed.isEmpty()) return;

        unclaimed.sort(Comparator
                .comparing((Ticket t) -> t.getPriority().ordinal()).reversed()
                .thenComparing(Ticket::getCreatedAt));

        List<User> agents = userRepository.findByRole(Role.AGENT);
        if (agents.isEmpty()) return;

        for (Ticket ticketSummary : unclaimed) {
            Ticket ticket = ticketRepository.findById(ticketSummary.getId()).orElse(null);
            if (ticket == null || ticket.getAssignedAgentId() != null || ticket.getStatus() != TicketStatus.OPEN) {
                continue;
            }

            User leastBusyAgent = agents.stream()
                    .min(Comparator.comparingLong(agent ->
                            ticketRepository.countByAssignedAgentIdAndStatusIn(
                                    agent.getId(), List.of(TicketStatus.ASSIGNED, TicketStatus.IN_PROGRESS))))
                    .orElse(null);

            if (leastBusyAgent == null) continue;

            try {
                TicketStatus oldStatus = ticket.getStatus();
                ticket.setAssignedAgentId(leastBusyAgent.getId());
                ticket.setStatus(TicketStatus.ASSIGNED);
                ticketRepository.saveAndFlush(ticket);

                ticketHistoryService.recordStatusChange(
                        ticket.getId(), leastBusyAgent.getId(), oldStatus, TicketStatus.ASSIGNED, "AUTO_ASSIGNED");
            } catch (ObjectOptimisticLockingFailureException e) {
                log.debug("Ticket {} claimed or modified concurrently; skipping auto-assignment", ticket.getId());
            }
        }
    }
}