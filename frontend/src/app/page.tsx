"use client";

import { motion } from "framer-motion";
import { ArrowRight, Activity, Shield, Clock, Award, Star, Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, query, where, limit, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  const [popularPackages, setPopularPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularPackages = async () => {
      try {
        const q = query(collection(db, "packages"), where("popular", "==", true), limit(3));
        const querySnapshot = await getDocs(q);
        const pkgs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPopularPackages(pkgs);
      } catch (error) {
        console.error("Error fetching popular packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularPackages();
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-32 px-4 md:px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-premium -z-10" />
        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] -left-[5%] w-[40vw] h-[40vw] rounded-full bg-blue-400/20 blur-[100px]"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              x: [0, -40, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[10%] -right-[5%] w-[35vw] h-[35vw] rounded-full bg-indigo-400/20 blur-[100px]"
          />
        </div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              India's Most Trusted Lab
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
              Your Health, <br />
              <span className="text-gradient">Our Priority.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
              Get premium diagnostic services with home sample collection. Accurate reports, expert doctors, and a seamless digital experience.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/packages">
                <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group">
                  Book a Test
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base border-primary/20 hover:bg-primary/5">
                  Upload Prescription
                </Button>
              </Link>
            </motion.div>

            {/* Quick Search */}
            <motion.div variants={fadeInUp} className="glass-card rounded-2xl p-2 flex items-center shadow-lg max-w-md">
              <div className="flex-1 flex items-center gap-2 px-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search tests or packages..." 
                  className="w-full bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
                />
              </div>
              <Link href="/tests">
                <Button className="rounded-xl px-6">Search</Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center hidden md:flex"
          >
            {/* Main Floating Image Placeholder - Using generic abstract layout since we don't have images */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 border border-white/40 shadow-2xl overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
               <Activity className="h-32 w-32 text-primary/20" />
               
               {/* Floating Badges */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-12 -left-8 glass-card p-4 rounded-2xl flex items-center gap-4"
               >
                 <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                   <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground font-medium">NABL Accredited</p>
                   <p className="text-sm font-bold">100% Accurate</p>
                 </div>
               </motion.div>

               <motion.div 
                 animate={{ y: [0, 10, 0] }}
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="absolute bottom-20 -right-8 glass-card p-4 rounded-2xl flex items-center gap-4"
               >
                 <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                   <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground font-medium">Fast Turnaround</p>
                   <p className="text-sm font-bold">Reports in 6 hrs</p>
                 </div>
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AuraLabs?</h2>
            <p className="text-muted-foreground text-lg">We bring the best of medical diagnostics to your doorstep with cutting-edge technology and unparalleled accuracy.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "NABL & CAP Certified", desc: "Our labs maintain the highest standards of quality and precision." },
              { icon: Clock, title: "Timely Reports", desc: "Get your detailed test reports delivered online within hours." },
              { icon: MapPin, title: "Home Sample Collection", desc: "Safe and hygienic sample collection from the comfort of your home." },
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl border border-border bg-gray-50/50 dark:bg-gray-900/20 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl transition-all"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="py-24 bg-slate-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Health Packages</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">Comprehensive health checkups tailored for your lifestyle and needs.</p>
            </div>
            <Link href="/packages">
              <Button variant="ghost" className="hidden md:flex group">
                View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularPackages.map((pkg, i) => (
                <motion.div 
                  key={pkg.id || i}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-black p-8 rounded-3xl border border-border shadow-sm hover:shadow-xl transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-bold leading-tight">{pkg.name}</h3>
                    <Award className="h-6 w-6 text-primary shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 mb-6 text-sm font-medium text-muted-foreground bg-slate-100 dark:bg-zinc-900 w-fit px-3 py-1.5 rounded-full">
                    <Activity className="h-4 w-4" /> Includes {pkg.tests} Tests
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-border flex items-center justify-between">
                    <div>
                      <div className="text-xs text-muted-foreground line-through mb-1">₹{pkg.originalPrice}</div>
                      <div className="text-2xl font-bold text-primary">₹{pkg.price}</div>
                    </div>
                    <Link href="/checkout">
                      <Button className="rounded-xl px-6">Book</Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
