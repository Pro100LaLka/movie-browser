import { Outlet } from "react-router";
import { Header } from "./Header/Header";
import BackToTopBtn from "./BackToTopBtn";

export function Layout() {
  return (
    <div className="bg-background relative isolate min-h-dvh">
      <BackToTopBtn />

      <Header />

      <main className="px-15">
        <Outlet />
      </main>
    </div>
  );
}
