import { IdType } from "@/types/shared";
import { useState } from "react";

export function useRecord<T>(inputs: any) {
  const [values, setValues] = useState<Record<IdType, T>>(
    inputs == undefined ? {} : inputs
  );
  const setValue = (name: IdType, value: T) => {
    // When we provide and undefined value we remove the key
    if (value != undefined) {
      setValues((prevValues: Record<IdType, T>) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      setValues(
        Object.fromEntries(
          Object.entries(values).filter(([k, v]: any) => k != name)
        )
      );
    }
  };

  return { values, setValues, setValue };
}
