import { Timestamp } from "firebase/firestore";

export default function TimeElapsed(date: Timestamp): string {
  const now: number = Timestamp.now().toMillis();
  const timeDiff: number = now - date.toMillis();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${Math.max(seconds, 1)}s`;
  } else if (minutes < 60) {
    return `${Math.max(minutes, 1)}m`;
  } else if (hours < 24) {
    return `${Math.max(hours, 1)}h`;
  } else if (days < 7) {
    return `${Math.max(days, 1)}d`;
  } else if (weeks < 52) {
    return `${Math.max(weeks, 1)}w`;
  } else {
    return `${Math.max(years, 1)}y`;
  }
}
