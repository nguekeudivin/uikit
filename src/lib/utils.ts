import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(value: number) {
  const temp = Math.floor(value / 1000);
  return `$${temp}K`;
}

export function kformat(value: number) {
  if (value < 1000) return value;
  if (value % 1000 == 0) {
    return `${(value / 1000).toFixed(0)}k`;
  } else {
    return `${(value / 1000).toFixed(2)}k`;
  }
}

export const formatUriParams = (params: any) => {
  if (Object.entries(params).length == 0) return "";
  return (
    "?" +
    Object.entries(params)
      .filter(([, val]) => {
        if (val + "" == "0") {
          return true;
        } else {
          return val != undefined && val != null && val != "";
        }
      })
      .map(([key, val]) => `${key}=${val}`)
      .join("&")
  );
};

export function paginateList(
  items: any[],
  currentPage: number = 1,
  perPage: number = 20
) {
  // Ensure currentPage is at least 1
  currentPage = Math.max(currentPage, 1);

  // Calculate total pages
  const totalItems = items.length;
  const lastPage = Math.ceil(totalItems / perPage);

  // Ensure currentPage doesn't exceed lastPage
  currentPage = Math.min(currentPage, lastPage);

  // Calculate start and end index for slicing
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;

  // Get the paginated data
  const data = items.slice(startIndex, endIndex);

  return {
    currentPage,
    data,
    lastPage,
    perPage,
    total: items.length,
    allData: items, // In the case of statis pagination.
  };
}

export function sortList(
  list: any[],
  attribute: string,
  order: string = "asc"
) {
  return list.sort((a, b) => {
    const valA = a[attribute];
    const valB = b[attribute];

    // Handle null or undefined values
    if (valA == null && valB == null) return 0;
    if (valA == null) return order === "asc" ? 1 : -1;
    if (valB == null) return order === "asc" ? -1 : 1;

    // Sort dates
    if (valA instanceof Date && valB instanceof Date) {
      return order === "asc"
        ? valA.getTime() - valB.getTime()
        : valB.getTime() - valA.getTime();
    }

    // Sort numbers
    if (typeof valA === "number" && typeof valB === "number") {
      return order === "asc" ? valA - valB : valB - valA;
    }

    // Sort strings (case-insensitive)
    if (typeof valA === "string" && typeof valB === "string") {
      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return 0; // Fallback for unhandled types
  });
}

export function readableDate(date: Date) {
  const today = format(new Date(), "MMM, dd yyyy");
  if (format(date, "MMM, dd yyyy") == today) {
    return format(date, "HH:mm");
  } else {
    return format(date, "MMM, dd yyyy");
  }
}

export function fullReadableDate(date: Date) {
  const today = format(new Date(), "MMM, dd yyyy");
  if (format(date, "MMM, dd yyyy") == today) {
    return format(date, "HH:mm");
  } else {
    return format(date, "MMM, dd yyyy, HH:mm");
  }
}

export function formatSize(sizeInKb: number) {
  if (sizeInKb >= 1024) {
    const sizeInMb = (sizeInKb / 1024).toFixed(2);
    return `${sizeInMb} MB`;
  } else {
    return `${sizeInKb} KB`;
  }
}

const emailDomains = ["gmail.com", "outlook.com", "yahoo.com", "hotmail.com"];

export const getEmailSuggestions = (input: string): string[] => {
  // Split the input by '@' to differentiate the username and domain
  const [username, domainPart] = input.split("@");

  const suggestions: string[] = [];

  // Case 1: User has typed a complete valid email or a partial username
  if (domainPart) {
    // If a domain is typed, filter based on the domain
    emailDomains.forEach((domain) => {
      if (domain.startsWith(domainPart)) {
        suggestions.push(`${username}@${domain}`);
      }
    });
  } else {
    // Case 2: User has typed just a username or starts with '@'
    emailDomains.forEach((domain) => {
      if (username) {
        // Propose usernames with all the available domains
        suggestions.push(`${username}@${domain}`);
      } else {
        // If there's no username yet, suggest only domains
        suggestions.push(domain);
      }
    });
  }

  // Case 3: If a complete valid email is typed, return the exact input
  if (input.includes("@") && !suggestions.some((s) => s === input)) {
    suggestions.push(input);
  }

  return suggestions;
};

export function computeCharsByWidth(containerWidth: number, fontSize: number) {
  // Approximate width of a single character (assumes average character width is half of fontSize)
  const charWidth = fontSize * 0.5; // Adjust as needed for specific font families

  // Number of characters that fit in the container width
  return Math.floor(containerWidth / charWidth);
}

export const formatDollars = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export const hexToRGBA = (hex: string, opacity: number) => {
  if (hex != undefined) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else {
    return hex;
  }
};

export const dateFromHourIndex = (index: number, date: Date = new Date()) => {
  //return new Date(`01-01-2025 ${index > 9 ? index : `0${index}`}:00:00`);

  date.setHours(index);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
};

export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const shadeColor = (color: string, shade: number) => {
  color = color.replace(/^#/, "");

  const shadeMap: Record<string | number, number> = {
    50: 0.9,
    100: 0.8,
    200: 0.6,
    300: 0.4,
    400: 0.2,
    500: 0,
    600: -0.2,
    700: -0.4,
    800: -0.6,
    900: -0.8,
  };

  const percent = shadeMap[shade];
  if (percent === undefined) {
    throw new Error("Invalid shade value. Use 50, 100, 200, ..., 900");
  }

  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  r = Math.min(255, Math.max(0, r + r * percent));
  g = Math.min(255, Math.max(0, g + g * percent));
  b = Math.min(255, Math.max(0, b + b * percent));

  return `#${(
    (1 << 24) +
    (Math.round(r) << 16) +
    (Math.round(g) << 8) +
    Math.round(b)
  )
    .toString(16)
    .slice(1)}`;
};

export function formatFileSize(bytes: number) {
  const units = ["Bytes", "kB", "MB", "GB"];
  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }
  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
}

export function copyToClipboard(text: string | number) {
  navigator.clipboard
    .writeText(text as string)
    .then(() => {
      //alert("Text copied to clipboard!");
    })
    .catch(() => {
      //alert("Failed to copy text: " + err);
    });
}

export function hideCreditCardNumber(value: string) {
  return Array.from({ length: 4 }).map((_, i) => {
    const str = value.toString().slice(i * 4, i * 4 + 4);
    if (i != 3)
      return str
        .split("")
        .map(() => "*")
        .join("");
    else return str;
  });
}

export function getTextDimensions(text: any, fontSize: any) {
  // Create a temporary div element
  const div = document.createElement("div");

  // Apply the desired styles to the element
  div.style.position = "absolute";
  div.style.visibility = "hidden";
  div.style.whiteSpace = "nowrap";
  div.style.fontSize = `${fontSize}`;

  // Set the text content
  div.textContent = text;

  // Append the div to the body
  document.body.appendChild(div);

  // Measure the dimensions
  const dimensions = {
    width: div.offsetWidth,
    height: div.offsetHeight,
  };

  // Remove the div from the body
  document.body.removeChild(div);

  return dimensions;
}

function getFontSize(element: HTMLElement) {
  if (element) {
    const computedStyle = window.getComputedStyle(element);
    const currentFontSize = computedStyle.fontSize;
    return currentFontSize;
  } else {
    return "16px";
  }
}

export function getInputTextWidth(input: HTMLInputElement) {
  const { width } = getTextDimensions(input.value, getFontSize(input));
  return width;
}
