package com.example.ticket_management_system.DTOs;

import com.example.ticket_management_system.Model.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class TicketResponse {
    private Long id;
    private String title;
    private String description;
    private TicketPriority priority;
    private TicketStatus status;
    private TicketCategory category;
    private Long customerId;
    private Long assignedAgentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime dueBy;
    private Integer rating;
    private String feedback;

    public static TicketResponse fromEntity(Ticket ticket) {
        return new TicketResponse(
                ticket.getId(),
                ticket.getTitle(),
                ticket.getDescription(),
                ticket.getPriority(),
                ticket.getStatus(),
                ticket.getCategory(),
                ticket.getCustomerId(),
                ticket.getAssignedAgentId(),
                ticket.getCreatedAt(),
                ticket.getUpdatedAt(),
                ticket.getDueBy(),
                ticket.getRating(),
                ticket.getFeedback()
        );
    }
}