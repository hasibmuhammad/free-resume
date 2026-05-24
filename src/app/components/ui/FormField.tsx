import { ReactNode } from "react";
import { labelClassName } from "@/lib/formStyles";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  hint?: string;
}

export function FormField({
  label,
  htmlFor,
  children,
  className = "",
  hint,
}: FormFieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className={labelClassName}>
        {label}
      </label>
      {children}
      {hint && <p className="text-xs leading-relaxed text-slate-400 dark:text-slate-500">{hint}</p>}
    </div>
  );
}
