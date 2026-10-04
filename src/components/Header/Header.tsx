import { Link } from "react-router";
import { HeaderNavLink } from "./HeaderNavLink";

export function Header() {
  return (
    <header className="flex gap-25 py-7">
      <div>
        <Link to="/">
          <span className="text-foreground text-3xl font-medium tracking-[0.2em]">
            UNTITLED
          </span>
        </Link>
      </div>

      <nav className="flex items-center gap-15">
        <HeaderNavLink path={"/"} text={"Discover"} />
        <HeaderNavLink path={"/movies"} text={"Movies"} />
        <HeaderNavLink path={"/tv"} text={"TV Shows"} />
        <HeaderNavLink path={"/watchlist"} text={"Watchlist"} />
      </nav>
    </header>
  );
}
