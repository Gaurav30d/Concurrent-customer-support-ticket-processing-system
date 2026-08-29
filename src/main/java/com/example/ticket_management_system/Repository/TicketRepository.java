package com.example.ticket_management_system.Repository;

import com.example.ticket_management_system.Model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByCustomerId(Long customerId);
    List<Ticket> findByAssignedAgentId(Long agentId);
    List<Ticket> findByAssignedAgentIdIsNull();
}
