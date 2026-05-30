import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxios";
import Loading from "../../components/Loading";

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { data = [], isLoading } = useQuery({
    queryKey: ["my-payments"],
    queryFn: async () => (await axiosSecure.get("/payments/mine")).data,
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="font-display text-2xl text-secondary mb-4">
        Payment History
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p._id}>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td>{p.booking?.serviceSnapshot?.service_name}</td>
                <td className="font-semibold text-primary">৳ {p.amount}</td>
                <td className="font-mono text-xs">{p.transactionId}</td>
                <td>
                  <span className="badge badge-success">{p.status}</span>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-neutral/60 py-8">
                  No payments yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
