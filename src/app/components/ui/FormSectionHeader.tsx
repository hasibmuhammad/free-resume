import { ReactNode } from "react";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";
import EyeClose from "../Icons/EyeClose";
import EyeOpen from "../Icons/EyeOpen";
import { iconButtonClassName } from "@/lib/formStyles";

interface FormSectionHeaderProps {
  title: string;
  description?: string;
  showMoveUp?: boolean;
  showMoveDown?: boolean;
  isVisible?: boolean;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onToggleVisibility?: () => void;
  actions?: ReactNode;
}

export function FormSectionHeader({
  title,
  description,
  showMoveUp,
  showMoveDown,
  isVisible,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
  actions,
}: FormSectionHeaderProps) {
  const hasActions =
    showMoveUp || showMoveDown || onToggleVisibility || actions;

  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{description}</p>
        )}
        {isVisible === false && (
          <p className="mt-1 text-xs font-medium text-amber-600">
            Hidden in preview
          </p>
        )}
      </div>

      {hasActions && (
        <div className="flex shrink-0 items-center gap-0.5 rounded-lg bg-gradient-to-b from-slate-50 to-white p-0.5 ring-1 ring-slate-200/80 dark:from-slate-800 dark:to-slate-900 dark:ring-slate-700/80">
          {actions}
          {showMoveUp && onMoveUp && (
            <button
              type="button"
              onClick={onMoveUp}
              className={iconButtonClassName}
              aria-label="Move section up"
            >
              <ArrowUp />
            </button>
          )}
          {showMoveDown && onMoveDown && (
            <button
              type="button"
              onClick={onMoveDown}
              className={iconButtonClassName}
              aria-label="Move section down"
            >
              <ArrowDown />
            </button>
          )}
          {onToggleVisibility && (
            <button
              type="button"
              onClick={onToggleVisibility}
              className={iconButtonClassName}
              aria-label={isVisible ? "Hide section" : "Show section"}
            >
              {isVisible ? <EyeOpen /> : <EyeClose />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
