"use client";

import { useState, useTransition, useEffect } from "react";
import { login, signup } from "@/app/actions/auth";
import GlassButton from "@/components/ui/GlassButton";
import { Sun, Mail, Lock } from "lucide-react";
import { animateIn } from "@/lib/animations";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    animateIn(document.querySelectorAll(".auth-element"), { delay: 0.1, stagger: 0.1 });
  }, [isLogin]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = isLogin ? await login(fd) : await signup(fd);
      if (result?.error) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="glass-card w-full max-w-md p-8 auth-element opacity-0">
        <div className="text-center mb-8">
          <Sun size={48} className="mx-auto text-ph-yellow mb-4 drop-shadow-sm auth-element opacity-0" />
          <h1 className="font-heading font-black text-3xl text-foreground auth-element opacity-0">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-foreground/50 text-sm mt-2 auth-element opacity-0">
            {isLogin ? "Sign in to continue to Bayanihan" : "Join the movement today"}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-ph-red/20 border border-ph-red/30 rounded-lg text-ph-red text-sm flex items-center gap-2 auth-element opacity-0">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="auth-element opacity-0">
            <label className="block text-foreground/70 text-sm mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <input 
                name="email" 
                type="email" 
                required 
                className="glass-input pl-10" 
                placeholder="juan@example.com"
              />
            </div>
          </div>
          
          <div className="auth-element opacity-0">
            <label className="block text-foreground/70 text-sm mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <input 
                name="password" 
                type="password" 
                required 
                className="glass-input pl-10" 
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          </div>

          <div className="pt-2 auth-element opacity-0">
            <GlassButton type="submit" loading={isPending} className="w-full">
              {isLogin ? "Sign In" : "Sign Up"}
            </GlassButton>
          </div>
        </form>

        <div className="mt-6 text-center auth-element opacity-0">
          <button 
            type="button"
            onClick={() => { setIsLogin(!isLogin); setError(null); }}
            className="text-sm text-foreground/60 hover:text-ph-yellow transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
