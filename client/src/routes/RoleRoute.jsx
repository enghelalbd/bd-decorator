import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading";

export default function RoleRoute({ children, allow = [] }) {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();
  if (loading || isLoading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (!allow.includes(role)) return <Navigate to="/dashboard" replace />;
  return children;
}
