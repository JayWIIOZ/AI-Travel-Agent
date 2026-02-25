// src/components/dashboard/idle-state-planner.tsx
"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Calendar, Compass, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const IdleStatePlanner = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl bg-white/60 backdrop-blur-xl border border-white/40 rounded-[3rem] p-10 shadow-soft"
    >
      <div className="space-y-10">
        {/* 标题：清新自然 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-medium text-sm justify-center mb-2">
            <Leaf className="w-4 h-4" />
            <span>开启一段纯净的旅程</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-slate-800 text-center">
            你的下一站，<span className="text-emerald-500">心之所向</span>
          </h2>
        </div>

        {/* 极简输入区 */}
        <div className="space-y-8">
          <div className="relative group">
            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
            <input 
              className="w-full bg-white/80 border-none rounded-2xl px-14 py-5 text-lg text-slate-700 shadow-sm focus:ring-2 focus:ring-emerald-200 outline-none placeholder:text-slate-300"
              placeholder="搜索目的地，例如：大理、清迈..."
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
             {/* 天数选择 */}
             <div className="bg-slate-50/50 p-6 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                   <label className="text-xs font-bold text-slate-400 flex items-center gap-2 italic uppercase tracking-wider">
                     <Calendar className="w-3 h-3" /> 天数
                   </label>
                   <span className="text-emerald-600 font-bold text-lg">5 Days</span>
                </div>
                <Slider defaultValue={[5]} max={15} step={1} />
             </div>

             {/* 偏好风格 */}
             <div className="bg-slate-50/50 p-6 rounded-3xl space-y-4">
                <label className="text-xs font-bold text-slate-400 italic uppercase tracking-wider">氛围</label>
                <div className="flex flex-wrap gap-2">
                   {["静谧", "烟火气", "艺术", "野奢"].map(v => (
                     <button key={v} className="px-3 py-1 rounded-full bg-white border border-slate-100 text-xs text-slate-500 hover:border-emerald-200 hover:text-emerald-600 transition-all">
                       {v}
                     </button>
                   ))}
                </div>
             </div>
          </div>
        </div>

        {/* 按钮：阳光暖色渐变 */}
        <Button className="w-full h-16 rounded-2xl text-lg font-bold bg-gradient-to-r from-emerald-500 to-sky-500 hover:shadow-lg hover:shadow-emerald-200/50 border-none transition-all gap-2">
          <Compass className="w-5 h-5 animate-spin-slow" />
          开始智能规划
        </Button>
      </div>
    </motion.div>
  );
};

export default IdleStatePlanner;