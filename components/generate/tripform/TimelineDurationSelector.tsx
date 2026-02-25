// src/components/generate/trip-form/duration-selector.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

const MAX_DAYS = 21;

const TimelineDurationSelector = () => {
  
  const { watch, setValue } = useFormContext();
  // 默认 5 天，符合人类短途旅行直觉
  const duration = watch("duration") || 5;

  const days = Array.from({ length: MAX_DAYS }, (_, i) => i + 1);

  return (
    <div className="space-y-6 py-2">
      {/* 顶部标签 */}
      <div className="flex justify-between items-end px-1">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Calendar className="w-3 h-3 text-emerald-500" />
            旅行时长
          </span>
          <p className="text-[10px] text-slate-300 italic">
            建议 3-7 天最能感受当地风情
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <motion.span
            key={duration}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-black text-emerald-600 tracking-tighter"
          >
            {duration}
          </motion.span>
          <span className="text-xs font-bold text-emerald-400">DAYS</span>
        </div>
      </div>

      <div className="relative pt-4 pb-8">
        {/* 背景轨道：自然淡灰色 */}
        <div className="absolute top-[26px] left-0 w-full h-[6px] bg-slate-100 rounded-full" />

        {/* 选中轨道：清新渐变 */}
        <motion.div
          className="absolute top-[26px] left-0 h-[6px] rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400 z-10 shadow-sm"
          initial={false}
          animate={{
            width: `${((duration - 1) / (MAX_DAYS - 1)) * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
        />

        {/* 时间节点列表 */}
        <div className="relative flex justify-between z-20">
          {days.map((day) => {
            const isActive = day <= duration;
            const isCurrent = day === duration;
            const isKeyDay = day === 1 || day === 7 || day === 14 || day === 21;

            return (
              <button
                key={day}
                type="button"
                onClick={() => setValue("duration", day)}
                className="group relative flex flex-col items-center"
              >
                {/* 节点球 */}
                <motion.div
                  animate={{
                    scale: isCurrent ? 1.3 : 1,
                    backgroundColor: isActive ? "#34d399" : "#f1f5f9", // emerald-400 : slate-100
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full border-2 transition-all duration-300",
                    isActive
                      ? "border-white shadow-md shadow-emerald-200"
                      : "border-white group-hover:border-emerald-200",
                  )}
                />

                {/* 文字标签：只显示关键天数或当前选中的天数，防止拥挤 */}
                <div className="absolute top-6">
                  {(isKeyDay || isCurrent) && (
                    <motion.span
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "text-[10px] font-bold tabular-nums transition-colors",
                        isCurrent
                          ? "text-emerald-600 scale-110"
                          : "text-slate-300",
                      )}
                    >
                      {day}
                    </motion.span>
                  )}
                </div>

                {/* 悬浮指示器 */}
                <div className="absolute -top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 bg-emerald-400 rounded-full" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TimelineDurationSelector;
