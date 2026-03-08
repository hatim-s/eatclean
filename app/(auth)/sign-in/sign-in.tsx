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
    <div className="landing-v2 relative min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
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
            <span className="text-2xl font-semibold tracking-tight text-white">
              Eat<span className="text-amber-400">Clean</span>
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Track nutrition
              <br />
              <span className="text-amber-400">effortlessly</span> with AI
            </h1>
            <p className="text-base leading-relaxed text-zinc-400">
              Describe meals in plain language and get instant nutrition insights
              from USDA-backed data.
            </p>
          </div>
        </section>

        <section className="w-full">
          <Card className="border-zinc-800/80 bg-zinc-900/85 py-0 shadow-2xl shadow-black/35 backdrop-blur-xl">
            <CardHeader className="space-y-2 px-6 pt-6 text-center">
              <CardTitle className="text-2xl font-semibold text-white">Welcome back</CardTitle>
              <CardDescription className="text-zinc-400">
                Sign in to continue tracking your nutrition
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-6 pb-6">
              <div className="h-px bg-linear-to-r from-transparent via-zinc-700 to-transparent" />

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

              {/* Google login is intentionally disabled right now.
              <Button
                className="h-11 w-full justify-center gap-2 rounded-xl border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                type="button"
                variant="outline"
                onClick={async () => {
                  await signIn.social({
                    provider: "google",
                    callbackURL: "/home",
                  });
                }}
              >
                Continue with Google
              </Button>
              */}

              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/12">
                    <SparklesIcon className="size-3.5 text-amber-400" />
                  </div>
                  AI-powered natural language food logging
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/12">
                    <BarChart3Icon className="size-3.5 text-amber-400" />
                  </div>
                  30+ nutrients tracked from USDA data
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-400">
                  <div className="flex size-6 items-center justify-center rounded-md bg-amber-500/12">
                    <ShieldCheckIcon className="size-3.5 text-amber-400" />
                  </div>
                  Private, secure, zero cost
                </div>
              </div>
            </CardContent>
          </Card>

          <FieldDescription className="mx-auto mt-5! max-w-sm px-2 text-center text-xs text-zinc-500">
            By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </FieldDescription>
        </section>
      </div>
    </div>
  );
}
