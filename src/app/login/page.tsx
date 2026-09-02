"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Mail, Phone, Lock, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const [loginMethod, setLoginMethod] = useState<"otp" | "email">("otp");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth(); // Assume we check auth context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Dummy authentication delay
    setTimeout(() => {
      setIsLoading(false);
      alert("Patient login is coming soon! For now, you can book tests directly from the Packages page.");
    }, 1500);
  };

  return (
    <div className="flex w-full min-h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-premium -z-10" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/20 blur-[100px] -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], x: [0, -40, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-indigo-400/20 blur-[100px] -z-10 pointer-events-none"
      />

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 md:p-6 lg:gap-20">
        
        {/* Left Side: Branding / Marketing */}
        <div className="hidden lg:flex flex-col max-w-lg mb-12 lg:mb-0">
          <Link href="/" className="flex items-center gap-2 group mb-12 w-fit">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Activity className="h-8 w-8 text-primary" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Aura<span className="text-primary">Labs</span>
            </span>
          </Link>
          
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
            Your Health Journey <br />Starts Here
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Access your secure dashboard to book tests, view highly accurate reports, and manage your family's health profile in one place.
          </p>

          <div className="space-y-6">
            {[
              "Instant access to NABL certified reports",
              "Priority home sample collection booking",
              "Exclusive discounts on health packages",
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <span className="font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Login Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="glass-card rounded-[2.5rem] p-8 md:p-10 shadow-2xl border border-white/40 dark:border-white/10 relative overflow-hidden">
            {/* Form Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
              <p className="text-muted-foreground text-sm">Sign in to your AuraLabs account</p>
            </div>

            {/* Login Method Toggle */}
            <div className="flex p-1 bg-muted/50 rounded-2xl mb-8 relative">
              <button
                onClick={() => setLoginMethod("otp")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all z-10 ${
                  loginMethod === "otp" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Phone className="h-4 w-4" /> Phone (OTP)
              </button>
              <button
                onClick={() => setLoginMethod("email")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all z-10 ${
                  loginMethod === "email" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Mail className="h-4 w-4" /> Email
              </button>
              
              {/* Animated Tab Indicator */}
              <motion.div
                className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white dark:bg-black rounded-xl shadow-sm border border-border/50"
                initial={false}
                animate={{
                  left: loginMethod === "otp" ? "4px" : "calc(50% + 2px)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {loginMethod === "otp" ? (
                  <motion.div
                    key="otp"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                          <span className="text-sm font-medium">+91</span>
                          <div className="w-px h-4 bg-border" />
                        </div>
                        <input
                          type="tel"
                          placeholder="9876543210"
                          className="w-full h-14 pl-16 pr-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium tracking-wide"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="email"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="hello@example.com"
                          className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Password</label>
                        <Link href="#" className="text-xs text-primary font-medium hover:underline">Forgot?</Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full h-14 pl-12 pr-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium tracking-widest"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-14 rounded-xl text-base font-medium shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all group"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    {loginMethod === "otp" ? "Send OTP" : "Sign In"} 
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>

            {/* Social / Divider */}
            <div className="mt-8">
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-xs text-muted-foreground uppercase font-medium tracking-wider">
                  Or continue with
                </span>
                <div className="flex-grow border-t border-border"></div>
              </div>
              <Button variant="outline" className="w-full h-14 rounded-xl border-border bg-white/50 dark:bg-black/50 hover:bg-white dark:hover:bg-gray-900 transition-colors mt-2">
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </Button>
            </div>

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/packages" className="text-primary font-medium hover:underline">
                Book a Test Instead
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
