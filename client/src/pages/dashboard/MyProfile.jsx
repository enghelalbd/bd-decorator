import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

export default function MyProfile() {
  const { user } = useAuth();
  const { role, status } = useRole();
  return (
    <div className="max-w-xl">
      <h2 className="font-display text-2xl text-secondary mb-4">My Profile</h2>
      <div className="card bg-base-200 p-6 flex flex-col items-center text-center">
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={
                user?.photoURL || `https://i.pravatar.cc/200?u=${user?.email}`
              }
              alt={user?.displayName}
            />
          </div>
        </div>
        <h3 className="font-display text-xl mt-3">{user?.displayName}</h3>
        <p className="text-neutral/70">{user?.email}</p>
        <div className="flex gap-2 mt-2">
          <span className="badge badge-primary capitalize">{role}</span>
          <span className="badge badge-outline capitalize">
            {status || "active"}
          </span>
        </div>
      </div>
    </div>
  );
}
