// src/components/generate/trip-form/duration-selector.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { Calendar, Minus, Plus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const presets = [
  { label: "周末", value: 3 },
  { label: "4-5 天", value: 5 },
  { label: "一周", value: 7 },
  { label: "10 天+", value: 10 },
];

const DurationSelector = () => {
  const { watch, setValue } = useFormContext();
  const duration = watch("duration") || 5;
  const [isCustom, setIsCustom] = useState(false);

  const handlePreset = (value: number) => {
    setIsCustom(false);
    setValue("duration", value);
  };

  const handleCustomChange = (val: number) => {
    let finalVal = val;
    if (finalVal < 1) finalVal = 1;
    if (finalVal > 30) finalVal = 30;
    setValue("duration", finalVal);
  };

  return (
    <div className="space-y-4 py-2">
      {/* 顶部标签栏 */}
      <div className="flex justify-between items-center">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-emerald-500" />
          旅行时长
        </label>
        <div className="flex items-baseline gap-0.5">
          <span className="text-xl font-black text-emerald-600 tracking-tighter">
            {duration}
          </span>
          <span className="text-[10px] font-bold text-emerald-400">天</span>
        </div>
      </div>

      {/* 快捷选项区 */}
      <div className="flex flex-wrap gap-2">
        {presets.map((item) => {
          const isActive = duration === item.value && !isCustom;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handlePreset(item.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border",
                isActive
                  ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100"
                  : "bg-white/60 border-slate-100 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50/50",
              )}
            >
              {item.label}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setIsCustom(true)}
          className={cn(
            "px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border flex items-center gap-1.5",
            isCustom
              ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-100"
              : "bg-white/60 border-slate-100 text-slate-500 hover:border-emerald-200 hover:bg-emerald-50/50",
          )}
        >
          {isCustom && <Sparkles className="w-3 h-3" />}
          自定义
        </button>
      </div>

      {/* 自定义步进器：带动画效果 */}
      <AnimatePresence>
        {isCustom && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-4 bg-emerald-50/30 border border-emerald-100/50 p-3 rounded-2xl mt-1">
              <button
                type="button"
                onClick={() => handleCustomChange(duration - 1)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-emerald-100 rounded-full text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all shadow-sm"
              >
                <Minus className="w-4 h-4" />
              </button>

              <div className="flex-1 flex justify-center items-center gap-2">
                <input
                  type="number"
                  value={duration}
                  onChange={(e) => handleCustomChange(Number(e.target.value))}
                  className="w-12 text-center bg-transparent border-none text-lg font-black text-emerald-700 focus:ring-0 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="text-xs font-bold text-emerald-400/70">
                  DAYS
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCustomChange(duration + 1)}
                className="w-8 h-8 flex items-center justify-center bg-white border border-emerald-100 rounded-full text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all shadow-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-300 mt-2 px-1">
              * AI 最大支持规划 30 天以内的行程
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DurationSelector;
