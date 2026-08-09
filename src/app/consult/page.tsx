"use client";

import { motion } from "framer-motion";
import { 
  Video, 
  Stethoscope, 
  Clock, 
  Star, 
  CheckCircle2, 
  Calendar,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    speciality: "General Physician",
    experience: "12 Years",
    rating: 4.9,
    reviews: 320,
    fee: 499,
    nextAvailable: "Today, 4:00 PM",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026024d"
  },
  {
    id: 2,
    name: "Dr. Arvind Sharma",
    speciality: "Cardiologist",
    experience: "18 Years",
    rating: 4.8,
    reviews: 412,
    fee: 899,
    nextAvailable: "Tomorrow, 10:00 AM",
    image: "https://i.pravatar.cc/150?u=a042581f4e29026704d"
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    speciality: "Endocrinologist",
    experience: "10 Years",
    rating: 4.9,
    reviews: 185,
    fee: 699,
    nextAvailable: "Today, 6:30 PM",
    image: "https://i.pravatar.cc/150?u=a04258114e29026702d"
  },
  {
    id: 4,
    name: "Dr. Rajesh Kumar",
    speciality: "Orthopedic",
    experience: "15 Years",
    rating: 4.7,
    reviews: 256,
    fee: 599,
    nextAvailable: "Tomorrow, 12:00 PM",
    image: "https://i.pravatar.cc/150?u=a048581f4e29026701d"
  }
];

export default function ConsultPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 pb-20">
      <div className="absolute inset-0 bg-gradient-premium -z-10 fixed" />
      
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Consult a Doctor</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Online Consultations</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Connect with India's top doctors over secure video calls. Get accurate diagnoses and instant digital prescriptions.
            </p>
          </div>
          
          <div className="bg-white/50 dark:bg-black/50 p-1 rounded-xl flex items-center border border-border">
            <button className="px-6 py-2.5 rounded-lg bg-white dark:bg-black shadow-sm font-medium text-sm">
              Video Consult
            </button>
            <button className="px-6 py-2.5 rounded-lg text-muted-foreground font-medium text-sm hover:text-foreground transition-colors">
              In-Clinic
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Video, title: "Secure HD Video", desc: "Crystal clear, private consultations" },
            { icon: Clock, title: "Available 24/7", desc: "Connect with doctors anytime" },
            { icon: Stethoscope, title: "Digital Prescription", desc: "Instant prescriptions in your app" }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/40 dark:bg-zinc-900/40 border border-border p-5 rounded-2xl flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Doctors List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-6">Top Specialists Available Now</h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {doctors.map((doctor, i) => (
              <motion.div 
                key={doctor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-border flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow group"
              >
                {/* Image */}
                <div className="relative shrink-0">
                  <div className="h-24 w-24 rounded-2xl overflow-hidden bg-muted relative">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white dark:border-black">
                    <Video className="h-3 w-3 text-white" />
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{doctor.name}</h3>
                      <p className="text-sm font-medium text-primary mb-1">{doctor.speciality}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded-md text-xs font-bold">
                      <Star className="h-3 w-3 fill-current" /> {doctor.rating}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> {doctor.experience} Exp.
                    </span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{doctor.reviews} Reviews</span>
                  </div>

                  <div className="bg-slate-50 dark:bg-zinc-900 rounded-xl p-3 mb-5 flex items-center justify-between border border-border">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Next Slot:</span>
                      <span className="font-semibold">{doctor.nextAvailable}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      <p className="text-xs text-muted-foreground">Consultation Fee</p>
                      <p className="text-xl font-bold">₹{doctor.fee}</p>
                    </div>
                    <Link href="/checkout">
                      <Button className="rounded-xl px-6 shadow-md">
                        Book Video Consult
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
