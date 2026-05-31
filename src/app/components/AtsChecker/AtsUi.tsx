import { AtsCheck, AtsCheckStatus, getAtsScoreColor } from "@/lib/atsScore";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
  HiOutlineXCircle,
} from "react-icons/hi2";

export const STATUS_ICON: Record<
  AtsCheckStatus,
  { Icon: typeof HiOutlineCheckCircle; className: string }
> = {
  pass: { Icon: HiOutlineCheckCircle, className: "text-emerald-500" },
  warn: { Icon: HiOutlineExclamationTriangle, className: "text-amber-500" },
  fail: { Icon: HiOutlineXCircle, className: "text-red-500" },
};

export function ScoreRing({
  score,
  size = "md",
}: {
  score: number;
  size?: "xs" | "sm" | "md" | "lg";
}) {
  const colors = getAtsScoreColor(score);
  const config = {
    xs: { box: 30, r: 12, stroke: 2.5, text: "text-[9px]" },
    sm: { box: 36, r: 14, stroke: 2.5, text: "text-[10px]" },
    md: { box: 44, r: 18, stroke: 3, text: "text-xs" },
    lg: { box: 64, r: 26, stroke: 4, text: "text-lg" },
  }[size];
  const circumference = 2 * Math.PI * config.r;
  const offset = circumference - (score / 100) * circumference;
  const center = config.box / 2;

  return (
    <div
      className="relative flex shrink-0 items-center justify-center"
      style={{ width: config.box, height: config.box }}
    >
      <svg className="-rotate-90" width={config.box} height={config.box} aria-hidden>
        <circle
          cx={center}
          cy={center}
          r={config.r}
          fill="none"
          className="stroke-slate-200 dark:stroke-slate-700"
          strokeWidth={config.stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={config.r}
          fill="none"
          className={`${colors.ring} transition-all duration-500 ease-out`}
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={`absolute font-bold ${config.text} ${colors.text}`}>
        {score}
        {size !== "sm" && size !== "xs" ? (
          <span className="text-[8px] font-semibold opacity-80">%</span>
        ) : null}
      </span>
    </div>
  );
}

export function CheckRow({
  check,
  compact = false,
}: {
  check: AtsCheck;
  compact?: boolean;
}) {
  const { Icon, className } = STATUS_ICON[check.status];

  return (
    <li className={`flex gap-2.5 ${compact ? "py-1.5" : "py-2"}`}>
      <Icon aria-hidden className={`mt-0.5 h-4 w-4 shrink-0 ${className}`} />
      <div className="min-w-0">
        <p
          className={`font-medium text-slate-800 dark:text-slate-200 ${compact ? "text-xs" : "text-sm"
            }`}
        >
          {check.label}
        </p>
        {!compact ? (
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {check.detail}
          </p>
        ) : null}
      </div>
    </li>
  );
}

export function ParseRateBar({
  parseRate,
  className = "",
}: {
  parseRate: number;
  className?: string;
}) {
  const colors = getAtsScoreColor(parseRate);

  return (
    <div className={className}>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className={`h-full rounded-full transition-all duration-500 ${colors.bar}`}
          style={{ width: `${Math.max(0, Math.min(100, parseRate))}%` }}
        />
      </div>
    </div>
  );
}
