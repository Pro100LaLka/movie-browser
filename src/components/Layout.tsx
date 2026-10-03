import { Outlet } from "react-router";
import { Header } from "./Header/Header";

export function Layout() {
  return (
    <div className="bg-background relative isolate min-h-dvh">
      {/* will probably have to move in the homepage component */}

      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
