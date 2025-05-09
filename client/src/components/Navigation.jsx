// ====================== components/Navigation.jsx ======================
import { NavLink } from "react-router-dom";
import { BookOpenIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  const navItem = (
    path,
    label,
    Icon
  ) => (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-100 transition ${
          isActive ? "bg-indigo-200 font-semibold" : ""
        }`
      }
    >
      <Icon className="w-5 h-5" />
      {label}
    </NavLink>
  );

  return (
    <aside className="md:w-52 bg-white border-r shadow-sm p-4 flex md:flex-col gap-2 items-center md:items-stretch">
      {navItem("/students", "Students", BookOpenIcon)}
      {navItem("/chat", "Chat", ChatBubbleBottomCenterTextIcon)}
    </aside>
  );
}