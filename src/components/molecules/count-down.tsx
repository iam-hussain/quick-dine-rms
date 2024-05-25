import clsx from "clsx";
import React, { useEffect, useState } from "react";

const formatTimeDifference = (endDate: number, startDate: number) => {
  const differenceInMilliseconds = Math.max(0, endDate - startDate); // Ensure non-negative
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(differenceInSeconds / 60);
  const seconds = differenceInSeconds % 60;
  return {
    minutes,
    seconds,
    display: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
  };
};

function roundToEven(num: number) {
  let rounded = Math.round(num);
  if (rounded % 2 !== 0) {
    rounded += rounded > num ? -1 : 1;
  }
  return rounded;
}

interface CountDownProps {
  inputTime?: string | Date;
}

const CountDown: React.FC<CountDownProps> = ({ inputTime }) => {
  const [timeDifference, setTimeDifference] = useState("00:00");
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const colors = [
    "text-green-700",
    "text-green-600",
    "text-green-500",
    "text-green-400",
    "text-green-400",
    "text-green-400",
    "text-green-400",
    "text-foreground/90",
    "text-foreground/80",
    "text-foreground/70",
  ];

  const colorClass =
    remainingMinutes <= 10
      ? colors[roundToEven(remainingMinutes)]
      : "text-foreground/70";

  useEffect(() => {
    const end = new Date(inputTime || "").getTime();
    const update = () => {
      const now = new Date().getTime();
      if (end >= now) {
        const { display, minutes } = formatTimeDifference(end, now);
        setTimeDifference(display);
        setRemainingMinutes(minutes);
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [inputTime]);

  return (
    <p className={clsx("text-base font-medium animate-fade", colorClass)}>
      {timeDifference}
    </p>
  );
};

export default CountDown;
