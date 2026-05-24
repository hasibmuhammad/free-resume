import { ReactNode } from "react";
import ArrowDown from "../Icons/ArrowDown";
import ArrowUp from "../Icons/ArrowUp";
import Close from "../Icons/Close";
import { iconButtonClassName } from "@/lib/formStyles";

interface ItemActionsProps {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
  canRemove?: boolean;
}

function ItemActions({
  index,
  total,
  onMoveUp,
  onMoveDown,
  onRemove,
  canRemove = true,
}: ItemActionsProps) {
  const showControls = total > 1;

  if (!showControls) return null;

  return (
    <div className="flex items-center justify-end gap-0.5 -mt-1 mb-1">
      {index > 0 && (
        <button
          type="button"
          onClick={onMoveUp}
          className={iconButtonClassName}
          aria-label="Move up"
        >
          <ArrowUp />
        </button>
      )}
      {index < total - 1 && (
        <button
          type="button"
          onClick={onMoveDown}
          className={iconButtonClassName}
          aria-label="Move down"
        >
          <ArrowDown />
        </button>
      )}
      {canRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={`${iconButtonClassName} hover:text-red-500 hover:bg-red-50`}
          aria-label="Remove"
        >
          <Close />
        </button>
      )}
    </div>
  );
}

interface RepeatableItemCardProps extends ItemActionsProps {
  children: ReactNode;
}

export function RepeatableItemCard({
  children,
  ...actionProps
}: RepeatableItemCardProps) {
  return (
    <div className="mb-5 space-y-3.5 border-b border-slate-100 pb-5 last:mb-0 last:border-b-0 last:pb-0 dark:border-slate-800">
      <ItemActions {...actionProps} />
      {children}
    </div>
  );
}
