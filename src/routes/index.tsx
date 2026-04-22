import App from "@/App";
import NotFoundPage from "@/components/not-found";
import AppLayout from "@/layouts/app-layout";
import AddJogadoresPage from "@/pages/add-jogadores";
import AdminAllJogadoresPage from "@/pages/admin-all-jogadores";
import AdminAllPartidasPage from "@/pages/admin-all-partidas";
import AdminRankingPage from "@/pages/admin-ranking-potes";
import AllJogadoresPage from "@/pages/all-jogadores";
import AllPartidasPage from "@/pages/all-partidas";
import DetalhesJogadorPage from "@/pages/detalhes-jogador";
import DetalhesPartidaPage from "@/pages/detalhes-partida";
import EditarTimesSorteados from "@/pages/editar-times-sorteados";
import RegistrarStatsPage from "@/pages/registrar-stats";
import SelecionarJogadoresPage from "@/pages/selecionar-jogadores";
import { AddPlayersManual } from "@/pages/teseadd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/jogadores", element: <AllJogadoresPage /> },
      { path: "/admin/jogadores", element: <AdminAllJogadoresPage /> },
      { path: "/jogadores/:id", element: <DetalhesJogadorPage /> },
      { path: "/partidas", element: <AllPartidasPage /> },
      { path: "/admin/partidas", element: <AdminAllPartidasPage /> },
      { path: "/partida/:partidaId", element: <DetalhesPartidaPage /> },
      {
        path: "/partida/selecionar-jogadores",
        element: <SelecionarJogadoresPage />,
      },
      {
        path: "/partida/registrar-stats/:partidaId",
        element: <RegistrarStatsPage />,
      },
      {
        path: "/partida/editar-times-sorteados/:partidaId",
        element: <EditarTimesSorteados />,
      },
      { path: "/admin/jogador", element: <AddJogadoresPage /> },
      { path: "/admin/potes", element: <AdminRankingPage /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "/test", element: <AddPlayersManual /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
