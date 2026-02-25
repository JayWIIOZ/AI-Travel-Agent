// src/app/(dashboard)/layout.tsx
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-natural-gradient">
      <Navbar />
      {/* 增加 pt-28 为悬浮的 Navbar 留出呼吸空间 */}
      <div className="pt-28 px-4 sm:px-8 pb-20">
        <div className="max-w-[1400px] mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}