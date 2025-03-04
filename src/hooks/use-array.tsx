"use client";

import { useState } from "react";

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
