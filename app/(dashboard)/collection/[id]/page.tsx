"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  FileText,
  ChevronLeft,
  Building2,
  MapPin,
  UtensilsCrossed,
  StickyNote,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import type { GeneratedItinerary } from "@/types/itinerary";

export default function CollectionDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [note, setNote] = useState<{
    id: string;
    title: string;
    overview: string | null;
    payload: GeneratedItinerary | null;
    createdAt: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/collection/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.error) throw new Error(data.error);
        const payload =
          data.payload && typeof data.payload === "object"
            ? (data.payload as GeneratedItinerary)
            : null;
        setNote({
          id: data.id,
          title: data.title ?? "未命名",
          overview: data.overview ?? null,
          payload,
          createdAt: data.createdAt ?? "",
        });
      })
      .catch(() => setNote(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading || !note || !id) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center rounded-[2.5rem] bg-white/20 backdrop-blur-md border border-white/40 p-8">
        {loading ? (
          <p className="text-slate-500">加载中…</p>
        ) : (
          <>
            <FileText className="w-16 h-16 text-slate-300 mb-4" />
            <p className="text-slate-600 font-medium mb-2">未找到该笔记</p>
            <Link href="/collection" className="text-sm text-emerald-600 hover:underline">
              返回收藏
            </Link>
          </>
        )}
      </div>
    );
  }

  const itinerary = note.payload;
  if (!itinerary || !itinerary.days?.length) {
    return (
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/collection"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> 返回收藏
        </Link>
        <div className="rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white shadow-lg p-8">
          <h1 className="text-2xl font-bold text-slate-800">{note.title}</h1>
          <p className="mt-4 text-sm text-slate-600 whitespace-pre-wrap">
            {note.overview || "无详细内容"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-8"
    >
      <Link
        href="/collection"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> 返回收藏
      </Link>

      <div className="rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white shadow-lg overflow-hidden">
        <div className="p-8 pb-6 border-b border-slate-100/80">
          <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-3">
            <FileText className="w-3 h-3" /> 行程计划
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            {itinerary.title}
          </h1>
          <p className="mt-4 text-sm text-slate-600 whitespace-pre-wrap">
            {itinerary.overview}
          </p>
        </div>

        <div className="divide-y divide-slate-100/80">
          {itinerary.days.map((day) => (
            <div
              key={day.day}
              className="p-8 py-6 hover:bg-slate-50/30 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-emerald-500 text-white text-sm font-bold">
                  {day.day}
                </span>
                <h2 className="text-lg font-bold text-slate-800">{day.title}</h2>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3 pl-10">
                {day.location && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                    {day.location}
                  </p>
                )}
                {day.accommodation && (
                  <p className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Building2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    {day.accommodation}
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-xs text-slate-600">
                      {day.meals.breakfast && (
                        <div>
                          <span className="text-slate-400 mr-1">早</span>
                          {day.meals.breakfast}
                        </div>
                      )}
                      {day.meals.lunch && (
                        <div>
                          <span className="text-slate-400 mr-1">午</span>
                          {day.meals.lunch}
                        </div>
                      )}
                      {day.meals.dinner && (
                        <div>
                          <span className="text-slate-400 mr-1">晚</span>
                          {day.meals.dinner}
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
                  <p className="text-xs text-slate-600 whitespace-pre-wrap">
                    {day.notes}
                  </p>
                </div>
              )}
              <ul className="space-y-2 pl-1">
                {day.activities.map((act, actIndex) => (
                  <li key={actIndex} className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1.5 text-[10px]">•</span>
                    <span className="text-sm text-slate-600">{act}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
