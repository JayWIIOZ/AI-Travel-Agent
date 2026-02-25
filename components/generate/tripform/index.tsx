// src/components/generate/trip-form/index.tsx
"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Sparkles, MapPin, Shuffle, Wand2, Lock, Unlock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { TripIntent } from "@/lib/validations/trips";
import DurationSelector from "./DurationSelector";
import BudgetSelector from "./BudgetSelector";
import TravelerSelector from "./TravelerSelector";
import PreferenceSelector from "./PreferenceSelector";
import AdvancedOptions from "./AdvancedOptions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useGenerateStore } from "@/store/useGenerateStore";
import { useGeneratedItineraryStore } from "@/store/useGeneratedItineraryStore";
import { parseItineraryFromText } from "@/types/itinerary";

const RANDOM_DESTINATIONS = [
  "京都",
  "大理",
  "冰岛",
  "清迈",
  "里斯本",
  "布拉格",
];

export function TripForm() {
  const [isAIRecommendMode, setIsAIRecommendMode] = useState(false);
  const methods = useFormContext<TripIntent>();
  const { setValue, watch, register, handleSubmit } = methods;
  const currentPreferences = watch("preferences");
  const router = useRouter();
  // 1. 切换 AI 推荐模式
  const toggleAIRecommend = () => {
    if (currentPreferences.length === 0 && !isAIRecommendMode) {
      alert("请先选择下方的探索偏好，AI 才能为您推荐目的地哦！");
      return;
    }

    const nextMode = !isAIRecommendMode;
    setIsAIRecommendMode(nextMode);

    if (nextMode) {
      // 开启模式：锁定输入，设置魔术值
      setValue("destination", "AI 正在探索最佳目的地...", {
        shouldValidate: true,
      });
    } else {
      // 关闭模式：解锁输入，清空内容
      setValue("destination", "");
    }
  };

  const handleRandomize = () => {
    if (isAIRecommendMode) return; // 托管模式下禁用随机
    const random =
      RANDOM_DESTINATIONS[
        Math.floor(Math.random() * RANDOM_DESTINATIONS.length)
      ];
    setValue("destination", random, { shouldValidate: true });
  };

  const setSubmitting = useGenerateStore((s) => s.setSubmitting);
  const setItinerary = useGeneratedItineraryStore((s) => s.setItinerary);

  const onSubmit = async (data: TripIntent) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error?.message ?? "生成失败");
      }
      const itinerary =
        json.itinerary ??
        parseItineraryFromText(json.text ?? "");
      if (itinerary) {
        setItinerary(itinerary);
        router.push("/my-trip-card");
      } else {
        setItinerary({
          title: "行程笔记",
          overview: json.text || "（AI 返回内容无法解析为结构化行程，已保存为原文）",
          days: [],
        });
        router.push("/my-trip-card");
      }
    } catch (e) {
      console.error(e);
      alert(e instanceof Error ? e.message : "生成失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* 顶部核心：目的地 */}
      <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-sm space-y-6 relative overflow-hidden">
        {/* AI 推荐模式下的背景流光效果 */}
        <AnimatePresence>
          {isAIRecommendMode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-linear-to-r from-emerald-50/50 via-sky-50/50 to-emerald-50/50 -z-10"
              style={{ backgroundSize: "200% 100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
        </AnimatePresence>

        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3 text-emerald-500" />
              {isAIRecommendMode ? "AI 托管中" : "目的地意图"}
            </label>
            {isAIRecommendMode && (
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full"
              >
                <Lock className="w-2.5 h-2.5" /> 已锁定输入
              </motion.span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1 group">
              <input
                {...register("destination")}
                readOnly={isAIRecommendMode}
                className={cn(
                  "w-full bg-transparent text-2xl font-bold outline-none transition-all duration-500 placeholder:text-slate-200",
                  isAIRecommendMode
                    ? "text-emerald-600 italic opacity-80"
                    : "text-slate-800",
                )}
                placeholder="你想去哪里呼吸？"
              />
            </div>

            {/* 功能按钮组 */}
            <div className="flex items-center gap-1.5 shrink-0">
              {!isAIRecommendMode && (
                <button
                  type="button"
                  onClick={handleRandomize}
                  className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-90"
                >
                  <Shuffle className="w-5 h-5" />
                </button>
              )}

              {/* AI 推荐开关按钮 */}
              <button
                type="button"
                onClick={toggleAIRecommend}
                className={cn(
                  "p-3 rounded-2xl transition-all active:scale-95 flex items-center gap-2",
                  isAIRecommendMode
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : currentPreferences.length > 0
                      ? "bg-slate-900 text-white hover:bg-emerald-500"
                      : "bg-slate-50 text-slate-300",
                )}
              >
                {isAIRecommendMode ? (
                  <Unlock className="w-5 h-5" />
                ) : (
                  <Wand2 className="w-5 h-5" />
                )}
                <span className="text-[10px] font-bold uppercase tracking-tighter hidden sm:block">
                  {isAIRecommendMode ? "Cancel AI" : "AI Recommend"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100/50" />

        <DurationSelector />
        <BudgetSelector />
        <TravelerSelector />
        <PreferenceSelector />
      </div>

      {/* 高级可选项 */}
      <AdvancedOptions />

      {/* 提交按钮 */}
      <Button
        type="submit"
        className="w-full h-16 rounded-[2rem] bg-slate-900 text-white hover:bg-emerald-600 transition-all gap-2 group shadow-xl shadow-slate-200"
      >
        <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
        <span className="text-lg font-bold">开始生成智能行程</span>
      </Button>
    </form>
  );
}
