package com.example.ticket_management_system.scratch;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class QueueDemo {
    public static void main(String[] args) {
        BlockingQueue<String> queue = new LinkedBlockingQueue<>();

        // Consumer thread — starts FIRST, immediately calls take() and blocks
        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    String item = queue.take(); // blocks here until something exists
                    System.out.println("Consumed: " + item + " on " + Thread.currentThread().getName());
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });
        consumer.start();

        // Producer — the main thread, adds items with a delay
        try {
            for (int i = 1; i <= 5; i++) {
                Thread.sleep(500);
                System.out.println("Producing: ticket-" + i);
                queue.put("ticket-" + i);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}