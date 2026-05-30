import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { axiosPublic } from "../hooks/useAxios";
import useAxiosSecure from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

export default function ServiceDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    bookingDate: "",
    location: "",
    notes: "",
  });

  const { data: s, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => (await axiosPublic.get(`/services/${id}`)).data,
  });

  if (isLoading) return <Loading />;
  if (!s) return <div className="container-app py-10">Service not found</div>;

  const handleBook = () => {
    if (!user) {
      toast.error("Please login to book");
      return navigate("/login");
    }
    setOpen(true);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/bookings", {
        serviceId: s._id,
        bookingDate: form.bookingDate,
        location: form.location,
        notes: form.notes,
      });
      toast.success("Booking created!");
      setOpen(false);
      navigate("/dashboard/bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="container-app py-10 grid lg:grid-cols-2 gap-10">
      <img
        src={s.image}
        alt={s.service_name}
        className="rounded-2xl shadow-xl w-full h-[420px] object-cover"
      />
      <div>
        <span className="badge badge-primary capitalize">{s.category}</span>
        <h1 className="heading mt-2">{s.service_name}</h1>
        <p className="mt-3 text-neutral/70">{s.description}</p>
        <div className="mt-5 stats bg-base-200 shadow">
          <div className="stat">
            <div className="stat-title">Price</div>
            <div className="stat-value text-primary">
              ৳ {s.cost.toLocaleString()}
            </div>
            <div className="stat-desc">{s.unit}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Created By</div>
            <div className="stat-value text-base">{s.createdByEmail}</div>
          </div>
        </div>
        <button onClick={handleBook} className="btn btn-primary btn-lg mt-6">
          Book Now
        </button>
      </div>

      {open && (
        <dialog open className="modal modal-open">
          <div className="modal-box max-w-lg">
            <h3 className="font-display text-2xl mb-3 text-secondary">
              Book: {s.service_name}
            </h3>
            <form onSubmit={submit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  className="input input-bordered"
                  value={user?.displayName || ""}
                  readOnly
                />
                <input
                  className="input input-bordered"
                  value={user?.email || ""}
                  readOnly
                />
              </div>
              <input
                className="input input-bordered w-full"
                value={`৳ ${s.cost} ${s.unit}`}
                readOnly
              />
              <input
                type="datetime-local"
                required
                className="input input-bordered w-full"
                value={form.bookingDate}
                onChange={(e) =>
                  setForm({ ...form, bookingDate: e.target.value })
                }
              />
              <input
                required
                className="input input-bordered w-full"
                placeholder="Location / Venue address"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
              <textarea
                className="textarea textarea-bordered w-full"
                placeholder="Notes / special requests"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
