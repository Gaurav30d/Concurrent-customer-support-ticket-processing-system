package com.example.ticket_management_system.Controller;

import com.example.ticket_management_system.DTOs.TicketResponse;
import com.example.ticket_management_system.DTOs.UpdateStatusRequest;
import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Service.AgentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agent")
@PreAuthorize("hasRole('AGENT')")
public class AgentController {

    private final AgentService agentService;

    public AgentController(AgentService agentService) {
        this.agentService = agentService;
    }

    @GetMapping("/tickets")
    public ResponseEntity<List<TicketResponse>> getAvailableTickets() {
        List<Ticket> tickets = agentService.getAvailableTickets();
        return ResponseEntity.ok(tickets.stream().map(TicketResponse::fromEntity).toList());
    }

    @GetMapping("/tickets/assigned")
    public ResponseEntity<List<TicketResponse>> getMyAssignedTickets() {
        List<Ticket> tickets = agentService.getMyAssignedTickets();
        return ResponseEntity.ok(tickets.stream().map(TicketResponse::fromEntity).toList());
    }

    @PutMapping("/tickets/{id}/claim")
    public ResponseEntity<TicketResponse> claimTicket(@PathVariable Long id) {
        Ticket ticket = agentService.claimTicket(id);
        return ResponseEntity.ok(TicketResponse.fromEntity(ticket));
    }
    @PutMapping("/tickets/{id}/status")
    public ResponseEntity<TicketResponse> updateStatus(@PathVariable Long id, @Valid @RequestBody UpdateStatusRequest request) {
        Ticket ticket = agentService.updateStatus(id, request.getStatus());
        return ResponseEntity.ok(TicketResponse.fromEntity(ticket));
    }
}
