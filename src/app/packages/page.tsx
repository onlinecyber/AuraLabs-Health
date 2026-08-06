"use client";

import { motion } from "framer-motion";
import { Search, Activity, Heart, Brain, Apple, Filter, ChevronRight, Award, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Helper to map string to icon
const getIconComponent = (iconString: string) => {
  switch (iconString) {
    case 'Heart': return Heart;
    case 'Brain': return Brain;
    case 'Apple': return Apple;
    case 'Award': return Award;
    case 'Activity': 
    default: return Activity;
  }
};

// Categories remain static for UI filtering
const categories = ["All", "Full Body", "Heart", "Women", "Senior", "Diabetes"];

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "packages"));
        const packagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          icon: getIconComponent(doc.data().iconString)
        }));
        setPackages(packagesData);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);

  const filteredPackages = selectedCategory === "All" 
    ? packages 
    : packages.filter(pkg => pkg.category === selectedCategory);

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-premium -z-10 fixed" />
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Health Packages</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Health Packages</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Choose from our expertly curated health checkup packages to monitor your well-being.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search packages..." 
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 backdrop-blur-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl shrink-0">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-3 hide-scrollbar">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "bg-white/50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, i) => (
            <motion.div 
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card p-6 rounded-3xl flex flex-col hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group"
            >
              {pkg.popular && (
                <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" /> Bestseller
                </div>
              )}
              
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <pkg.icon className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold leading-tight mb-2 pr-12">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                A comprehensive panel of tests designed to give you a complete overview of your health.
              </p>
              
              <div className="flex items-center gap-2 mb-8 text-sm font-medium text-foreground bg-white/50 dark:bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-border">
                <Activity className="h-4 w-4 text-primary" /> Includes {pkg.tests} Tests
              </div>
              
              <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground line-through mb-1">₹{pkg.originalPrice}</div>
                  <div className="text-2xl font-bold text-foreground">₹{pkg.price}</div>
                </div>
                <Link href="/checkout" className="w-full max-w-[140px]">
                  <Button className="w-full rounded-xl text-base h-12 shadow-md shadow-primary/20 group hover:shadow-primary/40 transition-all">
                    Book Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

