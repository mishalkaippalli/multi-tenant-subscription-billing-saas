# Multi-Tenant Subscription Billing SaaS

## Project Overview

This project is a Multi-Tenant Subscription Billing SaaS application built using the MERN stack. It allows multiple companies (tenants) to independently manage their subscription plans, users, subscriptions, billing cycles, and dashboard analytics while ensuring complete data isolation between companies.

Each registered company has its own administrator who can:

* Register and manage their company
* Create subscription plans
* Create company users
* Assign subscription plans to users
* Run billing cycles
* View billing logs
* Monitor dashboard analytics

The application uses JWT authentication with HttpOnly cookies and role-based authorization to provide secure access.

---

# Tech Stack

## Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* Cookie Parser

## Database

* MongoDB
* Mongoose

---

# Project Structure

```
multi-tenant-subscription-billing-saas/

│── backend/
│── frontend/
│── README.md
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone <repository-url>

cd multi-tenant-subscription-billing-saas
```

---

## 2. Backend Setup

Navigate to backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file inside the backend directory.

Refer to the `.env.example` file for the required environment variables.

Start the backend server

```bash
npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

## 3. Frontend Setup

Open another terminal

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Start React application

```bash
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

NODE_ENV=development
```

---

# API Endpoints

## Authentication

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | /api/auth/register | Register Company & Admin |
| POST   | /api/auth/login    | Login                    |
| POST   | /api/auth/logout   | Logout                   |

---

## Plans

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | /api/plans     | Create Plan   |
| GET    | /api/plans     | Get All Plans |
| DELETE | /api/plans/:id | Delete Plan   |

---

## Users

| Method | Endpoint   | Description   |
| ------ | ---------- | ------------- |
| POST   | /api/users | Create User   |
| GET    | /api/users | Get All Users |

---

## Subscriptions

| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| POST   | /api/subscriptions | Assign Subscription   |
| GET    | /api/subscriptions | Get All Subscriptions |

---

## Billing

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | /api/billing/run-cycle | Execute Billing Cycle |
| GET    | /api/billing/logs      | View Billing Logs     |

---

## Dashboard

| Method | Endpoint       | Description         |
| ------ | -------------- | ------------------- |
| GET    | /api/dashboard | Dashboard Analytics |

---

# Billing Cycle

The billing engine simulates a monthly subscription billing process.

When **POST /api/billing/run-cycle** is executed:

* Fetches all active subscriptions for the logged-in company.
* Ignores subscriptions whose start date has not yet arrived.
* Bills newly created subscriptions that have not been billed before.
* Prevents duplicate billing by checking the `lastBilledDate`.
* Marks expired subscriptions as `Expired`.
* Creates billing logs for every successful billing operation.
* Returns a billing summary including:

  * Billed
  * Skipped
  * Expired

This ensures each active subscription is billed only once per billing cycle.

---

# Security Features

* Multi-tenant data isolation
* JWT Authentication
* HttpOnly Cookies
* Role-based Authorization
* Password Hashing using bcrypt
* Input Validation
* Protected Routes
* CORS Configuration

---

# Features Implemented

* Company Registration
* Company Login
* Company Logout
* Dashboard Analytics
* Plan Management
* User Management
* Subscription Management
* Billing Engine
* Billing Logs
* Multi-Tenant Data Isolation

---

# Future Improvements

* Email Notifications
* Payment Gateway Integration
* Automated Scheduled Billing (Cron Jobs)
* Plan Update and Edit
* User Profile Management
* Charts for Dashboard Analytics
* Unit and Integration Testing

---

# Author

**Mishal K**

