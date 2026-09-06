package com.example.ticket_management_system.Repository;

import com.example.ticket_management_system.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    boolean existsByIdempotencyKey(String idempotencyKey);
}