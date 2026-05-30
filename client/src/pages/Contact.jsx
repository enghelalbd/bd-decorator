import toast from "react-hot-toast";

export default function Contact() {
  return (
    <div className="container-app py-10 grid lg:grid-cols-2 gap-10">
      <div>
        <h1 className="heading">Get in Touch</h1>
        <p className="subheading mt-2">
          Have questions, custom requests, or want to become a decorator? Drop
          us a message.
        </p>
        <ul className="mt-6 space-y-2 text-neutral/80">
          <li>
            <strong>Email:</strong> hello@styledecor.com
          </li>
          <li>
            <strong>Phone:</strong> +880 1711-000000
          </li>
          <li>
            <strong>Address:</strong> House 12, Road 4, Banani, Dhaka 1213
          </li>
          <li>
            <strong>Hours:</strong> Mon-Sun, 9 AM – 9 PM
          </li>
        </ul>
      </div>
      <form
        className="card bg-base-100 shadow border border-base-300 p-6 space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Message sent! We will get back to you shortly.");
          e.target.reset();
        }}
      >
        <input
          required
          className="input input-bordered w-full"
          placeholder="Your name"
        />
        <input
          required
          type="email"
          className="input input-bordered w-full"
          placeholder="Your email"
        />
        <input
          required
          className="input input-bordered w-full"
          placeholder="Subject"
        />
        <textarea
          required
          rows="5"
          className="textarea textarea-bordered w-full"
          placeholder="Message..."
        />
        <button className="btn btn-primary w-full">Send Message</button>
      </form>
    </div>
  );
}
