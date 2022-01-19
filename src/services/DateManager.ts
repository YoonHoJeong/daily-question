function pad(num: Number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

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

export const getToday = () => {
  const date = new Date();
  const dateStr = convertDate(date).split("T")[0];

  return dateStr;
};

// week's format - yyyy-mmWw
