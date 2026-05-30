import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

export default function ManageBookings() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [assigning, setAssigning] = useState(null);
  const [decoratorEmail, setDecoratorEmail] = useState("");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => (await axiosSecure.get("/bookings")).data,
  });

  const { data: decorators = [] } = useQuery({
    queryKey: ["active-decorators-all"],
    queryFn: async () =>
      (await axiosSecure.get("/decorators", { params: { limit: 100 } })).data
        ?.items || [],
  });

  const assign = async () => {
    try {
      await axiosSecure.patch(`/bookings/${assigning._id}/assign`, {
        decoratorEmail,
      });
      toast.success("Decorator assigned");
      setAssigning(null);
      setDecoratorEmail("");
      qc.invalidateQueries({ queryKey: ["admin-bookings"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Assign failed");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="font-display text-2xl text-secondary mb-4">
        Manage Bookings
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Date</th>
              <th>Payment</th>
              <th>Decorator</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>
                  {b.userName}
                  <br />
                  <span className="text-xs text-neutral/60">{b.userEmail}</span>
                </td>
                <td>{b.serviceSnapshot?.service_name}</td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${b.paymentStatus === "paid" ? "badge-success" : "badge-warning"}`}
                  >
                    {b.paymentStatus}
                  </span>
                </td>
                <td>
                  {b.assignedDecoratorName || (
                    <span className="text-xs text-neutral/50">—</span>
                  )}
                </td>
                <td>
                  <span className="badge badge-outline">{b.projectStatus}</span>
                </td>
                <td>
                  <button
                    disabled={b.paymentStatus !== "paid"}
                    className="btn btn-xs btn-primary"
                    onClick={() => setAssigning(b)}
                    title={
                      b.paymentStatus !== "paid" ? "Booking must be paid" : ""
                    }
                  >
                    {b.assignedDecoratorEmail ? "Reassign" : "Assign"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {assigning && (
        <dialog open className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-display text-xl mb-3">Assign Decorator</h3>
            <select
              className="select select-bordered w-full"
              value={decoratorEmail}
              onChange={(e) => setDecoratorEmail(e.target.value)}
            >
              <option value="">Select a decorator</option>
              {decorators
                .filter((d) => d.status === "active")
                .map((d) => (
                  <option key={d._id} value={d.email}>
                    {d.name} ({d.email})
                  </option>
                ))}
            </select>
            <div className="modal-action">
              <button className="btn" onClick={() => setAssigning(null)}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={assign}
                disabled={!decoratorEmail}
              >
                Assign
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
