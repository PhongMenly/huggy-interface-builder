import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center px-4 py-10 text-center sm:py-16">
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-15 blur-sm"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />

      {/* Top nav */}
      <div className="absolute right-3 top-3 z-10 flex flex-wrap items-center justify-end gap-2 sm:right-4 sm:top-4 sm:gap-3">
        {user ? (
          <>
            <Link to="/calendar" className="rounded-lg bg-purple-500/20 px-2.5 py-1 text-[11px] font-medium text-purple-300 transition hover:bg-purple-500/30 sm:px-3 sm:py-1.5 sm:text-xs">{isMobile ? "📅" : "📅 Lịch làm việc"}</Link>
            <Link to="/honor" className="rounded-lg bg-yellow-500/20 px-2.5 py-1 text-[11px] font-medium text-yellow-300 transition hover:bg-yellow-500/30 sm:px-3 sm:py-1.5 sm:text-xs">{isMobile ? "🏆" : "🏆 Vinh danh"}</Link>
            <Link to="/profile" className="rounded-lg bg-muted/30 px-2.5 py-1 text-[11px] font-medium text-foreground transition hover:bg-muted/50 sm:px-3 sm:py-1.5 sm:text-xs">{isMobile ? "👤" : "👤 Hồ sơ"}</Link>
            <button onClick={signOut} className="rounded-lg bg-red-500/20 px-2.5 py-1 text-[11px] font-medium text-red-300 transition hover:bg-red-500/30 sm:px-3 sm:py-1.5 sm:text-xs">{isMobile ? "🚪" : "🚪 Đăng xuất"}</button>
          </>
        ) : (
          <Link to="/login" className="rounded-lg px-3 py-1.5 text-xs font-bold transition hover:scale-105 sm:px-4" style={{ backgroundColor: "#ffd700", color: "#121212" }}>Đăng nhập</Link>
        )}
      </div>

      {/* YouTube video */}
      {showVideo && (
        <div className="relative z-10 mb-6 mt-10 w-full max-w-2xl overflow-hidden rounded-xl border border-border shadow-2xl sm:mb-8 sm:mt-0 sm:rounded-2xl">
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
      <h1 className="max-w-3xl text-2xl font-bold leading-tight text-foreground sm:text-3xl md:text-5xl">
        {user ? `Xin chào ${user.user_metadata?.full_name || user.user_metadata?.name || "Bạn"}! ` : "Chào mừng Bạn đến với "}
        <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
          Master Sale AI
        </span>
      </h1>
      {user ? (
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          Chào mừng bạn trở lại! Tiếp tục hoàn thành các nhiệm vụ để trở thành Sale chuyên nghiệp.
        </p>
      ) : (
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          Hoàn thành từng lộ trình để trở thành Sale chuyên nghiệp của KOL AI System.
          Mỗi nhiệm vụ giúp bạn nắm vững kỹ năng và kiến thức cần thiết.
        </p>
      )}
      <button
        onClick={onStart}
        className="mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-bold transition-all hover:scale-105 sm:mt-8 sm:px-8 sm:py-4 sm:text-lg"
        style={{ backgroundColor: "#ffd700", color: "#121212" }}
      >
        🚀 BẮT ĐẦU HÀNH TRÌNH
      </button>
      {user && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
          <span>Đang đăng nhập: {user.email}</span>
          <span className="mx-1">•</span>
          <span>Tiến trình: {completedRoadmaps}/{totalRoadmaps} lộ trình</span>
        </div>
      )}
      {!user && (
        <p className="mt-4 text-sm text-muted-foreground">
          Tiến trình: {completedRoadmaps}/{totalRoadmaps} lộ trình hoàn thành
        </p>
      )}
    </section>
  );
}