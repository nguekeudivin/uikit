import { X } from "lucide-react";
import { useState } from "react";

export function useSimpleForm({
  defaultValues,
  schema,
}: {
  defaultValues: any;
  schema?: any;
}) {
  const [values, setValues] = useState<any>(defaultValues);
  const [errors, setErrors] = useState<any>({});
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

  function validate() {
    if (schema != undefined) {
      const result = schema.safeParse(values);
      if (!result.success) {
        const errorObj: { [key: string]: string } = {};
        result.error.errors.forEach((err: any) => {
          errorObj[err.path[0]] = err.message;
        });
        setErrors(errorObj);
        return Promise.reject(errorObj);
      } else {
        setErrors({});
        return Promise.resolve(result.data);
      }
    } else {
      return Promise.resolve(values);
    }
  }

  function check() {
    if (schema != undefined) {
      const result = schema.safeParse(values);
      if (!result.success) {
        const errorObj: { [key: string]: string } = {};
        result.error.errors.forEach((err: any) => {
          errorObj[err.path[0]] = err.message;
        });
        setErrors(errorObj);
        return false;
      } else {
        setErrors({});
        return true;
      }
    } else {
      return true;
    }
  }

  function resetValues() {
    setValues(defaultValues);
  }

  function renderErrors() {
    if (Object.keys(errors).length == 0) return null;

    return (
      <div className="">
        <div
          className="flex p-4 mb-4 text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <div>
            {Object.entries(errors).map(([key, value], index) => (
              <div
                key={`error${key}${index}`}
                className="ms-3 text-sm font-medium"
              >
                {value as string}
              </div>
            ))}
          </div>

          <button
            onClick={() => setErrors({})}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
          >
            <X />
          </button>
        </div>
      </div>
    );
  }
  return {
    setValue,
    setValues,
    values,
    handleChange,
    validate, // validate the form asynchroniously
    check, // to the same thing as validate but is async
    errors,
    setErrors,
    renderErrors,
    resetValues,
  };
}
