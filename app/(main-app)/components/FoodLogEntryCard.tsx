"use client";

import { useState } from "react";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { FoodLog } from "@/types/db";
import { cn } from "@/ui/lib/utils";
import { deleteFoodLog } from "@/actions/db/foodLog";
import { useRouter } from "next/navigation";
import { DeleteConfirmationDialog } from "./DeleteConfirmationDialog";

const MEAL_TYPE_CONFIG = {
  breakfast: { label: "Breakfast", color: "bg-purple-500/20 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  lunch: { label: "Lunch", color: "bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/20" },
  dinner: { label: "Dinner", color: "bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  snack: { label: "Snack", color: "bg-blue-500/20 text-blue-600 dark:text-blue-400 border-blue-500/20" },
} as const;

type MealType = keyof typeof MEAL_TYPE_CONFIG;

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

interface FoodLogEntryCardProps {
  entry: FoodLog;
  onDeleted?: () => void;
}

export function FoodLogEntryCard({ entry, onDeleted }: FoodLogEntryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const router = useRouter();

  const mealType = (entry.mealType as MealType) || "snack";
  const config = MEAL_TYPE_CONFIG[mealType] || MEAL_TYPE_CONFIG.snack;

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteFoodLog(entry.id);
      onDeleted?.();
      router.refresh();
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete entry:", error);
      alert("Failed to delete entry. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const items = entry.items as Array<{ name: string; quantity_gms: number; calories: number; protein: number; carbs: number; fat: number }> || [];

  return (
    <>
      <div className="bg-card/50 rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all">
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span className={cn("text-xs font-medium px-2 py-1 rounded-md border", config.color)}>
              {config.label}
            </span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">
                {formatTime(entry.createdAt)}
              </span>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 hover:bg-muted rounded-md transition-colors"
              >
                {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            {items.slice(0, isExpanded ? undefined : 2).map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span className="text-foreground truncate flex-1 mr-2">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                </span>
                <span className="text-muted-foreground text-xs whitespace-nowrap">
                  {Math.round(item.quantity_gms)}g
                </span>
              </div>
            ))}
            {!isExpanded && items.length > 2 && (
              <div className="text-xs text-muted-foreground">+{items.length - 2} more items</div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/50">
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-orange-400" />
                <span className="text-muted-foreground">{Math.round(entry.calories)}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                <span className="text-muted-foreground">{Math.round(entry.protein)}g</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
                <span className="text-muted-foreground">{Math.round(entry.carbs)}g</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 dark:bg-rose-400" />
                <span className="text-muted-foreground">{Math.round(entry.fat)}g</span>
              </div>
            </div>

            <button
              onClick={() => setShowDeleteDialog(true)}
              disabled={isDeleting}
              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-border/50 space-y-4">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">All Items</h4>
                <div className="space-y-1.5">
                  {items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-1.5 px-3 bg-secondary/30 rounded-lg">
                      <span className="text-sm text-foreground">
                        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{Math.round(item.quantity_gms)}g</span>
                        <span className="text-foreground font-medium">{Math.round(item.calories)} kcal</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-medium text-muted-foreground my-2">Detailed Nutrition</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between py-1 px-2 bg-secondary/20 rounded">
                    <span className="text-muted-foreground">Protein</span>
                    <span className="text-foreground font-medium">{Math.round(entry.protein)}g</span>
                  </div>
                  <div className="flex justify-between py-1 px-2 bg-secondary/20 rounded">
                    <span className="text-muted-foreground">Carbs</span>
                    <span className="text-foreground font-medium">{Math.round(entry.carbs)}g</span>
                  </div>
                  <div className="flex justify-between py-1 px-2 bg-secondary/20 rounded">
                    <span className="text-muted-foreground">Fat</span>
                    <span className="text-foreground font-medium">{Math.round(entry.fat)}g</span>
                  </div>
                  <div className="flex justify-between py-1 px-2 bg-secondary/20 rounded">
                    <span className="text-muted-foreground">Calories</span>
                    <span className="text-foreground font-medium">{Math.round(entry.calories)} kcal</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        title="Delete Entry"
        description={`Are you sure you want to delete this ${config.label.toLowerCase()} entry? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
}
