"use client";

import { IdType } from "@/types/shared";
import { useState } from "react";

type ValuesType<T> = Record<IdType, T>;
type MutatorType<T> = (values: Record<IdType, T>) => Record<IdType, T>;

export function useRecord<T>(inputs: any) {
  const [values, update] = useState<ValuesType<T>>(
    inputs == undefined ? {} : inputs
  );

  const setValue = (name: IdType, value: T) => {
    // When we provide and undefined value we remove the key
    if (value != undefined) {
      update((prevValues: ValuesType<T>) => ({
        ...prevValues,
        [name]: value,
      }));
    } else {
      update(
        Object.fromEntries(
          Object.entries(values).filter((pair: any) => pair[0] != name)
        )
      );
    }
  };

  const safeSetValues = (
    input: MutatorType<T> | ValuesType<T>,
    predicate = (key: IdType, val: any) => {
      return val != undefined && val != null;
    }
  ) => {
    let newValues = {};
    if (typeof input == "function") {
      update((values) => {
        // purify the values. remove all null and undefined.
        newValues = Object.fromEntries(
          Object.entries((input as MutatorType<T>)(values)).filter(
            ([key, val]: any) => predicate(key, val)
          )
        );
        return newValues;
      });
      return newValues;
    } else {
      update(() => {
        // purify the values. remove all null and undefined.
        newValues = Object.fromEntries(
          Object.entries(input).filter(([key, val]: any) => predicate(key, val))
        );
        return newValues;
      });
      return input;
    }
  };

  const setValues = (input: MutatorType<T>) => {
    if (typeof input == "function") {
      let newValues = {};
      update((values) => {
        newValues = input(values);
        return newValues;
      });
      return newValues;
    } else {
      update(input);
      return input;
    }
  };

  return { values, setValues, safeSetValues, setValue };
}
