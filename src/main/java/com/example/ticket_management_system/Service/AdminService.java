package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.DTOs.CreateAgentRequest;
import com.example.ticket_management_system.Model.Role;
import com.example.ticket_management_system.Model.User;
import com.example.ticket_management_system.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createAgent(CreateAgentRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Email already registered");
        }

        User agent = new User();
        agent.setName(request.getName());
        agent.setEmail(request.getEmail());
        agent.setPassword(passwordEncoder.encode(request.getPassword()));
        agent.setRole(Role.AGENT);

        return userRepository.save(agent);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}