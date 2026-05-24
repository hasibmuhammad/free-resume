import { InputHTMLAttributes } from "react";
import { FormField } from "./FormField";
import { inputClassName } from "@/lib/formStyles";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function TextInput({ label, className = "", id, ...props }: TextInputProps) {
  const inputId = id ?? props.name;
  return (
    <FormField label={label} htmlFor={inputId}>
      <input
        id={inputId}
        className={`${inputClassName} ${className}`}
        {...props}
      />
    </FormField>
  );
}
