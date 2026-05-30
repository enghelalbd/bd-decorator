# StyleDecor — Server

Backend for the **StyleDecor** Smart Home & Ceremony Decoration Booking System.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Stripe payment (test mode)
- CORS, Morgan, dotenv

## Setup

```bash
cd server
npm install
# fill in .env (already provided with default Mongo URI & JWT secret)
npm run seed   # populate dummy data
npm run dev    # start on http://localhost:5000
```

## Environment Variables (`.env`)

| Key                 | Description                                   |
| ------------------- | --------------------------------------------- |
| `PORT`              | Server port (default 5000)                    |
| `MONGODB_URI`       | MongoDB Atlas connection string               |
| `JWT_SECRET`        | Secret used to sign JWT tokens                |
| `JWT_EXPIRES_IN`    | Token lifetime (default 7d)                   |
| `CLIENT_URL`        | Allowed CORS origin (comma-separated allowed) |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`)             |

## API Overview

### Auth

- `POST /api/auth/jwt` — issue JWT for a Firebase-authenticated email
- `POST /api/auth/users` — upsert user record
- `GET  /api/auth/users/:email` — fetch user (role check)

### Services

- `GET  /api/services` — list (search, category, budget, sort, pagination)
- `GET  /api/services/featured` — featured services for home page
- `GET  /api/services/:id` — details
- `POST /api/services` (admin) — create
- `PUT  /api/services/:id` (admin) — update
- `DELETE /api/services/:id` (admin) — delete

### Bookings

- `POST   /api/bookings` — create booking
- `GET    /api/bookings/mine` — my bookings (sort + pagination)
- `PATCH  /api/bookings/:id/mine` — update (only if unpaid)
- `DELETE /api/bookings/:id/mine` — cancel (only if unpaid)
- `GET    /api/bookings` (admin) — list all
- `PATCH  /api/bookings/:id/assign` (admin) — assign decorator (only if paid)
- `GET    /api/bookings/assigned/mine` (decorator) — assigned projects
- `PATCH  /api/bookings/:id/status` (decorator) — update project status

### Decorators

- `GET    /api/decorators/top` — top decorators
- `GET    /api/decorators` (admin) — list with pagination
- `GET    /api/decorators/users/all` (admin) — list all users
- `PATCH  /api/decorators/promote/:email` (admin)
- `PATCH  /api/decorators/role/:email` (admin)
- `PUT    /api/decorators/:id` (admin)
- `PATCH  /api/decorators/:id/status` (admin) — active/disabled
- `DELETE /api/decorators/:id` (admin)

### Payments

- `POST  /api/payments/create-intent` — Stripe PaymentIntent
- `POST  /api/payments/confirm` — record payment
- `GET   /api/payments/mine` — my payment history
- `GET   /api/payments/admin/stats` (admin) — revenue + analytics
- `GET   /api/payments/decorator/earnings` (decorator)

## Seed Accounts (after `npm run seed`)

- Admin → `admin@styledecor.com`
- Decorators → `decorator1@styledecor.com` … `decorator4@styledecor.com`
- Sample user → `user@styledecor.com`

Register these emails in the client with **any** Firebase password — the role is already set in the DB.

## NPM Packages

express, mongoose, dotenv, cors, morgan, jsonwebtoken, stripe, cookie-parser, firebase-admin
