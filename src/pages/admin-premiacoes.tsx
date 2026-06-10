import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { PlusCircle, ArrowLeft, Calendar, Award } from "lucide-react";
import AddCategoria from '@/components/add-categoria';

// Types provisórios para o brainstorm visual
interface Premiacao {
  id: string;
  nome: string;
  status: 'RASCUNHO' | 'FINALIZADA';
  dataCriacao: string;
}

export default function AdminPremiacoes() {
  // Estados para controlar qual premiação está selecionada para ver os detalhes
  const [premiacaoSelecionada, setPremiacaoSelecionada] = useState<Premiacao | null>(null);

  // Estados fictícios para ilustrar a lista (dps virá do Firebase)
  const [premiacoesEmAberto, setPremiacoesEmAberto] = useState<Premiacao[]>([
    { id: '2026-1', nome: 'Premiação Oficial - Semestre 2026.1', status: 'RASCUNHO', dataCriacao: '2026-05-01' },
    { id: '2026-2', nome: 'Torneio de Inverno 2026', status: 'RASCUNHO', dataCriacao: '2026-06-01' },
  ]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 mt-8 container px-8 py-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          {premiacaoSelecionada ? (
            <button 
              onClick={() => setPremiacaoSelecionada(null)}
              className="flex items-center text-sm text-muted-foreground hover:text-foreground gap-1 mb-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar para lista
            </button>
          ) : null}
          <h1 className="text-3xl font-bold tracking-tight">
            {premiacaoSelecionada ? premiacaoSelecionada.nome : "Admin de Premiações"}
          </h1>
          <p className="text-muted-foreground">
            {premiacaoSelecionada 
              ? "Gerencie as categorias, cálculos automáticos e finalize os resultados." 
              : "Gerencie o histórico, crie moldes de categorias e abra novas edições de prêmios."}
          </p>
        </div>

        {/* BOTÕES DE AÇÃO (Só aparecem na listagem principal) */}
        {!premiacaoSelecionada && (
          <div className="flex items-center gap-3">
            {/* SHEET: CRIAR CATEGORIA */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Award className="h-4 w-4" /> Nova Categoria
                </Button>
              </SheetTrigger>
              <AddCategoria />
            </Sheet>

            {/* SHEET: CRIAR PREMIAÇÃO */}
            <Sheet>
              <SheetTrigger asChild>
                <Button className="gap-2">
                  <PlusCircle className="h-4 w-4" /> Nova Premiação
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Iniciar Nova Premiação</SheetTitle>
                  <SheetDescription>
                    Defina o nome da edição (ex: 2026.2) e selecione quais categorias farão parte dela.
                  </SheetDescription>
                </SheetHeader>
                {/* TODO: Formulário da Premiação aqui dentro */}
                <div className="py-4 space-y-4">
                  <p className="text-xs text-muted-foreground italic">[Formulário de Seleção de Categorias de volta em breve...]</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>

      {/* CONTEÚDO DINÂMICO */}
      <div className="mt-6">
        {!premiacaoSelecionada ? (
          /* LISTA DE PREMIAÇÕES EM ABERTO */
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Premiações em Andamento</h2>
            
            {premiacoesEmAberto.length === 0 ? (
              <div className="border border-dashed rounded-lg p-12 text-center text-muted-foreground">
                Nenhuma premiação ativa no momento. Crie uma nova para começar!
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {premiacoesEmAberto.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => setPremiacaoSelecionada(p)}
                    className="group border rounded-xl p-5 bg-card hover:bg-accent/40 cursor-pointer shadow-sm transition-all hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
                          {p.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                        {p.nome}
                      </h3>
                    </div>
                    
                    <div className="flex items-center text-xs text-muted-foreground gap-1.5 mt-4 pt-3 border-t">
                      <Calendar className="h-3.5 w-3.5" />
                      Criado em {new Date(p.dataCriacao).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* TELA DETALHADA DA PREMIAÇÃO ESCOLHIDA */
          <div className="space-y-6">
            <div className="bg-muted/40 border rounded-xl p-6">
              <h3 className="text-lg font-medium mb-4">Categorias desta Edição</h3>
              
              {/* Onde vamos renderizar o componente de votação manual ou cards com o cálculo em tempo real */}
              <div className="grid gap-4">
                <div className="bg-background p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">⚽ Artilheiro do Semestre</p>
                    <p className="text-xs text-muted-foreground">Cálculo Automático (função: calcularArtilheiro)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">Líder Atual: Igor Righi</p>
                    <p className="text-xs text-muted-foreground">28 Gols</p>
                  </div>
                </div>

                <div className="bg-background p-4 border rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium">🎙️ Melhor da Resenha</p>
                    <p className="text-xs text-muted-foreground">Inserção Manual / Votação</p>
                  </div>
                  <div>
                    {/* Aqui entraria seu componente existente de adicionar votos/vencedor manualmente */}
                    <Button variant="outline" size="sm">Gerenciar Votos</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTÃO DE SALVAMENTO HISTÓRICO */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setPremiacaoSelecionada(null)}>
                Voltar
              </Button>
              <Button variant="destructive">
                Congelar e Finalizar Premiação
              </Button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}