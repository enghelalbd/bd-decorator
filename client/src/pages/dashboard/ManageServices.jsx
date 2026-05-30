import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

const empty = {
  service_name: "",
  cost: "",
  unit: "per event",
  category: "home",
  description: "",
  image: "",
};

const categories = [
  "home",
  "wedding",
  "office",
  "seminar",
  "meeting",
  "birthday",
  "anniversary",
];

export default function ManageServices() {
  const axiosSecure = useAxiosSecure();
  const qc = useQueryClient();
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () =>
      (await axiosSecure.get("/services", { params: { limit: 100 } })).data,
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, cost: Number(form.cost) };
      if (editingId) {
        await axiosSecure.put(`/services/${editingId}`, payload);
        toast.success("Updated");
      } else {
        await axiosSecure.post("/services", payload);
        toast.success("Created");
      }
      setForm(empty);
      setEditingId(null);
      qc.invalidateQueries({ queryKey: ["admin-services"] });
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    }
  };

  const edit = (s) => {
    setEditingId(s._id);
    setForm({
      service_name: s.service_name,
      cost: s.cost,
      unit: s.unit,
      category: s.category,
      description: s.description,
      image: s.image,
    });
  };

  const remove = async (id) => {
    const res = await Swal.fire({
      title: "Delete service?",
      icon: "warning",
      showCancelButton: true,
    });
    if (!res.isConfirmed) return;
    await axiosSecure.delete(`/services/${id}`);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["admin-services"] });
  };

  return (
    <div>
      <h2 className="font-display text-2xl text-secondary mb-4">
        Manage Services
      </h2>
      <form
        onSubmit={submit}
        className="grid sm:grid-cols-2 gap-3 mb-6 p-4 bg-base-200 rounded-xl"
      >
        <input
          required
          className="input input-bordered"
          placeholder="Service name"
          value={form.service_name}
          onChange={(e) => setForm({ ...form, service_name: e.target.value })}
        />
        <input
          required
          type="number"
          className="input input-bordered"
          placeholder="Cost (BDT)"
          value={form.cost}
          onChange={(e) => setForm({ ...form, cost: e.target.value })}
        />
        <input
          required
          className="input input-bordered"
          placeholder="Unit (per sqft, per event...)"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
        />
        <select
          className="select select-bordered"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <input
          className="input input-bordered sm:col-span-2"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <textarea
          required
          className="textarea textarea-bordered sm:col-span-2"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <div className="sm:col-span-2 flex gap-2">
          <button className="btn btn-primary">
            {editingId ? "Update" : "Create"} Service
          </button>
          {editingId && (
            <button
              type="button"
              className="btn"
              onClick={() => {
                setForm(empty);
                setEditingId(null);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Cost</th>
                <th>Unit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.items?.map((s) => (
                <tr key={s._id}>
                  <td>{s.service_name}</td>
                  <td>
                    <span className="badge badge-outline capitalize">
                      {s.category}
                    </span>
                  </td>
                  <td>৳ {s.cost}</td>
                  <td>{s.unit}</td>
                  <td className="flex gap-1">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => edit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => remove(s._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
