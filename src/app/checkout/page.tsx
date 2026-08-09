"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  MapPin, 
  Clock, 
  User, 
  CreditCard,
  QrCode,
  Banknote,
  ArrowRight,
  Phone,
  Mail,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSearchParams, useRouter } from "next/navigation";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pkgId = searchParams.get("pkgId");
  
  const [pkgData, setPkgData] = useState<any>(null);
  const [loadingPkg, setLoadingPkg] = useState(true);

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState("");

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    age: "",
    gender: "Male",
    address: "",
    pincode: "",
    timeSlot: "",
    paymentMethod: "cash"
  });

  useEffect(() => {
    const fetchPackage = async () => {
      if (!pkgId) {
        // If no package selected, redirect back to packages
        router.push("/packages");
        return;
      }
      try {
        const docRef = doc(db, "packages", pkgId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPkgData(docSnap.data());
        } else {
          router.push("/packages");
        }
      } catch (error) {
        console.error("Error fetching package:", error);
      } finally {
        setLoadingPkg(false);
      }
    };
    fetchPackage();
  }, [pkgId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...formData,
        package: pkgData?.name || "Custom Checkup",
        amount: pkgData?.price || 0,
        status: "pending_collection",
        createdAt: new Date().toISOString()
      });
      
      setBookingId(docRef.id);
      setStep(4); // Success Step
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to confirm booking. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loadingPkg) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Guest Checkout</h1>
        <p className="text-muted-foreground">Complete your booking in 3 easy steps.</p>
      </div>

      {/* Stepper Progress */}
      {step < 4 && (
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          
          {[
            { num: 1, label: "Patient Details" },
            { num: 2, label: "Slot & Address" },
            { num: 3, label: "Payment" }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2 bg-slate-50 dark:bg-zinc-950 px-2">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${
                step >= s.num ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-white dark:bg-black border-border text-muted-foreground"
              }`}>
                {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
              </div>
              <span className={`text-xs font-semibold ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {/* STEP 1: PATIENT DETAILS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 md:p-8 rounded-3xl border border-border">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" /> Patient Information
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter patient's full name" className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit number" maxLength={10} className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Email ID (Optional)</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="For PDF reports" className="w-full h-12 pl-10 pr-4 rounded-xl border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Age</label>
                      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Years" className="w-full h-12 px-4 rounded-xl border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-12 px-4 rounded-xl border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={!formData.name || formData.phone.length < 10 || !formData.age} 
                    className="h-12 px-8 rounded-xl text-base shadow-md"
                  >
                    Continue to Slot <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: ADDRESS & TIME SLOT */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 md:p-8 rounded-3xl border border-border space-y-8">
                  
                  {/* Address */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" /> Collection Address
                    </h2>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold">Complete Address</label>
                        <div className="relative">
                          <Home className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <textarea name="address" value={formData.address} onChange={handleChange as any} placeholder="House/Flat No., Street, Area" rows={3} className="w-full py-3 pl-10 pr-4 rounded-xl border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">Pincode</label>
                        <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="e.g. 110001" maxLength={6} className="w-full h-12 px-4 rounded-xl border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20" />
                      </div>
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" /> Select Time Slot (Tomorrow)
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {["06:00 AM", "07:30 AM", "09:00 AM", "10:30 AM", "12:00 PM"].map((time) => (
                        <div 
                          key={time}
                          onClick={() => setFormData(prev => ({...prev, timeSlot: time}))}
                          className={`p-3 text-center rounded-xl border-2 cursor-pointer transition-all text-sm font-semibold ${
                            formData.timeSlot === time ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20" : "border-border bg-white dark:bg-black hover:border-primary/50"
                          }`}
                        >
                          {time}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)} className="h-12 px-6 rounded-xl">Back</Button>
                  <Button onClick={() => setStep(3)} disabled={!formData.address || formData.pincode.length < 6 || !formData.timeSlot} className="h-12 px-8 rounded-xl text-base shadow-md">
                    Proceed to Pay <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: PAYMENT */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="glass-card p-6 md:p-8 rounded-3xl border border-border">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" /> Payment Method
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Option 1: Cash/UPI on Collection */}
                    <div 
                      onClick={() => setFormData(prev => ({...prev, paymentMethod: "cash"}))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-colors flex items-center justify-between ${
                        formData.paymentMethod === "cash" ? "border-primary bg-primary/5" : "border-border bg-white dark:bg-black hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${formData.paymentMethod === "cash" ? "bg-primary text-white" : "bg-slate-100 dark:bg-zinc-900 text-muted-foreground"}`}>
                          <Banknote className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="font-bold block text-lg">Pay on Collection</span>
                          <span className="text-sm text-muted-foreground">Pay via Cash or UPI when sample is collected</span>
                        </div>
                      </div>
                      {formData.paymentMethod === "cash" && <CheckCircle2 className="h-6 w-6 text-primary" />}
                    </div>

                    {/* Option 2: Prepay via QR */}
                    <div 
                      onClick={() => setFormData(prev => ({...prev, paymentMethod: "qr"}))}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        formData.paymentMethod === "qr" ? "border-primary bg-primary/5" : "border-border bg-white dark:bg-black hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${formData.paymentMethod === "qr" ? "bg-primary text-white" : "bg-slate-100 dark:bg-zinc-900 text-muted-foreground"}`}>
                          <QrCode className="h-6 w-6" />
                        </div>
                        <div>
                          <span className="font-bold block text-lg">Pay via QR Code</span>
                          <span className="text-sm text-muted-foreground">Scan and pay instantly using any UPI app</span>
                        </div>
                      </div>
                      
                      {formData.paymentMethod === "qr" && (
                        <div className="ml-16 sm:ml-0 bg-white p-2 rounded-xl border shadow-sm flex flex-col items-center">
                          {/* Placeholder QR */}
                          <QrCode className="h-20 w-20 text-slate-800" />
                          <span className="text-[10px] font-bold mt-1 text-slate-500">SCAN TO PAY</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)} disabled={isProcessing} className="h-12 px-6 rounded-xl">Back</Button>
                  <Button onClick={handleBooking} disabled={isProcessing} className="h-12 px-8 rounded-xl text-base shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[200px]">
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        Confirming...
                      </div>
                    ) : (
                      `Confirm Booking (₹${pkgData?.price})`
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 4: SUCCESS */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-black p-10 rounded-3xl border border-border text-center shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-400/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
                
                <div className="h-24 w-24 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
                  <CheckCircle2 className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
                
                <h2 className="text-3xl font-bold mb-4 relative z-10">Booking Confirmed!</h2>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto relative z-10">
                  Your appointment for <span className="font-semibold text-foreground">{pkgData?.name}</span> is confirmed for {formData.timeSlot}.
                </p>
                
                <div className="bg-slate-50 dark:bg-zinc-900/50 p-6 rounded-2xl mb-8 text-left max-w-sm mx-auto relative z-10 border border-border">
                  <div className="text-sm text-muted-foreground mb-1">Booking ID</div>
                  <div className="font-mono font-bold text-lg mb-4 text-primary">#{bookingId.slice(0, 8).toUpperCase()}</div>
                  
                  <div className="text-sm text-muted-foreground mb-1">Patient</div>
                  <div className="font-semibold mb-4">{formData.name}</div>
                  
                  <div className="text-sm text-muted-foreground mb-1">Payment Method</div>
                  <div className="font-semibold">{formData.paymentMethod === "cash" ? "Pay on Collection" : "Prepaid (QR)"}</div>
                </div>
                
                <Link href="/track" className="relative z-10">
                  <Button className="h-12 px-8 rounded-xl shadow-lg">Track Booking Status</Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary Sidebar */}
        {step < 4 && (
          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-3xl border border-border sticky top-32">
              <h3 className="font-bold text-lg mb-6 border-b border-border pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6 border-b border-border pb-6">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-semibold text-sm">{pkgData?.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{pkgData?.tests} Tests Included</p>
                  </div>
                  <span className="font-bold">₹{pkgData?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Home Collection</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-6">
                <span className="font-bold text-lg">Total Amount</span>
                <span className="font-bold text-3xl text-primary">₹{pkgData?.price}</span>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 text-sm text-blue-800 dark:text-blue-300">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <p>You will receive SMS updates on {formData.phone || "your number"} regarding the booking.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 pt-24 pb-20">
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center pt-24 pb-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
