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

const dateService = {
  getWeekDateListByDate: (date: Date) => {
    // 받은 date를 바탕으로 그 주의 월 ~ 금요일을 반환
    const day = date.getDay();
    const dateList = [];
    const firstDate = new Date(date);
    firstDate.setDate(firstDate.getDate() - day + 1);
    for (let i = 0; i < 5; i++) {
      dateList.push(formatDateUntilDay(firstDate));
      firstDate.setDate(firstDate.getDate() + 1);
    }

    return dateList;
  },

  getWeekByDate: (date: Date) => {
    const month = date.getMonth() + 1;
    const week = ((date.getDate() / 7) | 0) + 1;
    return `${month}월 ${week}주차`;
  },
};

export default dateService;
