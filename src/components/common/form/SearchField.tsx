import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { forwardRef } from "react";

interface InputSearchProps extends React.ComponentProps<"input"> {
  className?: string;
}

const SearchField = forwardRef<HTMLInputElement, InputSearchProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className={cn("relative w-[250px]", className)}>
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="text-gray-400 w-5 h-5" />
        </div>
        <input
          ref={ref}
          {...props}
          type="search"
          className="block w-full px-4 py-3 text-sm ps-10 text-gray-900 border border-gray-300 rounded-lg  focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
    );
  }
);

SearchField.displayName = "SearchField";

export default SearchField;
