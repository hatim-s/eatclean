"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/ui/components/base/dialog";
import { Button, buttonVariants } from "@/ui/components/base/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title: string;
    description: string;
    isDeleting?: boolean;
}

export function DeleteConfirmationDialog({
    open,
    onOpenChange,
    onConfirm,
    title,
    description,
    isDeleting = false,
}: DeleteConfirmationDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal="trap-focus"  >
            <DialogContent className="sm:max-w-106.25">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-destructive">
                        <Trash2 className="h-5 w-5" />
                        <DialogTitle className="text-destructive">{title}</DialogTitle>
                    </div>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 bg-background">
                    <DialogClose className={buttonVariants({ variant: "outline", size: "default", })} disabled={isDeleting}>
                        Cancel
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}
