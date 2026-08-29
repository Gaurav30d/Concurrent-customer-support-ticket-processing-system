package com.example.ticket_management_system.Model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ticket_history")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TicketHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long ticketId;

    @Column(nullable = false)
    private Long changedBy;

    @Enumerated(EnumType.STRING)
    private TicketStatus oldStatus;

    @Enumerated(EnumType.STRING)
    private TicketStatus newStatus;

    @Enumerated(EnumType.STRING)
    private Priority oldPriority;

    @Enumerated(EnumType.STRING)
    private Priority newPriority;

    @Column(nullable = false)
    private String action;

    @Column(updatable = false)
    private LocalDateTime timestamp;

    @PrePersist
    protected void onCreate() {
        timestamp = LocalDateTime.now();
    }
}