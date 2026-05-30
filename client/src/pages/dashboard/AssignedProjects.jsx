import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

const STATUSES = [
  "Assigned",
  "Planning Phase",
  "Materials Prepared",
  "On the Way to Venue",
  "Setup in Progress",
  "Completed",
];

export default function AssignedProjects() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["my-projects"],
    queryFn: async () =>
      (await axiosSecure.get("/bookings/assigned/mine")).data,
  });

  const updateStatus = async (id, projectStatus) => {
    await axiosSecure.patch(`/bookings/${id}/status`, { projectStatus });
    toast.success("Status updated");
    qc.invalidateQueries({ queryKey: ["my-projects"] });
  };

  if (isLoading) return <Loading />;

  const today = new Date().toDateString();
  const todayProjects = data.filter(
    (b) => new Date(b.bookingDate).toDateString() === today,
  );

  return (
    <div>
      <h2 className="font-display text-2xl text-secondary mb-4">
        My Assigned Projects
      </h2>

      <div className="mb-6 p-4 bg-base-200 rounded-xl">
        <h3 className="font-semibold mb-2">
          Today's Schedule ({todayProjects.length})
        </h3>
        {todayProjects.length === 0 ? (
          <p className="text-sm text-neutral/60">No projects today.</p>
        ) : (
          <ul className="space-y-1 text-sm">
            {todayProjects.map((b) => (
              <li key={b._id}>
                📍 {b.serviceSnapshot?.service_name} — {b.location}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {data.map((b) => (
          <div key={b._id} className="card bg-base-200 p-4">
            <div className="flex gap-3">
              <img
                src={b.serviceSnapshot?.image}
                alt=""
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">
                  {b.serviceSnapshot?.service_name}
                </h3>
                <p className="text-xs text-neutral/60">
                  {b.userName} · {b.location}
                </p>
                <p className="text-xs">
                  {new Date(b.bookingDate).toLocaleString()}
                </p>
                <span className="badge badge-primary mt-1">
                  {b.projectStatus}
                </span>
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs text-neutral/60">Update status:</label>
              <select
                className="select select-bordered select-sm w-full mt-1"
                value={b.projectStatus}
                onChange={(e) => updateStatus(b._id, e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
        {data.length === 0 && (
          <p className="text-neutral/60">No assigned projects yet.</p>
        )}
      </div>
    </div>
  );
}
