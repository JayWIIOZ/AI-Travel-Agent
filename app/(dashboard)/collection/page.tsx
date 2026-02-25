"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type SavedNote = {
  id: string;
  title: string;
  overview: string | null;
  payload: unknown;
  createdAt: string;
};

export default function CollectionPage() {
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => {
        setNotes(Array.isArray(data) ? data : []);
      })
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center rounded-[2.5rem] bg-white/20 backdrop-blur-md border border-white/40 p-8">
        <p className="text-slate-500">加载中…</p>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center rounded-[2.5rem] bg-white/20 backdrop-blur-md border border-white/40 p-8">
        <FileText className="w-16 h-16 text-slate-300 mb-4" />
        <p className="text-slate-600 font-medium mb-2">暂无收藏笔记</p>
        <p className="text-sm text-slate-400">
          在「我的行程笔记」页点击「保存」即可将当前笔记保存到此处
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
        <FileText className="w-3 h-3" /> 收藏的行程笔记
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {notes.map((note) => (
          <Link
            key={note.id}
            href={`/collection/${note.id}`}
            className="group block rounded-[2.5rem] bg-white/60 backdrop-blur-xl border border-white shadow-lg overflow-hidden p-6 hover:bg-white/80 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-lg font-bold text-slate-800 truncate flex-1">
                {note.title}
              </h3>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 shrink-0 transition-colors" />
            </div>
            <p className="mt-2 text-sm text-slate-600 line-clamp-3">
              {note.overview || "无概览"}
            </p>
            <p className="mt-3 text-xs text-slate-400">
              {note.createdAt
                ? new Date(note.createdAt).toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </p>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
