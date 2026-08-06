"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (localStorage.getItem("isAdminLoggedIn") === "true") {
      router.push("/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      // Hardcoded Admin Credentials for V1
      if (email === "admin@auralabs.com" && password === "admin") {
        localStorage.setItem("isAdminLoggedIn", "true");
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Hint: admin@auralabs.com / admin");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-zinc-950 p-4 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-multiply opacity-50" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 blur-[120px] rounded-full mix-blend-multiply opacity-50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link href="/" className="flex items-center justify-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <div className="bg-primary p-2 rounded-xl">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-foreground">
            AuraLabs <span className="text-primary">Admin</span>
          </span>
        </Link>

        <div className="glass-card p-8 rounded-3xl border border-border shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Staff Login</h1>
            <p className="text-muted-foreground text-sm">Enter your credentials to access the secure dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium border border-red-200 dark:border-red-900/50 text-center">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@auralabs.com" 
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-base shadow-lg shadow-primary/20 group"
              disabled={loading || !email || !password}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Verifying...
                </div>
              ) : (
                <>
                  Secure Login <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-8">
          Authorized personnel only. All access is logged and monitored.
        </p>
      </motion.div>
    </div>
  );
}
