import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import { roadmaps } from "@/lib/missions-data";
import { SaleMasterHero } from "@/components/SaleMasterHero";
import { ProgressTracker } from "@/components/ProgressTracker";
import { MissionCard } from "@/components/MissionCard";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sale Master AI — Đào tạo Sale KOL AI System" },
      { name: "description", content: "Ứng dụng đào tạo gamified cho phòng Sale KOL AI System. Hoàn thành từng nhiệm vụ để trở thành Sale chuyên nghiệp." },
    ],
  }),
});

const STORAGE_KEY = "sale-master-ai-progress";

function loadProgress(): Record<string, string[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: Record<string, string[]>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function Index() {
  const [progress, setProgress] = useState<Record<string, string[]>>({});
  const [activeRoadmap, setActiveRoadmap] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const checkedItemsForMission = useCallback(
    (missionId: string) => new Set(progress[missionId] || []),
    [progress]
  );

  const allCompletedMissions = new Set<string>();
  for (const roadmap of roadmaps) {
    for (const mission of roadmap.missions) {
      const checked = new Set(progress[mission.id] || []);
      if (mission.checklist.every((c) => checked.has(c.id))) {
        allCompletedMissions.add(mission.id);
      }
    }
  }

  const completedRoadmaps = roadmaps.filter((r) =>
    r.missions.every((m) => allCompletedMissions.has(m.id))
  ).length;

  const handleToggleCheck = (missionId: string, itemId: string, checked: boolean) => {
    setProgress((prev) => {
      const items = prev[missionId] || [];
      const next = checked
        ? [...items, itemId]
        : items.filter((id) => id !== itemId);
      const updated = { ...prev, [missionId]: next };
      saveProgress(updated);
      return updated;
    });
  };

  const handleStart = () => {
    if (!activeRoadmap) setActiveRoadmap(roadmaps[0].id);
    contentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const isMissionUnlocked = (roadmapIndex: number, missionIndex: number) => {
    // First mission of first roadmap is always unlocked
    if (roadmapIndex === 0 && missionIndex === 0) return true;
    // Check if previous roadmaps are complete
    if (missionIndex === 0) {
      const prevRoadmap = roadmaps[roadmapIndex - 1];
      return prevRoadmap.missions.every((m) => allCompletedMissions.has(m.id));
    }
    // Check if previous mission in same roadmap is complete
    const prevMission = roadmaps[roadmapIndex].missions[missionIndex - 1];
    return allCompletedMissions.has(prevMission.id);
  };

  const currentRoadmap = activeRoadmap
    ? roadmaps.find((r) => r.id === activeRoadmap)
    : null;
  const currentRoadmapIndex = activeRoadmap
    ? roadmaps.findIndex((r) => r.id === activeRoadmap)
    : -1;

  const [expandedMissionId, setExpandedMissionId] = useState<string | null>(null);

  const handleMissionCompleted = useCallback((missionId: string) => {
    // Find the next mission to auto-expand
    if (!currentRoadmap || currentRoadmapIndex < 0) return;
    const mIndex = currentRoadmap.missions.findIndex((m) => m.id === missionId);
    if (mIndex < 0) return;

    // Next mission in same roadmap
    if (mIndex + 1 < currentRoadmap.missions.length) {
      const nextMission = currentRoadmap.missions[mIndex + 1];
      setExpandedMissionId(nextMission.id);
      // Scroll to next mission after collapse animation
      setTimeout(() => {
        document.getElementById(`mission-${nextMission.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 300);
    } else if (currentRoadmapIndex + 1 < roadmaps.length) {
      // Move to next roadmap
      const nextRoadmap = roadmaps[currentRoadmapIndex + 1];
      setActiveRoadmap(nextRoadmap.id);
      if (nextRoadmap.missions.length > 0) {
        setExpandedMissionId(nextRoadmap.missions[0].id);
      }
    }
  }, [currentRoadmap, currentRoadmapIndex]);

  return (
    <div className="min-h-screen bg-background">
      <SaleMasterHero
        completedRoadmaps={completedRoadmaps}
        totalRoadmaps={roadmaps.length}
        onStart={handleStart}
      />

      <ProgressTracker
        roadmaps={roadmaps}
        completedMissions={allCompletedMissions}
        activeRoadmap={activeRoadmap}
        onSelectRoadmap={setActiveRoadmap}
      />

      <div ref={contentRef} className="mx-auto max-w-3xl px-3 pb-20 pt-4 sm:px-4">
        {currentRoadmap ? (
          <>
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-foreground">
                {currentRoadmap.emoji} {currentRoadmap.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {currentRoadmap.description}
              </p>
            </div>
            <div className="space-y-3">
              {currentRoadmap.missions.map((mission, mIndex) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  isLocked={!isMissionUnlocked(currentRoadmapIndex, mIndex)}
                  isCompleted={allCompletedMissions.has(mission.id)}
                  checkedItems={checkedItemsForMission(mission.id)}
                  onToggleCheck={handleToggleCheck}
                  onMissionCompleted={handleMissionCompleted}
                  autoExpand={expandedMissionId === mission.id}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              👆 Chọn một lộ trình ở trên hoặc nhấn "Bắt đầu hành trình" để bắt đầu
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
