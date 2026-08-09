"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ChevronLeft, Info, ChevronDown, ChevronUp, X, Bot } from "lucide-react";

// Dummy data for tests inside a package to match the UI screenshot
const DUMMY_TESTS = [
  "Liver Function Test",
  "Kidney Function Test Advance",
  "Complete Blood Count",
  "Lipid Profile",
  "Blood Glucose Fasting",
  "Thyroid Profile-Total (T3, T4 & TSH)",
  "Urine Routine & Microscopy Extended"
];

export default function CustomerDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "bookings", id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBooking({ id: docSnap.id, ...docSnap.data() });
        } else {
          alert("Booking not found!");
          router.push("/dashboard/bookings");
        }
      } catch (error) {
        console.error("Error fetching booking:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!booking) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans pb-20">
      {/* Header */}
      <div className="bg-[#009688] text-white px-4 py-4 flex items-center shadow-md z-10 sticky top-0">
        <button onClick={() => router.back()} className="p-1 -ml-1">
          <ChevronLeft className="h-7 w-7" strokeWidth={2} />
        </button>
        <div className="flex-1 text-center pr-8">
          <h1 className="text-[17px] font-semibold leading-tight">Customer Detail</h1>
          <p className="text-[13px] opacity-90">({booking.phone})</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-2 md:p-4 max-w-2xl mx-auto w-full">
        {/* Patient Card */}
        <div className="bg-white rounded-[1.2rem] shadow-sm overflow-hidden mb-4">
          
          {/* Top Teal Banner */}
          <div className="bg-[#009688] p-4 text-white flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{booking.name}</h2>
              <p className="text-xs opacity-90">{booking.gender} / {booking.age} years</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition">
                <Info className="h-4 w-4" />
              </button>
              <button className="bg-[#FF7043] text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm hover:bg-[#F4511E] transition">
                Edit
              </button>
            </div>
          </div>

          {/* Packages Section */}
          <div className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[#009688] font-semibold text-[17px]">Packages</h3>
              <button className="text-[#FF7043] border border-[#FF7043] px-3 py-1 rounded-full text-xs font-medium hover:bg-orange-50 transition">
                + Add Package
              </button>
            </div>
            <hr className="border-gray-200 mb-3" />
            
            <p className="text-gray-500 text-xs mb-4">Report available in 12 hours</p>

            {/* Accordion Item */}
            <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
              <div 
                className="flex items-start p-3 bg-white cursor-pointer"
                onClick={() => setExpanded(!expanded)}
              >
                <div className="mt-0.5 text-gray-400 mr-2">
                  {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-[15px] pr-2 leading-tight">
                    {booking.package}
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">₹{booking.amount}</p>
                </div>
                <button className="text-gray-400 p-1 hover:text-gray-600 transition" onClick={(e) => { e.stopPropagation(); /* Remove logic */ }}>
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Expanded Test List */}
              {expanded && (
                <div className="bg-white border-t border-gray-100">
                  {DUMMY_TESTS.map((test, index) => (
                    <div 
                      key={index} 
                      className="px-4 py-3 border-b border-gray-50 flex items-start gap-3 last:border-b-0"
                    >
                      <span className="text-gray-400 font-bold">-</span>
                      <span className="text-[14px] text-gray-700">{test}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>

      {/* Floating Action Button (Bot) */}
      <div className="fixed bottom-20 right-4 z-20">
        <button className="bg-[#4CAF50] text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition flex items-center justify-center h-14 w-14">
          <Bot className="h-6 w-6" />
        </button>
      </div>

      {/* Bottom Fixed Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-2xl mx-auto">
          <button className="w-full bg-[#009688] text-white font-medium py-3.5 rounded-full shadow-sm hover:bg-teal-700 transition active:scale-[0.98]">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
