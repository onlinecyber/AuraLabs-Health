"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-premium -z-10 fixed" />
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
            <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">Contact Us</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">We'd love to hear from you</h1>
          <p className="text-lg text-muted-foreground">
            Whether you have a question about tests, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-3xl"
            >
              <h3 className="text-xl font-bold mb-6">Get in touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground text-sm">+91 XXXXX XXXXX</p>
                    <p className="text-muted-foreground text-sm">Mon-Sun, 7am to 9pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground text-sm">support@auralabs.com</p>
                    <p className="text-muted-foreground text-sm">We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-muted-foreground text-sm">Your Lab Address,<br />City, State - Pincode</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 md:p-10 rounded-3xl"
            >
              <h3 className="text-2xl font-bold mb-8">Send us a message</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thank you for your message! We will get back to you within 24 hours."); }}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <input 
                      type="text" 
                      className="w-full h-12 px-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full h-12 px-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full h-12 px-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <textarea 
                    className="w-full p-4 rounded-xl border border-border bg-white/50 dark:bg-black/50 outline-none focus:ring-2 focus:ring-primary/20 transition-all min-h-[150px] resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <Button className="w-full h-14 rounded-xl text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow">
                  <Send className="mr-2 h-5 w-5" /> Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
