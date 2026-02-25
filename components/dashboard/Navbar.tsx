// src/components/dashboard/navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Compass,
  Plus,
  Bell,
  Map,
  Sparkles,
  Home,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // 监听滚动逻辑
  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (latest > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsExpanded(false);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  const isPillMode = isScrolled && !isExpanded;

  return (
    <div className="fixed top-6 left-0 right-0 z-50 pointer-events-none px-6">
      <motion.nav
        layout
        initial={false}
        animate={{
          // 位置控制：收缩靠左，展开/顶部居中
          x: isPillMode ? 0 : "-50%",
          left: isPillMode ? "24px" : "50%",
          width: isPillMode ? "160px" : "100%",
          maxWidth: isPillMode ? "160px" : "1200px",
          height: isPillMode ? "52px" : "64px",
          // 透明度与模糊
          backgroundColor: isPillMode
            ? "rgba(255, 255, 255, 0.4)"
            : "rgba(255, 255, 255, 0.8)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "pointer-events-auto relative flex items-center border border-white/40 backdrop-blur-xl rounded-full overflow-hidden",
          isPillMode &&
            "cursor-pointer hover:bg-white/60 transition-colors shadow-sm",
        )}
        onClick={() => isPillMode && setIsExpanded(true)}
      >
        <div className="flex items-center w-full px-4 h-full">
          {/* --- 左侧：Logo (始终靠左) --- */}
          <motion.div layout className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div
                className={cn(
                  "p-1.5 rounded-full transition-colors",
                  isPillMode ? "bg-emerald-500/20" : "bg-emerald-500",
                )}
              >
                <Compass
                  className={cn(
                    "w-4 h-4",
                    isPillMode ? "text-emerald-600" : "text-white",
                  )}
                />
              </div>
              {!isPillMode && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-bold text-sm tracking-tight text-slate-800"
                >
                  Wander<span className="text-emerald-500">.ai</span>
                </motion.span>
              )}
            </Link>
          </motion.div>

          {/* --- 动态交互内容 --- */}
          <AnimatePresence mode="wait">
            {isPillMode ? (
              // 1. 收缩态：显示 Explore 提示
              <motion.div
                key="pill-mode"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center justify-end flex-1 gap-2 text-emerald-700 font-bold text-[10px] uppercase tracking-tighter"
              >
                <Menu className="w-4 h-4" />
                Explore
              </motion.div>
            ) : (
              // 2. 展开态：三段式布局
              <motion.div
                key="full-mode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center flex-1 h-full"
              >
                {/* 居中菜单部分 (flex-1 + justify-center) */}
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1 bg-slate-200/20 p-1 rounded-full border border-white/10">
                    <NavLink href="/home" active={pathname === "/home"}>
                      <Home className="w-3.5 h-3.5" /> Home
                    </NavLink>
                    <NavLink href="/generate" active={pathname === "/generate"}>
                      <Sparkles className="w-3.5 h-3.5" /> Generate
                    </NavLink>
                    <NavLink
                      href="/my-trip-card"
                      active={pathname === "/my-trip-card"}
                    >
                      <Map className="w-3.5 h-3.5" /> My Trips
                    </NavLink>
                    <NavLink href="/collection" active={pathname === "/collection"}>
                      <Map className="w-3.5 h-3.5" /> Collection
                    </NavLink>
                  </div>
                </div>

                {/* 右侧：操作区 + 头像 (始终靠右) */}
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-8 h-8 hidden sm:flex text-slate-500"
                  >
                    <Bell className="w-4 h-4" />
                  </Button>

                  <Button
                    size="sm"
                    className="rounded-full h-9 px-4 bg-slate-900 text-white hover:bg-emerald-600 transition-all text-xs font-bold shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> 计划
                  </Button>

                  {/* 账户头像 (保留你原本的设计) */}
                  <div className="ml-1 w-8 h-8 rounded-full bg-emerald-100 border-2 border-white overflow-hidden cursor-pointer hover:ring-2 ring-emerald-200 transition-all shadow-sm">
                    <img
                      src="https://avatar.vercel.sh/traveler"
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* 手动关闭按钮 */}
                  {isExpanded && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full w-8 h-8 ml-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(false);
                      }}
                    >
                      <X className="w-4 h-4 text-slate-400" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
};

// --- 子组件：带高亮逻辑的 NavLink ---
const NavLink = ({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) => (
  <Link href={href}>
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "rounded-full px-4 h-8 text-[12px] font-bold transition-all gap-2",
        active
          ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 hover:bg-emerald-600 hover:text-white"
          : "text-slate-500 hover:bg-white/50 hover:text-emerald-600",
      )}
    >
      {children}
    </Button>
  </Link>
);

export default Navbar;
