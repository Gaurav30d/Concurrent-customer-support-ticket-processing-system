package com.example.ticket_management_system.DTOs;

import com.example.ticket_management_system.Model.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponse {
    private Long id;
    private Long ticketId;
    private Long userId;
    private String message;
    private LocalDateTime createdAt;

    public static CommentResponse fromEntity(Comment comment) {
        return new CommentResponse(
                comment.getId(),
                comment.getTicketId(),
                comment.getUserId(),
                comment.getMessage(),
                comment.getCreatedAt()
        );
    }
}