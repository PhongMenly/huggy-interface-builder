import { useState, useEffect, useRef } from "react";
import type { Mission } from "@/lib/missions-data";
import { MissionContent } from "./MissionContent";
import { ChecklistItem } from "./ChecklistItem";

interface MissionCardProps {
  mission: Mission;
  isLocked: boolean;
  isCompleted: boolean;
  checkedItems: Set<string>;
  onToggleCheck: (missionId: string, itemId: string, checked: boolean) => void;
  onMissionCompleted?: (missionId: string) => void;
}

export function MissionCard({
  mission,
  isLocked,
  isCompleted,
  checkedItems,
  onToggleCheck,
  onMissionCompleted,
}: MissionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const completedCount = mission.checklist.filter((c) => checkedItems.has(c.id)).length;
  const totalCount = mission.checklist.length;
  const wasCompleted = useRef(isCompleted);

  useEffect(() => {
    if (!wasCompleted.current && isCompleted) {
      // Auto-collapse after short delay and notify parent
      const timer = setTimeout(() => {
        setIsExpanded(false);
        onMissionCompleted?.(mission.id);
      }, 800);
      return () => clearTimeout(timer);
    }
    wasCompleted.current = isCompleted;
  }, [isCompleted, mission.id, onMissionCompleted]);

  if (isLocked) {
    return (
      <div className="rounded-xl border border-border/50 bg-card/50 p-4 opacity-60">
        <div className="flex items-center justify-center gap-3">
          <span className="text-lg">🔒</span>
          <div className="text-center">
            <p className="text-sm font-medium text-muted-foreground">
              {mission.emoji} {mission.title}
            </p>
            <p className="text-xs text-muted-foreground">
              Hoàn thành nhiệm vụ trước để mở khóa
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-muted/20"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{
            backgroundColor: isCompleted ? "rgba(76, 175, 80, 0.2)" : "rgba(160, 32, 240, 0.2)",
            color: isCompleted ? "#4CAF50" : "#a020f0",
          }}
        >
          {isCompleted ? "✓" : mission.number}
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-foreground">
            {mission.emoji} {mission.title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
            {mission.description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isCompleted && (
            <span className="text-xs text-muted-foreground">
              {completedCount}/{totalCount}
            </span>
          )}
          <svg
            className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="border-t border-border px-4 pb-5 pt-4">
          {/* Description */}
          <div className="mb-5 rounded-lg bg-purple-500/5 p-3">
            <p className="text-sm text-muted-foreground">{mission.description}</p>
          </div>

          {/* Mission Content */}
          <MissionContent mission={mission} />

          {/* Checklist */}
          <div className="mt-6 border-t border-border pt-4">
            <p className="mb-3 text-xs font-semibold text-foreground">
              ✅ Xác nhận hoàn thành:
            </p>
            <div className="space-y-1">
              {mission.checklist.map((item) => (
                <ChecklistItem
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  checked={checkedItems.has(item.id)}
                  onChange={(id, checked) => onToggleCheck(mission.id, id, checked)}
                />
              ))}
            </div>

            {/* Completion button */}
            {completedCount < totalCount ? (
              <div className="mt-4 rounded-lg bg-muted/30 p-3 text-center">
                <p className="text-xs text-muted-foreground">
                  ✨ Hoàn thành checklist để tiếp tục ({completedCount}/{totalCount})
                </p>
              </div>
            ) : (
              <div className="mt-4 rounded-lg bg-green-500/10 p-3 text-center">
                <p className="text-xs font-semibold text-green-400">
                  🎉 Nhiệm vụ hoàn thành! Tiếp tục nhiệm vụ tiếp theo.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}