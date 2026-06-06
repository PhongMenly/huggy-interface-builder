import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import heroCover from "@/assets/hero-cover-v2.png.asset.json";

interface SaleMasterHeroProps {
  completedRoadmaps: number;
  totalRoadmaps: number;
  onStart: () => void;
}

export function SaleMasterHero({ completedRoadmaps, totalRoadmaps, onStart }: SaleMasterHeroProps) {
  const { user } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || "Bạn";

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-10 text-center sm:py-14">
      {/* Gold radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,215,0,0.18) 0%, rgba(255,215,0,0.06) 35%, transparent 70%)",
        }}
      />

      {/* Workshop chip */}
      <span
        className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider sm:text-sm"
        style={{ borderColor: "rgba(255,215,0,0.4)", color: "#ffd700", backgroundColor: "rgba(255,215,0,0.05)" }}
      >
        <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full" style={{ backgroundColor: "#ffd700" }} />
        SALE MASTER AI · KOL AI SYSTEM
      </span>

      {/* Headline */}
      <h1 className="relative z-10 max-w-3xl text-3xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
        <span style={{ color: "#ffd700" }}>0</span>
        <span className="mx-2 inline-block opacity-70" style={{ color: "#ffd700" }}>→</span>
        <span style={{ color: "#ffd700" }}>MASTER</span>
        <br />
        <span className="text-white">HÀNH TRÌNH </span>
        <span style={{ color: "#ffd700" }}>SALE AI</span>
      </h1>
      <p className="relative z-10 mt-3 text-sm text-gray-400 sm:text-base">
        Lộ trình <span className="font-semibold text-white">5 Level</span> · Kịch bản AI · Chốt đơn · Bứt phá doanh số
      </p>

      {/* Hero cover image */}
      <div className="group relative z-10 mt-8 w-full max-w-3xl">
        <div
          className="pointer-events-none absolute -inset-4 rounded-3xl opacity-60 blur-2xl transition duration-700 group-hover:opacity-90"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,215,0,0.45), transparent 70%)" }}
        />
        <div className="relative aspect-video overflow-hidden rounded-2xl border-2 shadow-2xl transition duration-500 hover:scale-[1.01]"
          style={{ borderColor: "rgba(255,215,0,0.5)", boxShadow: "0 0 60px rgba(255,215,0,0.25)" }}
        >
          <img
            src={heroCover.url}
            alt="Sale Master AI - Hành trình Sale chuyên nghiệp"
            className="block h-full w-full object-cover"
            loading="eager"
          />
        </div>
      </div>

      {/* Welcome line */}
      {user && (
        <p className="relative z-10 mt-6 text-sm text-gray-300 sm:text-base">
          👋 Xin chào <span className="font-bold" style={{ color: "#ffd700" }}>{displayName}</span> — sẵn sàng chinh phục?
        </p>
      )}

      {/* CTA */}
      <button
        onClick={onStart}
        className="relative z-10 mt-6 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-extrabold uppercase tracking-wide shadow-lg transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] sm:px-9 sm:py-4 sm:text-lg"
        style={{ backgroundColor: "#ffd700", color: "#121212" }}
      >
        🚀 BẮT ĐẦU HÀNH TRÌNH
      </button>
      <p className="relative z-10 mt-2 text-xs text-gray-500">
        Hoàn thành 5 Level để mở khoá danh hiệu Sale Master
      </p>

      {/* Stats */}
      <div className="relative z-10 mt-6 flex items-center gap-2 text-xs text-gray-400 sm:text-sm">
        <span className="inline-block h-2 w-2 rounded-full bg-green-400" />
        <span className="font-medium text-white">
          {completedRoadmaps}<span className="text-gray-500">/{totalRoadmaps}</span>
        </span>
        <span>lộ trình hoàn thành</span>
      </div>
    </section>
  );
}