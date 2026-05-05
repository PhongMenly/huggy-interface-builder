import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({
    meta: [
      { title: "Hồ sơ — Master Sale AI" },
      { name: "description", content: "Cập nhật thông tin cá nhân" },
    ],
  }),
});

function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("Sale");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login" });
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setFullName(data.full_name || "");
            setPhone(data.phone || "");
            setPosition(data.position || "Sale");
          }
        });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      phone,
      position,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Đang tải...</p></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-6 text-2xl font-bold text-foreground">Hồ sơ cá nhân</h1>

        {/* Avatar from Google */}
        {(user.user_metadata?.avatar_url || user.user_metadata?.picture) && (
          <div className="mb-6 flex justify-center">
            <img
              src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
              alt="Avatar"
              className="h-20 w-20 rounded-full border-3 border-purple-500 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div className="mb-6 rounded-xl border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="text-sm font-medium text-foreground">{user.email}</p>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Họ và tên</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm text-foreground focus:border-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Số điện thoại</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm text-foreground focus:border-purple-500 focus:outline-none" />
          </div>
          <div>
            <label className="mb-1 block text-sm text-muted-foreground">Vị trí</label>
            <input value={position} onChange={(e) => setPosition(e.target.value)} className="w-full rounded-xl border border-border bg-muted/20 px-4 py-3 text-sm text-foreground focus:border-purple-500 focus:outline-none" />
          </div>
          <button type="submit" disabled={saving} className="w-full rounded-xl py-3 text-sm font-bold transition hover:scale-[1.02] disabled:opacity-50" style={{ backgroundColor: "#ffd700", color: "#121212" }}>
            {saving ? "Đang lưu..." : saved ? "✓ Đã lưu!" : "Lưu thay đổi"}
          </button>
        </form>

      </div>
    </div>
  );
}