"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/lib/store";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const schema = z.object({
  email:    z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    try {
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch {
      // Demo mode — just redirect
      router.push("/dashboard");
    }
  }

  return (
    <div className="animate-fade-up">
      <div className="mb-8">
        <h1 className="font-display text-3xl text-chalk mb-2">Welcome back</h1>
        <p className="text-ink-400 text-sm">Sign in to your classroom dashboard</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-300 mb-1.5">Email address</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              {...register("email")}
              type="email"
              placeholder="teacher@school.edu"
              defaultValue="teacher@school.edu"
              className="w-full bg-ink-800 border border-ink-600 rounded-lg py-2.5 pl-9 pr-3 text-sm text-chalk placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
            />
          </div>
          {errors.email && <p className="text-coral-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink-300 mb-1.5">Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              defaultValue="password"
              className="w-full bg-ink-800 border border-ink-600 rounded-lg py-2.5 pl-9 pr-3 text-sm text-chalk placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-all"
            />
          </div>
          {errors.password && <p className="text-coral-400 text-xs mt-1">{errors.password.message}</p>}
        </div>

        {errors.root && (
          <div className="bg-coral-900/30 border border-coral-700 rounded-lg px-3 py-2 text-coral-300 text-sm">
            {errors.root.message}
          </div>
        )}

        <Button type="submit" loading={isSubmitting} className="w-full bg-sage-500 hover:bg-sage-400 text-white border-0 focus:ring-sage-400 py-2.5 mt-2">
          Sign in
        </Button>
      </form>

      <p className="text-ink-500 text-sm text-center mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-sage-400 hover:text-sage-300 transition-colors">
          Create one
        </Link>
      </p>

      <div className="mt-8 p-3 rounded-lg border border-ink-700 bg-ink-800/50">
        <p className="text-ink-400 text-xs text-center font-mono">
          Demo: teacher@school.edu / password
        </p>
      </div>
    </div>
  );
}
