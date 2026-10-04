import { Outlet } from "react-router";
import { Header } from "./Header/Header";

export function Layout() {
  return (
    <div className="bg-background relative isolate min-h-dvh px-15">
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
