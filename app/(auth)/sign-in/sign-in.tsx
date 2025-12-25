'use client';

import { Button } from "@/ui/components/base/button";
import { LoginForm } from "@/ui/components/login-form";
import { GithubIcon } from "lucide-react";
import { signIn } from "@/auth/client";

export default function SignInPage() {
  return <div className="flex flex-col items-center justify-center h-screen">
    <LoginForm className="max-w-1/3 min-w-[500px]" formHeader="Login" formDescription="Login with your GitHub account">
      <Button variant="default" type="button" onClick={async () => {
        await signIn.social({
          provider: "github",
          callbackURL: "/",
        });
      }}>
        <GithubIcon className="me-2" />
        Login with GitHub
      </Button>
    </LoginForm>
  </div>;
}