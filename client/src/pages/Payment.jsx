import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxios";
import Loading from "../components/Loading";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_dummy",
);

function CheckoutForm({ bookingId, clientSecret, demo, amount }) {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let paymentIntentId = "demo_intent";
      let transactionId = `TXN-${Date.now()}`;

      if (!demo && stripe && elements) {
        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: { card: elements.getElement(CardElement) },
        });
        if (result.error) throw new Error(result.error.message);
        paymentIntentId = result.paymentIntent.id;
        transactionId = result.paymentIntent.id;
      }

      await axiosSecure.post("/payments/confirm", {
        bookingId,
        paymentIntentId,
        transactionId,
      });
      toast.success("Payment successful!");
      navigate("/dashboard/payments");
    } catch (err) {
      toast.error(err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-3 rounded border border-base-300 bg-base-100">
        {demo ? (
          <p className="text-sm text-neutral/70">
            Stripe is in <strong>demo mode</strong> (no publishable key
            configured). Click "Pay Now" to simulate a successful payment.
          </p>
        ) : (
          <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
        )}
      </div>
      <button
        disabled={loading || (!demo && !stripe)}
        className="btn btn-primary w-full"
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          `Pay ৳ ${(amount / 100).toLocaleString()}`
        )}
      </button>
    </form>
  );
}

export default function Payment() {
  const { bookingId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [intent, setIntent] = useState(null);

  useEffect(() => {
    axiosSecure
      .post("/payments/create-intent", { bookingId })
      .then((r) => setIntent(r.data));
  }, [bookingId, axiosSecure]);

  if (!intent) return <Loading />;

  return (
    <div className="container-app py-10 max-w-lg">
      <h1 className="heading mb-2">Secure Payment</h1>
      <p className="subheading mb-6">Complete your booking payment below.</p>
      <div className="card bg-base-100 shadow border border-base-300 p-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            bookingId={bookingId}
            clientSecret={intent.clientSecret}
            demo={intent.demo}
            amount={intent.amount}
          />
        </Elements>
      </div>
    </div>
  );
}
