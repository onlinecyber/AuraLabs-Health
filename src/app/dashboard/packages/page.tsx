"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Trash2, Activity, Heart, Brain, Apple, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPackages() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "Full Body",
    originalPrice: "",
    price: "",
    tests: "",
    popular: false,
    iconString: "Activity"
  });

  const fetchPackages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "packages"));
      setPackages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const newPkg = {
        ...formData,
        originalPrice: Number(formData.originalPrice),
        price: Number(formData.price),
        tests: Number(formData.tests),
      };
      const docRef = await addDoc(collection(db, "packages"), newPkg);
      setPackages(prev => [...prev, { id: docRef.id, ...newPkg }]);
      
      // Reset form
      setFormData({
        name: "",
        category: "Full Body",
        originalPrice: "",
        price: "",
        tests: "",
        popular: false,
        iconString: "Activity"
      });
      alert("Package added successfully!");
    } catch (error) {
      console.error("Error adding package:", error);
      alert("Failed to add package.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    try {
      await deleteDoc(doc(db, "packages", id));
      setPackages(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error deleting package:", error);
      alert("Failed to delete package.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Tests Catalog</h1>
        <p className="text-muted-foreground">Manage health packages and test prices.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Add Package Form */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 rounded-2xl border border-border sticky top-24">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" /> Add New Package
            </h3>
            
            <form onSubmit={handleAddPackage} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">Package Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g., Basic Heart Check" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Selling Price</label>
                  <input required type="number" name="price" value={formData.price} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="₹" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Original Price</label>
                  <input required type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="₹" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Tests Included</label>
                  <input required type="number" name="tests" value={formData.tests} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20 text-sm" placeholder="e.g. 50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Category</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                    <option>Full Body</option>
                    <option>Heart</option>
                    <option>Women</option>
                    <option>Senior</option>
                    <option>Diabetes</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold">Icon</label>
                <select name="iconString" value={formData.iconString} onChange={handleChange} className="w-full h-10 px-3 rounded-lg border border-border bg-white dark:bg-black outline-none focus:ring-2 focus:ring-primary/20 text-sm">
                  <option value="Activity">Activity (Default)</option>
                  <option value="Heart">Heart</option>
                  <option value="Brain">Brain</option>
                  <option value="Apple">Apple (Diet/Wellness)</option>
                  <option value="Award">Award (Premium)</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="popular" name="popular" checked={formData.popular} onChange={handleChange} className="rounded border-border text-primary focus:ring-primary/20 w-4 h-4" />
                <label htmlFor="popular" className="text-sm font-semibold cursor-pointer">Mark as Bestseller</label>
              </div>

              <Button type="submit" disabled={isAdding} className="w-full mt-4 h-10">
                {isAdding ? "Adding..." : "Save Package"}
              </Button>
            </form>
          </div>
        </div>

        {/* Packages List */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20 glass-card rounded-2xl border border-border">
              <h3 className="text-lg font-bold text-muted-foreground">No Packages Found</h3>
              <p className="text-sm text-muted-foreground mt-1">Add your first package from the left sidebar.</p>
            </div>
          ) : (
            packages.map(pkg => (
              <div key={pkg.id} className="glass-card p-5 rounded-2xl border border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {pkg.category}
                    </span>
                    {pkg.popular && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
                        Bestseller
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-lg">{pkg.name}</h3>
                  <div className="text-sm text-muted-foreground mt-1 flex items-center gap-4">
                    <span>{pkg.tests} Tests</span>
                    <span className="flex items-center gap-2">
                      <span className="line-through opacity-70">₹{pkg.originalPrice}</span>
                      <span className="font-bold text-foreground">₹{pkg.price}</span>
                    </span>
                  </div>
                </div>
                
                <Button variant="outline" size="icon" onClick={() => handleDelete(pkg.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-100 shrink-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
