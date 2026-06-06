import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/AppSidebar";

export const Route = createFileRoute("/links")({
  component: LinksPage,
  head: () => ({
    meta: [
      { title: "Link Bán Hàng — Master Sale AI" },
      { name: "description", content: "Tổng hợp link bán hàng và tiếp thị KOL AI System" },
    ],
  }),
});

const SALES_LINKS = [
  {
    id: "workshop",
    label: "Workshop KOL AI",
    url: "https://kolaiworkshop.lovable.app",
    description: "Đăng ký và tham gia workshop trực tuyến",
  },
  {
    id: "newsletter",
    label: "Nhận bản tin kiếm tiền",
    url: "https://kiemtienkolai.lovable.app",
    description: "Trang đăng ký nhận bản tin kiếm tiền",
  },
  {
    id: "ladipage",
    label: "Ladipage KOL AI SYSTEM",
    url: "https://kolaisystemladipage.vercel.app/",
    description: "Trang landing chính thức của hệ thống",
  },
  {
    id: "community",
    label: "Cộng đồng WHOP KOL AI GO GLOBAL",
    url: "https://whop.com/joined/kolaigoglobal/",
    description: "Cộng đồng trả phí trên Whop",
  },
  {
    id: "training",
    label: "Tài khoản huấn luyện Master Sale AI",
    url: "https://salemaster.lovable.app",
    description: "Nền tảng đào tạo Sale AI chuyên sâu",
  },
];

function LinksPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  const handleCopy = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
    } catch {
      // fallback
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedId(id);
      setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
    }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><p className="text-muted-foreground">Đang tải...</p></div>;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 overflow-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-2 text-2xl font-extrabold tracking-tight text-foreground">LINK BÁN HÀNG</h1>
          <p className="mb-8 text-sm font-medium text-muted-foreground">Sao chép link bên dưới để tiếp thị và chia sẻ cho khách hàng</p>

          <div className="grid gap-4 sm:grid-cols-2">
            {SALES_LINKS.map((link) => (
              <div
                key={link.id}
                className="flex flex-col rounded-xl border p-4 transition hover:border-yellow-500/50"
                style={{ backgroundColor: "#1e1e1e", borderColor: "rgba(255,215,0,0.18)" }}
              >
                <div className="mb-1 flex items-start justify-between gap-3">
                  <h3 className="text-sm font-extrabold uppercase tracking-wide text-white">{link.label}</h3>
                </div>
                <p className="mb-3 text-xs text-gray-400">{link.description}</p>
                <div className="mt-auto flex items-center gap-2">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 flex-1 truncate text-xs font-medium text-lilac"
                    style={{ color: "#bb86fc" }}
                    title={link.url}
                  >
                    {link.url}
                  </a>
                  <button
                    onClick={() => handleCopy(link.url, link.id)}
                    className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition hover:scale-[1.02]"
                    style={{
                      backgroundColor: copiedId === link.id ? "#4CAF50" : "#ffd700",
                      color: copiedId === link.id ? "#ffffff" : "#121212",
                    }}
                  >
                    {copiedId === link.id ? "Đã sao chép" : "Sao chép"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border px-4 py-3" style={{ borderColor: "rgba(255,215,0,0.18)", backgroundColor: "rgba(255,215,0,0.05)" }}>
            <p className="text-xs font-medium text-gray-300">
              💡 Mẹo: Sao chép link và đăng lên mạng xã hội, Zalo, Facebook hoặc gửi trực tiếp cho khách hàng tiềm năng để tăng chuyển đổi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
