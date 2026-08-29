package com.example.ticket_management_system.DTOs;

import com.example.ticket_management_system.Model.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TicketHistoryResponse {
    private Long id;
    private Long changedBy;
    private TicketStatus oldStatus;
    private TicketStatus newStatus;
    private Priority oldPriority;
    private Priority newPriority;
    private String action;
    private LocalDateTime timestamp;

    public static TicketHistoryResponse fromEntity(TicketHistory h) {
        return new TicketHistoryResponse(
                h.getId(), h.getChangedBy(), h.getOldStatus(), h.getNewStatus(),
                h.getOldPriority(), h.getNewPriority(), h.getAction(), h.getTimestamp()
        );
    }
}