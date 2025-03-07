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
          Object.entries(values).filter(([k, v]: any) => k != name)
        )
      );
    }
  };

  const safeSetValues = (
    mutator: MutatorType<T> | ValuesType<T>,
    predicate = (key: IdType, val: any) => {
      return val != undefined && val != null;
    }
  ) => {
    let newValues = {};
    if (typeof mutator == "function") {
      update((values) => {
        // purify the values. remove all null and undefined.
        newValues = Object.fromEntries(
          Object.entries((mutator as MutatorType<T>)(values)).filter(
            ([key, val]: any) => predicate(key, val)
          )
        );
        return newValues;
      });
      return newValues;
    } else {
      update((values) => {
        // purify the values. remove all null and undefined.
        newValues = Object.fromEntries(
          Object.entries(mutator).filter(([key, val]: any) =>
            predicate(key, val)
          )
        );
        return newValues;
      });
    }
  };

  const setValues = (mutator: (values: ValuesType<T>) => ValuesType<T>) => {
    let newValues = values;
    if (typeof mutator == "function") {
      update((values) => {
        newValues = mutator(values);
        return newValues;
      });
    } else {
      update(values);
    }

    return newValues;
  };

  return { values, setValues, safeSetValues, setValue };
}
