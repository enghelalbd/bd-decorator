# StyleDecor — Smart Home & Ceremony Decoration Booking System

Full-stack MERN application for booking decoration services (home, wedding, office, seminar, birthday, anniversary, meeting) with role-based dashboards (User, Admin, Decorator), Stripe payments, real-time project status, and analytics.

## Tech Stack

**Frontend:** React 18, Vite, React Router v6, TanStack Query, Tailwind CSS, DaisyUI, Framer Motion, React Leaflet, Recharts, Firebase Auth, Stripe.js, react-hot-toast, SweetAlert2

**Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, Stripe, CORS, Morgan, dotenv

## Project Structure

```
assignment-11/
├── client/     React + Vite frontend
└── server/     Express + Mongoose backend
```

## Quick Start

### 1) Server

```bash
cd server
npm install
npm run seed       # populate MongoDB with dummy data
npm run dev        # http://localhost:5000
```

### 2) Client (in a separate terminal)

```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

## Seed Accounts (register these emails through Firebase to log in)

| Role      | Email                                                     |
| --------- | --------------------------------------------------------- |
| **Admin** | `admin@styledecor.com`                                    |
| Decorator | `decorator1@styledecor.com` … `decorator4@styledecor.com` |
| User      | `user@styledecor.com`                                     |

> Tip: register them through the **Register** page with any password — the role is already assigned in MongoDB.

## Environment

- Server `.env` already includes the provided MongoDB URI. Add your own `STRIPE_SECRET_KEY` to enable real payments (otherwise demo mode is used).
- Client `.env` already includes the provided Firebase config. Add `VITE_STRIPE_PUBLISHABLE_KEY` and `VITE_IMGBB_API_KEY` if needed.

## Features Summary

- 🏠 Home with animated hero, dynamic services, top decorators, Leaflet coverage map
- 🔍 Services page: search, filter (category + budget), sort, pagination
- 📄 Service Details with Book Now modal (login-required)
- 💳 Stripe payment + receipts; payment history per user
- 👤 User dashboard: My Profile, My Bookings (edit/cancel/pay), Payment History
- 🛡️ Admin dashboard: CRUD services, manage decorators, manage users, manage bookings (assign decorator only after payment), analytics charts
- 🧑‍🎨 Decorator dashboard: assigned projects, today's schedule, step-by-step status updates, earnings
- 🔐 JWT verification on all protected routes
- 📱 Fully responsive DaisyUI design

See [`client/README.md`](client/README.md) and [`server/README.md`](server/README.md) for full details.
