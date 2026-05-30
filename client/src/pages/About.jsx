export default function About() {
  return (
    <div className="container-app py-10 prose max-w-3xl">
      <h1 className="heading">About StyleDecor</h1>
      <p>
        StyleDecor is a modern appointment management system for local
        decoration companies. We connect customers with vetted decorators for
        home makeovers, weddings, ceremonies, corporate events, birthdays,
        anniversaries and more.
      </p>
      <h3>Our Mission</h3>
      <p>
        To eliminate walk-in chaos and bring transparent, on-time, beautifully
        crafted decoration experiences to every customer — with real-time
        project tracking, secure payments and expert decorators.
      </p>
      <h3>What we offer</h3>
      <ul>
        <li>
          Smart appointment scheduling for consultations and on-site services
        </li>
        <li>Decorator availability & specialty management</li>
        <li>On-site service coordination workflow with live status updates</li>
        <li>Integrated Stripe-based payments and digital receipts</li>
        <li>Powerful admin dashboard & analytics</li>
      </ul>
    </div>
  );
}
