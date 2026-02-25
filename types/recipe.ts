// src/types/recipe.ts
export type InspirationRecipe = {
  id: string;
  name: string;
  vibe: string;
  archetype: "aesthetic" | "culinary" | "nature" | "romance" | "urban" | "slow";
  narrative: string;
  image: string;
  aiModifiers: {
    pace?: "relaxed" | "balanced" | "intense";
    accommodationLevel?: "budget" | "standard" | "luxury";
    preferenceBoost: string[]; // 提升权重的标签
    budgetShift?: "up" | "down";
    durationHint?: number;
  };
};

export const RECIPES: InspirationRecipe[] = [
  {
    id: "breathe-nature",
    name: "呼吸自然气息",
    vibe: "森林 · 湖泊 · 远离城市",
    archetype: "nature",
    narrative: "屏蔽噪音，在荒野中找回呼吸的节奏",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=500",
    aiModifiers: {
      preferenceBoost: ["nature", "hiking", "lake"],
      budgetShift: "down",
      pace: "relaxed",
      durationHint: 5,
    },
  },
  {
    id: "aesthetic-trip",
    name: "电影感出片之旅",
    vibe: "光影 · 建筑 · 日落叙事",
    archetype: "aesthetic",
    narrative: "为你的相机镜头量身定制的视觉盛宴",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=500",
    aiModifiers: {
      preferenceBoost: ["art", "architecture", "viewpoint", "sunset"],
      pace: "balanced",
      accommodationLevel: "luxury",
    },
  },
  {
    id: "urban-culinary",
    name: "味觉地图巡礼",
    vibe: "市场 · 秘店 · 烟火气",
    archetype: "culinary",
    narrative: "从街头摊位到隐秘酒馆的饕餮叙事",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500",
    aiModifiers: {
      preferenceBoost: ["food", "local-market", "wine"],
      budgetShift: "up",
      pace: "intense",
    },
  },
];
