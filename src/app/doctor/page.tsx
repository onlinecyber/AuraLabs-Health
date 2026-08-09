"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  Video,
  MessageSquare,
  ClipboardList,
  Upload,
  Stethoscope
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("patients");

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-zinc-950 overflow-hidden">
      {/* Doctor Sidebar */}
      <aside className="w-72 bg-white dark:bg-black border-r border-border flex flex-col hidden lg:flex shrink-0">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 group mb-6">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">
              Aura<span className="text-primary">Docs</span>
            </span>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-zinc-900 p-3 rounded-2xl">
            <div className="h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
              DR
            </div>
            <div>
              <p className="text-sm font-bold leading-tight">Dr. Rajesh Kumar</p>
              <p className="text-xs text-muted-foreground">Cardiologist</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {[
            { id: "patients", icon: Users, label: "My Patients" },
            { id: "appointments", icon: Calendar, label: "Appointments" },
            { id: "consultations", icon: Video, label: "Video Consults" },
            { id: "prescriptions", icon: ClipboardList, label: "Prescriptions" },
            { id: "reports", icon: FileText, label: "Review Reports" },
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
            Logout
          </Link>
        </div>
      </aside>

      {/* Doctor Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.01] pointer-events-none" />
        
        <header className="h-20 bg-white/50 dark:bg-black/50 backdrop-blur-md border-b border-border flex items-center justify-between px-8 shrink-0 z-10">
          <h2 className="text-xl font-bold">Patient Management</h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="rounded-full">
              <Video className="mr-2 h-4 w-4" /> Start Consult
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative z-10">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Action Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Today's Appointments", value: "12", desc: "4 Video, 8 In-clinic", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                { title: "Pending Reports to Review", value: "5", desc: "Requires attention", icon: FileText, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                { title: "New Messages", value: "8", desc: "From patients", icon: MessageSquare, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-black p-6 rounded-3xl border border-border flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${stat.bg}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <h3 className="font-semibold text-lg">{stat.title}</h3>
                  <p className="text-sm text-muted-foreground">{stat.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Patient List */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-2 bg-white dark:bg-black rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col h-[500px]"
              >
                <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50 shrink-0">
                  <h3 className="text-lg font-bold">Patient Queue (Today)</h3>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="overflow-y-auto flex-1 p-4 space-y-4">
                  {[
                    { name: "Anita Sharma", age: 45, time: "10:00 AM", type: "Video Consult", status: "Waiting" },
                    { name: "Rahul Verma", age: 32, time: "10:30 AM", type: "Report Review", status: "Next" },
                    { name: "Sunita Devi", age: 58, time: "11:15 AM", type: "Follow-up", status: "Scheduled" },
                    { name: "Vikram Singh", age: 41, time: "12:00 PM", type: "New Patient", status: "Scheduled" },
                  ].map((patient, i) => (
                    <div key={i} className="p-4 rounded-2xl border border-border hover:border-primary/30 transition-colors flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-500">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{patient.name} <span className="text-xs font-normal text-muted-foreground ml-1">{patient.age} Yrs</span></h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-2 mt-0.5">
                            <Calendar className="h-3.5 w-3.5" /> {patient.time} • {patient.type}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          patient.status === 'Waiting' ? 'bg-red-100 text-red-700' :
                          patient.status === 'Next' ? 'bg-green-100 text-green-700' :
                          'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-slate-300'
                        }`}>
                          {patient.status}
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions Panel */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <div className="bg-primary/5 rounded-3xl border border-primary/20 p-6 flex flex-col h-full">
                  <h3 className="text-lg font-bold mb-6 text-primary flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" /> Quick Actions
                  </h3>
                  
                  <div className="space-y-4 flex-1">
                    <button className="w-full bg-white dark:bg-black p-4 rounded-2xl border border-border hover:border-primary transition-colors flex items-center gap-4 text-left group">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl group-hover:bg-blue-100 transition-colors">
                        <Upload className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Upload Prescription</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Digitize patient records</p>
                      </div>
                    </button>
                    
                    <button className="w-full bg-white dark:bg-black p-4 rounded-2xl border border-border hover:border-primary transition-colors flex items-center gap-4 text-left group">
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl group-hover:bg-green-100 transition-colors">
                        <Activity className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">Recommend Tests</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">Send test links to patients</p>
                      </div>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
