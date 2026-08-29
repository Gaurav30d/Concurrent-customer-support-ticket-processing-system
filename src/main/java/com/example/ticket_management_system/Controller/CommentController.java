package com.example.ticket_management_system.Controller;

import com.example.ticket_management_system.DTOs.CommentResponse;
import com.example.ticket_management_system.DTOs.CreateCommentRequest;
import com.example.ticket_management_system.Model.Comment;
import com.example.ticket_management_system.Service.CommentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<CommentResponse> addComment(@PathVariable Long id, @Valid @RequestBody CreateCommentRequest request) {
        Comment comment = commentService.addComment(id, request.getMessage());
        return ResponseEntity.ok(CommentResponse.fromEntity(comment));
    }

    @GetMapping("/{id}/comments")
    public ResponseEntity<List<CommentResponse>> getComments(@PathVariable Long id) {
        List<Comment> comments = commentService.getComments(id);
        return ResponseEntity.ok(comments.stream().map(CommentResponse::fromEntity).toList());
    }
}