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

function getFirstMondayOfMonth(date: Date) {
  // date가 토, 일요일이면, 다음 주 월요일부터
  const tmpDate = new Date(date);
  tmpDate.setDate(1);

  if (tmpDate.getDay() === 6) {
    // 1일이 토요일인 경우 다음 주 월요일로 설정.
    tmpDate.setDate(3);
  } else if (tmpDate.getDay() === 0) {
    // 1일이 일요일인 경우 다음 주 월요일로 설정.
    tmpDate.setDate(2);
  }
  while (tmpDate.getDay() !== 1) {
    tmpDate.setDate(tmpDate.getDate() - 1);
  }

  const firstDateOfMonth = tmpDate;

  return firstDateOfMonth;
}

function getLastMondayOfMonth(date: Date) {
  // 1. get the last day of the month
  const tmpDate = new Date(date);
  tmpDate.setMonth(tmpDate.getMonth() + 1);
  tmpDate.setDate(0);

  // 2. calculate the last week's monday
  while (tmpDate.getDay() !== 1) {
    tmpDate.setDate(tmpDate.getDate() - 1);
  }

  const lastMondayOfMonth = tmpDate;

  return lastMondayOfMonth;
}

export const getAllDatesOfMonth = (dateObj: Date) => {
  // 해당 월의 월, 화, 수, 목, 금 반환
  // 5일 단위, 해당 월이 아닐 수도 있으므로 월도 표시.
  const firstMondayOfMonth = getFirstMondayOfMonth(dateObj);
  const lastMondayOfMonth = getLastMondayOfMonth(dateObj);

  const dates = [];
  const pivotDate = new Date(firstMondayOfMonth);

  while (pivotDate <= lastMondayOfMonth) {
    // push all dates except for weekend
    for (let i = 0; i < 5; i++) {
      const tmpDate = new Date(pivotDate);
      tmpDate.setDate(tmpDate.getDate() + i);
      dates.push(convertDateUntilDay(tmpDate));
    }

    // next week
    pivotDate.setDate(pivotDate.getDate() + 7);
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

export const getYearMonth = (year: number, month: number) => {
  const yearMonthString = `${month <= 12 ? year : year + 1}-${pad(
    month <= 12 ? month : month - 12
  )}`;

  return yearMonthString;
};
