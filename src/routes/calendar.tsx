import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/AppSidebar";

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
  mood: number | null;
  priority_tasks: string[];
  daily_todos: { text: string; done: boolean }[];
}

const MOODS = [
  { value: 1, label: "Chưa hài lòng", color: "#ef4444" },
  { value: 2, label: "Bình thường", color: "#f97316" },
  { value: 3, label: "Ổn định", color: "#eab308" },
  { value: 4, label: "Hào hứng", color: "#22c55e" },
  { value: 5, label: "Mạnh mẽ", color: "#a020f0" },
];

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
  const [form, setForm] = useState({ orders_count: 0, revenue: 0, notes: "", mood: 0, priority_tasks: ["", "", "", "", ""] as string[], daily_todos: [] as { text: string; done: boolean }[] });
  const [newTodo, setNewTodo] = useState("");
  const [saving, setSaving] = useState(false);
  const [localTodos, setLocalTodos] = useState<{ text: string; done: boolean }[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingTotals, setExistingTotals] = useState<{ orders_count: number; revenue: number } | null>(null);

  // Admin check
  const isAdmin = user?.email === "phuongvimmo25@gmail.com";
  const [allUsers, setAllUsers] = useState<{ id: string; email: string; full_name: string }[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [allReports, setAllReports] = useState<(DailyReport & { user_id: string })[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const fetchReports = async () => {
    if (!user) return;
    if (isAdmin && selectedUserId) {
      const { data } = await supabase
        .from("daily_reports")
        .select("*")
        .eq("user_id", selectedUserId)
        .order("report_date", { ascending: false });
      if (data) setReports(data.map((d: any) => ({ ...d, priority_tasks: d.priority_tasks || [], daily_todos: d.daily_todos || [] })));
    } else {
      const { data } = await supabase
        .from("daily_reports")
        .select("*")
        .eq("user_id", user.id)
        .order("report_date", { ascending: false });
      if (data) setReports(data.map((d: any) => ({ ...d, priority_tasks: d.priority_tasks || [], daily_todos: d.daily_todos || [] })));
    }
  };

  useEffect(() => { fetchReports(); }, [user, selectedUserId]);

  // Fetch all users for admin
  useEffect(() => {
    if (!isAdmin || !user) return;
    supabase.from("profiles").select("id, full_name").then(({ data }) => {
      if (data) setAllUsers(data.map((p: any) => ({ id: p.id, email: "", full_name: p.full_name || "Thành viên" })));
    });
  }, [isAdmin, user]);

  // Load form when selecting a date
  useEffect(() => {
    const existing = reports.find((r) => r.report_date === selectedDate);
    if (existing) {
      setExistingTotals({ orders_count: existing.orders_count, revenue: existing.revenue });
      setForm({ orders_count: 0, revenue: 0, notes: existing.notes || "", mood: existing.mood || 0, priority_tasks: existing.priority_tasks?.length ? [...existing.priority_tasks, ...Array(5 - existing.priority_tasks.length).fill("")].slice(0, 5) : ["", "", "", "", ""], daily_todos: existing.daily_todos || [] });
      setEditingId(existing.id);
    } else {
      setForm({ orders_count: 0, revenue: 0, notes: "", mood: 0, priority_tasks: ["", "", "", "", ""], daily_todos: [] });
      setExistingTotals(null);
      setEditingId(null);
    }
  }, [selectedDate, reports]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    if (editingId) {
      const newOrders = (existingTotals?.orders_count || 0) + form.orders_count;
      const newRevenue = (existingTotals?.revenue || 0) + form.revenue;
      await supabase.from("daily_reports").update({
        orders_count: newOrders,
        revenue: newRevenue,
        notes: form.notes,
        mood: form.mood || null,
        updated_at: new Date().toISOString(),
      }).eq("id", editingId);
    } else {
      await supabase.from("daily_reports").insert({
        user_id: user.id,
        report_date: selectedDate,
        orders_count: form.orders_count,
        revenue: form.revenue,
        notes: form.notes,
        mood: form.mood || null,
      });
    }
    await fetchReports();
    setSaving(false);
  };

  // Load local todos from localStorage (completely separate from reports)
  useEffect(() => {
    if (!user) return;
    const stored = localStorage.getItem(`todos_${user.id}`);
    if (stored) {
      try { setLocalTodos(JSON.parse(stored)); } catch {}
    }
  }, [user]);

  const saveLocalTodos = (todos: { text: string; done: boolean }[]) => {
    setLocalTodos(todos);
    if (user) localStorage.setItem(`todos_${user.id}`, JSON.stringify(todos));
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
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 overflow-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Lich lam viec & Bao cao</h1>

        {/* Admin user selector */}
        {isAdmin && (
          <div className="mb-6 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-4">
            <h2 className="mb-2 text-sm font-bold text-yellow-400">Quản trị — Xem báo cáo thành viên</h2>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => setSelectedUserId(null)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${!selectedUserId ? "border-yellow-500 bg-yellow-500/20 text-yellow-300" : "border-border text-muted-foreground hover:border-yellow-500/50"}`}>
                Của tôi
              </button>
              {allUsers.filter(u => u.id !== user?.id).map((u) => (
                <button key={u.id} onClick={() => setSelectedUserId(u.id)} className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${selectedUserId === u.id ? "border-yellow-500 bg-yellow-500/20 text-yellow-300" : "border-border text-muted-foreground hover:border-yellow-500/50"}`}>
                  {u.full_name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Daily todos - local only, not saved to report history */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <h2 className="mb-3 text-sm font-bold text-foreground">Danh sach viec can lam</h2>
          <div className="space-y-1.5">
            {localTodos.map((todo, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...localTodos];
                    updated[i] = { ...updated[i], done: !updated[i].done };
                    saveLocalTodos(updated);
                  }}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border text-xs ${todo.done ? "border-green-500 bg-green-500/20 text-green-400" : "border-border text-transparent"}`}
                >
                  x
                </button>
                <span className={`flex-1 text-sm ${todo.done ? "text-muted-foreground line-through" : "text-foreground"}`}>{todo.text}</span>
                <button type="button" onClick={() => saveLocalTodos(localTodos.filter((_, j) => j !== i))} className="text-xs text-red-400 hover:text-red-300">X</button>
              </div>
            ))}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Them viec can lam..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newTodo.trim()) {
                    e.preventDefault();
                    saveLocalTodos([...localTodos, { text: newTodo.trim(), done: false }]);
                    setNewTodo("");
                  }
                }}
                className="flex-1 rounded-lg border border-border bg-muted/20 px-3 py-1.5 text-sm text-foreground"
              />
              <button type="button" onClick={() => { if (newTodo.trim()) { saveLocalTodos([...localTodos, { text: newTodo.trim(), done: false }]); setNewTodo(""); } }} className="rounded-lg border border-purple-500/50 px-3 text-xs font-medium text-purple-400 hover:bg-purple-500/10">+</button>
            </div>
          </div>
        </div>

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
              Bao cao ngay {selectedDate}
            </h2>
            {/* Show existing totals if report exists */}
            {existingTotals && (
              <div className="mb-3 rounded-lg border border-green-500/30 bg-green-500/5 p-3">
                <p className="text-xs font-medium text-green-400 mb-1">Tong hien tai trong ngay</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-foreground">Don: <strong className="text-green-400">{existingTotals.orders_count}</strong></span>
                  <span className="text-foreground">Doanh thu: <strong className="text-yellow-400">{existingTotals.revenue.toLocaleString()} VND</strong></span>
                </div>
                <p className="mt-1 text-[10px] text-muted-foreground">Nhap them so moi de cong don vao tong</p>
              </div>
            )}
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">{editingId ? "Them so don hang" : "So don hang"}</label>
                <input type="text" inputMode="numeric" value={form.orders_count || ""} onChange={(e) => setForm({ ...form, orders_count: Number(e.target.value.replace(/\D/g, "")) || 0 })} placeholder="Nhap so don hang" className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-foreground" />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted-foreground">{editingId ? "Them doanh thu (VND)" : "Doanh thu (VND)"}</label>
                <input type="text" inputMode="numeric" value={form.revenue || ""} onChange={(e) => setForm({ ...form, revenue: Number(e.target.value.replace(/\D/g, "")) || 0 })} placeholder="Nhap doanh thu" className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-foreground" />
                {/* Quick denomination buttons */}
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {["0", "00", "000", "0000", "00000", "000000"].map((zeros) => (
                    <button
                      key={zeros}
                      type="button"
                      onClick={() => {
                        const current = String(form.revenue || "");
                        const newVal = Number(current + zeros) || 0;
                        setForm({ ...form, revenue: newVal });
                      }}
                      className="rounded-md border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:text-yellow-400"
                    >
                      +{zeros}
                    </button>
                  ))}
                </div>
                {/* Suggested amounts */}
                {form.revenue > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-muted-foreground self-center mr-1">Gợi ý:</span>
                    {(() => {
                      const v = form.revenue;
                      const suggestions: number[] = [];
                      // Round to nearest meaningful amounts like bank transfers
                      const magnitudes = [1000, 10000, 100000, 1000000];
                      for (const mag of magnitudes) {
                        const rounded = Math.round(v / mag) * mag;
                        const lower = Math.floor(v / mag) * mag;
                        const upper = Math.ceil(v / mag) * mag;
                        for (const s of [lower, rounded, upper]) {
                          if (s > 0 && s !== v && !suggestions.includes(s)) suggestions.push(s);
                        }
                      }
                      suggestions.sort((a, b) => a - b);
                      // Pick 3 closest distinct suggestions
                      const unique = suggestions.filter((s, i, arr) => arr.indexOf(s) === i).slice(0, 3);
                      return unique.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setForm({ ...form, revenue: s })}
                          className="rounded-md border border-yellow-500/30 bg-yellow-500/5 px-2.5 py-1 text-[11px] font-medium text-yellow-400 transition hover:bg-yellow-500/15"
                        >
                          {s.toLocaleString()}
                        </button>
                      ));
                    })()}
                  </div>
                )}
              </div>

              {/* Mood */}
              <div className="mt-1">
                <label className="mb-2 block text-xs text-muted-foreground">Cảm xúc hôm nay</label>
                <div className="flex gap-2">
                  {MOODS.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setForm({ ...form, mood: m.value })}
                      className={`flex-1 rounded-lg border py-2 text-center text-[10px] font-medium transition ${form.mood === m.value ? "scale-105 border-transparent text-white shadow-lg" : "border-border text-muted-foreground hover:border-white/30"}`}
                      style={form.mood === m.value ? { backgroundColor: m.color } : {}}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-muted-foreground">Ghi chú</label>
                <textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full rounded-lg border border-border bg-muted/20 px-3 py-2 text-sm text-foreground" />
              </div>
              <button onClick={handleSave} disabled={saving || (isAdmin && !!selectedUserId)} className="w-full rounded-xl py-2.5 text-sm font-bold transition hover:scale-[1.02] disabled:opacity-50" style={{ backgroundColor: "#ffd700", color: "#121212" }}>
                {saving ? "Dang luu..." : editingId ? "Cong don & Cap nhat" : "Gui bao cao"}
              </button>
            </div>
          </div>
        </div>

        {/* Monthly summary & order history */}
        <div className="mt-8 rounded-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-sm font-bold text-foreground">Tong hop thang</h2>
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

        {/* Report history - below monthly summary */}
        <div className="mt-6">
          <h2 className="mb-4 text-sm font-bold text-foreground">Lich su bao cao gan day</h2>
          <div className="space-y-2">
            {reports.slice(0, 10).map((r) => (
              <button key={r.id} onClick={() => setSelectedDate(r.report_date)} className="flex w-full items-center justify-between rounded-xl border border-border bg-card p-3 text-left transition hover:border-purple-500/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{r.report_date}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.mood ? MOODS.find(m => m.value === r.mood)?.label + " · " : ""}{r.notes || "Không có ghi chú"}
                  </p>
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
    </div>
  );
}