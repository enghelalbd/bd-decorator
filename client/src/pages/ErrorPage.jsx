import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-6">
      <div className="text-center max-w-lg">
        <h1 className="font-display text-7xl text-primary font-bold">404</h1>
        <p className="text-xl mt-2 text-secondary">
          Oh no, this page got lost in the décor.
        </p>
        <p className="text-neutral/60 mt-2">
          {error?.statusText || error?.message || "Page not found"}
        </p>
        <Link to="/" className="btn btn-primary mt-6">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
