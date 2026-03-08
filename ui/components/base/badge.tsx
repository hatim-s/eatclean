import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/ui/lib/utils"

const badgeVariants = cva(
  "h-5 gap-1 rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium transition-all has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! inline-flex items-center justify-center w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-colors overflow-hidden group/badge",
  {
    variants: {
      variant: {
        /** The primary badge style for general highlights and counts. */
        default: "bg-primary text-primary-foreground [a]:hover:bg-primary/80",
        /** A secondary badge style for less prominent information. */
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        /** A badge used to indicate errors, alerts, or destructive states. */
        destructive: "bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20",
        /** A badge with a border and no background, suitable for tags. */
        outline: "border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground",
        /** A branded, highlighted outline badge for premium or special tags. */
        "brand-outline": "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300",
        /** A badge used to indicate successful states or positive trends. */
        success: "bg-emerald-500/20 text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400",
        /** A subtle, background-less badge for minor metadata. */
        ghost: "hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50",
        /** A badge that looks like a subtle text link. */
        link: "text-primary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ className, variant })),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
