// src/components/editor/detail-editor.tsx
"use client";

import { useTripStore } from "@/store/useTripStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from 'react-markdown';

export function DetailEditor() {
  const { activeModuleId, modules, updateModule } = useTripStore();
  const module = modules.find(m => m.id === activeModuleId);

  if (!module) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <p>Select a module to edit details or refine with AI</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="font-bold uppercase text-xs tracking-widest text-muted-foreground">Editor</h3>
        <Button size="sm" variant="outline" className="gap-2" onClick={() => window.print()}>
          <FileDown className="w-4 h-4" /> PDF
        </Button>
      </div>

      <Tabs defaultValue="write" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="write">Write</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="write" className="flex-1 p-4 mt-0">
          <Textarea 
            className="h-full min-h-[500px] resize-none border-none focus-visible:ring-0 p-0 text-base leading-relaxed"
            placeholder="使用 Markdown 记录笔记或行程细节..."
            value={module.content}
            onChange={(e) => updateModule(module.id, { content: e.target.value })}
          />
        </TabsContent>

        <TabsContent value="preview" className="flex-1 p-6 mt-0 prose prose-sm max-w-none overflow-y-auto">
          <ReactMarkdown>{module.content}</ReactMarkdown>
        </TabsContent>
      </Tabs>
    </div>
  );
}