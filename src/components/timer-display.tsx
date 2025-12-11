import { Button } from "@/components/ui/button";
import { useTimer } from "@/hooks/use-timer";
import ShowTimeEnded from "@/utils/show-time-ended";
import { Play, Pause, TimerReset } from "lucide-react";
import { useCallback } from "react";

const startVibration = () => {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate([200, 100, 200]);
    ShowTimeEnded();
  } else {
    ShowTimeEnded();
  }
};

export default function TimerDisplay() {
  const handleTimeFinish = useCallback(() => {
    startVibration();
  }, []);
  const { formattedTime, isRunning, start, pause, reset } = useTimer(
    5000,
    handleTimeFinish
  );

  return (
    <div className="sticky top-25 z-10 flex items-center justify-center p-3 backdrop-blur-sm rounded-lg shadow-xl mb-4 border max-w-2xl mx-auto gap-2 bg-card/55">
      <div className="text-3xl text-center font-extrabold text-gray-300 tracking-wider mb-2">
        {formattedTime}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={isRunning ? pause : start}
          variant={isRunning ? "destructive" : "default"}
          size="sm"
          className="cursor-pointer"
        >
          {isRunning ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4" />
          )}
        </Button>

        <Button
          onClick={reset}
          variant="outline"
          size="sm"
          className="cursor-pointer"
        >
          <TimerReset className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
