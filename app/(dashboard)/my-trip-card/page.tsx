"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  ChevronLeft,
  Edit3,
  Sparkles,
  Building2,
  MapPin,
  UtensilsCrossed,
  StickyNote,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeneratedItineraryStore } from "@/store/useGeneratedItineraryStore";
import type {
  GeneratedItinerary,
  GeneratedDay,
  DayMeals,
} from "@/types/itinerary";
import { motion } from "framer-motion";

export default function MyTripCardPage() {
  const { itinerary: stored } = useGeneratedItineraryStore();
  const [itinerary, setItineraryLocal] = useState<GeneratedItinerary | null>(
    stored,
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItineraryLocal(stored);
  }, [stored]);

  if (!itinerary) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center rounded-[2.5rem] bg-white/20 backdrop-blur-md border border-white/40 p-8">
        <FileText className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-slate-600 font-medium mb-2">暂无行程笔记</p>
        <p className="text-sm text-slate-400 mb-6">
          在「定制行程」页提交后，AI 生成的计划会显示在这里
        </p>
        <Link href="/generate">
          <Button className="rounded-xl bg-emerald-600 hover:bg-emerald-700 gap-2">
            <Sparkles className="w-4 h-4" /> 去创建行程
          </Button>
        </Link>
      </div>
    );
  }

  const updateTitle = (v: string) =>
    setItineraryLocal((prev) => (prev ? { ...prev, title: v } : null));
  const updateOverview = (v: string) =>
    setItineraryLocal((prev) => (prev ? { ...prev, overview: v } : null));
  const updateDay = (index: number, upd: Partial<GeneratedDay>) =>
    setItineraryLocal((prev) => {
      if (!prev || !prev.days[index]) return prev;
      const days = [...prev.days];
      days[index] = { ...days[index], ...upd };
      return { ...prev, days };
    });
  const updateActivity = (dayIndex: number, actIndex: number, v: string) =>
    setItineraryLocal((prev) => {
      if (!prev || !prev.days[dayIndex]) return prev;
      const days = [...prev.days];
      const activities = [...days[dayIndex].activities];
      activities[actIndex] = v;
      days[dayIndex] = { ...days[dayIndex], activities };
      return { ...prev, days };
    });
  const updateDayField = (
    dayIndex: number,
    field: keyof GeneratedDay,
    value: string | DayMeals | undefined,
  ) =>
    setItineraryLocal((prev) => {
      if (!prev || !prev.days[dayIndex]) return prev;
      const days = [...prev.days];
      days[dayIndex] = { ...days[dayIndex], [field]: value };
      return { ...prev, days };
    });

  const handleSave = async () => {
    if (!itinerary) return;
    setSaving(true);
    try {
      const res = await fetch("/api/collection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itinerary),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "保存失败");
      }
      window.location.href = "/collection";
    } catch (e) {
      alert(e instanceof Error ? e.message : "保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      {/* 顶栏 */}
      <div className="flex items-center justify-between">
        <Link
          href="/generate"
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> 返回定制
        </Link>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Edit3 className="w-3 h-3" /> 可编辑笔记
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="rounded-xl bg-emerald-600 hover:bg-emerald-700 gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "保存中…" : "保存"}
          </Button>
        </div>
      </div>

      {/* 主卡片 */}
      <div className="rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white shadow-lg overflow-hidden">
        {/* 标题区 */}
        <div className="p-8 pb-6 border-b border-slate-100/80">
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3">
            <FileText className="w-3 h-3" /> 行程计划
          </div>
          <input
            value={itinerary.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="w-full bg-transparent text-2xl md:text-3xl font-extrabold text-slate-800 outline-none placeholder:text-slate-300 border-b border-transparent hover:border-slate-200 focus:border-emerald-300 transition-colors"
            placeholder="行程标题"
          />
          <textarea
            value={itinerary.overview}
            onChange={(e) => updateOverview(e.target.value)}
            rows={3}
            className="mt-4 w-full bg-transparent text-sm text-slate-600 outline-none resize-none placeholder:text-slate-400 border border-transparent hover:border-slate-100 focus:border-emerald-100 rounded-xl p-3 transition-colors"
            placeholder="行程概览..."
          />
        </div>

        {/* 每日行程 */}
        <div className="divide-y divide-slate-100/80">
          {itinerary.days.map((day, dayIndex) => (
            <div
              key={day.day}
              className="p-8 py-6 hover:bg-slate-50/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500 text-white text-sm font-bold">
                  {day.day}
                </span>
                <input
                  value={day.title}
                  onChange={(e) =>
                    updateDay(dayIndex, { title: e.target.value })
                  }
                  className="flex-1 bg-transparent text-lg font-bold text-slate-800 outline-none placeholder:text-slate-400 border-b border-transparent hover:border-slate-200 focus:border-emerald-300"
                  placeholder="当日主题"
                />
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3 pl-10">
                {day.location && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                    <input
                      value={day.location}
                      onChange={(e) =>
                        updateDayField(dayIndex, "location", e.target.value)
                      }
                      className="bg-transparent outline-none w-40 min-w-0 text-slate-600"
                      placeholder="地点"
                    />
                  </p>
                )}
                {day.accommodation && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Building2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <input
                      value={day.accommodation}
                      onChange={(e) =>
                        updateDayField(dayIndex, "accommodation", e.target.value)
                      }
                      className="bg-transparent outline-none flex-1 min-w-0 text-slate-600"
                      placeholder="住宿"
                    />
                  </p>
                )}
              </div>
              {day.meals &&
                (day.meals.breakfast ||
                  day.meals.lunch ||
                  day.meals.dinner) && (
                  <div className="mb-3 pl-10 space-y-1">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      <UtensilsCrossed className="w-3 h-3" /> 餐饮
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs">
                      {day.meals.breakfast != null && (
                        <div>
                          <span className="text-slate-400 mr-1">早</span>
                          <input
                            value={day.meals.breakfast}
                            onChange={(e) =>
                              updateDayField(dayIndex, "meals", {
                                ...day.meals!,
                                breakfast: e.target.value,
                              })
                            }
                            className="bg-transparent outline-none w-full text-slate-600 py-0.5"
                          />
                        </div>
                      )}
                      {day.meals.lunch != null && (
                        <div>
                          <span className="text-slate-400 mr-1">午</span>
                          <input
                            value={day.meals.lunch}
                            onChange={(e) =>
                              updateDayField(dayIndex, "meals", {
                                ...day.meals!,
                                lunch: e.target.value,
                              })
                            }
                            className="bg-transparent outline-none w-full text-slate-600 py-0.5"
                          />
                        </div>
                      )}
                      {day.meals.dinner != null && (
                        <div>
                          <span className="text-slate-400 mr-1">晚</span>
                          <input
                            value={day.meals.dinner}
                            onChange={(e) =>
                              updateDayField(dayIndex, "meals", {
                                ...day.meals!,
                                dinner: e.target.value,
                              })
                            }
                            className="bg-transparent outline-none w-full text-slate-600 py-0.5"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              {day.notes && (
                <div className="mb-3 pl-10">
                  <p className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    <StickyNote className="w-3 h-3" /> 备注
                  </p>
                  <textarea
                    value={day.notes}
                    onChange={(e) =>
                      updateDayField(dayIndex, "notes", e.target.value)
                    }
                    rows={2}
                    className="w-full bg-slate-50/50 rounded-lg px-3 py-2 text-xs text-slate-600 outline-none resize-none border border-transparent hover:border-slate-100 focus:border-emerald-100"
                    placeholder="备注..."
                  />
                </div>
              )}
              <ul className="space-y-2 pl-1">
                {day.activities.map((act, actIndex) => (
                  <li key={actIndex} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1.5 text-[10px]">
                      •
                    </span>
                    <input
                      value={act}
                      onChange={(e) =>
                        updateActivity(dayIndex, actIndex, e.target.value)
                      }
                      className="flex-1 bg-transparent text-sm text-slate-600 outline-none py-1 px-2 rounded-lg hover:bg-white/60 focus:bg-white/80 focus:ring-1 focus:ring-emerald-200"
                      placeholder="活动描述"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 亮点（若有） */}
        {itinerary.highlights && itinerary.highlights.length > 0 && (
          <div className="p-8 pt-6 border-t border-slate-100/80">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              亮点
            </p>
            <ul className="space-y-1.5">
              {itinerary.highlights.map((h, i) => (
                <li
                  key={i}
                  className="text-sm text-slate-600 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
