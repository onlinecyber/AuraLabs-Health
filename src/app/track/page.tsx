"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Phone, FileText, CheckCircle2, ChevronRight, Download, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TrackReportPage() {
  const [phone, setPhone] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    
    setIsSearching(true);
    // Simulate network request
    setTimeout(() => {
      setIsSearching(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-premium -z-10 fixed" />
      
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Track Your Report</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your registered mobile number to instantly view or download your latest medical reports.
          </p>
        </div>

        {/* Search Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 md:p-10 rounded-3xl border border-border shadow-lg max-w-2xl mx-auto mb-12"
        >
          <form onSubmit={handleSearch} className="flex flex-col gap-6">
            <div>
              <label className="text-sm font-semibold text-foreground mb-2 block">Registered Mobile Number</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium border-r border-border pr-3">+91</span>
                </div>
                <input 
                  type="tel" 
                  placeholder="Enter 10 digit number" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full h-14 pl-[100px] pr-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 backdrop-blur-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium text-lg"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="h-14 rounded-xl text-lg w-full shadow-lg shadow-primary/20"
              disabled={isSearching || phone.length < 10}
            >
              {isSearching ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5" /> Find My Reports
                </div>
              )}
            </Button>
          </form>
        </motion.div>

        {/* Results Area */}
        {hasSearched && !isSearching && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-bold mb-4">Recent Bookings for +91 {phone}</h3>
            
            {/* Example Result 1: Completed */}
            <div className="glass p-6 rounded-3xl border border-border hover:border-primary/30 transition-colors flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Comprehensive Full Body Checkup</h4>
                  <p className="text-sm text-muted-foreground mb-2">Collected on: 12 Aug 2026, 09:30 AM</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Report Ready
                  </span>
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex gap-3">
                <Button variant="outline" className="w-full sm:w-auto rounded-xl">
                  View
                </Button>
                <Button className="w-full sm:w-auto rounded-xl gap-2">
                  <Download className="h-4 w-4" /> PDF
                </Button>
              </div>
            </div>

            {/* Example Result 2: In Progress */}
            <div className="glass p-6 rounded-3xl border border-border flex flex-col sm:flex-row gap-6 justify-between items-start sm:items-center">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Advanced Heart Care Package</h4>
                  <p className="text-sm text-muted-foreground mb-2">Collected on: 15 Aug 2026, 08:00 AM</p>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> Processing in Lab
                  </span>
                </div>
              </div>
              
              <div className="w-full sm:w-auto flex flex-col items-end">
                <p className="text-sm font-medium mb-1">Expected Delivery:</p>
                <p className="text-primary font-bold">Today by 6:00 PM</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
