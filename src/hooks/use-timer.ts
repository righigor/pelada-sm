/* eslint-disable react-hooks/purity */
import { useState, useEffect, useCallback } from "react";

const SIX_MINUTES_MS = 6 * 60 * 1000;
const TIMER_STORAGE_KEY = "partidaTimerState";

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const safeTotalSeconds = Math.max(0, totalSeconds);

  const minutes = Math.floor(safeTotalSeconds / 60);
  const seconds = safeTotalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(minutes)}:${pad(seconds)}`;
};

const getSavedState = (initialTime: number) => {
  const saved = localStorage.getItem(TIMER_STORAGE_KEY);
  if (saved) {
    try {
      const state = JSON.parse(saved);
      return {
        isRunning: state.isRunning || false,
        isFinished: state.isFinished || false,
        startTime: state.startTime || 0,
        elapsedTime: state.elapsedTime || 0,
        time: state.time || initialTime,
      };
    } catch (e) {
      console.error("Erro ao carregar estado do timer:", e);
    }
  }
  return null;
};

export const useTimer = (
  onFinish?: () => void,
  initialTimeMs: number = SIX_MINUTES_MS
) => {
  const currentTimestamp = Date.now();

  const savedState = getSavedState(initialTimeMs);

  let initialIsRunning = savedState?.isRunning || false;
  let initialIsFinished = savedState?.isFinished || false;
  let initialStartTime = savedState?.startTime || 0;
  let initialElapsedTime = savedState?.elapsedTime || 0;
  let initialTime = savedState?.time || initialTimeMs;

  if (savedState && savedState.isRunning) {
    const timeElapsedInCycle = currentTimestamp - savedState.startTime;
    const totalTimeElapsed = savedState.elapsedTime + timeElapsedInCycle;
    const newTime = initialTimeMs - totalTimeElapsed;

    if (newTime > 0) {
      initialTime = newTime;
      initialElapsedTime = totalTimeElapsed;
      initialStartTime = currentTimestamp;
      initialIsRunning = true;
    } else {
      initialTime = 0;
      initialIsFinished = true;
      initialIsRunning = false;
    }
  }

  const [isRunning, setIsRunning] = useState(initialIsRunning);
  const [isFinished, setIsFinished] = useState(initialIsFinished);
  const [time, setTime] = useState(initialTime);
  const [startTime, setStartTime] = useState(initialStartTime);
  const [elapsedTime, setElapsedTime] = useState(initialElapsedTime);

  const calculateTimeRemaining = useCallback(
    (currentStartTime: number, currentElapsedTime: number) => {
      if (!isRunning || isFinished) {
        return time;
      }

      const timeElapsedInCycle = Date.now() - currentStartTime;
      const totalTimeElapsed = currentElapsedTime + timeElapsedInCycle;
      const newTime = initialTimeMs - totalTimeElapsed;

      if (newTime <= 0) {
        setIsRunning(false);
        setIsFinished(true);
        if (onFinish) {
          onFinish();
        }
        return 0;
      }

      return newTime;
    },
    [isRunning, isFinished, initialTimeMs, onFinish, time]
  );

  useEffect(() => {
    let interval: number | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(calculateTimeRemaining(startTime, elapsedTime));
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, calculateTimeRemaining, startTime, elapsedTime]);

  useEffect(() => {
    const stateToSave = {
      isRunning,
      isFinished,
      startTime,
      elapsedTime,
      time: time,
    };
    localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [isRunning, isFinished, startTime, elapsedTime, time]);

  const start = useCallback(() => {
    if (isFinished) {
      setElapsedTime(0);
      setIsFinished(false);
    }

    setStartTime(Date.now());
    setIsRunning(true);
  }, [isFinished]);

  const pause = useCallback(() => {
    if (!isRunning) return;

    const timeElapsedInCycle = Date.now() - startTime;
    setElapsedTime((prevElapsed: number) => prevElapsed + timeElapsedInCycle);

    setIsRunning(false);
    setTime(calculateTimeRemaining(startTime, elapsedTime));
  }, [isRunning, startTime, elapsedTime, calculateTimeRemaining]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(initialTimeMs);
    setStartTime(0);
    setElapsedTime(0);
    setIsFinished(false);
    localStorage.removeItem(TIMER_STORAGE_KEY);
  }, [initialTimeMs]);

  return {
    timeMs: time,
    formattedTime: formatTime(time),
    isRunning,
    isFinished,
    start,
    pause,
    reset,
  };
};
