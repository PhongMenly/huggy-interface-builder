import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

interface SaleMasterHeroProps {
  completedRoadmaps: number;
  totalRoadmaps: number;
  onStart: () => void;
}

export function SaleMasterHero({ completedRoadmaps, totalRoadmaps, onStart }: SaleMasterHeroProps) {
  const { user, signOut } = useAuth();
  const [showVideo, setShowVideo] = useState(true);

  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />

      {/* Top nav */}
      <div className="absolute right-4 top-4 z-10 flex items-center gap-3">
        {user ? (
          <>
            <Link to="/calendar" className="rounded-lg bg-purple-500/20 px-3 py-1.5 text-xs font-medium text-purple-300 transition hover:bg-purple-500/30">📅 Lịch làm việc</Link>
            <Link to="/honor" className="rounded-lg bg-yellow-500/20 px-3 py-1.5 text-xs font-medium text-yellow-300 transition hover:bg-yellow-500/30">🏆 Vinh danh</Link>
            <Link to="/profile" className="rounded-lg bg-muted/30 px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted/50">👤 Hồ sơ</Link>
          </>
        ) : (
          <Link to="/login" className="rounded-lg px-4 py-1.5 text-xs font-bold transition hover:scale-105" style={{ backgroundColor: "#ffd700", color: "#121212" }}>Đăng nhập</Link>
        )}
      </div>

      {/* YouTube video */}
      {showVideo && (
        <div className="relative z-10 mb-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-border shadow-2xl">
          <div className="relative pb-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube.com/embed/K2H9p7IGhdo?autoplay=1&rel=0"
              title="Master Sale AI Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <button
            onClick={() => setShowVideo(false)}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-xs text-white hover:bg-black/80"
          >
            ✕
          </button>
        </div>
      )}

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