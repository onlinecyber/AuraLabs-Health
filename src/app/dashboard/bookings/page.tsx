"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { 
  CheckCircle2, 
  Clock, 
  FlaskConical, 
  User, 
  MapPin, 
  Phone 
} from "lucide-react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");

  const fetchBookings = async () => {
    try {
      const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const bookingRef = doc(db, "bookings", id);
      await updateDoc(bookingRef, { status: newStatus });
      
      // Update local state to reflect UI instantly
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    } finally {
      setUpdatingId("");
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending_collection":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold"><Clock className="h-3 w-3" /> Pending Collection</span>;
      case "processing_in_lab":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold"><FlaskConical className="h-3 w-3" /> Processing in Lab</span>;
      case "report_ready":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold"><CheckCircle2 className="h-3 w-3" /> Report Ready</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-bold">Unknown</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bookings Management</h1>
        <p className="text-muted-foreground">Manage all patient appointments and update their status.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl border border-border">
          <h3 className="text-xl font-bold text-muted-foreground mb-2">No Bookings Yet</h3>
          <p className="text-sm text-muted-foreground">New bookings will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="glass-card p-6 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-6 justify-between items-start md:items-center hover:border-primary/30 transition-colors">
              
              {/* Info Section */}
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                    #{booking.id.slice(0, 8).toUpperCase()}
                  </span>
                  {getStatusBadge(booking.status)}
                </div>
                
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" /> {booking.name} 
                    <span className="text-sm font-normal text-muted-foreground">({booking.age} Yrs, {booking.gender})</span>
                  </h3>
                  <p className="text-sm font-semibold text-foreground mt-1">{booking.package}</p>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {booking.timeSlot}</span>
                  <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> +91 {booking.phone}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {booking.address}, {booking.pincode}</span>
                </div>
              </div>

              {/* Action Section */}
              <div className="w-full md:w-auto p-4 bg-slate-50 dark:bg-zinc-900 rounded-xl border border-border flex flex-col gap-3 min-w-[200px]">
                <div className="text-sm font-semibold text-center mb-1">Update Status</div>
                
                <select 
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  disabled={updatingId === booking.id}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-white dark:bg-black text-sm outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 cursor-pointer"
                >
                  <option value="pending_collection">Pending Collection</option>
                  <option value="processing_in_lab">Processing in Lab</option>
                  <option value="report_ready">Report Ready</option>
                </select>
                
                {updatingId === booking.id && (
                  <span className="text-xs text-center text-primary animate-pulse">Updating...</span>
                )}
                
                <div className="pt-3 mt-1 border-t border-border flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount:</span>
                  <span className="font-bold">₹{booking.amount} ({booking.paymentMethod === 'cash' ? 'COD' : 'Paid'})</span>
                </div>

                <Link 
                  href={`/dashboard/bookings/${booking.id}`}
                  className="mt-2 w-full flex items-center justify-center gap-2 bg-[#009688] text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition shadow-sm"
                >
                  View Details
                </Link>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
