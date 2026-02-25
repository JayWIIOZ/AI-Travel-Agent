"use client";

import { MapPin, Calendar, Compass, Wallet } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const TripForm = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* 目的地 */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <MapPin className="w-3 h-3" /> 目的地
        </label>
        <input
          className="w-full bg-white/60 border border-white rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-100 transition-all"
          placeholder="例如：京都、大理..."
        />
      </div>

      {/* 双栏配置 */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 flex justify-between">
            <span className="flex items-center gap-2 uppercase tracking-widest">
              <Calendar className="w-3 h-3" /> 天数
            </span>
            <span className="text-emerald-600">5天</span>
          </label>
          <Slider defaultValue={[5]} max={15} step={1} />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-400 flex justify-between">
            <span className="flex items-center gap-2 uppercase tracking-widest">
              <Wallet className="w-3 h-3" /> 预算
            </span>
            <span className="text-emerald-600">中等</span>
          </label>
          <Slider defaultValue={[50]} max={100} step={10} />
        </div>
      </div>

      {/* 偏好风格 */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          探索偏好
        </label>
        <div className="flex flex-wrap gap-2">
          {["静谧古迹", "自然徒步", "本地生活", "艺术空间"].map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 rounded-xl bg-white border border-slate-100 text-[11px] font-bold text-slate-500 hover:border-emerald-200 hover:text-emerald-600 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white hover:bg-emerald-600 shadow-xl shadow-slate-200 transition-all group">
        <Compass className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform" />
        开始生成行程
      </Button>
    </div>
  );
};

export default TripForm;
