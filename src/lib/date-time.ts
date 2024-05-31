import { add, format, formatDistance, formatISO } from "date-fns";

export const getRelativeTime = (input: string | Date) => {
  return formatDistance(new Date(input), new Date(), { addSuffix: true });
};

export const formatDateTime = (input: string | Date = new Date()) => {
  return format(new Date(input), "PPp");
};

export const formatTime = (input: string | Date) => {
  return format(new Date(input), "PPPp");
};

export const getDateTimeAfterMinutes = (minutes: string | number) => {
  return format(
    add(new Date(), {
      minutes: Number(minutes) || 0,
    }),
    "PPPp",
  );
};

export const getTimeAfterMinutes = (minutes: string | number) => {
  return format(
    add(new Date(), {
      minutes: Number(minutes) || 0,
    }),
    "p",
  );
};

export const getISODateTimeAfterMinutes = (minutes: string | number) => {
  return formatISO(
    add(new Date(), {
      minutes: Number(minutes) || 0,
    }),
  );
};
