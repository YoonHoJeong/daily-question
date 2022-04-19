import moment from 'moment';
import { useMemo, useState } from 'react';

export interface UseMomentValue {
  year: number;
  month: number;
  week: number;
  date: number;
  dayString: string;
  weekOfMonth: number;
  weekString: string;
  setWeek: (val: number) => () => void;
  setMonth: (val: number) => () => void;
  datesOfWeek: string[];
}

export const useMoment = (initVal?: string) => {
  const [date, setDate] = useState(moment(initVal));

  const setDateWithKey = (key: moment.unitOfTime.All, val: number) => {
    const today = moment();
    const tmpMoment = date.clone();
    if (tmpMoment.year() === today.year() && val > today[key]()) {
      return;
    }
    tmpMoment.set(key, val);
    setDate(tmpMoment);
  };

  const val: UseMomentValue = {
    year: date.year(),
    month: date.month(),
    week: date.week(),
    date: date.date(),
    dayString: useMemo(() => dayString(date.day()), [date]),
    weekOfMonth: weekOfMonth(date),
    weekString: `${date.year()}-${date.month()}W`,
    setWeek: (val: number) => () => {
      setDateWithKey('week', val);
    },
    setMonth: (val: number) => () => {
      setDateWithKey('month', val);
    },
    datesOfWeek: daysOfWeek(date),
  };

  return val;
};

const dayString = (day: number) => {
  switch (day) {
    case 1:
      return '월';
    case 2:
      return '화';
    case 3:
      return '수';
    case 4:
      return '목';
    case 5:
      return '금';
    case 6:
      return '토';
    default:
      return '일';
  }
};

const daysOfWeek = (m: moment.Moment) => {
  const days = [1, 2, 3, 4, 5].map((day) => m.day(day).format('YYYY-MM-DD'));
  return days;
};

const weekOfMonth = (m: moment.Moment) => Math.ceil(m.date() / 7);
