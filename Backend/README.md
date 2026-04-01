# 🎟️ Mini Event Management System

A RESTful API built with **Node.js**, **Express.js**, and **MySQL** for managing events, booking tickets, and tracking attendance.

> Built as a selection test for **Lattice Innovations**.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MySQL |
| Validation | express-validator |
| Documentation | Swagger UI (OpenAPI 3.0) |
| Containerization | Docker |

---

## 📁 Project Structure

```
event-booking-system/
├── src/
│   ├── config/           # Database connection (MySQL pool)
│   ├── controllers/      # Business logic
│   ├── models/           # Database queries
│   ├── routes/           # API route definitions
│   ├── middlewares/      # Validation & error handling
│   └── utils/            # Booking code generator
├── database/
│   └── schema.sql        # Database schema with sample data
├── swagger.yaml          # OpenAPI 3.0 documentation
├── Dockerfile            # Docker image config
├── docker-compose.yml    # Multi-container setup
├── server.js             # Entry point
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/AdarshKumarSr/event-booking-system.git
cd event-booking-system
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=event_booking_db
```

### 4. Set up the database

**Mac/Linux:**

```bash
mysql -u root -p < database/schema.sql
```

**Windows (PowerShell):**

```bash
Get-Content database/schema.sql | mysql -u root -p
```

**MySQL Workbench:**
- Open `database/schema.sql`
- Click Execute ▶️

### 5. Run the server

```bash
npm run dev    # Development (auto-restart)
npm start      # Production
```

✅ Server → `http://localhost:3000`
📄 Swagger → `http://localhost:3000/api-docs`

---

## 🐳 Docker Setup (One Click)

Make sure Docker Desktop is installed, then:

```bash
docker-compose up --build
```

This will:
- Start a MySQL 8.0 container
- Auto import the database schema
- Start the Node.js app

✅ Server → `http://localhost:3000`
📄 Swagger → `http://localhost:3000/api-docs`

```bash
docker-compose down    # Stop everything
```

### Pull directly from Docker Hub

```bash
docker pull bugboy3e8/event-booking-system:latest
```

---

## 📄 API Documentation

Interactive Swagger UI at: http://localhost:3000/api-docs

---

## 📡 API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create a new user |
| GET | `/api/users/:id` | Get user by ID |
| GET | `/api/users/:id/bookings` | Get all bookings of a user |

### Events
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List all upcoming events |
| POST | `/api/events` | Create a new event |

### Bookings & Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Book a ticket (returns unique code) |
| POST | `/api/events/:id/attendance` | Mark attendance via booking code |

---

## 🗄️ Database Design

**users** — stores user info
| Column | Type | Notes |
|--------|------|-------|
| id | INT UNSIGNED | Primary key |
| name | VARCHAR(100) | Full name |
| email | VARCHAR(150) | Unique |
| created_at | TIMESTAMP | Auto |

**events** — stores event info
| Column | Type | Notes |
|--------|------|-------|
| id | INT UNSIGNED | Primary key |
| title | VARCHAR(200) | - |
| description | TEXT | - |
| date | DATETIME | - |
| total_capacity | INT UNSIGNED | - |
| remaining_tickets | INT UNSIGNED | - |
| created_at | TIMESTAMP | Auto |

**bookings** — links users to events
| Column | Type | Notes |
|--------|------|-------|
| id | INT UNSIGNED | Primary key |
| user_id | INT UNSIGNED | FK → users |
| event_id | INT UNSIGNED | FK → events |
| booking_code | VARCHAR(20) | Unique |
| booking_date | TIMESTAMP | Auto |

**event_attendance** — tracks entry
| Column | Type | Notes |
|--------|------|-------|
| id | INT UNSIGNED | Primary key |
| booking_id | INT UNSIGNED | FK → bookings (unique) |
| user_id | INT UNSIGNED | FK → users |
| event_id | INT UNSIGNED | FK → events |
| entry_time | TIMESTAMP | Auto |

**Relationships:**
- One user → many bookings
- One event → many bookings
- One booking → one attendance record

---

## 🔒 Race Condition Handling

Booking uses **MySQL transactions** to prevent overselling:

1. `BEGIN TRANSACTION`
2. Check `remaining_tickets`
3. `UPDATE remaining_tickets WHERE remaining_tickets > 0`
4. If `affectedRows === 0` → sold out → `ROLLBACK`
5. Insert booking
6. `COMMIT`

---

## ✅ Sample Requests

### Create a user

```json
POST /api/users
{
  "name": "Rahul Sharma",
  "email": "rahul@example.com"
}
```

### Create an event

```json
POST /api/events
{
  "title": "Tech Summit 2026",
  "description": "Annual technology conference",
  "date": "2026-05-15T10:00:00",
  "total_capacity": 100
}
```

### Book a ticket

```json
POST /api/bookings
{
  "user_id": 1,
  "event_id": 1
}
```

### Mark attendance

```json
POST /api/events/1/attendance
{
  "booking_code": "BK-A3F2C1B4"
}
```

---

## 👨‍💻 Author

**Adarsh**
- 🌐 [adarsh3e8.in](https://adarsh3e8.in)
- 🐙 [GitHub](https://github.com/AdarshKumarSr)