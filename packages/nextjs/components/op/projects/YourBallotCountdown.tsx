import { useEffect, useState } from "react";

interface CountdownTimerProps {
  deadline: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ deadline }) => {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(
    calculateTimeRemaining(deadline), // Initialize with the initial value
  );
  const [isEnded, setIsEnded] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Math.floor(new Date().getTime() / 1000);

      if (now >= deadline) {
        setTimeRemaining(null);
        setIsEnded(true);
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
    }, 1000); // Update every 1 second

    return () => clearInterval(timer);
  }, [deadline]);

  const deadlineMessage = () => {
    if (isEnded) {
      return {
        message: "Ended on",
        formattedDate: new Date(deadline * 1000).toLocaleString(),
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
      <span className="font-bold text-lg">{isEnded ? deadlineMessage().formattedDate : timeRemaining || ""}</span>
    </>
  );
};

export default CountdownTimer;

// Helper function to calculate initial time remaining
const calculateTimeRemaining = (deadline: number): string => {
  const now = Math.floor(new Date().getTime() / 1000);

  if (now >= deadline) {
    return ""; // Timer has already ended
  }

  const timeRemainingSeconds = deadline - now;
  const days = Math.floor(timeRemainingSeconds / 86400);
  const hours = Math.floor((timeRemainingSeconds % 86400) / 3600);
  const minutes = Math.floor((timeRemainingSeconds % 3600) / 60);
  const seconds = Math.floor(timeRemainingSeconds % 60);

  if (days > 0) {
    return `${days}d:${hours}h:${minutes}m:${seconds}s`;
  } else {
    return `${hours}h:${minutes}m:${seconds}s`;
  }
};
