package com.example.ticket_management_system.Controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class AuthTestController {

    @GetMapping("/whoami")
    public String whoami() {
        return "You are: " + SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
