import { Link } from "react-router";
import { HeaderNavLink } from "./HeaderNavLink";

export function Header() {
  return (
    <header className="flex gap-25 pt-7 pb-4">
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
    </header>
  );
}
