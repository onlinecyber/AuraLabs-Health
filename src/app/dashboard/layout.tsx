"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X,
  Activity,
  CalendarCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Basic Auth Check for V1
    if (localStorage.getItem("isAdminLoggedIn") !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
    { name: "Tests Catalog", href: "#", icon: FileText },
    { name: "Patients", href: "#", icon: Users },
    { name: "Settings", href: "#", icon: Settings },
  ];

  if (!isAuthorized) return null; // Don't flash UI before redirect

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col md:flex-row pt-[72px]">
      
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-white dark:bg-black">
        <div className="flex items-center gap-2 font-bold">
          <Activity className="h-5 w-5 text-primary" /> Admin Panel
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:sticky top-[72px] left-0 h-[calc(100vh-72px)] w-64 bg-white dark:bg-black border-r border-border 
        flex flex-col z-40 transition-transform duration-300 ease-in-out
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 hidden md:flex">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileOpen(false)}>
                  <span className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActive 
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                      : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-zinc-900 hover:text-foreground"
                    }
                  `}>
                    <item.icon className={`h-5 w-5 ${isActive ? "text-primary-foreground" : ""}`} />
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-border">
          <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/30" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden top-[72px]" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </div>
  );
}
