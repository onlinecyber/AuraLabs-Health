"use client";

import { motion } from "framer-motion";
import { ChevronRight, Award, Users, ShieldCheck, Microscope } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">About Us</span>
          </div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Redefining Healthcare Diagnostics
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            AuraLabs is India's most trusted premium diagnostic network, combining cutting-edge technology with unparalleled medical expertise to deliver accurate, fast, and accessible healthcare to everyone.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { icon: Users, label: "Happy Patients", value: "2M+" },
            { icon: Microscope, label: "Tests Conducted", value: "10M+" },
            { icon: ShieldCheck, label: "Certified Labs", value: "50+" },
            { icon: Award, label: "Expert Doctors", value: "500+" },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white dark:bg-black p-8 rounded-3xl border border-border text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow"
            >
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[400px] rounded-3xl overflow-hidden bg-gradient-to-tr from-blue-100 to-indigo-50 dark:from-blue-900/40 dark:to-indigo-900/20 border border-white/40 flex items-center justify-center"
          >
             <Microscope className="h-32 w-32 text-primary/20" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                To make preventive healthcare a habit for every individual by providing world-class diagnostic services that are highly accurate, affordable, and accessible from the comfort of their homes.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We are on a mission to build the most advanced technological infrastructure for diagnostics, ensuring zero-error reporting, real-time tracking, and a seamless digital experience for patients, doctors, and our lab partners.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
