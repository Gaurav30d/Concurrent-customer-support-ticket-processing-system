package com.example.ticket_management_system.Controller;

import com.example.ticket_management_system.DTOs.CreateAgentRequest;
import com.example.ticket_management_system.DTOs.UserResponse;
import com.example.ticket_management_system.Model.User;
import com.example.ticket_management_system.Service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
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
}