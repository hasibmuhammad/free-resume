import { TextareaHTMLAttributes } from "react";
import { FormField } from "./FormField";
import { textareaClassName } from "@/lib/formStyles";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function TextArea({
  label,
  hint,
  className = "",
  id,
  ...props
}: TextAreaProps) {
  const inputId = id ?? props.name;
  return (
    <FormField label={label} htmlFor={inputId} hint={hint}>
      <textarea
        id={inputId}
        className={`${textareaClassName} ${className}`}
        {...props}
      />
    </FormField>
  );
}
