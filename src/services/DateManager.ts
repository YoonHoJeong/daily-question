export const calcWeek = (dateObj: Date) => {
  const date = new Date(dateObj);

  date.setDate(date.getDate() - date.getDay() + 1);

  const month = date.getMonth() + 1; // 월
  let week = 0;
  // 주차 계산
  const year = date.getFullYear();

  while (date.getMonth() + 1 === month) {
    week += 1;
    date.setDate(date.getDate() - 7);
  }

  return `${year}-${pad(month)}W${week}`;
};

export const getAllWeeklyDate = (dateObj: Date) => {
  // 해당 주의 월, 화, 수, 목, 금 반환
  const date = new Date(dateObj);
  date.setDate(date.getDate() - date.getDay() + 1);

  const dates = [];
  for (let i = 0; i < 5; i++) {
    dates.push(convertDateUntilDay(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
};
export const getAllMonthlyDate = (dateObj: Date) => {
  // 해당 월의 월, 화, 수, 목, 금 반환
  // 5일 단위, 해당 월이 아닐 수도 있으므로 월도 표시.
  const firstDate = new Date(dateObj);
  firstDate.setDate(1);
  const firstDateDay = firstDate.getDay() !== 0 ? firstDate.getDay() : 7;
  firstDate.setDate(1 - firstDateDay + 1);

  const lastDate = new Date(dateObj);
  lastDate.setMonth(lastDate.getMonth() + 1);
  lastDate.setDate(0);
  const lastDateDay = lastDate.getDay() !== 0 ? lastDate.getDay() : 7;
  lastDate.setDate(lastDate.getDate() - lastDateDay + 1);
  const dates = [];

  while (firstDate <= lastDate) {
    const tmp = new Date(firstDate);
    for (let i = 0; i < 5; i++) {
      dates.push(convertDateUntilDay(tmp));
      tmp.setDate(tmp.getDate() + 1);
    }
    firstDate.setDate(firstDate.getDate() + 7);
  }

  return dates;
};
export const pad = (num: Number): string => {
  return num < 10 ? `0${num}` : `${num}`;
};

export const convertDate = (date: Date) => {
  // convert Date instance into format yyyy-mm-ddThh:mm:ss
  const y = pad(date.getFullYear());
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());
  const h = pad(date.getHours());
  const min = pad(date.getMinutes());
  const sec = pad(date.getSeconds());

  return `${y}-${m}-${d}T${h}:${min}:${sec}`;
};

export const convertDateUntilDay = (date: Date) => {
  // convert Date instance into format yyyy-mm-dd
  const y = pad(date.getFullYear());
  const m = pad(date.getMonth() + 1);
  const d = pad(date.getDate());

  return `${y}-${m}-${d}`;
};

export const getToday = () => {
  const date = new Date();
  const dateStr = convertDate(date).split("T")[0];

  return dateStr;
};

// week's format - yyyy-mmWw

export const getDay = (date: string) => {
  const day = new Date(date).getDay();

  switch (day) {
    case 0:
      return "일요일";
    case 1:
      return "월요일";
    case 2:
      return "화요일";
    case 3:
      return "수요일";
    case 4:
      return "목요일";
    case 5:
      return "금요일";
    case 6:
      return "토요일";
  }
};
