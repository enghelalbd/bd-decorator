import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

export default function Analytics() {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await axiosSecure.get("/payments/admin/stats")).data,
  });

  if (isLoading) return <Loading />;
  const chartData = (data?.byCategory || []).map((c) => ({
    category: c._id || "other",
    count: c.count,
  }));

  return (
    <div>
      <h2 className="font-display text-2xl text-secondary mb-4">
        Analytics & Revenue
      </h2>
      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value text-primary">
            ৳ {data?.revenue?.toLocaleString() || 0}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">Total Bookings</div>
          <div className="stat-value">{data?.totalBookings || 0}</div>
        </div>
        <div className="stat bg-base-200 rounded-xl">
          <div className="stat-title">Paid Bookings</div>
          <div className="stat-value text-success">
            {data?.paidBookings || 0}
          </div>
        </div>
      </div>

      <div className="bg-base-200 rounded-xl p-4">
        <h3 className="font-semibold mb-3">Service Demand by Category</h3>
        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#b8860b" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
