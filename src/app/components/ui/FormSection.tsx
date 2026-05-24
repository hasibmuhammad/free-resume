import { ReactNode } from "react";
import { addButtonClassName } from "@/lib/formStyles";

interface AddItemButtonProps {
  label: string;
  onClick: () => void;
}

export function AddItemButton({ label, onClick }: AddItemButtonProps) {
  return (
    <button type="button" onClick={onClick} className={addButtonClassName}>
      <span className="text-lg leading-none">+</span>
      {label}
    </button>
  );
}

interface FormSectionProps {
  children: ReactNode;
}

export function FormSection({ children }: FormSectionProps) {
  return <div className="space-y-3.5">{children}</div>;
}

interface FormBlockProps {
  children: ReactNode;
}

export function FormBlock({ children }: FormBlockProps) {
  return <section className="space-y-4">{children}</section>;
}
