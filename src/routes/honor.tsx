import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/AppSidebar";

interface MemberStats {
  id: string;
  full_name: string;
  totalOrders: number;
  totalRevenue: number;
}

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
  { orders: 5, title: "Tân binh", reward: "Badge Tân Binh" },
  { orders: 10, title: "Chiến binh", reward: "Badge Chiến Binh" },
  { orders: 25, title: "Sale Pro", reward: "Badge Sale Pro + Thưởng 500K" },
  { orders: 50, title: "Sale Master", reward: "Badge Sale Master + Thưởng 1M" },
  { orders: 100, title: "Sale Legend", reward: "Badge Legend + Thưởng 3M" },
];

const REVENUE_MILESTONES = [
  { revenue: 10_000_000, title: "10 Triệu Club" },
  { revenue: 50_000_000, title: "50 Triệu Club" },
  { revenue: 100_000_000, title: "100 Triệu Club" },
  { revenue: 500_000_000, title: "500 Triệu Club" },
  { revenue: 1_000_000_000, title: "Tỷ Club" },
];

const PHONG_TITLES = [
  { title: "Phong Menly Sale Intern", description: "Mới gia nhập hệ thống, đang học hỏi" },
  { title: "Phong Menly Sale Junior", description: "Hoàn thành Lộ trình 1 + 5 đơn đầu tiên" },
  { title: "Phong Menly Sale Senior", description: "Hoàn thành Lộ trình 2 + 25 đơn" },
  { title: "Phong Menly Sale Master", description: "Hoàn thành tất cả lộ trình + 50 đơn + Doanh thu 100M" },
  { title: "Phong Menly Sale Legend", description: "100 đơn + Doanh thu 500M + Đào tạo được 3 sale mới" },
];

function HonorPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [members, setMembers] = useState<MemberStats[]>([]);
  const isAdmin = user?.email === "phuowngvimmo25@gmail.com";

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
          setTotalOrders(data.reduce((a, r) => a + (r.orders_count ?? 0), 0));
          setTotalRevenue(data.reduce((a, r) => a + Number(r.revenue ?? 0), 0));
        }
      });
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchMembers = async () => {
      const { data: profiles } = await supabase.from("profiles").select("id, full_name");
      if (!profiles) return;
      if (isAdmin) {
        const { data: allReports } = await supabase.from("daily_reports").select("user_id, orders_count, revenue");
        if (!allReports) return;
        const statsMap = new Map<string, { orders: number; revenue: number }>();
        allReports.forEach((r: any) => {
          const prev = statsMap.get(r.user_id) || { orders: 0, revenue: 0 };
          statsMap.set(r.user_id, { orders: prev.orders + (r.orders_count ?? 0), revenue: prev.revenue + Number(r.revenue ?? 0) });
        });
        setMembers(profiles.map((p: any) => {
          const s = statsMap.get(p.id) || { orders: 0, revenue: 0 };
          return { id: p.id, full_name: p.full_name || "Thanh vien", totalOrders: s.orders, totalRevenue: s.revenue };
        }).sort((a, b) => b.totalOrders - a.totalOrders));
      } else {
        setMembers([{ id: user.id, full_name: profiles.find((p: any) => p.id === user.id)?.full_name || "Ban", totalOrders, totalRevenue }]);
      }
    };
    fetchMembers();
  }, [user, isAdmin, totalOrders, totalRevenue]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Đang tải...</p></div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 overflow-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-foreground">BẢNG VINH DANH</h1>
        <p className="mb-8 text-sm font-medium text-muted-foreground">Chinh phục các mốc thành tích để nhận danh hiệu và phần thưởng</p>

        {/* Members list */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-extrabold tracking-tight text-foreground">DANH SACH THANH VIEN</h2>
          <div className="space-y-2">
            {members.map((m) => (
              <div key={m.id} className={`flex items-center justify-between rounded-xl border p-4 transition ${m.id === user?.id ? "border-purple-500/50 bg-purple-500/5" : "border-border bg-card"}`}>
                <p className="text-sm font-bold text-foreground">{m.full_name}</p>
                <div className="flex gap-4 text-right">
                  <div>
                    <p className="text-sm font-bold text-purple-400">{m.totalOrders}</p>
                    <p className="text-[10px] text-muted-foreground">don</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-yellow-400">{m.totalRevenue.toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground">VND</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order milestones */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-extrabold tracking-tight text-foreground">MỐC SỐ ĐƠN</h2>
          <div className="space-y-3">
            {ORDER_MILESTONES.map((m) => {
              const achieved = totalOrders >= m.orders;
              const progress = Math.min(100, (totalOrders / m.orders) * 100);
              return (
                <div key={m.orders} className={`rounded-xl border p-4 transition ${achieved ? "border-green-500/50 bg-green-500/5" : "border-border bg-card"}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-extrabold tracking-wide ${achieved ? "text-green-400" : "text-foreground"}`}>{m.title}</p>
                      <p className="text-xs font-medium text-muted-foreground">{m.orders} đơn — {m.reward}</p>
                    </div>
                    {achieved && <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-extrabold text-green-400">ĐẠT</span>}
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
          <h2 className="mb-4 text-lg font-extrabold tracking-tight text-foreground">MỐC DÒNG TIỀN</h2>
          <div className="space-y-3">
            {REVENUE_MILESTONES.map((m) => {
              const achieved = totalRevenue >= m.revenue;
              const progress = Math.min(100, (totalRevenue / m.revenue) * 100);
              return (
                <div key={m.revenue} className={`rounded-xl border p-4 transition ${achieved ? "border-yellow-500/50 bg-yellow-500/5" : "border-border bg-card"}`}>
                  <div className="mb-2 flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-extrabold tracking-wide ${achieved ? "text-yellow-400" : "text-foreground"}`}>{m.title}</p>
                      <p className="text-xs font-medium text-muted-foreground">{m.revenue.toLocaleString()} VNĐ</p>
                    </div>
                    {achieved && <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-xs font-extrabold text-yellow-400">ĐẠT</span>}
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
          <h2 className="mb-4 text-lg font-extrabold tracking-tight text-foreground">DANH HIỆU PHONG MENLY</h2>
          <div className="space-y-3">
            {PHONG_TITLES.map((t, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-4">
                <p className="text-sm font-extrabold tracking-wide text-foreground">{t.title}</p>
                <p className="mt-1 text-xs font-medium text-muted-foreground">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
      </div>
    </div>
  );
}