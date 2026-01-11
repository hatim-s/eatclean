import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogContainer,
} from "@/ui/components/base/morphing-dialog";
import { ScrollArea } from "@/ui/components/base/scroll-area";
import { useMemo } from "react";
import { Transition } from "motion/react";
import { FoodLogItem } from "@/ui/components/food-log";
import { Feature } from "@/ui/components/calendar";

const micronutrients = [
  "sodium",
  "potassium",
  "calcium",
  "iron",
  "magnesium",
  "zinc",
  "vitaminA",
  "vitaminC",
  "vitaminD",
  "vitaminE",
  "vitaminK",
  "vitaminB1",
  "vitaminB2",
  "vitaminB3",
  "vitaminB5",
  "vitaminB6",
  "vitaminB9",
  "vitaminB12",
] as const;

export function FoodLogDialog(props: { foodLog: Feature }) {
  const transition = useMemo<Transition>(
    () => ({
      type: "spring",
      stiffness: 200,
      damping: 24,
    }),
    []
  );
  return (
    <MorphingDialog transition={transition}>
      <MorphingDialogTrigger className="w-full">
        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-start justify-center space-y-0 px-4 py-2">
            <MorphingDialogTitle className="text-foreground">
              <FoodLogItem
                nutritionalValue={props.foodLog.calories}
                nutritionType="calories"
                size="sm"
              />
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="text-muted-foreground">
              <div className="flex flex-row gap-x-2 items-center flex-wrap">
                <FoodLogItem
                  nutritionalValue={props.foodLog.protein}
                  nutritionType="protein"
                  size="sm"
                />
                <FoodLogItem
                  nutritionalValue={props.foodLog.carbs}
                  nutritionType="carbs"
                  size="sm"
                />
                <FoodLogItem
                  nutritionalValue={props.foodLog.fat}
                  nutritionType="fat"
                  size="sm"
                />
              </div>
            </MorphingDialogSubtitle>
          </div>
        </div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative h-auto w-[500px] bg-background rounded-3xl!">
          <ScrollArea>
            <div className="relative p-6">
              <div className="items-start">
                <MorphingDialogTitle className="text-foreground">
                  <FoodLogItem
                    nutritionalValue={props.foodLog.calories}
                    nutritionType="calories"
                    size="md"
                  />
                </MorphingDialogTitle>
                <MorphingDialogSubtitle className="font-light text-muted-foreground mt-4">
                  <div className="flex flex-col gap-x-2 flex-wrap">
                    <FoodLogItem
                      nutritionalValue={props.foodLog.protein}
                      nutritionType="protein"
                      size="md"
                    />

                    <FoodLogItem
                      nutritionalValue={props.foodLog.carbs}
                      nutritionType="carbs"
                      size="md"
                    />

                    <FoodLogItem
                      nutritionalValue={props.foodLog.fat}
                      nutritionType="fat"
                      size="md"
                    />
                  </div>
                </MorphingDialogSubtitle>
                <div className="mt-4 text-sm text-muted-foreground">
                  {micronutrients.map((nutritionType) => (
                    <FoodLogItem
                      key={nutritionType}
                      nutritionalValue={props.foodLog[nutritionType]}
                      nutritionType={nutritionType}
                      size="md"
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
          <MorphingDialogClose className="text-zinc-500" />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
