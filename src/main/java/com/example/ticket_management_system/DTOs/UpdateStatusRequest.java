package com.example.ticket_management_system.DTOs;

import com.example.ticket_management_system.Model.TicketStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateStatusRequest {
    @NotNull(message = "Status must be specified")
    private TicketStatus status;
}