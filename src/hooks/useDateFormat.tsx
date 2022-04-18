import { createContext, useContext, useState } from "react";

interface DateFormatContextValue {
  dateFormat: DateFormatType;
  changeDateFormat: (newDF: DateFormatType) => void;
}
const dateFormatContext = createContext<DateFormatContextValue | null>(null);

interface Props {
  initVal: DateFormatType;
}

export const DateFormatProvider: React.FC<Props> = ({
  children,
  initVal = "weekly",
}) => {
  const [dateFormat, setDateFormat] = useState<DateFormatType>(() => initVal);
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

export const useDateFormat = () => useContext(dateFormatContext);

type DateFormatType = "weekly" | "daily" | "monthly";
