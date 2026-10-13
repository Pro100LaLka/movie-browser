import { NavLink } from "react-router";
import clsx from "clsx";

export function HeaderNavLink({ path, text }: { path: string; text: string }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        clsx(
          "group flex flex-col items-center gap-2 pt-2 transition-colors duration-200 select-none focus:outline-none",
          isActive
            ? "text-primary"
            : "text-foreground hover:text-primary-hover",
        )
      }
    >
      <span className="group-focus-visible:outline-primary rounded-xs group-focus-visible:outline-2 group-focus-visible:outline-offset-6">
        {text}
      </span>
      <span
        className={`group-hover:bg-primary-hover bg-foreground group-aria-[current=page]:bg-primary inline-block h-0.5 w-9/10 origin-center scale-x-0 transition-transform duration-500 group-hover:scale-x-100 group-aria-[current=page]:scale-x-100`}
      ></span>
    </NavLink>
  );
}
