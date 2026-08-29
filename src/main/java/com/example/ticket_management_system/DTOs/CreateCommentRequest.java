package com.example.ticket_management_system.DTOs;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCommentRequest {
    @NotBlank(message = "Message cannot be empty")
    private String message;
}