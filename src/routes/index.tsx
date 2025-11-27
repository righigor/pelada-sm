import App from "@/App";
import AppLayout from "@/layouts/app-layout";
import AddJogadoresPage from "@/pages/add-jogadores";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/admin/jogadores", element: <AddJogadoresPage /> },
    ],
  }
])

export function AppRouter() {
  return <RouterProvider router={router} />
}