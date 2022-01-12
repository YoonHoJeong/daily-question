import { useState } from "react";

export const useForm = (initialValue: any) => {
  const [form, setForm] = useState({ ...initialValue });
  return {
    form,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
      console.log(form);
    },
  };
};
