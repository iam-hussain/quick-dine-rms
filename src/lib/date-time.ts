import { formatISO, formatDistance, format, add } from "date-fns";

export const dateTimeDifferent = (input: string | Date) => {
  return formatDistance(new Date(input), new Date(), { addSuffix: true });
};

export const dateTimeFormat = (input: string | Date = new Date()) => {
  return format(new Date(input), "PPPp");
};

export const timeFormat = (input: string | Date) => {
  return format(new Date(input), "PPPp");
};

export const dateTimeAfterMinutes = (input: string | number) => {
  return format(
    add(new Date(), {
      minutes: Number(input) || 0,
    }),
    "PPPp"
  );
};

export const timeAfterMinutes = (input: string | number) => {
  return format(
    add(new Date(), {
      minutes: Number(input) || 0,
    }),
    "p"
  );
};

export const dateTimeFormatAddMinutes = (input: string | number) => {
  return formatISO(
    add(new Date(), {
      minutes: Number(input) || 0,
    })
  );
};
