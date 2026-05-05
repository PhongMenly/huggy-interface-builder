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
        <h2 className="text-lg font-semibold text-foreground">Năng lực của bạn</h2>
        <span className="text-sm font-medium text-purple-400">
          {roadmaps.filter((_, i) => {
            const r = roadmaps[i];
            return r.missions.every((m) => completedMissions.has(m.id));
          }).length}/{roadmaps.length} hoàn thành
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            backgroundColor: "#a020f0",
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
              className={`flex flex-col items-center gap-1 rounded-xl px-4 py-3 text-center transition-all sm:min-w-[140px] ${
                isActive
                  ? "border-2 border-purple-500 bg-purple-500/20"
                  : unlocked
                    ? "border border-border bg-card hover:border-purple-500/50"
                    : "cursor-not-allowed border border-border/50 bg-card/50 opacity-60"
              }`}
            >
              <div className="flex items-center gap-2">
                {isDone ? (
                  <span className="text-lg">✅</span>
                ) : unlocked ? (
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold" style={{ backgroundColor: "#a020f0", color: "#fff" }}>
                    {roadmap.number}
                  </span>
                ) : (
                  <span className="text-lg">🔒</span>
                )}
              </div>
              <span className={`text-xs font-medium ${unlocked ? "text-foreground" : "text-muted-foreground"}`}>
                LT {roadmap.number}
              </span>
              {unlocked && (
                <span className="text-[10px] text-muted-foreground">
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