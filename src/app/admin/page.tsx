"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  BarChart3, 
  Users, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut,
  IndianRupee,
  TrendingUp,
  FlaskConical,
  Truck
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-zinc-950 overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col hidden lg:flex shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2 group">
            <div className="bg-white/10 p-2 rounded-xl">
              <Activity className="h-6 w-6 text-blue-400" />
            </div>
            <span className="font-bold text-2xl tracking-tight">
              Aura<span className="text-blue-400">Admin</span>
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {[
            { id: "overview", icon: BarChart3, label: "Overview Analytics" },
            { id: "users", icon: Users, label: "User Management" },
            { id: "bookings", icon: Calendar, label: "Booking Management" },
            { id: "tests", icon: FlaskConical, label: "Test Catalog" },
            { id: "reports", icon: FileText, label: "Reports Hub" },
            { id: "staff", icon: Truck, label: "Lab Staff Tracking" },
            { id: "settings", icon: Settings, label: "System Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-5 w-5" />
            Exit Admin
          </Link>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Admin Header */}
        <header className="h-20 bg-white dark:bg-black border-b border-border flex items-center justify-between px-8 shrink-0">
          <div>
            <h2 className="text-xl font-bold">Admin Portal</h2>
            <p className="text-xs text-muted-foreground">Superadmin Access</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              System Live
            </div>
            <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
              SA
            </div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute inset-0 bg-gradient-premium opacity-50 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10 space-y-8">
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Total Revenue (Today)", value: "₹45,200", trend: "+12.5%", icon: IndianRupee, color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
                { title: "Active Bookings", value: "128", trend: "+5.2%", icon: Calendar, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
                { title: "Pending Collections", value: "34", trend: "-2.1%", icon: Truck, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20" },
                { title: "Total Active Users", value: "14,592", trend: "+18.1%", icon: Users, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
              ].map((kpi, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white dark:bg-black p-6 rounded-3xl border border-border shadow-sm flex justify-between items-start"
                >
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">{kpi.title}</p>
                    <h3 className="text-3xl font-bold tracking-tight mb-2">{kpi.value}</h3>
                    <div className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3" /> {kpi.trend} vs yesterday
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${kpi.bg}`}>
                    <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dashboard Grids */}
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Recent Bookings Table */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2 bg-white dark:bg-black rounded-3xl border border-border shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50">
                  <h3 className="text-lg font-bold">Recent Bookings</h3>
                  <button className="text-sm font-medium text-blue-600 hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-slate-50 dark:bg-zinc-900/30">
                      <tr>
                        <th className="px-6 py-4 font-semibold">Patient Name</th>
                        <th className="px-6 py-4 font-semibold">Package/Test</th>
                        <th className="px-6 py-4 font-semibold">Date & Time</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Rahul Sharma", test: "Comprehensive Full Body", date: "Today, 09:00 AM", status: "Collected" },
                        { name: "Priya Patel", test: "Lipid Profile", date: "Today, 10:30 AM", status: "Pending" },
                        { name: "Amit Kumar", test: "Advanced Heart Care", date: "Today, 11:00 AM", status: "Assigned" },
                        { name: "Neha Singh", test: "Thyroid Profile", date: "Today, 01:15 PM", status: "Pending" },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-border hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                          <td className="px-6 py-4 font-medium">{row.name}</td>
                          <td className="px-6 py-4 text-muted-foreground">{row.test}</td>
                          <td className="px-6 py-4 text-muted-foreground">{row.date}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              row.status === 'Collected' ? 'bg-green-100 text-green-700' : 
                              row.status === 'Assigned' ? 'bg-blue-100 text-blue-700' : 
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>

              {/* Lab Staff Status */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-black rounded-3xl border border-border shadow-sm"
              >
                <div className="p-6 border-b border-border flex justify-between items-center bg-slate-50/50 dark:bg-zinc-900/50">
                  <h3 className="text-lg font-bold">Active Phlebotomists</h3>
                </div>
                <div className="p-4 space-y-4">
                  {[
                    { name: "Vikas D.", status: "On Route", samples: 12 },
                    { name: "Suresh M.", status: "Collecting", samples: 8 },
                    { name: "Ramesh K.", status: "Idle", samples: 15 },
                  ].map((staff, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-border hover:border-blue-500/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-slate-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">{staff.samples}</p>
                        <p className="text-[10px] text-muted-foreground uppercase">Samples</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
