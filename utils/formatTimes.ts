// utils/formatTime.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export function formatToJakartaTime(dateString: string): string {
  return dayjs.utc(dateString).tz("Asia/Jakarta").format("HH:mm");
}

export function formatToJakartaDate(dateString: string): string {
  return dayjs.utc(dateString).tz("Asia/Jakarta").format("dddd, D MMMM YYYY");
}
