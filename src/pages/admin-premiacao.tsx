import { useState } from "react";
import { useGetAllJogadores } from "@/hooks/jogadores/use-get-all-jogadores";
import { useGetVotosPremiacao } from "@/hooks/premiacao/use-get-votos-premiacao";
import { useSetVotoPremiacao } from "@/hooks/premiacao/use-set-voto-premiacao";
import type { VotoPremiado } from "@/queries/premiacao/get-votos-premiacao";
import AvatarLoad from "@/components/avatar-load";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IconStar, IconFlame, IconCheck, IconTrophy } from "@tabler/icons-react";
import { toast } from "sonner";
import type { JogadorNewResponseType } from "@/types/jogadores/Jogador";

const TEMPORADA = "2026";

type Campo = "craqueGalera" | "bagreGalera";

interface CategoryTheme {
  text: string;
  bg: string;
  bgMuted: string;
  border: string;
}

interface CategoriaConfig {
  campo: Campo;
  title: string;
  subtitle: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  tw: CategoryTheme;
}

const SILVER: CategoryTheme = {
  text:    "text-[#A8B2BD]",
  bg:      "bg-[#A8B2BD]",
  bgMuted: "bg-[#A8B2BD]/10",
  border:  "border-[#A8B2BD]/30",
};

const BRONZE: CategoryTheme = {
  text:    "text-[#C97D2F]",
  bg:      "bg-[#C97D2F]",
  bgMuted: "bg-[#C97D2F]/10",
  border:  "border-[#C97D2F]/30",
};

const CATEGORIAS: CategoriaConfig[] = [
  {
    campo: "craqueGalera",
    title: "Craque da Galera",
    subtitle: "Melhor jogador eleito pelo grupo",
    Icon: IconStar,
    tw: SILVER,
  },
  {
    campo: "bagreGalera",
    title: "Bagre da Galera",
    subtitle: "Pior jogador eleito pelo grupo",
    Icon: IconFlame,
    tw: BRONZE,
  },
];

function SelecionarJogadorDialog({
  open,
  onClose,
  onSelect,
  tw,
  title,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (jogador: JogadorNewResponseType) => void;
  tw: CategoryTheme;
  title: string;
}) {
  const [search, setSearch] = useState("");
  const { data: jogadores, isPending } = useGetAllJogadores();

  const filtrados = jogadores?.filter((j) =>
    j.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md max-h-[80vh] flex flex-col gap-0 p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <IconTrophy size={18} className={tw.text} />
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 py-3 border-b">
          <Input
            placeholder="Buscar jogador..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>

        <div className="overflow-y-auto flex-1 px-2 py-2">
          {isPending ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Carregando jogadores...
            </div>
          ) : (
            filtrados?.map((jogador) => (
              <button
                key={jogador.id}
                onClick={() => onSelect(jogador)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors text-left"
              >
                <AvatarLoad jogador={jogador} avatarSizeClasses="size-10" />
                <span className="font-medium text-sm">{jogador.nome}</span>
              </button>
            ))
          )}
          {filtrados?.length === 0 && !isPending && (
            <p className="text-center py-8 text-muted-foreground text-sm">
              Nenhum jogador encontrado.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CategoriaCard({ categoria }: { categoria: CategoriaConfig }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [qtdVotos, setQtdVotos] = useState<string>("");
  const { data: votos, isPending: loadingVotos } = useGetVotosPremiacao(TEMPORADA);
  const { mutate: salvar, isPending: salvando } = useSetVotoPremiacao(TEMPORADA);

  const { campo, title, subtitle, Icon, tw } = categoria;
  const vencedor: VotoPremiado | null = votos?.[campo] ?? null;

  const votosCarregados = vencedor?.votos;
  const qtdVotosSync =
    qtdVotos === "" && votosCarregados !== undefined ? String(votosCarregados) : qtdVotos;

  const handleSelect = (jogador: JogadorNewResponseType) => {
    setDialogOpen(false);
    salvar(
      { campo, voto: { jogadorId: jogador.id, nome: jogador.nome, fotoUrl: jogador.fotoUrl, votos: vencedor?.votos } },
      {
        onSuccess: () => toast.success(`${title}: ${jogador.nome} salvo!`),
        onError: () => toast.error("Erro ao salvar. Tente novamente."),
      }
    );
  };

  const handleSalvarVotos = () => {
    if (!vencedor) return;
    const num = parseInt(qtdVotosSync);
    if (isNaN(num) || num < 0) {
      toast.error("Insira um número válido de votos.");
      return;
    }
    salvar(
      { campo, voto: { ...vencedor, votos: num } },
      {
        onSuccess: () => toast.success("Quantidade de votos salva!"),
        onError: () => toast.error("Erro ao salvar. Tente novamente."),
      }
    );
  };

  return (
    <>
      <Card className={`border-2 transition-all ${tw.border}`}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Icon size={20} className={tw.text} />
            <span className={tw.text}>{title}</span>
          </CardTitle>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 pt-2">
          {loadingVotos ? (
            <div className="size-20 rounded-md bg-muted animate-pulse" />
          ) : vencedor ? (
            <div className="flex flex-col items-center gap-2 w-full">
              <AvatarLoad jogador={vencedor} avatarSizeClasses="size-20" />
              <div className="text-center">
                <p className="font-semibold text-sm">{vencedor.nome}</p>
                <div className={`flex items-center gap-1 text-xs mt-1 justify-center ${tw.text}`}>
                  <IconCheck size={12} />
                  <span>Selecionado</span>
                </div>
              </div>

              <div className="w-full mt-1 flex flex-col gap-2">
                <label className="text-xs text-muted-foreground font-medium">
                  Quantidade de votos
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    min={0}
                    placeholder="Ex: 12"
                    value={qtdVotosSync}
                    onChange={(e) => setQtdVotos(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    disabled={salvando}
                    onClick={handleSalvarVotos}
                    className={`${tw.bg} text-black hover:opacity-90`}
                  >
                    {salvando ? "..." : "Salvar"}
                  </Button>
                </div>
                {vencedor.votos !== undefined && (
                  <p className="text-xs text-muted-foreground">
                    Votos salvos:{" "}
                    <span className={`font-semibold ${tw.text}`}>{vencedor.votos}</span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="text-3xl opacity-30">?</div>
              <p className="text-xs text-muted-foreground">Nenhum vencedor selecionado</p>
            </div>
          )}

          <Button
            className={`w-full ${vencedor ? `bg-transparent border ${tw.border} ${tw.text} hover:${tw.bgMuted}` : `${tw.bg} text-black hover:opacity-90`}`}
            disabled={salvando}
            onClick={() => setDialogOpen(true)}
          >
            {salvando ? "Salvando..." : vencedor ? "Alterar vencedor" : "Selecionar vencedor"}
          </Button>
        </CardContent>
      </Card>

      <SelecionarJogadorDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSelect={handleSelect}
        tw={tw}
        title={title}
      />
    </>
  );
}

export default function AdminPremiacaoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <IconTrophy size={24} className="text-yellow-400" />
          Admin — Premiação {TEMPORADA}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Selecione os vencedores das categorias de votação popular.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CATEGORIAS.map((cat) => (
          <CategoriaCard key={cat.campo} categoria={cat} />
        ))}
      </div>
    </div>
  );
}
