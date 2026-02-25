"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sliders, Gauge, Building2 } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

const PACE_OPTIONS = [
  { value: "relaxed" as const, label: "轻松", desc: "节奏舒缓，留足自由时间" },
  { value: "balanced" as const, label: "均衡", desc: "张弛有度，经典行程" },
  { value: "intense" as const, label: "紧凑", desc: "行程饱满，深度体验" },
];

const ACCOMMODATION_OPTIONS = [
  { value: "budget" as const, label: "经济", desc: "高性价比住宿" },
  { value: "standard" as const, label: "标准", desc: "舒适干净" },
  { value: "luxury" as const, label: "奢华", desc: "高端酒店体验" },
];

function PaceSelector() {
  const { watch, setValue } = useFormContext();
  const current = watch("pace");

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <Gauge className="w-3 h-3" /> 行程节奏
      </label>
      <div className="flex flex-col gap-2">
        {PACE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setValue("pace", opt.value)}
            className={cn(
              "p-3 rounded-2xl border text-left transition-all",
              current === opt.value
                ? "bg-emerald-500 border-emerald-500 text-white shadow-md"
                : "bg-white border-slate-100 text-slate-600 hover:border-emerald-200",
            )}
          >
            <div className="text-[11px] font-bold">{opt.label}</div>
            <div
              className={cn(
                "text-[9px] mt-0.5 opacity-80",
                current === opt.value ? "text-white" : "text-slate-400",
              )}
            >
              {opt.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function AccommodationSelector() {
  const { watch, setValue } = useFormContext();
  const current = watch("accommodationLevel");

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <Building2 className="w-3 h-3" /> 住宿偏好
      </label>
      <div className="flex flex-col gap-2">
        {ACCOMMODATION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setValue("accommodationLevel", opt.value)}
            className={cn(
              "p-3 rounded-2xl border text-left transition-all",
              current === opt.value
                ? "bg-emerald-500 border-emerald-500 text-white shadow-md"
                : "bg-white border-slate-100 text-slate-600 hover:border-emerald-200",
            )}
          >
            <div className="text-[11px] font-bold">{opt.label}</div>
            <div
              className={cn(
                "text-[9px] mt-0.5 opacity-80",
                current === opt.value ? "text-white" : "text-slate-400",
              )}
            >
              {opt.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

const AdvancedOptions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest hover:text-emerald-600 transition-colors"
      >
        <Sliders className="w-3 h-3" /> 高级偏好配置
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-6 pt-2 pb-6">
              <PaceSelector />
              <AccommodationSelector />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedOptions;