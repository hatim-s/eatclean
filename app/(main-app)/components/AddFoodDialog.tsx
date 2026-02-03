"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Plus, Check, Trash2, X } from "lucide-react";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "@/ui/components/base/morphing-dialog";
import { Button } from "@/ui/components/base/button";
import { Textarea } from "@/ui/components/base/textarea";
import { Input } from "@/ui/components/base/input";
import { ScrollArea } from "@/ui/components/base/scroll-area";
import { cn } from "@/ui/lib/utils";
import { createFoodLog } from "@/actions/createFoodLog";
import { createFoodLogEntry } from "@/actions/db/foodLog";

const MEAL_TYPES = [
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" },
  { value: "snack", label: "Snack" },
] as const;

type MealType = (typeof MEAL_TYPES)[number]["value"];

function getMealTypeFromTime(): MealType {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 11) return "breakfast";
  if (hour >= 11 && hour < 16) return "lunch";
  if (hour >= 16 && hour < 22) return "dinner";
  return "snack";
}

interface ManualItem {
  food: string;
  quantity: string;
}

interface AddFoodDialogProps {
  date: string;
}

export function AddFoodDialog({ date }: AddFoodDialogProps) {
  const router = useRouter();
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [manualItems, setManualItems] = useState<ManualItem[]>([{ food: "", quantity: "" }]);
  const [mealType, setMealType] = useState<MealType>(getMealTypeFromTime());

  const dateObj = new Date(date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

  const handleSubmit = async () => {
    setError("");
    
    if (mode === "ai") {
      if (!prompt.trim()) return;
    } else {
      const validItems = manualItems.filter((item) => item.food.trim() && item.quantity.trim());
      if (validItems.length === 0) return;
    }

    setIsProcessing(true);
    try {
      let input = prompt;
      if (mode === "manual") {
        const validItems = manualItems.filter((item) => item.food.trim() && item.quantity.trim());
        input = validItems.map((item) => `${item.food}, ${item.quantity}`).join("; ");
      }

      const matchesMap = await createFoodLog(input);
      const { foodVsNutrition, accumulatedNutrition, foodVsDbItem } = matchesMap;

      if (Object.keys(foodVsNutrition).length === 0) {
        setError("No foods found. Please try a different description.");
        return;
      }

      await createFoodLogEntry({
        logDate: date,
        items: Object.entries(foodVsNutrition).map(([foodName, nutrition]) => ({
          name: foodName,
          ...nutrition,
          id: foodVsDbItem[foodName].id,
          category: foodVsDbItem[foodName].category,
        })),
        calories: accumulatedNutrition.calories,
        protein: accumulatedNutrition.protein,
        carbs: accumulatedNutrition.carbs,
        fat: accumulatedNutrition.fat,
        mealType,
      });

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to log food. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const addManualItem = () => setManualItems([...manualItems, { food: "", quantity: "" }]);
  const removeManualItem = (index: number) => setManualItems(manualItems.filter((_, idx) => idx !== index));
  const updateManualItem = (index: number, field: keyof ManualItem, value: string) => {
    const updated = [...manualItems];
    updated[index][field] = value;
    setManualItems(updated);
  };

  const hasValidManualItems = manualItems.some((item) => item.food.trim() && item.quantity.trim());

  return (
    <MorphingDialog>
      <MorphingDialogTrigger className="w-full flex-1">
        <div className="flex-1 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Plus size={16} className="text-muted-foreground" />
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="bg-card border border-border rounded-2xl w-full max-w-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Log Food</h2>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
            <MorphingDialogClose className="p-2 hover:bg-muted hover:text-foreground rounded-lg transition-colors">
              <X size={20} className="text-muted-foreground" />
            </MorphingDialogClose>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1.5 block">Meal Type</label>
              <div className="flex gap-1.5">
                {MEAL_TYPES.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setMealType(value)}
                    className={cn(
                      "flex-1 py-1.5 px-2 text-xs font-medium rounded-lg transition-colors",
                      mealType === value
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {mode === "ai" ? (
              <div className="space-y-3">
                <div className="relative">
                  <Textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you ate...

e.g. &quot;2 scrambled eggs with toast and a glass of orange juice&quot; or &quot;chicken salad with about 150g grilled chicken, mixed greens, tomatoes, and olive oil dressing&quot;"
                    className="w-full h-32 bg-muted/50 border-border rounded-xl px-4 py-3 text-foreground placeholder-muted-foreground text-sm resize-none focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                  <div className="absolute bottom-3 right-3 flex items-center gap-2">
                    <Sparkles size={14} className="text-muted-foreground" />
                  </div>
                </div>

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-2.5">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isProcessing}
                  className="w-full py-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} className="mr-2" />
                      Log with AI
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setMode("manual")}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  or enter items manually
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <ScrollArea className="max-h-48">
                  <div className="space-y-2 pr-4">
                    {manualItems.map((item, index) => (
                      <div key={index} className="flex gap-2 items-start">
                        <div className="flex-1 space-y-2">
                          <Input
                            type="text"
                            value={item.food}
                            onChange={(e) => updateManualItem(index, "food", e.target.value)}
                            placeholder="Food name (e.g. chicken breast)"
                            className="bg-muted/50 border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary"
                          />
                          <Input
                            type="text"
                            value={item.quantity}
                            onChange={(e) => updateManualItem(index, "quantity", e.target.value)}
                            placeholder="Quantity (e.g. 150g, 1 cup, 2 pieces)"
                            className="bg-muted/50 border-border rounded-lg px-3 py-2 text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary"
                          />
                        </div>
                        {manualItems.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeManualItem(index)}
                            className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors mt-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <Button
                  type="button"
                  onClick={addManualItem}
                  variant="outline"
                  className="w-full"
                >
                  <Plus size={14} className="mr-1.5" />
                  Add another item
                </Button>

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 rounded-lg p-2.5">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handleSubmit}
                  disabled={!hasValidManualItems || isProcessing}
                  className="w-full py-3"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={16} className="mr-2" />
                      Log {manualItems.filter((i) => i.food.trim() && i.quantity.trim()).length || ""} Item
                      {manualItems.filter((i) => i.food.trim() && i.quantity.trim()).length !== 1 ? "s" : ""}
                    </>
                  )}
                </Button>

                <button
                  type="button"
                  onClick={() => setMode("ai")}
                  className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-1 flex items-center justify-center gap-1"
                >
                  <Sparkles size={12} />
                  use AI input instead
                </button>
              </div>
            )}
          </div>
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
