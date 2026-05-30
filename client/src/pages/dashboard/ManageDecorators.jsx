import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

export default function ManageDecorators() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-decorators", page, search],
    queryFn: async () =>
      (
        await axiosSecure.get("/decorators", {
          params: { page, limit: 6, search },
        })
      ).data,
  });

  const toggleStatus = async (d) => {
    const status = d.status === "active" ? "disabled" : "active";
    await axiosSecure.patch(`/decorators/${d._id}/status`, { status });
    toast.success(`Decorator ${status}`);
    qc.invalidateQueries({ queryKey: ["admin-decorators"] });
  };

  const remove = async (id) => {
    const res = await Swal.fire({
      title: "Delete decorator?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!res.isConfirmed) return;
    await axiosSecure.delete(`/decorators/${id}`);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-decorators"] });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="font-display text-2xl text-secondary">
          Manage Decorators
        </h2>
        <input
          className="input input-bordered input-sm"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.items?.map((d) => (
              <div key={d._id} className="card bg-base-200 p-4">
                <div className="flex gap-3">
                  <img
                    src={d.photoURL || `https://i.pravatar.cc/100?u=${d.email}`}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{d.name}</h3>
                    <p className="text-xs text-neutral/60">{d.email}</p>
                    <span
                      className={`badge badge-sm ${d.status === "active" ? "badge-success" : "badge-error"}`}
                    >
                      {d.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1 mt-3">
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => toggleStatus(d)}
                  >
                    {d.status === "active" ? "Disable" : "Approve"}
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => remove(d._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
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
        </>
      )}
    </div>
  );
}
