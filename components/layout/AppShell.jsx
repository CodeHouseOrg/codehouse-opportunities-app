import { Footer } from "./Footer";
import { Nav } from "./Nav";

export function AppShell({ children }) {
  return (
    <div className="relative w-full min-h-screen">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
