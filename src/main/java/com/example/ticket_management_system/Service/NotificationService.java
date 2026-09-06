package com.example.ticket_management_system.Service;

import com.example.ticket_management_system.Model.Notification;
import com.example.ticket_management_system.Model.NotificationStatus;
import com.example.ticket_management_system.Repository.NotificationRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Async("notificationExecutor")
    public void sendTicketResolvedNotification(Long ticketId, Long userId) {
        String idempotencyKey = "TICKET_RESOLVED-" + ticketId;

        if (notificationRepository.existsByIdempotencyKey(idempotencyKey)) {
            return; // already sent once — prevents duplicates (spec Section 41)
        }

        Notification notification = Notification.builder()
                .userId(userId)
                .ticketId(ticketId)
                .type("TICKET_RESOLVED")
                .message("Your ticket #" + ticketId + " has been resolved.")
                .idempotencyKey(idempotencyKey)
                .build();

        try {
            Thread.sleep(1000); // simulating actual email/SMS send
            notification.setStatus(NotificationStatus.SENT);
            notification.setSentAt(LocalDateTime.now());
        } catch (Exception e) {
            notification.setStatus(NotificationStatus.FAILED);
            // deliberately no rethrow — ticket stays RESOLVED regardless (spec Section 35)
        }

        notificationRepository.save(notification);
    }
}