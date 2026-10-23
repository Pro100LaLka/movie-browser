import { Link } from "react-router";
import { HeaderNavLink } from "./HeaderNavLink";
import useScrolled from "../../hooks/useScrolled";
import clsx from "clsx";
import Search from "./Search";

export function Header() {
  const scrolled = useScrolled();

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 flex justify-between gap-15 px-15 py-7 transition duration-300",
        scrolled
          ? "bg-background/70 border-b border-white/10 backdrop-blur-lg backdrop-saturate-150"
          : "",
      )}
    >
      <div className="flex items-center gap-25">
        <Link
          to="/"
          className="focus-visible:outline-primary flex items-center justify-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-3"
        >
          <span className="text-foreground text-3xl font-medium tracking-[0.2em]">
            UNTITLED
          </span>
        </Link>
        <nav className="flex items-center gap-15">
          <HeaderNavLink path={"/"} text={"Discover"} />
          <HeaderNavLink path={"/movies"} text={"Movies"} />
          <HeaderNavLink path={"/tv"} text={"TV Shows"} />
          <HeaderNavLink path={"/watchlist"} text={"Watchlist"} />
        </nav>
      </div>

      <Search />
    </header>
  );
}
