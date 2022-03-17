import { convertDateUntilDay, pad } from "./DateManager";

export class CustomDate {
  private dateObj: Date;

  constructor(dateObj: Date) {
    this.dateObj = dateObj;
  }

  getYearMonthWeekDate() {
    return [this.year, this.month, this.week, this.date];
  }

  getAllWeeklyDates() {
    const newDateObj = new Date(this.dateObj);

    newDateObj.setDate(newDateObj.getDate() - newDateObj.getDay() + 1);

    const weeklyDates = [];
    for (let i = 0; i < 5; i++) {
      weeklyDates.push(convertDateUntilDay(newDateObj));
      newDateObj.setDate(newDateObj.getDate() + 1);
    }

    return weeklyDates;
  }

  changeWeek(weekCount: number): CustomDate {
    const tmpDate = new Date(this.dateObj);
    tmpDate.setDate(tmpDate.getDate() + 7 * weekCount); // week ago date

    if (CustomDate.isValidDate(tmpDate)) {
      return new CustomDate(tmpDate);
    }
    return this;
  }

  changeMonth(monthCount: number) {
    const tmpDate = new Date(this.dateObj);
    tmpDate.setMonth(tmpDate.getMonth() + monthCount);

    if (CustomDate.isValidDate(tmpDate)) {
      return new CustomDate(tmpDate);
    }
    return this;
  }

  static isValidDate(newDateObj: Date) {
    if (newDateObj.getTime() < new Date().getTime()) {
      return true;
    }
    return false;
  }

  get obj() {
    return new Date(this.dateObj);
  }
  get year() {
    return this.dateObj.getFullYear();
  }
  get month() {
    return this.dateObj.getMonth() + 1;
  }
  get week() {
    const weekStr = this.weekString;
    return parseInt(weekStr.split("W")[1]);
  }
  get weekString() {
    return CustomDate.calcWeek(this.dateObj);
  }
  get date() {
    return this.dateObj.getDate();
  }
  get day() {
    return this.dateObj.getDay() + 1;
  }

  static convertDateUntilDay(date: Date) {
    // convert Date instance into format yyyy-mm-dd
    const y = pad(date.getFullYear());
    const m = pad(date.getMonth() + 1);
    const d = pad(date.getDate());

    return `${y}-${m}-${d}`;
  }

  static calcWeek(dateObj: Date) {
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
  }
}
