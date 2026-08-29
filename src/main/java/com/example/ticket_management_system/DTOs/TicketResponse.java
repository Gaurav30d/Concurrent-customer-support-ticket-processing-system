package com.example.ticket_management_system.DTOs;

import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Model.TicketCategory;
import com.example.ticket_management_system.Model.TicketPriority;
import com.example.ticket_management_system.Model.TicketStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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
                ticket.getUpdatedAt()
        );
    }
}