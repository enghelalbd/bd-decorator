# StyleDecor — Client

Frontend for the **StyleDecor** Smart Home & Ceremony Decoration Booking System.

## Live URL

- **Client:** https://styledecor.example.com _(add after deploy)_
- **Server:** https://styledecor-api.example.com _(add after deploy)_

## Key Features

- 🔐 Firebase email/password + Google login, JWT-protected backend
- 🧑‍🎨 Role-based dashboards: **User**, **Admin**, **Decorator**
- 🛍️ Browse decoration services with **search**, **category filter**, **budget range**, **sort**, **pagination**
- 📑 Service Details page with **Book Now modal**
- 💳 **Stripe** payment integration (with demo fallback) + receipts in Payment History
- 📊 Admin analytics: revenue, paid bookings, service demand histogram (Recharts)
- 🗺️ **React Leaflet** Service Coverage Map on Home + dedicated page
- 🎬 Framer Motion animated hero section with "Book Decoration Service" CTA
- 🧰 Admin: CRUD for services, manage decorators (approve/disable), assign decorators to paid bookings, change user roles
- 👷 Decorator: View assigned projects, today's schedule, step-by-step status updates, earnings summary
- 📱 Fully responsive DaisyUI design with custom `styledecor` theme
- 🔔 Toast (react-hot-toast) + SweetAlert2 confirmations
- ⏳ Global loaders & route error page

## Quick Start

```bash
cd client
npm install
npm run dev   # http://localhost:5173
```

Ensure the server is running on `http://localhost:5000` (or update `VITE_API_URL`).

## Environment Variables (`.env`)

| Key                           | Purpose                                             |
| ----------------------------- | --------------------------------------------------- |
| `VITE_API_URL`                | Backend base URL (e.g. `http://localhost:5000/api`) |
| `VITE_FIREBASE_*`             | Firebase config keys                                |
| `VITE_IMGBB_API_KEY`          | ImgBB key for profile image upload (optional)       |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (`pk_test_…`)                |

## NPM Packages

**Runtime:** react, react-dom, react-router-dom, @tanstack/react-query, axios, firebase, framer-motion, react-leaflet, leaflet, react-hot-toast, sweetalert2, react-icons, recharts, @stripe/stripe-js, @stripe/react-stripe-js

**Dev:** vite, @vitejs/plugin-react, tailwindcss, daisyui, postcss, autoprefixer

## Folder Structure

```
src/
├── components/       Navbar, Footer, Loading, ServiceCard, DecoratorCard
├── context/          AuthContext (Firebase)
├── firebase/         Firebase config
├── hooks/            useAuth, useAxios (secure + public), useRole
├── layouts/          RootLayout, DashboardLayout
├── pages/            Home, Services, ServiceDetails, Login, Register, Payment,
│                     About, Contact, Coverage, ErrorPage
│   └── dashboard/    MyProfile, MyBookings, PaymentHistory,
│                     ManageServices, ManageDecorators, ManageUsers,
│                     ManageBookings, Analytics,
│                     AssignedProjects, Earnings
├── routes/           router.jsx, PrivateRoute, RoleRoute
├── index.css
└── main.jsx
```

## Demo Accounts (after running `npm run seed` on the server)

Register each of these emails through the Register page (set any password you like — role is already set in the DB):

| Role      | Email                                                     |
| --------- | --------------------------------------------------------- |
| Admin     | `admin@styledecor.com`                                    |
| Decorator | `decorator1@styledecor.com` … `decorator4@styledecor.com` |
| User      | `user@styledecor.com`                                     |

## Build

```bash
npm run build
npm run preview
```
