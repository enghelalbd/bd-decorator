import { Link } from "react-router-dom";

export default function ServiceCard({ s }) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow border border-base-300">
      <figure className="h-48 overflow-hidden">
        <img
          src={
            s.image ||
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=900"
          }
          alt={s.service_name}
          className="w-full h-full object-cover hover:scale-105 transition-transform"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-start justify-between gap-2">
          <h3 className="card-title text-secondary font-display">
            {s.service_name}
          </h3>
          <span className="badge badge-primary capitalize">{s.category}</span>
        </div>
        <p className="text-sm text-neutral/70 line-clamp-2">{s.description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-primary font-bold">
            ৳ {s.cost.toLocaleString()}{" "}
            <span className="text-xs text-neutral/60 font-normal">
              / {s.unit}
            </span>
          </span>
          <Link to={`/services/${s._id}`} className="btn btn-sm btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
