package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Exception.TicketNotFoundException;
import com.example.ticket_management_system.Exception.UserNotFoundException;
import com.example.ticket_management_system.Model.Comment;
import com.example.ticket_management_system.Model.Ticket;
import com.example.ticket_management_system.Model.User;
import com.example.ticket_management_system.Repository.CommentRepository;
import com.example.ticket_management_system.Repository.TicketRepository;
import com.example.ticket_management_system.Repository.UserRepository;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final TicketRepository ticketRepository;
    private final UserRepository userRepository;
    private final TicketAccessService ticketAccessService;

    public CommentService(CommentRepository commentRepository,
                          TicketRepository ticketRepository,
                          UserRepository userRepository, TicketAccessService ticketAccessService) {
        this.commentRepository = commentRepository;
        this.ticketRepository = ticketRepository;
        this.userRepository = userRepository;
        this.ticketAccessService = ticketAccessService;
    }

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("Authenticated user not found"));
    }

    public Comment addComment(Long ticketId, String message) {
        User user = getCurrentUser();
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        ticketAccessService.verifyCustomerOrAssignedAgent(ticket, user);

        Comment comment = Comment.builder()
                .ticketId(ticketId)
                .userId(user.getId())
                .message(message)
                .build();

        return commentRepository.save(comment);
    }

    public List<Comment> getComments(Long ticketId) {
        User user = getCurrentUser();
        Ticket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new TicketNotFoundException("Ticket not found"));

        ticketAccessService.verifyCustomerOrAssignedAgent(ticket, user);

        return commentRepository.findByTicketIdOrderByCreatedAtAsc(ticketId);
    }
}