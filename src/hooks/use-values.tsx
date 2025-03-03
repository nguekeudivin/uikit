import { useState } from "react";

export function useValues(inputs: any) {
  const [values, setValues] = useState<any>(inputs == undefined ? {} : inputs);
  const setValue = (name: string, value: any) => {
    // When we provide and undefined value we remove the key
    if (value != undefined) {
      setValues((prevValues: any) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      setValues(Object.fromEntries(values).filter(([k, v]: any) => k != name));
    }
  };

  return { values, setValues, setValue };
}
