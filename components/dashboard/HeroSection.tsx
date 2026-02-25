"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden rounded-[3rem] shadow-2xl mb-16">
      {/* 背景：自然风光大图 - 增加 priority 优化 LCP */}
      <Image
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000"
        alt="Mountain Scenery"
        fill
        sizes="100vw"
        priority
        unoptimized
        className="object-cover transition-transform duration-[10s] hover:scale-105"
      />

      {/* 渐变遮罩：确保文字可读性且保持自然感 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      {/* 内容：居中或偏左对齐 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold tracking-widest uppercase border border-white/30">
            <Sparkles className="w-4 h-4 text-yellow-300" /> Discover Your
            Spirit
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight drop-shadow-lg">
            在自然中，
            <br />
            找回 <span className="text-emerald-300">生命的意义</span>
          </h1>

          <p className="text-lg text-white/90 font-medium max-w-xl mx-auto drop-shadow-md">
            输入一段模糊的想法，AI 为你编织一段精准的旅程。
          </p>

          {/* 交互搜索：浮动玻璃条 */}
          <div className="mt-10 group relative max-w-xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative flex items-center bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-xl">
              <div className="flex items-center flex-1 px-4 gap-3">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <input
                  placeholder="你想去哪里呼吸？"
                  className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-400"
                />
              </div>
              <Button
                size="lg"
                className="rounded-xl bg-slate-900 text-white hover:bg-emerald-600 transition-all gap-2 px-6"
              >
                Go Explore <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
