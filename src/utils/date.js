import {
  parseISO,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  isThisWeek,
  isSameYear,
} from "date-fns";

export function formatDueDate(dateString) {
  if (!dateString || dateString === "none") return "";
  const result = parseISO(dateString);

  if (!isSameYear(result, new Date())) {
    return format(result, "MMM d, yyyy");
  }

  if (isToday(result)) {
    return "Today";
  } else if (isTomorrow(result)) {
    return "Tomorrow";
  } else if (isYesterday(result)) {
    return "Yesterday";
  } else if (isThisWeek(result)) {
    return format(result, "EEEE");
  } else {
    return format(result, "MMM d");
  }
}
