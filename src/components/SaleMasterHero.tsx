import { useState } from "react";

interface SaleMasterHeroProps {
  completedRoadmaps: number;
  totalRoadmaps: number;
  onStart: () => void;
}

export function SaleMasterHero({ completedRoadmaps, totalRoadmaps, onStart }: SaleMasterHeroProps) {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-16 text-center">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300">
        🏆 SALE MASTER AI
      </span>
      <h1 className="max-w-3xl text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
        Chào mừng Bạn đến với{" "}
        <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Master Sale AI
        </span>
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted-foreground">
        Hoàn thành từng lộ trình để trở thành Sale chuyên nghiệp của KOL AI System.
        Mỗi nhiệm vụ giúp bạn nắm vững kỹ năng và kiến thức cần thiết.
      </p>
      <button
        onClick={onStart}
        className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg font-bold transition-all hover:scale-105"
        style={{ backgroundColor: "#ffd700", color: "#121212" }}
      >
        🚀 BẮT ĐẦU HÀNH TRÌNH
      </button>
      <p className="mt-4 text-sm text-muted-foreground">
        Tiến trình: {completedRoadmaps}/{totalRoadmaps} lộ trình hoàn thành
      </p>
    </section>
  );
}