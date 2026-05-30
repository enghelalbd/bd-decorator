import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const IMGBB_KEY = import.meta.env.VITE_IMGBB_API_KEY;

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!file) return "";
    if (!IMGBB_KEY || IMGBB_KEY.includes("replace_with")) return ""; // skip if not configured
    const fd = new FormData();
    fd.append("image", file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`,
      fd,
    );
    return data?.data?.display_url || "";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      const photoURL = await uploadImage();
      await register(form.name, form.email, form.password, photoURL);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
      <div className="card bg-base-100 shadow-2xl w-full max-w-md border border-base-300">
        <div className="card-body">
          <h1 className="font-display text-3xl text-secondary text-center">
            Create Account
          </h1>
          <form onSubmit={onSubmit} className="space-y-3 mt-4">
            <input
              required
              placeholder="Full name"
              className="input input-bordered w-full"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
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
              placeholder="Password (min 6)"
              className="input input-bordered w-full"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
            <button disabled={loading} className="btn btn-primary w-full">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
