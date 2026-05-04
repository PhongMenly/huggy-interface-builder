import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/calendar")({
  component: CalendarPage,
  head: () => ({
    meta: [
      { title: "Lịch làm việc — Master Sale AI" },
      { name: "description", content: "Báo cáo và lịch sử làm việc hàng ngày" },
    ],
  }),
});

interface DailyReport {
  id: string;
  report_date: string;
  orders_count: number;
  revenue: number;
  notes: string | null;
  status: string;
}

function CalendarPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [reports, setReports] = useState<DailyReport[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });
  const [compareMonth, setCompareMonth] = useState("");
  const [form, setForm] = useState({ orders_count: 0, revenue: 0, notes: "" });
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const fetchReports = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("daily_reports")
      .select("*")
      .eq("user_id", user.id)
      .order("report_date", { ascending: false });
    if (data) setReports(data as DailyReport[]);
  };

  useEffect(() => { fetchReports(); }, [user]);

  // Load form when selecting a date
  useEffect(() => {
    const existing = reports.find((r) => r.report_date === selectedDate);
    if (existing) {
      setForm({ orders_count: existing.orders_count, revenue: existing.revenue, notes: existing.notes || "" });
      setEditingId(existing.id);
    } else {
      setForm({ orders_count: 0, revenue: 0, notes: "" });
      setEditingId(null);
    }
  }, [selectedDate, reports]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    if (editingId) {
      await supabase.from("daily_reports").update({ ...form, updated_at: new Date().toISOString() }).eq("id", editingId);
    } else {
      await supabase.from("daily_reports").insert({ user_id: user.id, report_date: selectedDate, ...form });
    }
    await fetchReports();
    setSaving(false);
  };

  // Monthly summary
  const getMonthSummary = (month: string) => {
    const filtered = reports.filter((r) => r.report_date.startsWith(month));
    const totalOrders = filtered.reduce((a, r) => a + r.orders_count, 0);
    const totalRevenue = filtered.reduce((a, r) => a + Number(r.revenue), 0);
    const daysWorked = filtered.length;
    return { totalOrders, totalRevenue, daysWorked, reports: filtered };
  };

  const currentSummary = useMemo(() => getMonthSummary(currentMonth), [currentMonth, reports]);
  const compareSummary = useMemo(() => compareMonth ? getMonthSummary(compareMonth) : null, [compareMonth, reports]);

  // Calendar grid
  const calendarDays = useMemo(() => {
    const [y, m] = currentMonth.split("-").map(Number);
    const firstDay = new Date(y, m - 1, 1).getDay();
    const daysInMonth = new Date(y, m, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  }, [currentMonth]);

  const reportDatesSet = useMemo(() => new Set(reports.map((r) => r.report_date)), [reports]);

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Đang tải...</p></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <button onClick={() => navigate({ to: "/" })} className="mb-6 text-sm text-purple-400 hover:underline">← Quay lại</button>
        <h1 className="mb-6 text-2xl font-bold text-foreground">📅 Lịch làm việc & Báo cáo</h1>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Calendar */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Lịch tháng</h2>
              <input type="month" value={currentMonth} onChange={(e) => setCurrentMonth(e.target.value)} className="rounded-lg border border-border bg-muted/20 px-3 py-1 text-xs text-foreground" />
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d) => (
                <div key={d} className="py-1 font-medium text-muted-foreground">{d}</div>
              ))}
              {calendarDays.map((day, i) => {
                if (!day) return <div key={i} />;
                const dateStr = `${currentMonth}-${String(day).padStart(2, "0")}`;
                const hasReport = reportDatesSet.has(dateStr);
                const isSelected = dateStr === selectedDate;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`relative rounded-lg py-2 text-xs transition ${isSelected ? "bg-purple-500 text-white font-bold" : hasReport ? "bg-green-500/20 text-green-400" : "text-foreground hover:bg-muted/30"}`}
                  >
                    {day}
                    {hasReport && <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-green-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Report form */}
          <div className="rounded-xl border border-border bg-card p-4">
            <h2 className="mb-3 text-sm font-bold text-foreground">
              📝 Báo cáo ngày {selectedDate}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Số đơn hàng</label>
                <input type="number" min={0} value={form.orders_count} onChange={(e) => setForm({ ...form, orders_count: Number(e.target.value) })} className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Doanh thu (VNĐ)</label>
                <input type="number" min={0} value={form.revenue} onChange={(e) => setForm({ ...form, revenue: Number(e.target.value) })} className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Ghi chú</label>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-foreground" />
              </div>
              <button onClick={handleSave} disabled={saving} className="w-full rounded-xl py-2.5 text-sm font-bold transition hover:scale-[1.02] disabled:opacity-50" style={{ backgroundColor: "#ffd700", color: "#121212" }}>
                {saving ? "Đang lưu..." : editingId ? "Cập nhật báo cáo" : "Gửi báo cáo"}
              </button>
            </div>
          </div>
        </div>

        {/* Monthly summary */}
        <div className="mt-8 rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-sm font-bold text-foreground">📊 Tổng hợp tháng</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-lg bg-purple-500/10 p-3">
              <p className="text-2xl font-bold text-purple-400">{currentSummary.totalOrders}</p>
              <p className="text-xs text-muted-foreground">Tổng đơn</p>
            </div>
            <div className="rounded-lg bg-yellow-500/10 p-3">
              <p className="text-2xl font-bold text-yellow-400">{currentSummary.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Doanh thu (VNĐ)</p>
            </div>
            <div className="rounded-lg bg-green-500/10 p-3">
              <p className="text-2xl font-bold text-green-400">{currentSummary.daysWorked}</p>
              <p className="text-xs text-muted-foreground">Ngày làm</p>
            </div>
          </div>

          {/* Compare */}
          <div className="mt-5">
            <label className="mb-2 block text-xs text-muted-foreground">So sánh với tháng:</label>
            <input type="month" value={compareMonth} onChange={(e) => setCompareMonth(e.target.value)} className="rounded-lg border border-border bg-muted/20 px-3 py-1 text-xs text-foreground" />
            {compareSummary && (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border text-muted-foreground">
                      <th className="py-2 text-left">Chỉ số</th>
                      <th className="py-2 text-right">{currentMonth}</th>
                      <th className="py-2 text-right">{compareMonth}</th>
                      <th className="py-2 text-right">Chênh lệch</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Đơn hàng</td>
                      <td className="py-2 text-right">{currentSummary.totalOrders}</td>
                      <td className="py-2 text-right">{compareSummary.totalOrders}</td>
                      <td className={`py-2 text-right font-bold ${currentSummary.totalOrders >= compareSummary.totalOrders ? "text-green-400" : "text-red-400"}`}>
                        {currentSummary.totalOrders - compareSummary.totalOrders > 0 ? "+" : ""}{currentSummary.totalOrders - compareSummary.totalOrders}
                      </td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Doanh thu</td>
                      <td className="py-2 text-right">{currentSummary.totalRevenue.toLocaleString()}</td>
                      <td className="py-2 text-right">{compareSummary.totalRevenue.toLocaleString()}</td>
                      <td className={`py-2 text-right font-bold ${currentSummary.totalRevenue >= compareSummary.totalRevenue ? "text-green-400" : "text-red-400"}`}>
                        {currentSummary.totalRevenue - compareSummary.totalRevenue > 0 ? "+" : ""}{(currentSummary.totalRevenue - compareSummary.totalRevenue).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2">Ngày làm</td>
                      <td className="py-2 text-right">{currentSummary.daysWorked}</td>
                      <td className="py-2 text-right">{compareSummary.daysWorked}</td>
                      <td className={`py-2 text-right font-bold ${currentSummary.daysWorked >= compareSummary.daysWorked ? "text-green-400" : "text-red-400"}`}>
                        {currentSummary.daysWorked - compareSummary.daysWorked > 0 ? "+" : ""}{currentSummary.daysWorked - compareSummary.daysWorked}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent reports list */}
        <div className="mt-8">
          <h2 className="mb-4 text-sm font-bold text-foreground">📋 Lịch sử báo cáo gần đây</h2>
          <div className="space-y-2">
            {reports.slice(0, 10).map((r) => (
              <button key={r.id} onClick={() => setSelectedDate(r.report_date)} className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left transition hover:border-purple-500/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.report_date}</p>
                  <p className="text-xs text-muted-foreground">{r.notes || "Không có ghi chú"}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-purple-400">{r.orders_count} đơn</p>
                  <p className="text-xs text-yellow-400">{Number(r.revenue).toLocaleString()} VNĐ</p>
                </div>
              </button>
            ))}
            {reports.length === 0 && <p className="text-center text-sm text-muted-foreground">Chưa có báo cáo nào</p>}
          </div>
        </div>
      </div>
    </div>
  );
}