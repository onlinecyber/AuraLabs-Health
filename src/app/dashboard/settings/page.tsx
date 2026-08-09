"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Bell, 
  Shield, 
  Moon, 
  Globe, 
  Smartphone, 
  CreditCard, 
  Key,
  CheckCircle2,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    promotions: false
  });

  return (
    <div className="space-y-8 pb-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences, security, and account settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Settings Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 hide-scrollbar">
            {[
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "security", label: "Security & Login", icon: Shield },
              { id: "appearance", label: "Appearance", icon: Moon },
              { id: "language", label: "Language & Region", icon: Globe },
              { id: "devices", label: "Active Devices", icon: Smartphone },
              { id: "billing", label: "Billing Methods", icon: CreditCard },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal ${
                  activeTab === tab.id 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-slate-100 dark:hover:bg-zinc-900 text-muted-foreground"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 md:p-8 rounded-3xl border border-border min-h-[500px]"
          >
            {activeTab === "notifications" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Notification Preferences</h2>
                  <p className="text-sm text-muted-foreground mb-6">Choose how you want to be notified about your tests and reports.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white/50 dark:bg-black/50">
                      <div>
                        <h4 className="font-semibold text-foreground">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive test reports and invoices via email.</p>
                      </div>
                      <div 
                        onClick={() => setNotifications({...notifications, email: !notifications.email})}
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications.email ? 'bg-green-500' : 'bg-slate-300 dark:bg-zinc-700'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white/50 dark:bg-black/50">
                      <div>
                        <h4 className="font-semibold text-foreground">SMS Alerts</h4>
                        <p className="text-sm text-muted-foreground">Get phlebotomist tracking link and OTPs via SMS.</p>
                      </div>
                      <div 
                        onClick={() => setNotifications({...notifications, sms: !notifications.sms})}
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications.sms ? 'bg-green-500' : 'bg-slate-300 dark:bg-zinc-700'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white/50 dark:bg-black/50">
                      <div>
                        <h4 className="font-semibold text-foreground">Promotional Offers</h4>
                        <p className="text-sm text-muted-foreground">Receive discounts and health checkup camps info.</p>
                      </div>
                      <div 
                        onClick={() => setNotifications({...notifications, promotions: !notifications.promotions})}
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${notifications.promotions ? 'bg-green-500' : 'bg-slate-300 dark:bg-zinc-700'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${notifications.promotions ? 'translate-x-6' : 'translate-x-0'}`} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button className="rounded-xl px-8 shadow-lg">Save Preferences</Button>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold mb-1">Security & Login</h2>
                  <p className="text-sm text-muted-foreground mb-6">Keep your health data safe and secure.</p>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-white/50 dark:bg-black/50">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <Key className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Password</h4>
                          <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-xl">Update Password</Button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-white/50 dark:bg-black/50">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Two-Factor Authentication (2FA)</h4>
                          <p className="text-sm text-muted-foreground">Currently enabled via SMS (+91 98765 ****0)</p>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-xl">Manage 2FA</Button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Deleting your account will permanently remove all your health records.</p>
                  <Button variant="destructive" className="rounded-xl">Delete Account</Button>
                </div>
              </div>
            )}

            {activeTab !== "notifications" && activeTab !== "security" && (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Moon className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground max-w-md">
                  This settings module is currently under development and will be available in the next update.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
