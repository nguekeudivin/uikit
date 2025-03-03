import { useState } from "react";

export function useValues() {
  const [values, setValues] = useState<any>({});
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

export function useArray(defaultValues: any[] = []) {
  const [arr, setArr] = useState<any>(defaultValues);

  const add = (item: any) => {
    let temp: any[] = [];
    setArr((prev: any) => {
      temp = [...prev, item];
      return temp;
    });

    return temp;
  };

  const remove = (predicate: any) => {
    let temp: any[] = [];
    setArr((prev: any) => {
      temp = prev.filter((item: any) => !predicate(item));
      return temp;
    });
    return temp;
  };

  return { add, remove, items: arr, setItems: setArr };
}
