import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md border border-base-300">
        <div className="card-body">
          <h1 className="font-display text-3xl text-secondary text-center">
            Welcome back
          </h1>
          <p className="text-center text-neutral/60 text-sm">
            Login to your StyleDecor account
          </p>
          <form onSubmit={onSubmit} className="space-y-3 mt-4">
            <input
              required
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              required
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <div className="divider">OR</div>
          <button onClick={onGoogle} className="btn btn-outline w-full">
            <FaGoogle /> Continue with Google
          </button>
          <p className="text-center text-sm mt-4">
            No account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
