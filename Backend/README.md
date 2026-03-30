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
│   └── utils/            # Helper functions (booking code generator)
├── database/
│   └── schema.sql        # Database schema with sample data
├── swagger.yaml          # OpenAPI 3.0 documentation
├── Dockerfile            # Docker image configuration
├── docker-compose.yml    # Multi-container setup
├── server.js             # Application entry point
└── README.md
```

---

## ⚙️ Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/event-booking-system.git
cd event-booking-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=event_booking_db
```

### 4. Set up the database

**On Mac/Linux:**
```bash
mysql -u root -p < database/schema.sql
```

**On Windows (PowerShell):**
```bash
Get-Content database/schema.sql | mysql -u root -p
```

**Or using MySQL Workbench:**
- Open MySQL Workbench
- Copy paste contents of `database/schema.sql`
- Click Execute ▶️

### 5. Run the server
```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

✅ Server runs at `http://localhost:3000`
📄 Swagger docs at `http://localhost:3000/api-docs`

---

## 🐳 Docker Setup (One Click)

Make sure Docker Desktop is installed, then run:
```bash
docker-compose up --build
```

This will automatically:
- Start a MySQL 8.0 container
- Import the database schema
- Start the Node.js app

✅ Server runs at `http://localhost:3000`
📄 Swagger docs at `http://localhost:3000/api-docs`

To stop:
```bash
docker-compose down
```

### Pull from Docker Hub
```bash
docker pull bugboy3e8/event-booking-system:latest
```

---

## 📄 API Documentation

Full Swagger UI available at:
```
http://localhost:3000/api-docs
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List all upcoming events |
| POST | `/api/events` | Create a new event |
| POST | `/api/bookings` | Book a ticket (returns unique code) |
| GET | `/api/users/:id/bookings` | Get all bookings of a user |
| POST | `/api/events/:id/attendance` | Mark attendance via booking code |

---

## 🗄️ Database Design

### Tables

**users**
| Column | Type | Description |
|--------|------|-------------|
| id | INT UNSIGNED | Primary key |
| name | VARCHAR(100) | Full name |
| email | VARCHAR(150) | Unique email |
| created_at | TIMESTAMP | Auto-generated |

**events**
| Column | Type | Description |
|--------|------|-------------|
| id | INT UNSIGNED | Primary key |
| title | VARCHAR(200) | Event title |
| description | TEXT | Event details |
| date | DATETIME | Event date & time |
| total_capacity | INT UNSIGNED | Max tickets |
| remaining_tickets | INT UNSIGNED | Available tickets |
| created_at | TIMESTAMP | Auto-generated |

**bookings**
| Column | Type | Description |
|--------|------|-------------|
| id | INT UNSIGNED | Primary key |
| user_id | INT UNSIGNED | FK → users |
| event_id | INT UNSIGNED | FK → events |
| booking_code | VARCHAR(20) | Unique booking code |
| booking_date | TIMESTAMP | Auto-generated |

**event_attendance**
| Column | Type | Description |
|--------|------|-------------|
| id | INT UNSIGNED | Primary key |
| booking_id | INT UNSIGNED | FK → bookings (unique) |
| user_id | INT UNSIGNED | FK → users |
| event_id | INT UNSIGNED | FK → events |
| entry_time | TIMESTAMP | Auto-generated |

### Relationships
- One **user** → many **bookings**
- One **event** → many **bookings**
- One **booking** → one **attendance** record

---

## 🔒 Race Condition Handling

Ticket booking uses **MySQL transactions** to prevent overselling under concurrent load:

1. `BEGIN TRANSACTION`
2. Fetch event and check `remaining_tickets`
3. `UPDATE remaining_tickets WHERE remaining_tickets > 0`
4. If `affectedRows === 0` → tickets just sold out → `ROLLBACK`
5. Insert booking record
6. `COMMIT`

This guarantees tickets are **never oversold** even under high traffic.

---

## ✅ Sample Requests

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
- 🐙 [GitHub](https://github.com/your-github-username)