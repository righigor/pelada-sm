import App from "@/App";
import NotFoundPage from "@/components/not-found";
import AppLayout from "@/layouts/app-layout";
import AddJogadoresPage from "@/pages/add-jogadores";
import AdminAllJogadoresPage from "@/pages/admin-all-jogadores";
import AdminAllPartidasPage from "@/pages/admin-all-partidas";
import AllJogadoresPage from "@/pages/all-jogadores";
import AllPartidasPage from "@/pages/all-partidas";
import DetalhesPartidaPage from "@/pages/detalhes-partida";
import RegistrarStatsPage from "@/pages/registrar-stats";
import SelecionarJogadoresPage from "@/pages/selecionar-jogadores";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/jogadores", element: <AllJogadoresPage /> },
      {path: "/admin/jogadores", element: <AdminAllJogadoresPage /> },
      { path: "/partidas", element: <AllPartidasPage /> },
      {path: "/admin/partidas", element: <AdminAllPartidasPage /> },
      { path: "/partida/:partidaId", element: <DetalhesPartidaPage /> },
      { path: "/partida/selecionar-jogadores", element: <SelecionarJogadoresPage /> },
      { path: "/partida/registrar-stats", element: <RegistrarStatsPage /> },
      { path: "/admin/jogadores", element: <AddJogadoresPage /> },
      { path: "*", element: <NotFoundPage /> }
    ],
  }
])

export function AppRouter() {
  return <RouterProvider router={router} />
}