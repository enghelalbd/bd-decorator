import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

export default function MyBookings() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [editing, setEditing] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["my-bookings", page, sortBy, order],
    queryFn: async () =>
      (
        await axiosSecure.get("/bookings/mine", {
          params: { page, sortBy, order, limit: 6 },
        })
      ).data,
  });

  const cancel = async (id) => {
    const res = await Swal.fire({
      title: "Cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel",
    });
    if (!res.isConfirmed) return;
    try {
      await axiosSecure.delete(`/bookings/${id}/mine`);
      toast.success("Cancelled");
      qc.invalidateQueries({ queryKey: ["my-bookings"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancel failed");
    }
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.patch(`/bookings/${editing._id}/mine`, {
        bookingDate: editing.bookingDate,
        location: editing.location,
        notes: editing.notes,
      });
      toast.success("Updated");
      setEditing(null);
      qc.invalidateQueries({ queryKey: ["my-bookings"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="font-display text-2xl text-secondary">My Bookings</h2>
        <div className="flex gap-2">
          <select
            className="select select-bordered select-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="createdAt">Sort: Created</option>
            <option value="bookingDate">Sort: Date</option>
            <option value="projectStatus">Sort: Status</option>
          </select>
          <select
            className="select select-bordered select-sm"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Date</th>
              <th>Location</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((b) => (
              <tr key={b._id}>
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      src={b.serviceSnapshot?.image}
                      alt=""
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <div className="font-semibold">
                        {b.serviceSnapshot?.service_name}
                      </div>
                      <div className="text-xs text-neutral/60">
                        ৳ {b.serviceSnapshot?.cost}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{new Date(b.bookingDate).toLocaleString()}</td>
                <td>{b.location}</td>
                <td>
                  <span
                    className={`badge ${b.paymentStatus === "paid" ? "badge-success" : "badge-warning"}`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>
                <td>
                  <span className="badge badge-outline">{b.projectStatus}</span>
                </td>
                <td className="flex gap-1 flex-wrap">
                  {b.paymentStatus === "unpaid" ? (
                    <>
                      <Link
                        to={`/payment/${b._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        Pay
                      </Link>
                      <button
                        onClick={() =>
                          setEditing({
                            ...b,
                            bookingDate: b.bookingDate.slice(0, 16),
                          })
                        }
                        className="btn btn-xs btn-outline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => cancel(b._id)}
                        className="btn btn-xs btn-error"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span className="text-xs text-neutral/60">
                      Paid · Locked
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.pages > 1 && (
        <div className="join mt-6 flex justify-center">
          {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`join-item btn btn-sm ${page === p ? "btn-primary" : ""}`}
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {editing && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display text-xl mb-3">Edit Booking</h3>
            <form onSubmit={submitEdit} className="space-y-3">
              <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={editing.bookingDate}
                onChange={(e) =>
                  setEditing({ ...editing, bookingDate: e.target.value })
                }
              />
              <input
                className="input input-bordered w-full"
                value={editing.location}
                onChange={(e) =>
                  setEditing({ ...editing, location: e.target.value })
                }
              />
              <textarea
                className="textarea textarea-bordered w-full"
                value={editing.notes || ""}
                onChange={(e) =>
                  setEditing({ ...editing, notes: e.target.value })
                }
              />
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setEditing(null)}
                >
                  Close
                </button>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
}
