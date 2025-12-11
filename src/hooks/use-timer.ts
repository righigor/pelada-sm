import { useState, useEffect, useCallback } from "react";

const SIX_MINUTES_MS = 6 * 60 * 1000;

const formatTime = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const safeTotalSeconds = Math.max(0, totalSeconds);

  const minutes = Math.floor(safeTotalSeconds / 60);
  const seconds = safeTotalSeconds % 60;

  const pad = (num: number) => num.toString().padStart(2, "0");

  return `${pad(minutes)}:${pad(seconds)}`;
};

export const useTimer = (
  onFinish?: () => void,
  initialTimeMs: number = SIX_MINUTES_MS
) => {
  const [time, setTime] = useState(initialTimeMs);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: number | null = null;

    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1000;

          if (newTime <= 0) {
            clearInterval(interval!);
            setIsRunning(false);
            setIsFinished(true);
            if (onFinish) {
              onFinish();
            }

            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, onFinish, initialTimeMs]);

  const start = useCallback(() => {
    if (isFinished) {
      setIsRunning(false);
      setTime(initialTimeMs);
      setIsFinished(false);
    }
    setIsRunning(true);
  }, [isFinished, initialTimeMs]);

  const pause = useCallback(() => setIsRunning(false), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(initialTimeMs);
    setIsFinished(false);
  }, [initialTimeMs]);

  const formattedTime = formatTime(time);

  return {
    timeMs: time,
    formattedTime,
    isRunning,
    isFinished,
    start,
    pause,
    reset,
  };
};
