"use client";

import { Search } from "lucide-react";
import { FC } from "react";

interface EmailListingSearchInputProps {
  onInput: (value: string) => void;
}

const EmailListingSearchInput: FC<EmailListingSearchInputProps> = ({
  onInput,
}) => {
  const handleInputChange = (e: any) => {
    onInput(e.target.value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <input
        onChange={handleInputChange}
        type="search"
        className="block w-full px-4 py-2.5 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-primary  focus:border-transparent focus:outline-none"
        placeholder="Search email"
        required
      />
    </div>
  );
};

export default EmailListingSearchInput;
