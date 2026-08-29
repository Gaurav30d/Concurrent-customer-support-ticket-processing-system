package com.example.ticket_management_system.Exception;

public class TicketAlreadyAssignedException extends RuntimeException {
    public TicketAlreadyAssignedException(String message) {
        super(message);
    }
}