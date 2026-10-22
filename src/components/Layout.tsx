import { Outlet } from "react-router";
import { Header } from "./Header/Header";

export function Layout() {
  return (
    <div className="bg-background relative isolate min-h-dvh">
      <Header />

      <main className="px-15">
        <Outlet />
      </main>
    </div>
  );
}
