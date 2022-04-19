import moment from 'moment';
import { useState } from 'react';

export interface UseMomentValue {
  year: () => number;
  month: () => number;
  week: () => number;
  date: () => number;
  formatString: () => string;
  dayString: () => string;
  weekOfMonth: () => number;
  weekString: () => string;
  setWeek: (val: number) => () => void;
  setMonth: (val: number) => () => void;
  datesOfWeek: () => string[];
  datesOfMonth: () => string[];
}

export const useMoment = (initVal?: string) => {
  const [date, setDate] = useState(moment(initVal));

  const reset = () => {
    setDate(() => moment(initVal));
  };

  const setDateWithKey = (key: moment.unitOfTime.All, val: number) => {
    const today = moment();
    const tmpMoment = date.clone();

    if (tmpMoment.year() > today.year()) {
      reset();
    }

    if (tmpMoment.year() === today.year() && val > today[key]()) {
      return;
    }

    setDate(tmpMoment.set(key, val));
  };

  return {
    date,
    setWeek: (val: number) => () => {
      setDateWithKey('week', val);
    },
    setMonth: (val: number) => () => {
      setDateWithKey('month', val);
    },
  };
};

export const formatDate = (m: moment.Moment) => m.format('YYYY-MM-DD');

export const dayString = (day: number) => {
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

export const datesOfWeek = (m: moment.Moment) => {
  const days = [1, 2, 3, 4, 5].map((day) => m.clone().day(day).format('YYYY-MM-DD'));
  return days;
};

export const datesOfMonth = (m: moment.Moment) => {
  const start = m.clone().startOf('month');
  const endOfMonth = m.clone().endOf('month');
  let days: string[] = [];

  while (start <= endOfMonth) {
    days = days.concat(datesOfWeek(start));
    start.add(7, 'day');
  }

  return days;
};

export const weekOfMonth = (m: moment.Moment) => Math.ceil(m.date() / 7);
