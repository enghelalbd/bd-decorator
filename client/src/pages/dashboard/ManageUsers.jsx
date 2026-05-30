import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

export default function ManageUsers() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();

  const { data = [], isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => (await axiosSecure.get("/decorators/users/all")).data,
  });

  const setRole = async (email, role) => {
    await axiosSecure.patch(`/decorators/role/${email}`, { role });
    toast.success(`Role set to ${role}`);
    qc.invalidateQueries({ queryKey: ["admin-users"] });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="font-display text-2xl text-secondary mb-4">
        Manage Users
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className="badge badge-outline capitalize">
                    {u.role}
                  </span>
                </td>
                <td className="flex gap-1">
                  {["user", "decorator", "admin"].map((r) => (
                    <button
                      key={r}
                      disabled={u.role === r}
                      className={`btn btn-xs ${u.role === r ? "" : "btn-outline"}`}
                      onClick={() => setRole(u.email, r)}
                    >
                      {r}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
