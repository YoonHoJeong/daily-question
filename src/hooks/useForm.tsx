import { useState } from "react";

export function useForm<S>(initialValue: S | (() => S)) {
  const [form, setForm] = useState<S>(initialValue);

  return {
    form,
    setForm,
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (e.currentTarget.type === "checkbox") {
        console.log("checkbox");

        setForm({
          ...form,
          [e.currentTarget.name]: (e.currentTarget as HTMLInputElement).checked,
        });
      } else {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value });
      }
    },
    reset: () => setForm(initialValue),
  };
}
