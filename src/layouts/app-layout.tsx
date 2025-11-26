import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>header page</header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
        <Toaster />
      </main>
      <footer>footer page</footer>
    </div>
  )
}