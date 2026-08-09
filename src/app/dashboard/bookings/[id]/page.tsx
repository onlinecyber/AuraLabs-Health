"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { ChevronLeft, Info, ChevronDown, ChevronUp, X, Bot, Upload, CheckCircle, FileText } from "lucide-react";

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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    setUploading(true);
    setProgress(0);

    const storageRef = ref(storage, `reports/${id}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, 
      (error) => {
        console.error("Upload failed:", error);
        alert("Failed to upload report");
        setUploading(false);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const bookingRef = doc(db, "bookings", id as string);
        await updateDoc(bookingRef, { 
          reportUrl: downloadURL,
          status: "report_ready"
        });
        setBooking((prev: any) => ({ ...prev, reportUrl: downloadURL, status: "report_ready" }));
        setUploading(false);
        alert("Report uploaded successfully!");
      }
    );
  };

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

        {/* Lab Report Upload Card */}
        <div className="bg-white rounded-[1.2rem] shadow-sm overflow-hidden mb-4 p-4">
          <h3 className="text-[#009688] font-semibold text-[17px] mb-3">Lab Report</h3>
          
          {booking.reportUrl ? (
            <div className="flex items-center justify-between bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle className="h-6 w-6" />
                <div>
                  <p className="font-semibold text-sm">Report Uploaded</p>
                  <p className="text-xs opacity-80">Available to patient</p>
                </div>
              </div>
              <a 
                href={booking.reportUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#009688] text-sm font-semibold hover:underline bg-white px-4 py-2 rounded-lg shadow-sm border border-green-100"
              >
                View PDF
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition relative">
                <input 
                  type="file" 
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Tap to upload PDF report</p>
                <p className="text-xs text-gray-500 mt-1">Files up to 5MB</p>
              </div>
              
              {uploading && (
                <div className="w-full bg-gray-100 rounded-full h-3 mt-4 overflow-hidden">
                  <div className="bg-[#009688] h-3 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              )}
            </div>
          )}
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
