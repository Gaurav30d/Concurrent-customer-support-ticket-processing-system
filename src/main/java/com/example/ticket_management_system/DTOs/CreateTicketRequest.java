package com.example.ticket_management_system.DTOs;

import com.example.ticket_management_system.Model.TicketCategory;
import com.example.ticket_management_system.Model.TicketPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTicketRequest {

    @NotBlank(message = "Title cannot be empty")
    private String title;

    @NotBlank(message = "Description cannot be empty")
    private String description;

    @NotNull(message = "Priority cannot be null")
    private TicketPriority priority;

    @NotNull(message = "Category cannot be null")
    private TicketCategory category;
}
