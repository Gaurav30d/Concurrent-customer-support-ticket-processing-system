package com.example.ticket_management_system;

import com.example.ticket_management_system.Model.*;
import com.example.ticket_management_system.Repository.TicketRepository;
import com.example.ticket_management_system.Repository.UserRepository;
import com.example.ticket_management_system.Service.AgentService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.concurrent.*;

@SpringBootTest
public class RaceConditionTest {

    @Autowired private AgentService agentService;
    @Autowired private TicketRepository ticketRepository;
    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Test
    void multipleAgentsClaimingSameTicketSimultaneously() throws InterruptedException, ExecutionException {

        // --- Setup: one fresh OPEN ticket, and 5 distinct agent accounts ---
        Ticket ticket = Ticket.builder()
                .title("Race condition test ticket")
                .description("Testing concurrent claim")
                .priority(TicketPriority.MEDIUM)
                .category(TicketCategory.TECHNICAL)
                .customerId(1L) // assumes a user with id 1 exists; adjust if needed
                .status(TicketStatus.OPEN)
                .build();
        Ticket savedTicket = ticketRepository.save(ticket);

        int agentCount = 5;
        for (int i = 1; i <= agentCount; i++) {
            String email = "race-agent-" + i + "@test.com";
            if (!userRepository.existsByEmail(email)) {
                User agent = new User();
                agent.setName("Race Agent " + i);
                agent.setEmail(email);
                agent.setPassword(passwordEncoder.encode("password123"));
                agent.setRole(Role.AGENT);
                userRepository.save(agent);
            }
        }

        // --- The actual concurrency test ---
        CountDownLatch startLatch = new CountDownLatch(1);
        ExecutorService executor = Executors.newFixedThreadPool(agentCount);
        List<Future<String>> futures = new java.util.ArrayList<>();

        for (int i = 1; i <= agentCount; i++) {
            String email = "race-agent-" + i + "@test.com";

            futures.add(executor.submit(() -> {
                // Each thread must set its OWN SecurityContext — it's ThreadLocal by default,
                // meaning threads don't automatically share the main thread's authentication.
                var auth = new UsernamePasswordAuthenticationToken(
                        email, null, List.of(new SimpleGrantedAuthority("ROLE_AGENT")));
                SecurityContextHolder.getContext().setAuthentication(auth);

                try {
                    startLatch.await(); // wait here until released simultaneously
                    agentService.claimTicket(savedTicket.getId());
                    return "SUCCESS (" + email + ")";
                } catch (Exception e) {
                    return "FAILED (" + email + "): " + e.getClass().getSimpleName() + " - " + e.getMessage();
                }
            }));
        }

        Thread.sleep(200); // give all threads time to reach startLatch.await()
        startLatch.countDown(); // release all 5 threads at once

        for (Future<String> future : futures) {
            System.out.println(future.get());
        }

        executor.shutdown();

        // --- Inspect final state ---
        Ticket finalTicket = ticketRepository.findById(savedTicket.getId()).orElseThrow();
        System.out.println("Final ticket state: status=" + finalTicket.getStatus()
                + ", assignedAgentId=" + finalTicket.getAssignedAgentId()
                + ", version=" + finalTicket.getVersion());
    }
}