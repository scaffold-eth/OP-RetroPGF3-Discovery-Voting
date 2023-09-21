import { useEffect, useState } from "react";

interface CountdownTimerProps {
  deadline: number; // Specify the type for the deadline prop
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(new Date().getTime() / 1000);

      if (now >= deadline) {
        setTimeRemaining(null);
        clearInterval(timer);
      } else {
        const timeRemainingSeconds = deadline - now;
        const days = Math.floor(timeRemainingSeconds / 86400);
        const hours = Math.floor((timeRemainingSeconds % 86400) / 3600);
        const minutes = Math.floor((timeRemainingSeconds % 3600) / 60);
        const seconds = Math.floor(timeRemainingSeconds % 60);

        if (days > 0) {
          setTimeRemaining(`${days}d:${hours}h:${minutes}m:${seconds}s`);
        } else {
          setTimeRemaining(`${hours}h:${minutes}m:${seconds}s`);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  const deadlineMessage = () => {
    const now = Math.floor(new Date().getTime() / 1000);
    if (now >= deadline) {
      return {
        message: "Ended on",
      };
    } else {
      return {
        message: "Voting ends in",
      };
    }
  };

  return (
    <>
      <p className="p-0 m-0 text-sm text-OPbluegray ">{deadlineMessage().message}</p>
      <span className="font-bold text-lg">
        {timeRemaining ? timeRemaining : new Date(deadline * 1000).toLocaleString()}
      </span>
    </>
  );
};

export default CountdownTimer;
