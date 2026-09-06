package com.example.ticket_management_system.Exception;

public class TicketConflictException extends RuntimeException {
    public TicketConflictException(String message) {
        super(message);
    }
}