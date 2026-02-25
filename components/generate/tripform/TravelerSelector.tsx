"use client";
import { useFormContext } from "react-hook-form";
import { Users, Plus, Minus } from "lucide-react";

const TravelerSelector = () => {
  const { watch, setValue } = useFormContext();
  const travelers = watch("travelers");

  const update = (type: "adults" | "children", delta: number) => {
    const newVal = Math.max(type === "adults" ? 1 : 0, travelers[type] + delta);
    setValue("travelers", { ...travelers, [type]: newVal });
  };

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <Users className="w-3 h-3" /> 同行人员
      </label>
      <div className="flex gap-4">
        {[
          { key: "adults", label: "成人" },
          { key: "children", label: "儿童" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex-1 bg-slate-50/50 p-3 rounded-2xl flex items-center justify-between"
          >
            <span className="text-xs font-bold text-slate-500 ml-1">
              {item.label}
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => update(item.key as "adults" | "children", -1)}
                className="p-1 hover:bg-white rounded-full transition-colors text-slate-400"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold w-4 text-center">
                {travelers[item.key as "adults" | "children"]}
              </span>
              <button
                type="button"
                onClick={() => update(item.key as "adults" | "children", 1)}
                className="p-1 hover:bg-white rounded-full transition-colors text-slate-400"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelerSelector;
