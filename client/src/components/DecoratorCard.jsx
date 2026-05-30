import { FaStar } from "react-icons/fa";

export default function DecoratorCard({ d }) {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body items-center text-center">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={d.photoURL || `https://i.pravatar.cc/200?u=${d.email}`}
              alt={d.name}
            />
          </div>
        </div>
        <h3 className="font-display text-xl font-semibold mt-2">{d.name}</h3>
        <div className="flex items-center gap-1 text-warning">
          <FaStar />{" "}
          <span className="font-semibold text-neutral">
            {d.rating?.toFixed(1) || "4.5"}
          </span>
          <span className="text-xs text-neutral/60">
            · {d.experienceYears || 0} yrs
          </span>
        </div>
        <p className="text-sm text-neutral/70 line-clamp-2">
          {d.bio || "Decoration specialist"}
        </p>
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {(d.specialties || []).slice(0, 3).map((s) => (
            <span key={s} className="badge badge-outline badge-sm">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
