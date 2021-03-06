// date.getMonth() gets months from index 0
import { format } from "timeago.js";

const monthConverter = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
};

const isLast24Hrs = date => {
  const timeStamp = Math.round(new Date().getTime() / 1000);
  const timeStampYesterday = timeStamp - 24 * 3600;
  return date >= new Date(timeStampYesterday * 1000).getTime();
};

export const dateFormatter = dateString => {
  const date = new Date(dateString);

  if (isLast24Hrs(date)) {
    return format(date);
  }

  return `${date.getDate()} ${
    monthConverter[date.getMonth()]
  } ${date.getFullYear()} ${date.getHours()}:${(date.getMinutes() < 10
    ? "0"
    : "") + date.getMinutes()}`;
};
