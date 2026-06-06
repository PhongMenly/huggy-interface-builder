import { Link, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const currentPath = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const avatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || user?.email || "";

  const tabs = [
    { label: "Trang chủ", to: "/" as const },
    {
      label: "Lịch làm việc",
      to: "https://docs.google.com/spreadsheets/d/1nemoQ8IkClykxAwmeB2H-1u-SpFzM1tGtcwFbo61iHU/edit?usp=sharing" as const,
      external: true as const,
    },
    { label: "Vinh danh", to: "/honor" as const },
    {
      label: "Huấn Luyện SKILL AI",
      to: "https://whop.com/joined/kolaigoglobal/" as const,
      external: true as const,
    },
    { label: "Link Bán Hàng", to: "/links" as const },
  ];

  const isActive = (path: string) => currentPath === path;

  const sidebarContent = (
    <div className="flex h-full flex-col" style={{ backgroundColor: "#1a1a1a" }}>
      {/* User info */}
      {user && (
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Avatar"
                className="h-10 w-10 rounded-full border-2 border-purple-500 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-purple-500 text-sm font-bold text-white" style={{ backgroundColor: "#a020f0" }}>
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{displayName}</p>
                <p className="truncate text-[11px] text-gray-400">{user.email}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <nav className="flex-1 space-y-1 p-3">
        {tabs.map((tab) => {
          const className = `block rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            !("external" in tab) && isActive(tab.to)
              ? "border-purple-500 bg-purple-500/20 text-purple-300 shadow-[0_0_12px_rgba(160,32,240,0.3)]"
              : "border-white/10 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white hover:shadow-[0_0_16px_rgba(160,32,240,0.25)]"
          }`;
          if ("external" in tab) {
            return (
              <a
                key={tab.to}
                href={tab.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className={className}
              >
                {!collapsed && tab.label}
              </a>
            );
          }
          return (
            <Link
              key={tab.to}
              to={tab.to}
              onClick={() => setMobileOpen(false)}
              className={className}
            >
              {!collapsed && tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      {user && !collapsed && (
        <div className="border-t border-white/10 p-3">
          <button
            onClick={async () => { await signOut(); setMobileOpen(false); }}
            className="w-full rounded-lg border border-red-500/30 px-4 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/10 hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]"
          >
            Đăng xuất
          </button>
        </div>
      )}

      {!user && !collapsed && (
        <div className="border-t border-white/10 p-3">
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="block w-full rounded-lg px-4 py-2.5 text-center text-sm font-bold transition hover:scale-[1.02]"
            style={{ backgroundColor: "#ffd700", color: "#121212" }}
          >
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-3 top-3 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white md:hidden"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden w-56 shrink-0 border-r border-white/10 md:block">
        {sidebarContent}
      </aside>
    </>
  );
}