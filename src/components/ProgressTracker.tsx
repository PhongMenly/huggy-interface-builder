import type { Roadmap } from "@/lib/missions-data";

interface ProgressTrackerProps {
  roadmaps: Roadmap[];
  completedMissions: Set<string>;
  activeRoadmap: string | null;
  onSelectRoadmap: (id: string) => void;
}

export function ProgressTracker({
  roadmaps,
  completedMissions,
  activeRoadmap,
  onSelectRoadmap,
}: ProgressTrackerProps) {
  const isRoadmapUnlocked = (index: number) => {
    if (index === 0) return true;
    const prevRoadmap = roadmaps[index - 1];
    return prevRoadmap.missions.every((m) => completedMissions.has(m.id));
  };

  const getRoadmapProgress = (roadmap: Roadmap) => {
    const completed = roadmap.missions.filter((m) => completedMissions.has(m.id)).length;
    return { completed, total: roadmap.missions.length };
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold uppercase tracking-wide text-white">Năng lực của bạn</h2>
        <span className="text-sm font-semibold" style={{ color: "#ffd700" }}>
          {roadmaps.filter((_, i) => {
            const r = roadmaps[i];
            return r.missions.every((m) => completedMissions.has(m.id));
          }).length}/{roadmaps.length} hoàn thành
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            background: "linear-gradient(90deg, #ffd700, #ffb700)",
            boxShadow: "0 0 12px rgba(255,215,0,0.5)",
            width: `${(roadmaps.reduce((acc, r) => acc + r.missions.filter(m => completedMissions.has(m.id)).length, 0) / roadmaps.reduce((acc, r) => acc + r.missions.length, 0)) * 100}%`,
          }}
        />
      </div>

      {/* Roadmap pills */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {roadmaps.map((roadmap, index) => {
          const unlocked = isRoadmapUnlocked(index);
          const { completed, total } = getRoadmapProgress(roadmap);
          const isActive = activeRoadmap === roadmap.id;
          const isDone = completed === total;

          return (
            <button
              key={roadmap.id}
              onClick={() => unlocked && onSelectRoadmap(roadmap.id)}
              disabled={!unlocked}
              className="flex flex-col items-center gap-1 rounded-xl px-4 py-3 text-center transition-all sm:min-w-[140px]"
              style={{
                border: isActive
                  ? "2px solid #ffd700"
                  : unlocked
                    ? "1px solid rgba(255,215,0,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                backgroundColor: isActive
                  ? "rgba(255,215,0,0.12)"
                  : unlocked
                    ? "rgba(30,30,30,0.6)"
                    : "rgba(255,255,255,0.02)",
                cursor: unlocked ? "pointer" : "not-allowed",
                opacity: unlocked ? 1 : 0.5,
                boxShadow: isActive ? "0 0 20px rgba(255,215,0,0.25)" : undefined,
              }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-black"
                style={{
                  backgroundColor: isDone ? "rgba(76,175,80,0.2)" : "rgba(255,215,0,0.15)",
                  color: isDone ? "#4CAF50" : "#ffd700",
                  border: isDone ? "1px solid rgba(76,175,80,0.5)" : "1px solid rgba(255,215,0,0.5)",
                }}
              >
                {roadmap.number}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: unlocked ? "#ffffff" : "#666" }}>
                Level {roadmap.number}
              </span>
              {unlocked && (
                <span className="text-[10px]" style={{ color: isDone ? "#4CAF50" : "#888" }}>
                  {completed}/{total}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}