// src/components/editor/input-panel.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Sparkles, Plane, Wallet, Palmtree } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { tripIntentSchema, TripIntent } from "@/lib/validations/trips";

const TRAVEL_STYLES = ["文化探索", "自然风光", "美食之旅", "亲子休闲", "极限运动", "购物天堂"];

export function InputPanel() {
  const form = useForm<TripIntent>({
    resolver: zodResolver(tripIntentSchema),
    defaultValues: {
      destination: "",
      budget: 5000,
      travelStyle: ["文化探索"],
      aiIntensity: 50,
    },
  });

  async function onSubmit(data: TripIntent) {
    console.log("触发 AI 全局规划:", data);
    // 这里调用 AI 生成 API，然后更新 Zustand Store 中的 modules
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Palmtree className="w-5 h-5 text-primary" />
          意图配置
        </h2>
        <p className="text-xs text-muted-foreground">调整参数以生成个性化行程</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* 目的地 */}
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase font-bold text-muted-foreground">目的地</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Plane className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="例如：东京、巴黎..." className="pl-9" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 日期选择 */}
          <FormField
            control={form.control}
            name="dateRange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-xs uppercase font-bold text-muted-foreground">旅行时间</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd")} - {format(field.value.to, "LLL dd")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd")
                          )
                        ) : (
                          <span>选择日期范围</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={1}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 预算范围 */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel className="text-xs uppercase font-bold text-muted-foreground text-start">预算 (￥)</FormLabel>
                  <span className="text-xs font-mono">￥{field.value}</span>
                </div>
                <FormControl>
                  <div className="pt-2">
                    <Slider
                      min={1000}
                      max={50000}
                      step={500}
                      defaultValue={[field.value]}
                      onValueChange={(vals) => field.onChange(vals[0])}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* 旅行风格 - 多选 Badge */}
          <FormField
            control={form.control}
            name="travelStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase font-bold text-muted-foreground">偏好风格</FormLabel>
                <div className="flex flex-wrap gap-2 pt-1">
                  {TRAVEL_STYLES.map((style) => {
                    const isSelected = field.value.includes(style);
                    return (
                      <Badge
                        key={style}
                        variant={isSelected ? "default" : "outline"}
                        className={cn(
                          "cursor-pointer px-3 py-1 rounded-md transition-all",
                          isSelected ? "bg-primary shadow-md" : "hover:bg-secondary"
                        )}
                        onClick={() => {
                          const newValue = isSelected
                            ? field.value.filter((v) => v !== style)
                            : [...field.value, style];
                          field.onChange(newValue);
                        }}
                      >
                        {style}
                      </Badge>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button type="submit" className="w-full gap-2 h-11 shadow-lg shadow-primary/20 group">
              <Sparkles className="w-4 h-4 group-hover:animate-spin" />
              重新生成完整行程单
            </Button>
            <p className="text-[10px] text-center text-muted-foreground mt-3 leading-relaxed">
              点击生成将根据当前配置，利用 AI 重新构建所有行程模块，现有未锁定内容将被覆盖。
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}