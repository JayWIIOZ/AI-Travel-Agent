// src/components/dashboard/generate-sidebar.tsx
"use client";

import { Sparkles, Wind, Camera, Utensils, Zap, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { RECIPES, type InspirationRecipe } from "@/types/recipe";
import type { TripIntent } from "@/lib/validations/trips";

const FORM_DEFAULTS: TripIntent = {
  destination: "",
  duration: 5,
  budgetRange: "standard",
  travelers: { adults: 2, children: 0 },
  preferences: [],
  pace: "balanced",
  accommodationLevel: "standard",
};

export function GenerateSidebar() {
  const { reset } = useFormContext();

  const applyRecipe = (recipe: InspirationRecipe) => {
    const mod = recipe.aiModifiers;
    const budgetRange =
      mod.budgetShift === "up"
        ? "premium"
        : mod.budgetShift === "down"
          ? "economy"
          : FORM_DEFAULTS.budgetRange;

    const next: TripIntent = {
      ...FORM_DEFAULTS,
      pace: mod.pace ?? FORM_DEFAULTS.pace,
      accommodationLevel:
        mod.accommodationLevel ?? FORM_DEFAULTS.accommodationLevel,
      duration: mod.durationHint ?? FORM_DEFAULTS.duration,
      preferences: [...mod.preferenceBoost],
      budgetRange,
    };

    reset(next, { keepDefaultValues: false });
  };

  return (
    <aside className="w-full h-full flex flex-col bg-white/40 backdrop-blur-2xl border-r border-white/40 px-6 py-8">
      <div className="mb-10">
        <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-500" />
          意图配方库
        </h2>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">
          Archetype Recipes
        </p>
      </div>

      <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {RECIPES.map((recipe) => (
          <motion.div
            key={recipe.id}
            whileHover={{ y: -5 }}
            className="group relative cursor-pointer"
            onClick={() => applyRecipe(recipe)}
          >
            {/* 氛围底图：电影感纵深 */}
            <div className="relative h-48 w-full rounded-[2rem] overflow-hidden shadow-sm group-hover:shadow-2xl group-hover:shadow-emerald-500/10 transition-all duration-500">
              <Image
                src={recipe.image}
                alt={recipe.name}
                fill
                className="object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

              {/* 卡片内标签 */}
              <div className="absolute top-4 left-4">
                <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold text-white uppercase tracking-widest">
                  {recipe.archetype}
                </div>
              </div>

              {/* 卡片内容 */}
              <div className="absolute bottom-5 left-6 right-6">
                <h4 className="text-xl font-black text-white mb-1">
                  {recipe.name}
                </h4>
                <p className="text-xs text-white/70 font-medium italic">
                  {recipe.vibe}
                </p>
              </div>
            </div>

            {/* 意图调制提示 (Modifier Hints) */}
            <div className="mt-4 px-2 flex flex-wrap gap-2">
              {recipe.aiModifiers.preferenceBoost.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100"
                >
                  +{tag.toUpperCase()}
                </span>
              ))}
              {recipe.aiModifiers.pace && (
                <span className="text-[9px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100 uppercase">
                  Pace: {recipe.aiModifiers.pace}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 底部叙事提示 */}
      <div className="mt-8 p-5 bg-slate-900 rounded-[2rem] text-white overflow-hidden relative group">
        <Zap className="absolute -right-2 -top-2 w-12 h-12 text-emerald-500/20 rotate-12 group-hover:scale-125 transition-transform" />
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">
          Pro Logic
        </p>
        <p className="text-xs leading-relaxed font-medium text-slate-300">
          “配方不仅是填表，它会调整 AI
          的生成叙事权重，让最终的笔记带上特定的情绪底色。”
        </p>
      </div>
    </aside>
  );
}
