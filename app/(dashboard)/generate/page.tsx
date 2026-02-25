"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tripIntentSchema, type TripIntent } from "@/lib/validations/trips";
import { GenerateSidebar } from "@/components/generate/Sidebar";
import { TripForm } from "@/components/generate/tripform/index";
import { useGenerateStore } from "@/store/useGenerateStore";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const formDefaultValues: TripIntent = {
  destination: "",
  duration: 5,
  budgetRange: "standard",
  travelers: { adults: 2, children: 0 },
  preferences: [],
  pace: "balanced",
  accommodationLevel: "standard",
};

const GeneratePage = () => {
  const methods = useForm<TripIntent>({
    resolver: zodResolver(tripIntentSchema),
    defaultValues: formDefaultValues,
  });
  const isSubmitting = useGenerateStore((s) => s.isSubmitting);

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen p-4 sm:p-6 relative">
        <AnimatePresence>
          {isSubmitting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-[2.5rem] bg-white/90 backdrop-blur-md border border-white/40"
            >
              <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
              <p className="text-lg font-semibold text-slate-800">正在创建旅行计划</p>
              <p className="text-sm text-slate-500 mt-1">AI 正在为您编织行程...</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr] gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* 卡片 1：灵感模板 */}
          <div className="rounded-[2.5rem] bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl overflow-hidden">
            <GenerateSidebar />
          </div>
          {/* 卡片 2：意图配置 */}
          <div className="rounded-[2.5rem] bg-white/20 backdrop-blur-md border border-white/40 shadow-2xl overflow-hidden overflow-y-auto custom-scrollbar">
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  定制行程
                </h1>
                <p className="text-sm text-slate-500 font-medium">
                  调整偏好，AI 即刻为您编织旅程
                </p>
              </div>
              <TripForm />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default GeneratePage;
