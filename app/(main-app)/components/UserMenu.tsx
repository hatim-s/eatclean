"use client";

import { signOut } from "@/auth/client";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/ui/components/base/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/base/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserMenuProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  initials: string;
};

export function UserMenu({ name, email, image, initials }: UserMenuProps) {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    if (isSigningOut) return;

    setIsSigningOut(true);

    try {
      await signOut();
      router.replace("/sign-in");
      router.refresh();
    } catch {
      setIsSigningOut(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-muted focus-visible:ring-ring/50 inline-flex max-w-full items-center gap-2 rounded-md px-2 py-1 outline-none transition-colors focus-visible:ring-[3px]">
        <Avatar size="sm">
          <AvatarImage alt={name || "User"} src={image || undefined} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 text-left">
          <p className="truncate text-xs font-medium text-foreground">
            {name || "User"}
          </p>
          <p className="hidden max-w-44 truncate text-[11px] text-muted-foreground sm:block">
            {email || ""}
          </p>
        </div>
        <ChevronDown className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="truncate text-xs font-medium text-foreground">
              {name || "User"}
            </p>
            <p className="truncate text-[11px] text-muted-foreground">
              {email || ""}
            </p>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isSigningOut}
          onClick={handleLogout}
          variant="destructive"
        >
          <LogOut className="size-4" />
          {isSigningOut ? "Logging out..." : "Log out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
