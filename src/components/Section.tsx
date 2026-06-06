import { useState, type ReactNode } from "react";

interface SectionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Collapsible section with the gold/dark Sale Master aesthetic.
 * Used to break long mission content into tidy, scannable groups.
 */
export function Section({ title, count, defaultOpen = false, children }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="overflow-hidden rounded-xl border bg-card/60 transition-all"
      style={{ borderColor: open ? "rgba(255,215,0,0.4)" : "rgba(255,215,0,0.18)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors hover:bg-yellow-500/5"
      >
        <div className="flex items-center gap-3">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "#ffd700" }}
          />
          <h4 className="text-sm font-bold uppercase tracking-wide text-white">
            {title}
          </h4>
          {typeof count === "number" && count > 0 && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-bold"
              style={{ backgroundColor: "rgba(255,215,0,0.12)", color: "#ffd700" }}
            >
              {count}
            </span>
          )}
        </div>
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          style={{ color: "#ffd700" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="border-t px-4 py-4" style={{ borderColor: "rgba(255,215,0,0.18)" }}>
          <div className="space-y-3">{children}</div>
        </div>
      )}
    </div>
  );
}