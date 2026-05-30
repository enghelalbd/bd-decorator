import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/coverage", label: "Coverage" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { role } = useRole();

  const nav = links.map((l) => (
    <li key={l.to}>
      <NavLink
        to={l.to}
        end={l.to === "/"}
        className={({ isActive }) =>
          isActive ? "text-primary font-semibold" : "hover:text-primary"
        }
      >
        {l.label}
      </NavLink>
    </li>
  ));

  return (
    <div className="bg-base-100/80 backdrop-blur sticky top-0 z-40 border-b border-base-300">
      <div className="navbar container-app mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {nav}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">✨</span>
            <span className="font-display text-xl font-bold text-secondary">
              Style<span className="text-primary">Decor</span>
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{nav}</ul>
        </div>
        <div className="navbar-end gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-sm btn-primary">
                Dashboard
              </Link>
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                    <img
                      src={
                        user.photoURL ||
                        `https://i.pravatar.cc/100?u=${user.email}`
                      }
                      alt="profile"
                    />
                  </div>
                </button>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-base-100 rounded-box w-56"
                >
                  <li className="menu-title">
                    <span className="truncate">
                      {user.displayName || user.email}
                    </span>
                    <span className="badge badge-outline badge-sm capitalize">
                      {role}
                    </span>
                  </li>
                  <li>
                    <Link to="/dashboard/profile">My Profile</Link>
                  </li>
                  {role === "user" && (
                    <li>
                      <Link to="/dashboard/bookings">My Bookings</Link>
                    </li>
                  )}
                  <li>
                    <button onClick={logout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-sm btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
