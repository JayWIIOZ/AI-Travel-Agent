"use client";

import { useState } from "react";
import { FileText, Save, Download, Edit3, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const NotesEditor = () => {
  // 模拟 AI 生成的结构化 Markdown
  const [content, setContent] = useState(`
# 🇯🇵 东京·5天自然灵感之旅

## 📑 行程分类概览
- **住宿**: 虹夕诺雅 东京 (大手町)
- **交通**: JR Pass + 步行
- **氛围**: 艺术、静谧、自然

---

## 🗓 Day 1: 到达与皇居散策
### 上午
* 抵达成田机场，搭乘 N'EX 直达东京站。
* 办理入住后，前往**皇居外苑**。

### 下午
* 访问**根津美术馆**：欣赏其著名的庭院设计。

---

## 💡 贴心提醒
- 记得提前预约美术馆门票。
- 准备一双舒适的步行鞋。
  `);

  return (
    <section className="w-[500px] min-h-screen flex flex-col bg-white/50 backdrop-blur-sm">
      {/* 编辑器顶栏 */}
      <div className="h-16 px-6 border-b border-white/40 flex items-center justify-between bg-white/30">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-emerald-500 rounded-lg">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-sm text-slate-700">结构化笔记</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full hover:bg-emerald-50 text-emerald-600"
          >
            <Save className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 rounded-full hover:bg-emerald-50 text-emerald-600"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 内容区域 */}
      <Tabs defaultValue="edit" className="flex-1 flex flex-col">
        <div className="px-6 py-3 bg-slate-50/50 flex justify-between items-center border-b border-white/20">
          <TabsList className="bg-white/50 border border-slate-200 h-8 p-0.5 rounded-full">
            <TabsTrigger
              value="edit"
              className="rounded-full text-[10px] uppercase font-bold px-4 h-7"
            >
              <Edit3 className="w-3 h-3 mr-1" /> 编辑
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-full text-[10px] uppercase font-bold px-4 h-7"
            >
              <Eye className="w-3 h-3 mr-1" /> 预览
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase italic">
            Auto-saving...
          </div>
        </div>

        <TabsContent value="edit" className="flex-1 m-0 p-0 overflow-hidden">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full p-8 bg-transparent border-none outline-none resize-none font-mono text-sm leading-relaxed text-slate-600 placeholder:text-slate-300"
            placeholder="AI 正在为您编写笔记..."
          />
        </TabsContent>

        <TabsContent
          value="preview"
          className="flex-1 m-0 p-8 overflow-y-auto prose prose-emerald prose-sm max-w-none"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </TabsContent>
      </Tabs>

      {/* 底部 AI 辅助栏 */}
      <div className="p-4 border-t border-white/40 bg-white/40">
        <Button className="w-full h-10 rounded-xl bg-white border border-emerald-100 text-emerald-600 hover:bg-emerald-50 gap-2 shadow-sm font-bold text-xs">
          <Sparkles className="w-3.5 h-3.5" /> 润色当前笔记内容
        </Button>
      </div>
    </section>
  );
};

export default NotesEditor;
