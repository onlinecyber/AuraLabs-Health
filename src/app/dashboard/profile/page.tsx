"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserCircle, Mail, Phone, MapPin, Edit2, Shield, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and addresses.</p>
        </div>
        <Button 
          variant={isEditing ? "default" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
          className="rounded-xl"
        >
          {isEditing ? "Save Changes" : (
            <><Edit2 className="mr-2 h-4 w-4" /> Edit Profile</>
          )}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 rounded-3xl border border-border flex flex-col items-center text-center relative"
          >
            <div className="relative mb-4 group cursor-pointer">
              <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-blue-500 to-primary text-white flex items-center justify-center font-bold text-4xl shadow-lg shadow-primary/20">
                JD
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-1">John Doe</h2>
            <p className="text-sm text-muted-foreground mb-4">Premium Member</p>
            
            <div className="w-full pt-4 border-t border-border flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" /> john.doe@example.com
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-primary/5 p-6 rounded-3xl border border-primary/10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">Account Security</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your account is secured with two-factor authentication via SMS.
            </p>
            <Button variant="outline" size="sm" className="w-full border-primary/20 text-primary">
              Manage Security
            </Button>
          </motion.div>
        </div>

        {/* Right Column: Personal Details & Addresses */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-black p-6 md:p-8 rounded-3xl border border-border"
          >
            <h3 className="text-xl font-bold mb-6">Personal Details</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">First Name</label>
                <input 
                  type="text" 
                  defaultValue="John"
                  disabled={!isEditing}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-slate-50 dark:bg-zinc-900 disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Doe"
                  disabled={!isEditing}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-slate-50 dark:bg-zinc-900 disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                <input 
                  type="date" 
                  defaultValue="1990-05-15"
                  disabled={!isEditing}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-slate-50 dark:bg-zinc-900 disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Gender</label>
                <select 
                  disabled={!isEditing}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-slate-50 dark:bg-zinc-900 disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2 space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
                <select 
                  disabled={!isEditing}
                  className="w-full h-12 px-4 rounded-xl border border-border bg-slate-50 dark:bg-zinc-900 disabled:opacity-70 disabled:cursor-not-allowed outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Saved Addresses */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-black p-6 md:p-8 rounded-3xl border border-border"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Saved Addresses</h3>
              <Button variant="outline" size="sm" className="rounded-lg">
                Add New
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-2xl border-2 border-primary/20 bg-primary/5 relative">
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                  Default
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-bold text-foreground">Home</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      123 Innovation Drive, Apartment 4B<br />
                      Tech Park, Cityville 10001
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-2xl border border-border bg-slate-50 dark:bg-zinc-900/50 hover:border-primary/30 transition-colors cursor-pointer">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h4 className="font-bold text-foreground">Office</h4>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      456 Corporate Avenue, Floor 12<br />
                      Business District, Cityville 10002
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
