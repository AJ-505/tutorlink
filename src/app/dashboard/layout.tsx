import "server-only";
import type { ReactNode } from "react";
import { Sidebar } from "./_components/sidebar";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-linear-to-b from-white via-blue-50 to-[#F3F8FF]">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">
          {/* Sidebar (client) */}
          <aside className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
            <Sidebar />
          </aside>
          {/* Main content */}
          <main className="min-h-[70vh] rounded-2xl bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

import type React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Activity,
  BookOpen,
  MessageSquare,
  Video,
  Settings,
  type LucideIcon,
} from "lucide-react";

export default function DashboardLayoutRedesign({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="font-inter flex min-h-screen bg-[#0B0C0E] text-[#EDEDEF] selection:bg-[#5E6AD2]/30">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/5 bg-[#0B0C0E]/50 backdrop-blur-xl">
        <div className="p-6">
          <h1 className="mb-6 text-xl font-medium tracking-tight text-white">
            Tutor<span className="text-[#5E6AD2]">Link</span>
          </h1>

          <div className="mb-8 flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#5E6AD2] to-[#929BF0] text-xs font-bold">
              JS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-white">
                John Student
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-white/40 uppercase">
                Student Account
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              href="/dashboard"
            />
            <SidebarItem
              icon={Activity}
              label="Signal"
              href="/dashboard/signal"
              active
            />
            <SidebarItem
              icon={BookOpen}
              label="Lessons"
              href="/dashboard/lessons"
            />
            <SidebarItem
              icon={MessageSquare}
              label="Messages"
              href="/dashboard/messages"
            />
            <SidebarItem
              icon={Video}
              label="Live Sessions"
              href="/dashboard/calls"
            />
            <SidebarItem
              icon={Settings}
              label="Settings"
              href="/dashboard/settings"
            />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 pl-64">
        <div className="mx-auto max-w-5xl p-8 md:p-12">{children}</div>
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  href,
  active,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-white/10 text-white"
          : "text-[#8A8F98] hover:bg-white/5 hover:text-white"
      }`}
    >
      <div
        className={`h-4 w-4 ${active ? "text-[#5E6AD2]" : "text-[#8A8F98] group-hover:text-white"}`}
      />
      {label}
    </Link>
  );
}
