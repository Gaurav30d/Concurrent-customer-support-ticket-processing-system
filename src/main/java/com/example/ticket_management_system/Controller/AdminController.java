package com.example.ticket_management_system.Controller;

import com.example.ticket_management_system.DTOs.CreateAgentRequest;
import com.example.ticket_management_system.DTOs.UserResponse;
import com.example.ticket_management_system.Model.User;
import com.example.ticket_management_system.Service.AdminService;
import com.example.ticket_management_system.concurrency.ActiveProcessingTracker;
import com.example.ticket_management_system.concurrency.ProcessingStats;
import com.example.ticket_management_system.concurrency.TicketQueueManager;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;
    private final TicketQueueManager queueManager;
    private final ActiveProcessingTracker tracker;
    private final ProcessingStats stats;

    public AdminController(AdminService adminService, TicketQueueManager queueManager,
                           ActiveProcessingTracker tracker, ProcessingStats stats) {
        this.adminService = adminService;
        this.queueManager = queueManager;
        this.tracker = tracker;
        this.stats = stats;
    }

    @PostMapping("/agents")
    public ResponseEntity<UserResponse> createAgent(@Valid @RequestBody CreateAgentRequest request) {
        User agent = adminService.createAgent(request);
        return ResponseEntity.ok(UserResponse.fromEntity(agent));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<User> users = adminService.getAllUsers();
        return ResponseEntity.ok(users.stream().map(UserResponse::fromEntity).toList());
    }
    
    @GetMapping("/system/concurrency")
    public ResponseEntity<Map<String, Object>> getConcurrencyStatus() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("queueSize", queueManager.size());
        status.put("activeWorkers", tracker.activeCount());
        status.put("processedTickets", stats.getProcessed());
        status.put("failedTickets", stats.getFailed());
        return ResponseEntity.ok(status);
    }
}