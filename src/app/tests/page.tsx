"use client";

import { motion } from "framer-motion";
import { Search, Activity, Filter, ChevronRight, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Categories remain static for UI filtering
const categories = ["All Tests", "Blood", "Heart", "Thyroid", "Diabetes", "Vitamins", "Liver", "Kidney"];

export default function TestsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Tests");
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tests"));
        const testsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTests(testsData);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTests();
  }, []);

  const filteredTests = selectedCategory === "All Tests" 
    ? tests 
    : tests.filter(test => test.category === selectedCategory);

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
              <span className="text-foreground font-medium">Individual Tests</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">A-Z Blood Tests</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Search and book individual blood tests from our extensive catalog of 2000+ tests.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search tests (e.g. CBC, HbA1c)..." 
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 backdrop-blur-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl shrink-0">
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="flex flex-wrap gap-3 mb-10">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "bg-white/40 dark:bg-gray-900/40 hover:bg-white dark:hover:bg-gray-800 border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tests List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredTests.map((test, i) => (
            <motion.div 
              key={test.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="glass p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow group border border-border/50 hover:border-primary/20"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <FileText className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{test.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Activity className="h-3.5 w-3.5" /> {test.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>Report in {test.turnaround}</span>
                    {test.fasting && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-orange-500 font-medium">10-12 hrs Fasting Req.</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center sm:flex-col justify-between sm:justify-center gap-4 sm:gap-2 sm:min-w-[120px] sm:items-end">
                <div className="text-xl font-bold text-foreground">₹{test.price}</div>
                <Link href="/packages" className="w-full sm:w-auto">
                  <Button variant="outline" className="rounded-lg h-9 px-6 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors w-full">
                    Book
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
