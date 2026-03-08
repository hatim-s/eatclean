"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/ui/lib/utils"
import { Button } from "@/ui/components/base/button"
import { XIcon } from "lucide-react"

function Dialog({ ...props }: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  )
}

import { cva, type VariantProps } from "class-variance-authority"

const dialogContentVariants = cva(
  "bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 ring-foreground/10 ring-1 duration-100 fixed left-1/2 z-50 -translate-x-1/2 outline-none isolate",
  {
    variants: {
      variant: {
        /** The standard dialog style that mimics a centered modal on all screen sizes. */
        default: "top-1/2 -translate-y-1/2 w-full max-w-[calc(100%-2rem)] sm:max-w-sm rounded-xl data-closed:zoom-out-95 data-open:zoom-in-95 grid gap-4 p-4 text-sm",
        /** A responsive dialog that acts as a bottom sheet on mobile screens and a centered modal on desktop screens. */
        responsive: "top-auto bottom-0 max-h-[90vh] w-full max-w-none rounded-b-none rounded-t-2xl translate-y-0 sm:max-w-none md:top-1/2 md:bottom-auto md:w-[40rem] md:max-w-[40rem] md:rounded-2xl md:-translate-y-1/2 data-closed:slide-out-to-bottom-1/2 data-open:slide-in-from-bottom-1/2 md:data-closed:slide-out-to-bottom-0 md:data-open:slide-in-from-bottom-0 md:data-closed:zoom-out-95 md:data-open:zoom-in-95 p-0 gap-0 overflow-hidden flex flex-col"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

export interface DialogContentProps extends DialogPrimitive.Popup.Props, VariantProps<typeof dialogContentVariants> {
  showCloseButton?: boolean
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  variant,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(dialogContentVariants({ variant }), className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-2 right-2"
                size="icon-sm"
              />
            }
          >
            <XIcon
            />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("gap-2 flex flex-col", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "bg-muted/50 -mx-4 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
