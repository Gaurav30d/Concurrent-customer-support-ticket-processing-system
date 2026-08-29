package com.example.ticket_management_system.Controller;

import com.example.ticket_management_system.DTOs.CreateTicketRequest;
import com.example.ticket_management_system.DTOs.TicketHistoryResponse;
import com.example.ticket_management_system.DTOs.TicketResponse;
import com.example.ticket_management_system.DTOs.UpdateTicketRequest;
import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Model.TicketHistory;
import com.example.ticket_management_system.Service.TicketHistoryService;
import com.example.ticket_management_system.Service.TicketService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;
    private final TicketHistoryService ticketHistoryService;

    public TicketController(TicketService ticketService, TicketHistoryService ticketHistoryService) {
        this.ticketService = ticketService;
        this.ticketHistoryService = ticketHistoryService;
    }

    @PostMapping
    public ResponseEntity<TicketResponse> createTicket(@Valid @RequestBody CreateTicketRequest request) {
        Ticket ticket = ticketService.createTicket(request);
        return ResponseEntity.ok(TicketResponse.fromEntity(ticket));
    }

    @GetMapping("/my")
    public ResponseEntity<List<TicketResponse>> getMyTickets() {
        List<Ticket> tickets = ticketService.getMyTickets();
        List<TicketResponse> response = tickets.stream()
                .map(TicketResponse::fromEntity)
                .toList();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketResponse> getTicketById(@PathVariable Long id) {
        Ticket ticket = ticketService.getTicketById(id);
        return ResponseEntity.ok(TicketResponse.fromEntity(ticket));
    }

    @PutMapping("/{id}/close")
    public ResponseEntity<TicketResponse> closeTicket(@PathVariable Long id) {
        Ticket ticket = ticketService.closeTicket(id);
        return ResponseEntity.ok(TicketResponse.fromEntity(ticket));
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<TicketResponse> cancelTicket(@PathVariable Long id) {
        Ticket ticket = ticketService.cancelTicket(id);
        return ResponseEntity.ok(TicketResponse.fromEntity(ticket));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketResponse> updateTicket(@PathVariable Long id, @Valid @RequestBody UpdateTicketRequest request) {
        Ticket ticket = ticketService.updateTicket(id, request);
        return ResponseEntity.ok(TicketResponse.fromEntity(ticket));
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<List<TicketHistoryResponse>> getHistory(@PathVariable Long id) {
        List<TicketHistory> history = ticketHistoryService.getHistory(id);
        return ResponseEntity.ok(history.stream().map(TicketHistoryResponse::fromEntity).toList());
    }


}