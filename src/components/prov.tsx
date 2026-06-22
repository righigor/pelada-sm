import { useState } from 'react';
import { Button } from "./ui/button";
import { Edit2, Sparkles } from "lucide-react";
import { ModalVotoManual } from './modal-votos-manual';


interface LinhaCategoriaRetroativaProps {
  cat: {
    idCategoria: string;
    nome: string;
    tipoCalculo: 'AUTOMATICO' | 'MANUAL';
  };
  // Callback essencial para devolver o resultado para a tela de detalhes salvar no Firebase
  onResultadoDefinido: (idCategoria: string, dados: VencedorRetroativo | null) => void;
}

interface VencedorRetroativo {
  vencedorId: string;
  vencedorNome: string;
  vencedorFotoUrl: string | null;
  detalhes: string;
}

export function LinhaCategoriaRetroativa({ cat, onResultadoDefinido }: LinhaCategoriaRetroativaProps) {
  const [vencedor, setVencedor] = useState<VencedorRetroativo | null>(null);

  const handleSalvarVencedor = (dadosVoto: {
    vencedorId: string;
    vencedorNome: string;
    vencedorFotoUrl: string | null;
    detalhes: string; 
  }) => {
    // Pega só o número digitado
    const numero = dadosVoto.detalhes.replace(/\D/g, ""); 

    // Valida com base no nome da categoria que vem do seu map
    const nomeTratado = cat.nome.toLowerCase();
    let sufixo = "Votos";
    
    if (cat.tipoCalculo === "AUTOMATICO") {
      if (nomeTratado.includes("artilheiro") || nomeTratado.includes("gols")) {
        sufixo = numero === "1" ? "Gol" : "Gols";
      } else if (nomeTratado.includes("assistente") || nomeTratado.includes("assistente") || nomeTratado.includes("assistencia") || nomeTratado.includes("assistências")) {
        sufixo = numero === "1" ? "Assistência" : "Assistências";
      } else if (nomeTratado.includes("craque") || nomeTratado.includes("mvp") || nomeTratado.includes("rei")) {
        sufixo = "Pontos";
      } else if (nomeTratado.includes("paredao") || nomeTratado.includes("goleiro") || nomeTratado.includes("defesa")) {
        sufixo = "Defesas";
      }
    }

    const dadosFormatados: VencedorRetroativo = {
      vencedorId: dadosVoto.vencedorId,
      vencedorNome: dadosVoto.vencedorNome,
      vencedorFotoUrl: dadosVoto.vencedorFotoUrl,
      detalhes: `${numero} ${sufixo}`
    };

    setVencedor(dadosFormatados);
    onResultadoDefinido(cat.idCategoria, dadosFormatados);
  };

  return (
    <div className="bg-background p-4 border rounded-lg flex items-center justify-between shadow-sm min-h-[88px] border-amber-200/60 dark:border-amber-900/40 bg-amber-50/10">
      <div className="space-y-1 pr-2">
        <p className="font-medium flex items-center gap-1.5">🏆 {cat.nome}</p>
        <p className="text-[0.75rem] text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
          <Sparkles className="h-3 w-3" /> Forçar {cat.tipoCalculo === "AUTOMATICO" ? "Estatística" : "Votos"}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {vencedor ? (
          <div className="flex items-center gap-3 text-right">
            <div>
              <p className="text-sm font-bold text-primary leading-tight">
                {vencedor.vencedorNome}
              </p>
              <p className="text-[0.7rem] text-muted-foreground whitespace-nowrap">
                {vencedor.detalhes} {/* Aqui vai renderizar "18 Gols" em vez de "18 Votos" */}
              </p>
            </div>
            
            <div className="h-9 w-9 rounded-full overflow-hidden bg-accent border flex-shrink-0">
              {vencedor.vencedorFotoUrl ? (
                <img src={vencedor.vencedorFotoUrl} alt={vencedor.vencedorNome} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-[10px] font-bold bg-muted text-muted-foreground">
                  {vencedor.vencedorNome.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <ModalVotoManual
              nomeCategoria={cat.nome}
              onSalvarVoto={handleSalvarVencedor}
              trigger={
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                  <Edit2 className="h-3.5 w-3.5" />
                </Button>
              }
            />
          </div>
        ) : (
          <ModalVotoManual
            nomeCategoria={cat.nome}
            onSalvarVoto={handleSalvarVencedor}
            trigger={
              <Button variant="outline" size="sm" className="h-8 border-amber-300 text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:border-amber-800">
                Inserir Dado
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}