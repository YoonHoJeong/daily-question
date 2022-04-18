import { createContext, useContext, useState } from "react";

interface DateFormatContextValue {
  dateFormat: DateFormatType;
  changeDateFormat: (newDF: DateFormatType) => void;
}
const dateFormatContext = createContext<DateFormatContextValue | null>(null);

export const useDateFormat = () => useContext(dateFormatContext);

interface Props {}

export const DateFormatProvider: React.FC<Props> = ({ children }) => {
  const [dateFormat, setDateFormat] = useState<DateFormatType>("weekly");
  const changeDateFormat = (newDF: DateFormatType) => {
    setDateFormat(newDF);
  };
  const contextVal = { dateFormat, changeDateFormat };

  return (
    <dateFormatContext.Provider value={contextVal}>
      {children}
    </dateFormatContext.Provider>
  );
};

export type DateFormatType = "weekly" | "daily" | "monthly";
