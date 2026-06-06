import { useState, useEffect, useRef } from "react";
import type { Mission } from "@/lib/missions-data";
import { MissionContent } from "./MissionContent";
import { ChecklistItem } from "./ChecklistItem";
import { stripEmoji } from "@/lib/text";

interface MissionCardProps {
  mission: Mission;
  isLocked: boolean;
  isCompleted: boolean;
  checkedItems: Set<string>;
  onToggleCheck: (missionId: string, itemId: string, checked: boolean) => void;
  onMissionCompleted?: (missionId: string) => void;
  autoExpand?: boolean;
}

export function MissionCard({
  mission,
  isLocked,
  isCompleted,
  checkedItems,
  onToggleCheck,
  onMissionCompleted,
  autoExpand,
}: MissionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const completedCount = mission.checklist.filter((c) => checkedItems.has(c.id)).length;
  const totalCount = mission.checklist.length;
  const wasCompleted = useRef(isCompleted);

  useEffect(() => {
    if (autoExpand && !isLocked) {
      setIsExpanded(true);
    }
  }, [autoExpand, isLocked]);

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
      <div className="rounded-xl border p-4 opacity-60" style={{ borderColor: "rgba(255,215,0,0.15)", backgroundColor: "rgba(255,255,255,0.02)" }}>
        <div className="flex items-center justify-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ffd700" }}>Khoá</span>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-400">
              {stripEmoji(mission.title)}
            </p>
            <p className="text-xs text-gray-500">
              Hoàn thành nhiệm vụ trước để mở khóa
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`mission-${mission.id}`}
      className="overflow-hidden rounded-xl border bg-card transition-all"
      style={{ borderColor: isCompleted ? "rgba(76,175,80,0.4)" : "rgba(255,215,0,0.3)" }}
    >
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-yellow-500/5"
      >
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
          style={{
            backgroundColor: isCompleted ? "rgba(76, 175, 80, 0.2)" : "rgba(255,215,0,0.18)",
            color: isCompleted ? "#4CAF50" : "#ffd700",
            border: isCompleted ? "1px solid rgba(76,175,80,0.4)" : "1px solid rgba(255,215,0,0.5)",
          }}
        >
          {mission.number}
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">
            {stripEmoji(mission.title)}
          </h3>
          <p className="mt-0.5 text-xs text-gray-400 line-clamp-1">
            {stripEmoji(mission.description)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isCompleted ? (
            <span className="text-xs font-semibold" style={{ color: "#ffd700" }}>
              {completedCount}/{totalCount}
            </span>
          ) : (
            <span className="text-xs font-bold uppercase tracking-wider text-green-400">Đã xong</span>
          )}
          <svg
            className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            style={{ color: "#ffd700" }}
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
        <div className="border-t px-4 pb-5 pt-4" style={{ borderColor: "rgba(255,215,0,0.2)" }}>
          {/* Description */}
          <div className="mb-5 rounded-lg p-3" style={{ backgroundColor: "rgba(255,215,0,0.06)" }}>
            <p className="text-sm text-gray-300">{stripEmoji(mission.description)}</p>
          </div>

          {/* Mission Content */}
          <MissionContent mission={mission} />

          {/* Checklist */}
          <div className="mt-6 border-t pt-4" style={{ borderColor: "rgba(255,215,0,0.2)" }}>
            <p className="mb-3 text-xs font-bold uppercase tracking-wider" style={{ color: "#ffd700" }}>
              Xác nhận hoàn thành
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
              <div className="mt-4 rounded-lg p-3 text-center" style={{ backgroundColor: "rgba(255,215,0,0.06)" }}>
                <p className="text-xs" style={{ color: "#ffd700" }}>
                  Hoàn thành checklist để tiếp tục ({completedCount}/{totalCount})
                </p>
              </div>
            ) : (
              <div className="mt-4 rounded-lg bg-green-500/10 p-3 text-center">
                <p className="text-xs font-semibold text-green-400">
                  Nhiệm vụ hoàn thành — tiếp tục nhiệm vụ tiếp theo.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}