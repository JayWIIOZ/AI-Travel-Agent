"use client";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Wallet } from "lucide-react";

const BUDGETS = [
  { value: "economy", label: "经济", desc: "追求高性价比" },
  { value: "standard", label: "标准", desc: "舒适平衡之选" },
  { value: "premium", label: "品质", desc: "尽享极致体验" },
];

const BudgetSelector = () => {
  const { watch, setValue } = useFormContext();
  const current = watch("budgetRange");

  return (
    <div className="space-y-4">
      <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
        <Wallet className="w-3 h-3" /> 预算方案
      </label>
      <div className="grid grid-cols-3 gap-2">
        {BUDGETS.map((b) => (
          <button
            key={b.value}
            type="button"
            onClick={() => setValue("budgetRange", b.value)}
            className={cn(
              "p-3 rounded-2xl border text-left transition-all",
              current === b.value
                ? "bg-emerald-500 border-emerald-500 text-white shadow-md"
                : "bg-white border-slate-100 text-slate-600 hover:border-emerald-200",
            )}
          >
            <div className="text-[11px] font-bold">{b.label}</div>
            <div
              className={cn(
                "text-[9px] mt-0.5 opacity-80",
                current === b.value ? "text-white" : "text-slate-400",
              )}
            >
              {b.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BudgetSelector;
