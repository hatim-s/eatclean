import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/ui/lib/utils"

const inputVariants = cva(
  "dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 h-9 rounded-lg border bg-transparent px-3 py-1 text-base transition-colors file:h-6 file:text-sm file:font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        /** The standard input style with a transparent background and visible border. */
        default: "",
        /** An input with a solid muted background and border, often used inside forms or cards. */
        filled: "bg-muted/50 border-border focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1 dark:bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps extends React.ComponentProps<"input">, VariantProps<typeof inputVariants> { }

function Input({ className, type, variant, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Input }
