import moment from 'moment';
import { useState } from 'react';

export interface UseMomentValue {
  year: number;
  month: number;
  week: number;
  weekOfMonth: number;
  weekString: string;
  setWeek: (val: number) => () => void;
  setMonth: (val: number) => () => void;
  daysOfWeek: string[];
}

export type MomentValueType = 'year' | 'month' | 'week' | 'weekString';

export const useMoment = (initVal?: string) => {
  // check type?
  const [date, setDate] = useState(moment(initVal));

  const setDateWithKey = (key: moment.unitOfTime.All, val: number) => {
    const today = moment();
    if (date.year() === today.year() && val === today[key]()) {
      return;
    }
    date.set(key, val);
    setDate(date.clone());
  };

  const val: UseMomentValue = {
    year: date.year(),
    month: date.month(),
    week: date.week(),
    weekOfMonth: weekOfMonth(date),
    weekString: `${date.year()}-${date.month()}W`,
    setWeek: (val: number) => () => {
      setDateWithKey('week', val);
    },
    setMonth: (val: number) => () => {
      setDateWithKey('month', val);
    },
    daysOfWeek: daysOfWeek(date),
  };

  return val;
};

const daysOfWeek = (m: moment.Moment) => {
  const days = [1, 2, 3, 4, 5].map((day) => m.day(day).format('YYYY-MM-DD'));
  return days;
};

const weekOfMonth = (m: moment.Moment) => Math.ceil(m.date() / 7);
