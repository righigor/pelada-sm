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
import CadastroCaixinhaPage from "@/pages/cadastro-caixinha-page";
import PremiacoesPage from "@/pages/premiacoes-page";
import AdminPremiacoes from "@/pages/admin-premiacoes";
import PremiacaoDetalhesPage from "@/pages/premiacao-detalhes-page";
import PagamentoAprovadoPage from "@/pages/pagamento-aprovado";
import { PortalTransparenciaPage } from "@/pages/portal-transparecia-page";
import { AdminCaixinhaPage } from "@/pages/admin-caixinha";
import { EstatisticasPage } from "@/pages/estatisticas-page";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <App /> },
      { path: "/jogadores", element: <AllJogadoresPage /> },
      { path: "/jogadores/:id", element: <DetalhesJogadorPage /> },
      
      { path: "/premiacoes", element: <PremiacoesPage /> },
      { path: "/premiacoes/:id", element: <PremiacaoDetalhesPage /> },
      { path: "/caixinha", element: <CadastroCaixinhaPage /> },
      { path: "/transparencia", element: <PortalTransparenciaPage /> },
      { path: "/estatisticas", element: <EstatisticasPage /> },
      
      { path: "/partidas", element: <AllPartidasPage /> },
      { path: "/partida/:partidaId", element: <DetalhesPartidaPage /> },
      { path: "/partida/selecionar-jogadores", element: <SelecionarJogadoresPage /> },
      { path: "/partida/registrar-stats/:partidaId", element: <RegistrarStatsPage /> },
      { path: "/partida/editar-times-sorteados/:partidaId", element: <EditarTimesSorteados /> },

      {path: "pagamento-aprovado", element: <PagamentoAprovadoPage />},

      { path: "/admin/jogador", element: <AddJogadoresPage /> },
      { path: "/admin/jogadores", element: <AdminAllJogadoresPage /> },
      { path: "/admin/partidas", element: <AdminAllPartidasPage /> },
      { path: "/admin/potes", element: <AdminRankingPage /> },
      { path: "/admin/premiacoes", element: <AdminPremiacoes /> },
      { path: "/admin/caixinha", element: <AdminCaixinhaPage /> },

      { path: "*", element: <NotFoundPage /> },
      { path: "/test", element: <AddPlayersManual /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
