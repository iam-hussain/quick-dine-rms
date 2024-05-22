import clsx from "clsx";
import React, { useEffect, useState } from "react";

const formatTimeDifference = (startDate: number, endDate: number) => {
  const differenceInMilliseconds = endDate - startDate;
  const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(differenceInSeconds / 60);
  const seconds = differenceInSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

function roundToEven(num: number) {
  // Step 1: Round the number to the nearest integer
  let rounded = Math.round(num);

  // Step 2: If the rounded number is odd, adjust to the nearest even number
  if (rounded % 2 !== 0) {
    rounded += rounded > num ? -1 : 1;
  }

  return rounded;
}

function CountUp({ inputTime }: { inputTime?: string | Date }) {
  const [timeDifference, setTimeDifference] = useState("00:00");
  const [elapsedMinutes, setElapsedMinutes] = useState(0);
  const colors = [
    "text-foreground/70",
    "text-foreground/80",
    "text-foreground/90",
    "text-red-50",
    "text-red-100",
    "text-red-200",
    "text-red-300",
    "text-red-400",
    "text-red-500",
    "text-red-600",
  ];

  useEffect(() => {
    const creationTime = new Date(inputTime || "").getTime();
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedTime = (currentTime - creationTime) / 1000; // Convert to seconds
      const minutes = Math.floor(elapsedTime / 60); // Convert to minutes
      setElapsedMinutes(minutes);
    }, 1000); // Check every second

    return () => clearInterval(intervalId);
  }, [inputTime]);

  const colorClass =
    elapsedMinutes <= 20
      ? colors[roundToEven(elapsedMinutes / 2)]
      : "text-red-600";

  useEffect(() => {
    const start = new Date(inputTime || "").getTime();
    const end = new Date().getTime();
    setTimeDifference(formatTimeDifference(start, end));

    const interval = setInterval(() => {
      const now = new Date().getTime();
      setTimeDifference(formatTimeDifference(start, now));
    }, 1000);

    return () => clearInterval(interval);
  }, [inputTime]);

  return (
    <p className={clsx("text-base font-medium", colorClass)}>
      {timeDifference}
    </p>
  );
}

export default CountUp;
