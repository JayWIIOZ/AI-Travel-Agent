"use client";
import { useFormContext } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { label: "自然", value: "nature", emoji: "🌲" },
  { label: "文化", value: "culture", emoji: "⛩️" },
  { label: "美食", value: "food", emoji: "🍜" },
  { label: "城市", value: "city", emoji: "🏙️" },
  { label: "艺术", value: "art", emoji: "🎨" },
];

const PreferenceSelector = () => {
  const { watch, setValue } = useFormContext();
  const selected = watch("preferences") || [];

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
        探索偏好
      </label>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map((opt) => {
          const isAct = selected.includes(opt.value);
          return (
            <Badge
              key={opt.value}
              variant="outline"
              className={cn(
                "px-4 py-1.5 rounded-xl cursor-pointer transition-all border-slate-100",
                isAct
                  ? "bg-emerald-500 text-white border-emerald-500 shadow-md scale-105"
                  : "bg-white text-slate-500",
              )}
              onClick={() => {
                const next = isAct
                  ? selected.filter((v: string) => v !== opt.value)
                  : [...selected, opt.value];
                setValue("preferences", next);
              }}
            >
              <span className="mr-1.5">{opt.emoji}</span> {opt.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};

export default PreferenceSelector;
