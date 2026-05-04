import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/honor")({
  component: HonorPage,
  head: () => ({
    meta: [
      { title: "Vinh danh — Master Sale AI" },
      { name: "description", content: "Bảng vinh danh và thành tích sale" },
    ],
  }),
});

const ORDER_MILESTONES = [
  { orders: 5, title: "Tân binh", reward: "Badge Tân Binh", emoji: "🌱" },
  { orders: 10, title: "Chiến binh", reward: "Badge Chiến Binh", emoji: "⚔️" },
  { orders: 25, title: "Sale Pro", reward: "Badge Sale Pro + Thưởng 500K", emoji: "💎" },
  { orders: 50, title: "Sale Master", reward: "Badge Sale Master + Thưởng 1M", emoji: "👑" },
  { orders: 100, title: "Sale Legend", reward: "Badge Legend + Thưởng 3M", emoji: "🏆" },
];

const REVENUE_MILESTONES = [
  { revenue: 10_000_000, title: "10 Triệu Club", emoji: "💰" },
  { revenue: 50_000_000, title: "50 Triệu Club", emoji: "💎" },
  { revenue: 100_000_000, title: "100 Triệu Club", emoji: "🔥" },
  { revenue: 500_000_000, title: "500 Triệu Club", emoji: "👑" },
  { revenue: 1_000_000_000, title: "Tỷ Club", emoji: "🏆" },
];

const PHONG_TITLES = [
  { title: "Phong Menly Sale Intern", description: "Mới gia nhập hệ thống, đang học hỏi", emoji: "🌱" },
  { title: "Phong Menly Sale Junior", description: "Hoàn thành Lộ trình 1 + 5 đơn đầu tiên", emoji: "⭐" },
  { title: "Phong Menly Sale Senior", description: "Hoàn thành Lộ trình 2 + 25 đơn", emoji: "💎" },
  { title: "Phong Menly Sale Master", description: "Hoàn thành tất cả lộ trình + 50 đơn + Doanh thu 100M", emoji: "👑" },
  { title: "Phong Menly Sale Legend", description: "100 đơn + Doanh thu 500M + Đào tạo được 3 sale mới", emoji: "🏆" },
];

function HonorPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("daily_reports")
      .select("orders_count, revenue")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (data) {
          setTotalOrders(data.reduce((a, r) => a + r.orders_count, 0));
          setTotalRevenue(data.reduce((a, r) => a + Number(r.revenue), 0));
        }
      });
  }, [user]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Đang tải...</p></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <button onClick={() => navigate({ to: "/" })} className="mb-6 text-sm text-purple-400 hover:underline">← Quay lại</button>
        <h1 className="mb-2 text-2xl font-bold text-foreground">🏆 Bảng Vinh Danh</h1>
        <p className="mb-8 text-sm text-muted-foreground">Chinh phục các mốc thành tích để nhận danh hiệu và phần thưởng</p>

        {/* Current stats */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div className="rounded-xl border border-purple-500/30 bg-purple-500/10 p-5 text-center">
            <p className="text-3xl font-bold text-purple-400">{totalOrders}</p>
            <p className="text-xs text-muted-foreground">Tổng số đơn</p>
          </div>
          <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5 text-center">
            <p className="text-3xl font-bold text-yellow-400">{totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Tổng doanh thu (VNĐ)</p>
          </div>
        </div>

        {/* Order milestones */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-foreground">📦 Mốc số đơn</h2>
          <div className="space-y-3">
            {ORDER_MILESTONES.map((m) => {
              const achieved = totalOrders >= m.orders;
              const progress = Math.min(100, (totalOrders / m.orders) * 100);
              return (
                <div key={m.orders} className={`rounded-xl border p-4 transition ${achieved ? "border-green-500/50 bg-green-500/5" : "border-border bg-card"}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.emoji}</span>
                      <div>
                        <p className={`text-sm font-bold ${achieved ? "text-green-400" : "text-foreground"}`}>{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.orders} đơn — {m.reward}</p>
                      </div>
                    </div>
                    {achieved && <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-400">✓ Đạt</span>}
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: achieved ? "#4CAF50" : "#a020f0" }} />
                  </div>
                  <p className="mt-1 text-right text-[10px] text-muted-foreground">{totalOrders}/{m.orders}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Revenue milestones */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-foreground">💰 Mốc dòng tiền</h2>
          <div className="space-y-3">
            {REVENUE_MILESTONES.map((m) => {
              const achieved = totalRevenue >= m.revenue;
              const progress = Math.min(100, (totalRevenue / m.revenue) * 100);
              return (
                <div key={m.revenue} className={`rounded-xl border p-4 transition ${achieved ? "border-yellow-500/50 bg-yellow-500/5" : "border-border bg-card"}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{m.emoji}</span>
                      <div>
                        <p className={`text-sm font-bold ${achieved ? "text-yellow-400" : "text-foreground"}`}>{m.title}</p>
                        <p className="text-xs text-muted-foreground">{m.revenue.toLocaleString()} VNĐ</p>
                      </div>
                    </div>
                    {achieved && <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-bold text-yellow-400">✓ Đạt</span>}
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: achieved ? "#ffd700" : "#a020f0" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phong Menly titles */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">🎖️ Danh hiệu Phong Menly</h2>
          <div className="space-y-3">
            {PHONG_TITLES.map((t, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
                <span className="text-2xl">{t.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-foreground">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}