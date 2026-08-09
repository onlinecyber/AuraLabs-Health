"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  Settings, 
  LogOut,
  Navigation,
  QrCode,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState("schedule");

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      {/* Staff Sidebar */}
      <aside className="w-72 bg-white dark:bg-black border-r border-border flex flex-col hidden lg:flex shrink-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 group mb-6">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Aura<span className="text-primary">Staff</span>
            </span>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-zinc-900 p-3 rounded-2xl">
            <div className="h-10 w-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
              VD
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">Vikas D.</p>
              <p className="text-xs text-muted-foreground">Phlebotomist (Zone A)</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {[
            { id: "schedule", icon: Clock, label: "Today's Route" },
            { id: "pending", icon: AlertCircle, label: "Pending Samples" },
            { id: "completed", icon: CheckCircle2, label: "Completed" },
            { id: "scan", icon: QrCode, label: "Scan Barcode" },
            { id: "settings", icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-5 w-5" />
            End Shift
          </Link>
        </div>
      </aside>

      {/* Staff Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-20 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
          <div>
            <h2 className="text-xl font-bold">Collection Route</h2>
            <p className="text-xs text-muted-foreground">Zone A - City Center</p>
          </div>
          <Button className="rounded-xl px-4 md:px-6 shadow-md shadow-primary/20 gap-2">
            <QrCode className="h-4 w-4" /> <span className="hidden md:inline">Scan Sample</span>
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Route Progress */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-black p-6 rounded-3xl border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <div className="flex-1 w-full">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="font-bold">Route Progress</h3>
                  <span className="text-sm font-medium text-primary">5 of 12 Completed</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "41%" }}
                    transition={{ duration: 1 }}
                    className="bg-gradient-to-r from-blue-400 to-primary h-full rounded-full" 
                  />
                </div>
              </div>
              <div className="flex gap-4 shrink-0 w-full md:w-auto">
                <div className="flex-1 md:flex-none text-center bg-slate-50 dark:bg-zinc-900 p-3 rounded-2xl border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Pending</p>
                  <p className="text-2xl font-bold text-orange-500">7</p>
                </div>
                <div className="flex-1 md:flex-none text-center bg-slate-50 dark:bg-zinc-900 p-3 rounded-2xl border border-border">
                  <p className="text-xs text-muted-foreground uppercase">Collected</p>
                  <p className="text-2xl font-bold text-green-500">5</p>
                </div>
              </div>
            </motion.div>

            {/* Next Collection (Focus Card) */}
            <div>
              <h3 className="text-lg font-bold mb-4 px-1 text-muted-foreground">Up Next</h3>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/10 p-6 md:p-8 rounded-3xl border-2 border-primary/20 shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
                
                <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full">
                      <Clock className="h-3.5 w-3.5" /> 11:30 AM
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-foreground mb-1">Neha Sharma</h4>
                      <p className="text-sm font-medium text-muted-foreground">Comprehensive Full Body Checkup (Fasting)</p>
                    </div>
                    
                    <div className="space-y-2 pt-2 border-t border-primary/10">
                      <div className="flex items-start gap-3 text-sm text-foreground">
                        <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>Apt 4B, Blue Ridge Towers,<br/>Tech Park, Cityville</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-foreground">
                        <Phone className="h-5 w-5 text-primary shrink-0" />
                        <span>+91 98765 12345</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-3 shrink-0 justify-end md:min-w-[160px]">
                    <Button className="w-full h-12 rounded-xl text-base shadow-md gap-2">
                      <CheckCircle2 className="h-5 w-5" /> Mark Collected
                    </Button>
                    <Button variant="outline" className="w-full h-12 rounded-xl text-base border-primary/30 text-primary gap-2">
                      <Navigation className="h-5 w-5" /> Navigate
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Upcoming Queue */}
            <div>
              <h3 className="text-lg font-bold mb-4 px-1 text-muted-foreground">Later Today</h3>
              <div className="space-y-4">
                {[
                  { time: "12:45 PM", name: "Rahul Verma", test: "Lipid Profile", distance: "2.4 km away" },
                  { time: "02:00 PM", name: "Amit Kumar", test: "Advanced Heart Care", distance: "5.1 km away" },
                  { time: "03:30 PM", name: "Sunita Devi", test: "Thyroid Profile", distance: "3.8 km away" },
                ].map((visit, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + (i * 0.1) }}
                    className="bg-white dark:bg-black p-5 rounded-2xl border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-slate-100 dark:bg-zinc-900 text-foreground font-bold px-3 py-2 rounded-xl text-sm text-center min-w-[90px]">
                        {visit.time.split(' ')[0]}<br/><span className="text-xs font-normal text-muted-foreground">{visit.time.split(' ')[1]}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground">{visit.name}</h4>
                        <p className="text-sm text-muted-foreground">{visit.test}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {visit.distance}
                      </span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Navigation className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
