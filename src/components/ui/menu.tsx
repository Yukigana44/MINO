import { NavLink } from "react-router-dom";

export default function Menu() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-blue-600 font-bold"
      : "text-gray-500 hover:text-blue-500";

  return (
    <nav className="w-48 h-screen bg-gray-100 p-4 flex flex-col gap-4">
      <NavLink to="/" className={linkClass}>
        🏠 Accueil
      </NavLink>

      <NavLink to="/map" className={linkClass}>
        🗺️ Map
      </NavLink>
    </nav>
  );
}
