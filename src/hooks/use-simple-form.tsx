import { useState } from "react";

export function useSimpleForm({ defaultValues }: { defaultValues: any }) {
  const [values, setValues] = useState<any>(defaultValues);
  const setValue = (name: string, value: any) => {
    setValues((prevValues: any) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  function handleChange(e: any) {
    const { name, value } = e.target;
    setValue(name, value);
  }
  return { setValue, values, handleChange };
}
