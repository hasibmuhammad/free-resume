import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { FormField } from "./FormField";
import { inputClassName } from "@/lib/formStyles";
import { EMPTY_DATE } from "@/types/resume";

interface DateRangeFieldProps {
  startDate: DateValueType;
  endDate: DateValueType;
  isCurrent: boolean;
  currentLabel: string;
  onStartChange: (value: DateValueType) => void;
  onEndChange: (value: DateValueType) => void;
  onCurrentChange: (checked: boolean) => void;
}

const datePickerInputClass = inputClassName;

export function DateRangeField({
  startDate,
  endDate,
  isCurrent,
  currentLabel,
  onStartChange,
  onEndChange,
  onCurrentChange,
}: DateRangeFieldProps) {
  return (
    <div className="space-y-3.5">
      <label className="inline-flex cursor-pointer select-none items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <input
          type="checkbox"
          checked={isCurrent}
          onChange={(e) => onCurrentChange(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:outline-none dark:border-slate-600"
        />
        {currentLabel}
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <FormField label="Start">
          <Datepicker
            value={startDate ?? EMPTY_DATE}
            onChange={(value) => onStartChange(value ?? EMPTY_DATE)}
            inputClassName={datePickerInputClass}
            popoverDirection="up"
            useRange={false}
            asSingle
            displayFormat="MMM YYYY"
          />
        </FormField>

        <FormField label="End">
          {isCurrent ? (
            <input
              value="Present"
              disabled
              readOnly
              className={`${inputClassName} cursor-not-allowed text-slate-400`}
            />
          ) : (
            <Datepicker
              value={endDate ?? EMPTY_DATE}
              onChange={(value) => onEndChange(value ?? EMPTY_DATE)}
              inputClassName={datePickerInputClass}
              popoverDirection="up"
              useRange={false}
              asSingle
              displayFormat="MMM YYYY"
            />
          )}
        </FormField>
      </div>
    </div>
  );
}
