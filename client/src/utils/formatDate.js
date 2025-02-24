import { format } from "date-fns";

export default function formatWhen(whenString) {
  const date = new Date(whenString);

  if (date instanceof Date && !isNaN(date)) {
    return format(date, "MMM d, yyyy, HH:mm");
  } // Check if it's a valid date (will be true for datetime strings like "2025-02-19T02:24")

  return whenString; // If it's not a valid date, return the original string (e.g., "Next week")
}
