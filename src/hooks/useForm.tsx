import { useState } from "react";

export function useForm<S>(initialValue: S | (() => S)) {
  const [form, setForm] = useState<S>(initialValue);

  return {
    form,
    setForm,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
    },
    reset: () => setForm(initialValue),
  };
}
