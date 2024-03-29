import { ChargesType } from "@/types";
import { SortingFnOption } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractClassNames(className?: string | string[]) {
  if (!className || !className.length) {
    return [""];
  }
  if (typeof className === "string") {
    return [className];
  }
  return className;
}

export const zeroLastSortMethod = (
  rowA: any,
  rowB: any,
  id: any,
  desc: any
) => {
  let a = Number.parseFloat(rowA.getValue(id));
  let b = Number.parseFloat(rowB.getValue(id));
  if (Number.isNaN(a)) {
    // Blanks and non-numeric strings to bottom
    a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (Number.isNaN(b)) {
    b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }

  if (a === 0) {
    return desc ? -1 : 1;
  } else if (b === 0) {
    return desc ? 1 : -1;
  } else {
    return desc ? a + b : a - b;
  }
};

export function percentage(percent: number, total: number) {
  return (percent / 100) * total;
}

export function getChargesValue(
  type: ChargesType,
  value: number,
  total: number,
  count: number
) {
  if (type === "PERCENTAGE") {
    return percentage(value, total);
  }
  if (type === "VALUE") {
    return value;
  }

  if (type === "VALUE_COUNT") {
    return value * count;
  }

  return 0;
}

export function isValidArray(input: any) {
  return input && Array.isArray(input) && input.length;
}
