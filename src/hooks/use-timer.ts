// src/hooks/useTimer.ts (Versão Estável Refatorada)

import { useState, useEffect, useCallback } from 'react';

// Define o tempo inicial em milissegundos (6 minutos)
const SIX_MINUTES_MS = 6 * 60 * 1000;

// Formata milissegundos para MM:SS
const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    // Garante que o tempo formatado nunca seja negativo
    const safeTotalSeconds = Math.max(0, totalSeconds); 
    
    const minutes = Math.floor(safeTotalSeconds / 60);
    const seconds = safeTotalSeconds % 60;
    
    const pad = (num: number) => num.toString().padStart(2, '0');
    
    return `${pad(minutes)}:${pad(seconds)}`;
};

export const useTimer = (initialTimeMs: number = SIX_MINUTES_MS) => {
    // Estado principal do tempo
    const [time, setTime] = useState(initialTimeMs);
    // Estado de execução (Iniciado/Pausado)
    const [isRunning, setIsRunning] = useState(false);
    // Estado de conclusão
    const [isFinished, setIsFinished] = useState(false); 

    useEffect(() => {
        let interval: number | null = null;
        
        // Só executa o intervalo se estiver rodando e não tiver terminado
        if (isRunning) {
            
            interval = setInterval(() => {
                // Usamos a função de atualização para garantir o valor mais recente de 'time'
                setTime(prevTime => {
                    const newTime = prevTime - 1000;
                    
                    if (newTime <= 0) {
                        // Atingiu zero: para o timer e marca como concluído
                        clearInterval(interval!); 
                        setIsRunning(false); 
                        setIsFinished(true);
                        return 0; // Fixa em zero
                    }
                    
                    return newTime;
                });
            }, 1000);
        }
        
        // Limpeza (cleanup): Importante para evitar vazamento de memória e bugs
        return () => {
            if (interval) clearInterval(interval);
        };
        
    // Dependências: Apenas 'isRunning' é suficiente, pois 'time' é atualizado via callback
    }, [isRunning]); 

    // --- Funções de Controle ---
    
    const start = useCallback(() => {
        // Permite iniciar apenas se não estiver concluído
        if (!isFinished) {
             setIsRunning(true);
        }
    }, [isFinished]);
    
    const pause = useCallback(() => setIsRunning(false), []);
    
    const reset = useCallback(() => {
        setIsRunning(false);
        setTime(SIX_MINUTES_MS); // Sempre volta para 6 minutos
        setIsFinished(false);
    }, []);
    
    const formattedTime = formatTime(time);

    return { 
        timeMs: time,
        formattedTime, 
        isRunning, 
        isFinished, 
        start, 
        pause, 
        reset 
    };
};