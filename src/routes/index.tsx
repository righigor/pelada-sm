import App from "@/App";
import AppLayout from "@/layouts/app-layout";
import AddJogadoresPage from "@/pages/add-jogadores";
import AllJogadoresPage from "@/pages/all-jogadores";
import AllPartidasPage from "@/pages/all-partidas";
import RegistrarStatsPage from "@/pages/registrar-stats";
import SelecionarJogadoresPage from "@/pages/selecionar-jogadores";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/jogadores", element: <AllJogadoresPage /> },
      { path: "/partidas", element: <AllPartidasPage /> },
      { path: "/partida/selecionar-jogadores", element: <SelecionarJogadoresPage /> },
      { path: "/partida/registrar-stats", element: <RegistrarStatsPage /> },
      { path: "/admin/jogadores", element: <AddJogadoresPage /> },
    ],
  }
])

export function AppRouter() {
  return <RouterProvider router={router} />
}