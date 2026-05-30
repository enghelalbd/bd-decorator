import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

export default function Earnings() {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["decorator-earnings"],
    queryFn: async () =>
      (await axiosSecure.get("/payments/decorator/earnings")).data,
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="font-display text-2xl text-secondary mb-4">
        Earnings Summary
      </h2>
      <div className="stat bg-base-200 rounded-xl mb-4">
        <div className="stat-title">Total Earnings (Paid Bookings)</div>
        <div className="stat-value text-primary">
          ৳ {data?.total?.toLocaleString() || 0}
        </div>
        <div className="stat-desc">{data?.bookings?.length || 0} projects</div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.bookings?.map((b) => (
              <tr key={b._id}>
                <td>{b.serviceSnapshot?.service_name}</td>
                <td>{b.userName}</td>
                <td>{new Date(b.bookingDate).toLocaleDateString()}</td>
                <td className="font-semibold text-primary">৳ {b.amountPaid}</td>
                <td>
                  <span className="badge badge-outline">{b.projectStatus}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
