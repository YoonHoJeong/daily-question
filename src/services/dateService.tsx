import { formatDateUntilDay } from "./question";

export const getToday = () => {
  //   const date = new Date();
  //   date.setDate(date.getDate() + 1);
  //   return formatDateUntilDay(date);
  return formatDateUntilDay(new Date());
};
export const getTomorrow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return formatDateUntilDay(date);
};
