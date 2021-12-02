import { formatDateUntilDay } from "./question";

function calcWeek(dateObj: Date) {
  dateObj.setDate(dateObj.getDate() - dateObj.getDay() + 1);

  const month = dateObj.getMonth() + 1; // 월
  let week = 0;
  // 주차 계산
  const year = dateObj.getFullYear();

  while (dateObj.getMonth() + 1 === month) {
    week += 1;
    dateObj.setDate(dateObj.getDate() - 7);
  }

  return `${year}-${month}W${week}`;
}

export const getToday = () => {
  const date = new Date();
  date.setHours(date.getHours() - 3); // 오전 3시를 기점으로 question 변경

  return formatDateUntilDay(date);
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

  todayWeek: () => {
    return calcWeek(new Date());
  },

  weekDates: (weekStr: string) => {
    // week format : yyyy-mmWw
    const [year, month, week] = weekStr.replace("W", "-").split("-");
    const firstDate = new Date(parseInt(year), parseInt(month) - 1);
    firstDate.setDate(parseInt(week) * 7);
    const day = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
    firstDate.setDate(firstDate.getDate() - day + 1);

    const dates = [];
    for (let i = 0; i < 5; i++) {
      dates.push(formatDateUntilDay(firstDate));
      firstDate.setDate(firstDate.getDate() + 1);
    }

    return dates;
  },
};

export default dateService;
