"use client";

import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTripStore } from "@/store/useTripStore";
import TripModuleCard from "./TripModuleCard";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const ModuleList = () => {
  const { modules, reorderModules, addModule } = useTripStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderModules(active.id as string, over.id as string);
    }
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={modules.map((m) => m.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4 pb-20">
          {modules.map((module) => (
            <TripModuleCard key={module.id} module={module} />
          ))}

          <Button
            variant="outline"
            className="w-full h-16 border-2 rounded-2xl gap-2 text-muted-foreground"
            onClick={() => addModule("activity")}
          >
            <Plus className="w-4 h-4" /> Add custom module
          </Button>
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ModuleList;
