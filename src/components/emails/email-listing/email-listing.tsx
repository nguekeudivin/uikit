import { FC, Ref, useEffect, useRef, useState } from "react";
import EmailListingSearchInput from "./email-listing-search-input";
import { readableDate } from "@/lib/utils";
import { Email, EmailIdType } from "@/api-call/types";
import { useAway } from "@/hooks/use-away";

import EmailItem from "./email-item";
import { useEmail } from "@/context/EmailContext";
import { Link, Plus, Router } from "lucide-react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";

interface EmailListingProps {
  actions: any;
}

const EmailListing: FC<EmailListingProps> = ({ actions }) => {
  const [autoCompleteResults, setAutocompleteResults] = useState<Email[]>([]);
  const [showAutocomplete, setShowAutoComplete] = useState<boolean>(false);
  const router = useRouter();

  const {
    pagination,
    currentEmail,
    emails,
    //onSearchInputChange,
    onOpenEmail,
  } = useEmail();

  const onSearchInput = (value: string) => {
    // The handling on the api-call
    // onSearchInputChange(value).then((results) => {
    //   setAutocompleteResults(results.slice(0, 5));
    // });

    // Handle search statistically from emails that are already loaded.
    const results = emails.filter(
      (item) =>
        item.sender.name.includes(value) ||
        item.subject.includes(value) ||
        item.sender.email.includes(value)
    );
    setAutocompleteResults(results.slice(0, 5));
    if (results.length) {
      setShowAutoComplete(true);
    } else {
      setShowAutoComplete(false);
    }
  };

  const autocompleteRef = useRef(undefined);
  useAway(autocompleteRef, () => {
    setShowAutoComplete(false);
  });

  const [selectedItems, setSelectedItems] = useState<EmailIdType[]>([]);
  const selectItem = (emailId: number | string, checked: boolean) => {
    if (checked) {
      if (!selectedItems.includes(emailId))
        setSelectedItems((values) => [...values, emailId]);
    } else {
      if (selectedItems.includes(emailId))
        setSelectedItems((values: any[]) =>
          values.filter((id) => id != emailId)
        );
    }
  };

  const handleSelectedAll = (e: any) => {
    if (e.target.checked) {
      setSelectedItems(() => pagination.data.map((item) => item.id));
    } else {
      setSelectedItems(() => []);
    }
  };

  return (
    <div>
      <header id="listing-header">
        <div className="mt-2 px-4 relative w-full">
          <div className="flex items-center">
            <div className="w-full">
              <EmailListingSearchInput onInput={onSearchInput} />
            </div>
            <div className="ml-2">
              <Button onClick={() => router.push("/inbox/new-message")}>
                <Plus />
              </Button>
            </div>
          </div>

          {showAutocomplete && (
            <div className="absolute z-20 top-11 w-full -ml-4 px-4">
              <ul
                ref={autocompleteRef as unknown as Ref<HTMLUListElement>}
                className="bg-white py-2 rounded shadow border"
              >
                {autoCompleteResults.map((item, index) => (
                  <li
                    className="hover:bg-gray-100 cursor-pointer py-2 px-2 relative"
                    key={`autocompleteResults${index}`}
                    onClick={() => {
                      onOpenEmail(item.id);
                      setShowAutoComplete(false);
                    }}
                  >
                    <div className="text-sm font-bold">{item.subject}</div>
                    <div className="text-xs">{item.sender.name}</div>
                    <div className="text-xs text-gray-700 absolute bottom-2 right-2">
                      {readableDate(new Date(item.createdAt))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* {selectedItems.length != 0 && (
          <div className="pt-4 flex items-center space-x-4">
            {actions.map((item: any, index: number) => (
              <div key={`action${index}`}>
                <div>
                  <button
                    onClick={() => {
                      item.action(selectedItems);
                    }}
                    className="bg-primary/10 p-2 rounded-full hover:bg-gray-100"
                  >
                    {item.icon}
                  </button>
                </div>
                <div className="text-sm text-center pt-1">{item.text}</div>
              </div>
            ))}
          </div>
        )}

        <div className="px-4 flex items-center justify-between mt-4">
          <div className="flex items-center">
            <input
              id="checked-checkbox"
              type="checkbox"
              value=""
              onChange={handleSelectedAll}
              className="w-3 h-3 text-primary bg-primary bg-gray-100 border-gray-200 rounded focus:ring-primary"
            />
            <label
              htmlFor="checked-checkbox"
              className="ms-2 text-sm font-medium "
            >
              Selected All
            </label>
          </div>
          <EmailListingTopPagination
            nextPage={() => onNextPage()}
            previousPage={() => onPreviousPage()}
            pagination={pagination}
          />
        </div> */}
      </header>

      <div id="listing" className="pt-4 overflow-auto">
        {pagination.data.map((item, index) => {
          return (
            <EmailItem
              onOpen={onOpenEmail}
              selectItem={selectItem}
              selected={selectedItems.includes(item.id)}
              email={item}
              key={`inbox${index}`}
              isCurrent={
                currentEmail != undefined && item.id == currentEmail.id
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default EmailListing;
