import { useState } from "react";

export const useForm = (initialValue?: any) => {
  const [form, setForm] = useState({ ...initialValue });

  return {
    form,
    setForm,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
    },
  };
};
