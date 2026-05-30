import { Link, NavLink, Outlet } from "react-router-dom";
import {
  FaUser,
  FaCalendarAlt,
  FaMoneyBill,
  FaUsers,
  FaCogs,
  FaChartBar,
  FaTasks,
  FaHome,
} from "react-icons/fa";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"}`;

export default function DashboardLayout() {
  const { role, isLoading } = useRole();
  if (isLoading) return <Loading />;

  return (
    <div className="container-app py-6 grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="bg-base-100 border border-base-300 rounded-2xl p-4 h-fit lg:sticky lg:top-20">
        <div className="px-3 py-2 mb-2">
          <h2 className="font-display text-lg font-bold text-secondary">
            Dashboard
          </h2>
          <span className="badge badge-primary capitalize">{role}</span>
        </div>
        <ul className="menu w-full p-0 gap-1">
          <li>
            <NavLink to="/dashboard/profile" className={linkClass}>
              <FaUser /> My Profile
            </NavLink>
          </li>

          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/bookings" className={linkClass}>
                  <FaCalendarAlt /> My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/payments" className={linkClass}>
                  <FaMoneyBill /> Payment History
                </NavLink>
              </li>
            </>
          )}

          {role === "admin" && (
            <>
              <li>
                <NavLink to="/dashboard/admin/services" className={linkClass}>
                  <FaCogs /> Manage Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/decorators" className={linkClass}>
                  <FaUsers /> Manage Decorators
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/users" className={linkClass}>
                  <FaUser /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/bookings" className={linkClass}>
                  <FaCalendarAlt /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/admin/analytics" className={linkClass}>
                  <FaChartBar /> Analytics
                </NavLink>
              </li>
            </>
          )}

          {role === "decorator" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/decorator/projects"
                  className={linkClass}
                >
                  <FaTasks /> Assigned Projects
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/decorator/earnings"
                  className={linkClass}
                >
                  <FaMoneyBill /> Earnings
                </NavLink>
              </li>
            </>
          )}
          <div className="divider my-1"></div>
          <li>
            <Link to="/" className={linkClass({ isActive: false })}>
              <FaHome /> Back to Home
            </Link>
          </li>
        </ul>
      </aside>
      <section className="bg-base-100 border border-base-300 rounded-2xl p-5 min-h-[60vh]">
        <Outlet />
      </section>
    </div>
  );
}
