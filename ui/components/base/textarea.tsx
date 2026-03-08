import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/ui/lib/utils"

const textareaVariants = cva(
  "border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-3 py-2 text-base transition-colors focus-visible:ring-[3px] aria-invalid:ring-[3px] md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        /** The standard textarea style with a transparent background and visible border. */
        default: "",
        /** A textarea with a solid muted background, more rounded corners, and custom padding. */
        filled: "bg-muted/50 border-border rounded-xl px-4 py-3 focus:border-primary focus:ring-primary focus:ring-1 dark:bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TextareaProps extends React.ComponentProps<"textarea">, VariantProps<typeof textareaVariants> { }

function Textarea({ className, variant, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(textareaVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Textarea }
