# 🚀 ResolveIQ – Concurrent Customer Support Ticket Processing System
#Link : https://resolveiq-ee34715kr-gauravs-projects-a9e5ce7f.vercel.app/
> A multi-threaded, high-concurrency customer support platform built with **Spring Boot** and **Vite / Modern JavaScript**. It processes support tickets in parallel using priority queues, background worker threads, and live WebSocket telemetry.

---

## 📌 What is This Project? (Simple Explanation)

When hundreds of customers submit support requests at the same time, a regular system can become slow or lose track of urgent issues.

**ResolveIQ** solves this by using **Java multi-threading and priority queues**:
1. **Priority Scheduling**: Urgent tickets (like critical payment failures) jump to the front of the line automatically.
2. **Background Worker Threads**: A fixed pool of background worker threads processes tickets concurrently without blocking the main web server.
3. **Live Dashboard**: Admins and teams can watch queue sizes, active workers, and processed tickets update in real-time via WebSockets.
4. **Three User Roles**: Tailored portals for **Customers**, **Support Agents**, and **Admins**.

---

## ✨ Features

- **🔐 User Authentication & Roles (JWT)**:
  - **Customer**: Raise tickets with priority levels, view status history, chat via ticket comments, and rate resolutions.
  - **Agent**: View assigned tickets, update statuses (`OPEN` ➔ `IN_PROGRESS` ➔ `RESOLVED`), and reply to customers.
  - **Admin**: Monitor live concurrency metrics, manage users, and create agent accounts.
- **⚡ Concurrent Queue Processing**:
  - Thread-safe `PriorityBlockingQueue` orders incoming tickets by urgency.
  - Dedicated `WorkerManager` with worker threads (`TicketWorker`) continuously picks up and processes tasks.
- **📊 Real-Time Telemetry**:
  - Live statistics broadcasted every 2 seconds via WebSocket (STOMP + SockJS) with automatic HTTP polling fallback.
- **🎨 Modern Dark UI**:
  - Clean, responsive glassmorphism UI built with vanilla CSS and ES Modules.

---

## 🛠️ Tech Stack

- **Backend**: Java 17+, Spring Boot 4, Spring Security, JWT, Spring Data JPA, Spring WebSocket (STOMP)
- **Database & Services**: MySQL 8.0, Redis (optional caching), Apache Kafka / Zookeeper (ready)
- **Frontend**: Vite, Modern JavaScript (ES Modules), Vanilla CSS, SockJS & @stomp/stompjs
- **DevOps**: Docker & Docker Compose, Vercel ready

---

## 📋 Prerequisites

Before running the project locally, make sure you have installed:
- **Java Development Kit (JDK) 17** or higher
- **Node.js** (v18 or higher) and **npm**
- **Docker** & **Docker Compose** (or a local MySQL 8.0 server)

---

## 🚀 Quick Start Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Gaurav30d/Concurrent-customer-support-ticket-processing-system.git
cd Concurrent-customer-support-ticket-processing-system
```

---

### 2. Start the Database (Docker)
Start MySQL using Docker Compose:
```bash
docker-compose up -d mysql
```
*(Or use your own local MySQL server on port `3306` with database `support_ticket_system`)*

---

### 3. Configure Database Credentials
Check `src/main/resources/application.properties` to ensure credentials match your MySQL setup:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/support_ticket_system?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

---

### 4. Run the Spring Boot Backend
From the root directory:
```bash
# On macOS / Linux:
./mvnw spring-boot:run

# On Windows:
mvnw.cmd spring-boot:run
```
The backend API starts at `http://localhost:8080`.

---

### 5. Run the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🌐 Deploying Frontend on Vercel

If you deploy the frontend to **Vercel**:

1. **Root Directory**:
   - In Vercel Project Settings, set **Root Directory** to `frontend` (or deploy the repository root; `vercel.json` is provided for both).
2. **Build Settings**:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` (outputs to `dist`)
   - **Output Directory**: `dist`
3. **Environment Variables**:
   - Add `VITE_API_BASE_URL`: The URL of your deployed Spring Boot backend (e.g. `https://your-backend.railway.app/api`)
   - Add `VITE_WS_URL`: The WebSocket endpoint of your backend (e.g. `https://your-backend.railway.app/ws`)

---

## 📖 How to Use the App

1. **Sign Up**:
   - Go to `http://localhost:5173/signup` and create a new account (default role: `CUSTOMER`).
2. **Customer Portal**:
   - Submit a new ticket specifying title, description, category, and priority (`LOW`, `MEDIUM`, `HIGH`, `URGENT`).
   - Monitor the ticket status transition in real-time.
   - Add comments or feedback on tickets.
3. **Agent & Admin Portals**:
   - Log in with Agent or Admin credentials to manage tickets and view real-time concurrency metrics.

---

## 📂 Project Structure

```text
├── docker-compose.yml       # MySQL, Redis, Kafka configuration
├── pom.xml                  # Maven backend dependencies
├── src/
│   └── main/java/com/example/ticket_management_system/
│       ├── Config/          # Security, JWT, WebSockets, Async config
│       ├── Controller/      # REST API endpoints (Auth, Tickets, Admin, etc.)
│       ├── Service/         # Business logic & ticket status workflows
│       ├── Repository/      # Spring Data JPA repositories
│       ├── Model/           # Entities (User, Ticket, Comment, History)
│       └── concurrency/     # Priority queue, workers & live telemetry
└── frontend/
    ├── src/
    │   ├── api/             # REST & WebSocket API clients
    │   ├── pages/           # Customer, Agent, Admin, Login, Signup pages
    │   ├── components/      # UI components & Concurrency Telemetry widget
    │   └── styles/          # Dark-mode design system
    ├── package.json
    ├── vite.config.js       # Vite configuration (dist build + proxy)
    └── vercel.json          # SPA routing rewrites for Vercel
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
