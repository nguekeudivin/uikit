"use client";

import { useAway } from "@/hooks/use-away";
import { getEmailSuggestions } from "@/lib/utils";
import { X } from "lucide-react";
import { FC, Ref, useRef, useState } from "react";

interface EmailAddressInputProps {
  group: string;
  emailAddresses: string[];
  addEmailAddress: (group: string, emailAddress: string) => void;
  removeEmailAddress: (group: string, emailAddress: string) => void;
}

const EmailAddressInput: FC<EmailAddressInputProps> = ({
  group,
  emailAddresses,
  addEmailAddress,
  removeEmailAddress,
}) => {
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    const results = getEmailSuggestions(e.target.value) as string[];
    setEmailSuggestions(() => results.slice(0, 5));
    if (results.length) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const autocompleteRef = useRef(undefined);
  useAway(autocompleteRef, () => {
    setShowSuggestions(false);
  });

  const [inputValue, setInputValue] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap bg-gray-50 items-center px-2 pb-2">
      <div className="uppercase pt-2">{group}</div>
      {emailAddresses.length != 0 && (
        <>
          {emailAddresses.map((item, index) => (
            <div
              key={`to-email${index}`}
              className="flex flex-wrap items-center border rounded px-2 py-1.5 ml-2 mt-2"
            >
              <span>{item}</span>
              <button
                onClick={() => {
                  removeEmailAddress(group, item);
                }}
                className="ml-2"
              >
                <X />
              </button>
            </div>
          ))}
        </>
      )}
      <div className="ml-2 mt-2 relative">
        <input
          ref={inputRef}
          value={inputValue}
          id="input"
          onChange={handleInputChange}
          className="block w-full py-2 text-sm bg-gray-100 px-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        {showSuggestions && (
          <div className="absolute z-20 top-11 w-full -ml-4 px-4">
            <ul
              ref={autocompleteRef as unknown as Ref<HTMLUListElement>}
              className="bg-white py-2 rounded shadow border"
            >
              {emailSuggestions.map((item, index) => (
                <li
                  onClick={() => {
                    addEmailAddress(group, item);
                    setShowSuggestions(false);
                    setInputValue("");
                    inputRef.current?.focus();
                  }}
                  className="hover:bg-gray-100 cursor-pointer py-2 px-2 relative"
                  key={`email-suggestions${index}`}
                >
                  <div className="text-sm font-bold">{item}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailAddressInput;
