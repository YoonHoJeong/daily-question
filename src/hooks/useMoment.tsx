import moment from 'moment';

export interface MomentValue {
  year: number;
  month: number;
  week: number;
  weekOfMonth: number;
  weekString: string;
}

export type MomentValueType = 'year' | 'month' | 'week' | 'weekString';

export const useMoment = (initVal?: string) => {
  // check type?
  const date = moment(initVal);

  return {
    year: date.year(),
    month: date.month(),
    week: date.week(),
    weekOfMonth: weekOfMonth(date),
    weekString: `${date.year()}-${date.month()}W`,
  } as MomentValue;
};

const weekOfMonth = (m: moment.Moment) => m.week() - moment(m).startOf('month').week() + 1;
