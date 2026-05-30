import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Services from "../pages/Services";
import ServiceDetails from "../pages/ServiceDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Coverage from "../pages/Coverage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Payment from "../pages/Payment";
import ErrorPage from "../pages/ErrorPage";

import MyProfile from "../pages/dashboard/MyProfile";
import MyBookings from "../pages/dashboard/MyBookings";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import ManageServices from "../pages/dashboard/ManageServices";
import ManageDecorators from "../pages/dashboard/ManageDecorators";
import ManageUsers from "../pages/dashboard/ManageUsers";
import ManageBookings from "../pages/dashboard/ManageBookings";
import Analytics from "../pages/dashboard/Analytics";
import AssignedProjects from "../pages/dashboard/AssignedProjects";
import Earnings from "../pages/dashboard/Earnings";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <ServiceDetails /> },
      { path: "coverage", element: <Coverage /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      {
        path: "payment/:bookingId",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          { index: true, element: <Navigate to="profile" replace /> },
          { path: "profile", element: <MyProfile /> },
          // user
          {
            path: "bookings",
            element: (
              <RoleRoute allow={["user", "admin"]}>
                <MyBookings />
              </RoleRoute>
            ),
          },
          {
            path: "payments",
            element: (
              <RoleRoute allow={["user", "admin"]}>
                <PaymentHistory />
              </RoleRoute>
            ),
          },
          // admin
          {
            path: "admin/services",
            element: (
              <RoleRoute allow={["admin"]}>
                <ManageServices />
              </RoleRoute>
            ),
          },
          {
            path: "admin/decorators",
            element: (
              <RoleRoute allow={["admin"]}>
                <ManageDecorators />
              </RoleRoute>
            ),
          },
          {
            path: "admin/users",
            element: (
              <RoleRoute allow={["admin"]}>
                <ManageUsers />
              </RoleRoute>
            ),
          },
          {
            path: "admin/bookings",
            element: (
              <RoleRoute allow={["admin"]}>
                <ManageBookings />
              </RoleRoute>
            ),
          },
          {
            path: "admin/analytics",
            element: (
              <RoleRoute allow={["admin"]}>
                <Analytics />
              </RoleRoute>
            ),
          },
          // decorator
          {
            path: "decorator/projects",
            element: (
              <RoleRoute allow={["decorator"]}>
                <AssignedProjects />
              </RoleRoute>
            ),
          },
          {
            path: "decorator/earnings",
            element: (
              <RoleRoute allow={["decorator"]}>
                <Earnings />
              </RoleRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
