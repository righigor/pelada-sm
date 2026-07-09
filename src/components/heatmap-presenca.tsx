// src/components/heatmap-presenca.tsx

import { useMemo, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Timestamp } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllPartidas } from "@/hooks/partida/use-get-all-partidas";
import type { TimeData } from "@/types/partida/Estatisticas";
import type { PartidaKey } from "@/types/PartidaStore";


interface PlayerHeatmapProps {
  jogadorId: string;
}

export type HeatmapDayData = {
  date: string; 
  count: number; // 0: Sem pelada, -1: Faltou, 1: Presente, 2: MVP
  time?: PartidaKey;
  gols?: number;
  assistencias?: number;
  golsContra?: number;
  dd?: number;
  isMvp?: boolean;
};

function converterTimestampFirebase(timestamp: Timestamp): Date {
  if (!timestamp) return new Date();
  return timestamp.toDate();
}

function formatarChaveData(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function PlayerHeatmap({ jogadorId }: PlayerHeatmapProps) {
  const { data: partidas, isLoading } = useGetAllPartidas();
  
  const [activeDay, setActiveDay] = useState<HeatmapDayData | null>(null);
  const [tooltipStyle, setTooltipStyle] = useState<React.CSSProperties>({ display: 'none' });

  const heatmapData: HeatmapDayData[] = useMemo(() => {
    if (!partidas) return [];

    // 1. Conjunto com TODAS as datas que tiveram pelada finalizada
    const datasComPelada = new Set<string>();
    
    // 2. Mapa rápido apenas com os dados do jogador específico
    const mapaPartidas = new Map<string, HeatmapDayData>();
    
    const partidasFinalizadas = partidas.filter((p) => p.status === "finalizado");

    partidasFinalizadas.forEach((partida) => {
      const date = converterTimestampFirebase(partida.dataPartida);
      const chave = formatarChaveData(date);
      
      // Marca que neste dia TEVE pelada
      datasComPelada.add(chave);
      
      const times = Object.entries(partida.timesEstatisticas) as [PartidaKey, TimeData][];
      
      for (const [nomeTime, dadosTime] of times) {
        const jogadoresDoTime = dadosTime?.jogadores;
        
        // Verifica se o NOSSO jogador estava na pelada
        if (jogadoresDoTime && jogadoresDoTime[jogadorId]) {
          const j = jogadoresDoTime[jogadorId];
          const mvpDoTime = partida.resumoPartida?.mvpPorTime?.[nomeTime];
          const isMvp = mvpDoTime?.jogadorId === jogadorId || false;
          
          mapaPartidas.set(chave, {
            date: chave,
            count: isMvp ? 2 : 1, // 2 para MVP, 1 para Presente
            time: nomeTime,
            gols: j.gols ?? 0,
            assistencias: j.assistencias ?? 0,
            golsContra: j.golsContra ?? 0,
            dd: j.dd ?? 0,
            isMvp,
          });
          break; 
        }
      }
    });

    // 3. Gerar a grade do ano inteiro
    const dadosFormatados: HeatmapDayData[] = [];
    const endDate = new Date();
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setMonth(0, 1); 

    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const chave = formatarChaveData(currentDate);
      const dadosDoJogador = mapaPartidas.get(chave);

      if (dadosDoJogador) {
        // Jogou (Presente ou MVP)
        dadosFormatados.push(dadosDoJogador);
      } else if (datasComPelada.has(chave)) {
        // TEVE pelada, mas ele NÃO FOI
        dadosFormatados.push({
          date: chave,
          count: -1, // Usamos -1 para identificar a falta
        });
      } else {
        // NÃO TEVE pelada no dia
        dadosFormatados.push({
          date: chave,
          count: 0,
        });
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dadosFormatados;
  }, [partidas, jogadorId]);

  const getClassForValue = (value: unknown) => {
    const day = value as HeatmapDayData | undefined;
    if (!day || day.count === 0) return "color-empty"; // Sem pelada
    if (day.count === -1) return "color-absent";        // Faltou
    if (day.count === 2) return "color-mvp";            // MVP
    return "color-present";                             // Presente
  };

  const formatarDataTooltip = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  };

  if (isLoading) {
    return <Skeleton className="w-full h-32 rounded-md" />;
  }

  return (
    <div className="w-full overflow-x-auto relative">
      <div 
        onMouseLeave={() => setTooltipStyle({ display: 'none' })} 
        className="min-w-fit"
      >
        <CalendarHeatmap
          startDate={new Date(new Date().getFullYear() - 1, 0, 1)}
          endDate={new Date()}
          values={heatmapData}
          classForValue={getClassForValue}
          showWeekdayLabels={true}
          showMonthLabels={true}
          onMouseOver={(event, value) => {
            const day = value as HeatmapDayData;
            if (day && day.date) {
              setActiveDay(day);
              
              const rect = (event.target as SVGRectElement).getBoundingClientRect();
              const tooltipWidth = 220; 
              const tooltipHeight = 160; 
              const margin = 10; 

              let left = rect.left + rect.width / 2;
              let top = rect.top;
              let transformX = "-50%";
              let transformY = "-100%";

              if (left - tooltipWidth / 2 < margin) {
                transformX = "0%"; 
                left = rect.left;
              } else if (left + tooltipWidth / 2 > window.innerWidth - margin) {
                transformX = "-100%"; 
                left = rect.right;
              }

              if (top - tooltipHeight - margin < 0) {
                transformY = "0%";
                top = rect.bottom;
              }

              setTooltipStyle({
                position: 'fixed',
                left: `${left}px`,
                top: `${top}px`,
                transform: `translate(${transformX}, ${transformY})`,
                zIndex: 50,
                pointerEvents: 'none',
                display: 'block',
              });
            }
          }}
        />
      </div>

      {/* Tooltip */}
      <div style={tooltipStyle}>
        {activeDay && (
          <Card className="w-[220px] shadow-lg border-border">
            <CardContent className="p-3 text-left">
              <div className="text-xs font-semibold mb-1 capitalize">
                {formatarDataTooltip(activeDay.date)}
              </div>
              
              {/* Textos condicionais baseados no count */}
              {activeDay.count === 0 && (
                <div className="text-xs text-muted-foreground">Não teve pelada</div>
              )}
              
              {activeDay.count === -1 && (
                <div className="text-xs text-orange-500 font-medium">Teve pelada, mas não participou</div>
              )}

              {(activeDay.count === 1 || activeDay.count === 2) && (
                <>
                  <div className="text-xs mb-2">
                    <span className="font-bold">Time: </span> 
                    <span className="capitalize font-semibold">{activeDay.time}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs border-t pt-2 mt-1 border-border">
                    <span className="text-muted-foreground">Gols:</span>
                    <span className="font-medium text-right">{activeDay.gols ?? 0}</span>
                    <span className="text-muted-foreground">Assist:</span>
                    <span className="font-medium text-right">{activeDay.assistencias ?? 0}</span>
                    <span className="text-muted-foreground">Gols C:</span>
                    <span className="font-medium text-right text-red-400">{activeDay.golsContra ?? 0}</span>
                    <span className="text-muted-foreground">DD:</span>
                    <span className="font-medium text-right">{activeDay.dd ?? 0}</span>
                  </div>
                  {activeDay.isMvp && (
                    <div className="mt-2 pt-2 border-t border-border text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded-md">
                        ⭐ MVP do Time
                      </span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Legenda Atualizada */}
      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="w-[13px] h-[13px] rounded-[2px] bg-gray-100 dark:bg-gray-800" />
          <span>Sem pelada</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-[13px] h-[13px] rounded-[2px] bg-gray-400 dark:bg-gray-500" />
          <span>Faltou</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-[13px] h-[13px] rounded-[2px] bg-green-400 dark:bg-green-600" />
          <span>Presente</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-[13px] h-[13px] rounded-[2px] bg-green-700 dark:bg-green-500" />
          <span>MVP</span>
        </div>
      </div>
    </div>
  );
}