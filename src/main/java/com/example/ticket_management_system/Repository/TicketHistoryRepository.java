package com.example.ticket_management_system.Repository;

import com.example.ticket_management_system.Model.TicketHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketHistoryRepository extends JpaRepository<TicketHistory, Long> {
    List<TicketHistory> findByTicketIdOrderByTimestampAsc(Long ticketId);
}