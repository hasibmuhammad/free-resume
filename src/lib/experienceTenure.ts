import { normalizeDateValue } from "@/lib/dateValue";
import { ExperienceItem } from "@/types/resume";
import moment from "moment";

interface DateInterval {
  start: moment.Moment;
  end: moment.Moment;
}

function experienceInterval(exp: ExperienceItem): DateInterval | null {
  const start = normalizeDateValue(exp.startDate)?.startDate;
  if (!start) return null;

  const endDate = exp.currentlyWorking
    ? new Date()
    : normalizeDateValue(exp.endDate)?.startDate ?? null;
  if (!endDate) return null;

  const end = moment(endDate).startOf("month");
  const startM = moment(start).startOf("month");
  const endM = end;
  if (!startM.isValid() || !endM.isValid() || endM.isBefore(startM)) {
    return null;
  }

  return { start: startM, end: endM };
}

function mergeIntervals(intervals: DateInterval[]): DateInterval[] {
  if (intervals.length === 0) return [];

  const sorted = [...intervals].sort((a, b) => a.start.valueOf() - b.start.valueOf());
  const merged: DateInterval[] = [{ start: sorted[0].start, end: sorted[0].end }];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current.start.isSameOrBefore(last.end)) {
      if (current.end.isAfter(last.end)) {
        last.end = current.end;
      }
    } else {
      merged.push({ start: current.start, end: current.end });
    }
  }

  return merged;
}

function monthsInInterval(interval: DateInterval): number {
  const months = interval.end.diff(interval.start, "months") + 1;
  return months < 1 ? 1 : months;
}

/** Total unique months of work experience (overlapping roles are not double-counted). */
export function calculateTotalExperienceMonths(
  experiences: ExperienceItem[]
): number {
  const intervals = experiences
    .map(experienceInterval)
    .filter((interval): interval is DateInterval => interval !== null);

  return mergeIntervals(intervals).reduce(
    (total, interval) => total + monthsInInterval(interval),
    0
  );
}

/** Compact total tenure for the Experience section title. Empty when dates are unavailable. */
export function formatExperienceTenureLabel(
  experiences: ExperienceItem[]
): string {
  const totalMonths = calculateTotalExperienceMonths(experiences);
  if (totalMonths <= 0) return "";

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years >= 1) {
    if (months === 0) {
      return `${years} year${years === 1 ? "" : "s"}`;
    }
    return `${years}+ years`;
  }

  return `${months} month${months === 1 ? "" : "s"}`;
}
