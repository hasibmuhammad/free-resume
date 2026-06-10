import { DateValueType } from "react-tailwindcss-datepicker";
import { EMPTY_DATE } from "@/types/resume";

function coerceToDate(value: unknown): Date | null {
  if (value == null || value === "") return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  }
  return null;
}

/** Restore datepicker values after JSON/localStorage or PDF import. */
export function normalizeDateValue(value: unknown): DateValueType {
  if (value == null) return EMPTY_DATE;

  if (
    typeof value === "string" ||
    typeof value === "number" ||
    value instanceof Date
  ) {
    const date = coerceToDate(value);
    return date ? { startDate: date, endDate: null } : EMPTY_DATE;
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    if ("startDate" in record || "endDate" in record) {
      return {
        startDate: coerceToDate(record.startDate),
        endDate: coerceToDate(record.endDate),
      };
    }
  }

  return EMPTY_DATE;
}
