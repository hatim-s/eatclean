'use client';

import { signIn } from "@/auth/client";
import { Button } from "@/ui/components/base/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/components/base/card";
import { FieldDescription } from "@/ui/components/base/field";
import {
  BarChart3Icon,
  GithubIcon,
  LeafIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from "lucide-react";

import { ThemeToggle } from "@/ui/components/theme-toggle";

export default function SignInPage() {
  return (
    <div className="landing-v2 relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute right-4 top-4 z-50">
        <ThemeToggle />
      </div>
      <div className="pointer-events-none absolute -top-28 left-1/4 h-72 w-72 rounded-full bg-amber-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full bg-amber-300/10 blur-3xl" />

      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center gap-8 px-4 py-10">
        <section className="flex flex-col items-center space-y-7 text-center">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-amber-400 to-amber-600 text-zinc-900 shadow-lg shadow-amber-500/20">
              <LeafIcon className="size-5" />
            </div>
            <span className="text-2xl font-semibold tracking-tight text-foreground">
              Eat<span className="text-amber-600 dark:text-amber-400">Clean</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              Track nutrition
              <br />
              <span className="text-amber-600 dark:text-amber-400">effortlessly</span> with AI
            </h1>
            <p className="text-base leading-relaxed text-muted-foreground">
              Describe meals in plain language and get instant nutrition insights
              from USDA-backed data.
            </p>
          </div>
        </section>

        <section className="w-full">
          <Card className="border-border/80 bg-card py-0 shadow-2xl shadow-black/10 dark:shadow-black/35 backdrop-blur-xl">
            <CardHeader className="space-y-2 px-6 pt-6 text-center">
              <CardTitle className="text-2xl font-semibold text-foreground">Welcome back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Sign in to continue tracking your nutrition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-6">
              <div className="h-px bg-linear-to-r from-transparent via-border to-transparent" />

              <Button
                className="h-11 w-full justify-center gap-2 rounded-xl bg-linear-to-br from-amber-400 to-amber-600 text-zinc-900 hover:from-amber-300 hover:to-amber-500"
                type="button"
                onClick={async () => {
                  await signIn.social({
                    provider: "github",
                    callbackURL: "/home",
                  });
                }}
              >
                <GithubIcon className="size-4" />
                Continue with GitHub
              </Button>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <Button
                className="h-11 w-full justify-center gap-2 rounded-xl border-border bg-card text-foreground hover:bg-accent hover:text-accent-foreground"
                type="button"
                variant="outline"
                onClick={async () => {
                  await signIn.social({
                    provider: "google",
                    callbackURL: "/home",
                  });
                }}
              >
                <svg className="size-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>

              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/12">
                    <SparklesIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  AI-powered natural language food logging
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/12">
                    <BarChart3Icon className="size-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  30+ nutrients tracked from USDA data
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/12">
                    <ShieldCheckIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  Private, secure, zero cost
                </div>
              </div>
            </CardContent>
          </Card>

          <FieldDescription className="mx-auto mt-5! max-w-sm px-2 text-center text-xs text-muted-foreground">
            By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </section>
      </div>
    </div>
  );
}
