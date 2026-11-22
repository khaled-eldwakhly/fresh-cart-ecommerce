import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProfileHeader({
  name,
  email,
}: {
  name: string | undefined;
  email: string | undefined;
}) {
  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-4 rounded-xl bg-linear-to-r from-emerald-500 to-primary-500/90 p-8 text-white shadow-lg sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 text-3xl font-bold backdrop-blur">
          {name?.charAt(0).toUpperCase()}
        </div>
        <div className="text-center sm:text-start">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-white/80">{email}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium sm:ml-auto">
          <FontAwesomeIcon icon={faShieldHalved} />
          <span>Your account is protected</span>
        </div>
      </div>
    </>
  );
}
