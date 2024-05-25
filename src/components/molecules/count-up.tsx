import clsx from "clsx";
import React, { useEffect, useState } from "react";

const formatTimeDifference = (startDate: number, endDate: number) => {
  const differenceInMilliseconds = endDate - startDate;
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

interface CountUpProps {
  inputTime?: string | Date;
}

const CountUp: React.FC<CountUpProps> = ({ inputTime }) => {
  const [timeDifference, setTimeDifference] = useState("00:00");
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const colors = [
    "text-foreground/70",
    "text-foreground/80",
    "text-foreground/90",
    "text-red-400",
    "text-red-400",
    "text-red-400",
    "text-red-400",
    "text-red-500",
    "text-red-600",
    "text-red-700",
  ];

  const colorClass =
    elapsedMinutes <= 10 ? colors[roundToEven(elapsedMinutes)] : "text-red-700";

  useEffect(() => {
    const start = new Date(inputTime || "").getTime();
    const update = () => {
      const now = new Date().getTime();
      if (start <= now) {
        const { display, minutes } = formatTimeDifference(start, now);
        setTimeDifference(display);
        setElapsedMinutes(minutes);
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

export default CountUp;
