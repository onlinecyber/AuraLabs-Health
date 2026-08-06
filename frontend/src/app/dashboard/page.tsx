"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  IndianRupee, 
  Activity, 
  Clock, 
  ArrowUpRight 
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminOverview() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    revenue: 0,
    pending: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        let total = 0;
        let rev = 0;
        let pnd = 0;
        let cmp = 0;

        querySnapshot.forEach((doc) => {
          total++;
          const data = doc.data();
          rev += data.amount || 0;
          if (data.status === "pending_collection") pnd++;
          if (data.status === "report_ready") cmp++;
        });

        setStats({
          totalBookings: total,
          revenue: rev,
          pending: pnd,
          completed: cmp
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="flex items-center text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md">
                  +12% <ArrowUpRight className="h-3 w-3 ml-1" />
                </span>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">{stats.totalBookings}</h3>
                <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <IndianRupee className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">₹{stats.revenue.toLocaleString()}</h3>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">{stats.pending}</h3>
                <p className="text-sm font-medium text-muted-foreground">Pending Collection</p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-1">{stats.completed}</h3>
                <p className="text-sm font-medium text-muted-foreground">Reports Delivered</p>
              </div>
            </div>

          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-black p-8 rounded-3xl border border-border flex flex-col justify-center items-start">
              <h3 className="text-xl font-bold mb-2">Manage Active Bookings</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm">
                View detailed information, update sample collection status, and upload patient reports.
              </p>
              <Link href="/dashboard/bookings">
                <Button className="rounded-xl">View All Bookings</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
