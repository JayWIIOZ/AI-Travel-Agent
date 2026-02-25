import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, RefreshCw, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTripStore } from "@/store/useTripStore";

const TripModuleCard = ({ module }: { module: any }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: module.id });
  const { activeModuleId, setActiveModule } = useTripStore();

  const isActive = activeModuleId === module.id;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => setActiveModule(module.id)}
      className={cn(
        "group bg-background border rounded-2xl p-4 shadow-sm transition-all cursor-pointer hover:border-primary/50",
        isActive && "ring-2 ring-primary border-transparent shadow-md",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          {...attributes}
          {...listeners}
          className="mt-1 text-muted-foreground cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">
              {module.type}
            </span>
            <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-secondary rounded transition-opacity">
              <RefreshCw className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          </div>
          <h4 className="font-semibold text-sm mb-2">{module.title}</h4>
          <div className="text-sm text-muted-foreground line-clamp-2">
            {module.content || "Click to add details..."}
          </div>
        </div>

        <ChevronRight
          className={cn(
            "w-4 h-4 mt-auto text-muted-foreground transition-transform",
            isActive && "rotate-90",
          )}
        />
      </div>
    </div>
  );
};

export default TripModuleCard;
