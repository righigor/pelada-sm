import { Search, User } from "lucide-react";
import { Button } from "./ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";
import { useState } from "react";
import type { EtapaCadastro } from "@/pages/cadastro-caixinha-page";

interface IdentificacaoCaixinhaProps {
  jogadores: JogadorNewResponseType[];
  setJogadorSelecionado: (jogador: JogadorNewResponseType | null) => void;
  jogadorSelecionado: JogadorNewResponseType | null;
  setEtapa: (etapa: EtapaCadastro) => void;
}

export default function IdentificaoCaixinha({
  jogadores,
  setJogadorSelecionado,
  jogadorSelecionado,
  setEtapa,
}: IdentificacaoCaixinhaProps) {
  const [termoBusca, setTermoBusca] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  const jogadoresFiltrados = jogadores.filter((jogador) => {
    if (!termoBusca.trim()) return false;

    const nomeJogador = jogador.nome.toLowerCase();
    const termo = termoBusca.toLowerCase();

    return nomeJogador.includes(termo);
  });

  const selecionarJogador = (jogador: JogadorNewResponseType) => {
    setTermoBusca(jogador.nome);
    setJogadorSelecionado(jogador);
    setMostrarSugestoes(false);
  };

  const handleAvancar = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!jogadorSelecionado) return;
    setEtapa("carregando");

    setTimeout(() => {
      const statusFinanceiro =
        jogadorSelecionado.financeiro?.status || "inactive";

      switch (statusFinanceiro) {
        case "active":
          setEtapa("ativo");
          break;

        case "pending":
          setEtapa("exibir_pix");
          break;

        case "inactive":
        case "cancelled":
        default:
          setEtapa("formulario_adesao");
          break;
      }
    }, 600);
  };

  return (
    <>
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl font-bold">
          Caixinha da Pelada ⚽
        </CardTitle>
        <CardDescription className="text-slate-300">
          Comece a digitar seu nome para localizar seu cadastro.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative space-y-2">
          <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-400" /> Seu Nome
          </label>

          <div className="relative">
            <Input
              type="text"
              placeholder="Digite seu nome para buscar..."
              value={termoBusca}
              onChange={(e) => {
                setTermoBusca(e.target.value);
                setJogadorSelecionado(null);
                setMostrarSugestoes(true);
              }}
              onFocus={() => setMostrarSugestoes(true)}
              className="h-11 border-slate-200 pr-10"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
          </div>

          {mostrarSugestoes && jogadoresFiltrados.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 max-h-48 overflow-y-auto border border-slate-200 rounded-md shadow-lg bg-card">
              {jogadoresFiltrados.map((jogador) => (
                <li
                  key={jogador.id}
                  onClick={() => selecionarJogador(jogador)}
                  className="px-4 py-2.5 text-sm cursor-pointer border-b border-slate-100 last:border-b-0 font-medium"
                >
                  {jogador.nome}
                </li>
              ))}
            </ul>
          )}

          {mostrarSugestoes &&
            termoBusca &&
            jogadoresFiltrados.length === 0 &&
            !jogadorSelecionado && (
              <div className="absolute z-10 w-full mt-1 p-3 text-sm text-slate-400 border border-slate-200 rounded-md shadow-lg bg-card">
                Nenhum jogador encontrado com esse nome.
              </div>
            )}
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleAvancar}
          disabled={!jogadorSelecionado}
          className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirmar e Avançar
        </Button>
      </CardFooter>
    </>
  );
}
