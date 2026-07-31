"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "../../common/PageHeader";
import { Loader2, Plus, Edit, Trash2, Megaphone, AlertCircle } from "lucide-react";
import { adsService } from "@/services/ads.service";
import { getImageUrl } from "@/configs/api.config";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";

export default function MyAdsPage() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [adToDelete, setAdToDelete] = useState<string | null>(null);

  const fetchMyAds = async () => {
    try {
      setLoading(true);
      const res = await adsService.getMyAds();
      setAds(res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to load your ads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyAds();
  }, []);

  const confirmDelete = async () => {
    if (!adToDelete) return;
    
    try {
      setDeletingId(adToDelete);
      await adsService.delete(adToDelete);
      toast.success("Ad deleted successfully");
      setAds((prev) => prev.filter((ad) => ad.id !== adToDelete));
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete ad");
    } finally {
      setDeletingId(null);
      setAdToDelete(null);
    }
  };

  if (loading) {
    return (
      <div className="w-full p-6 flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  return (
    <div className="w-full py-4 sm:py-5 px-3 sm:px-6 md:px-8 space-y-4 sm:space-y-6 font-sans max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <PageHeader title="My Ads" />
        <Link 
          href="/post-ad"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer shrink-0"
        >
          <Plus size={16} />
          Post New Ad
        </Link>
      </div>

      {ads.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 flex flex-col items-center justify-center text-center border border-gray-100 shadow-sm">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
            <Megaphone className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Ads Posted Yet</h3>
          <p className="text-gray-500 max-w-md mb-6">
            You haven't posted any business ads yet. Create your first poster to start reaching thousands of potential clients.
          </p>
          <Link 
            href="/post-ad"
            className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg shadow-[var(--color-primary)]/20"
          >
            Create Your First Ad
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div key={ad.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="aspect-[16/9] w-full bg-gray-50 relative overflow-hidden">
                <img 
                  src={getImageUrl(ad.imageUrl) || "https://images.unsplash.com/photo-1542831371-29b0f74f9713"} 
                  alt={ad.companyName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${ad.status === 'active' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                    {ad.status}
                  </span>
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-800 text-lg line-clamp-1 mb-1">{ad.title}</h3>
                <p className="text-sm font-medium text-gray-500 mb-4 line-clamp-1">{ad.companyName}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-400 font-medium mt-auto">
                  <span>{ad.category?.name}</span>
                  <span>{format(new Date(ad.createdAt), 'MMM dd, yyyy')}</span>
                </div>
                
                <div className="h-px w-full bg-gray-100 my-4" />
                
                <div className="flex items-center justify-between gap-3">
                  <Link 
                    href={`/dashboard/my-ads/${ad.id}/edit`}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-50 text-gray-700 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 hover:text-[var(--color-primary)] transition-colors border border-gray-100"
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button 
                    onClick={() => setAdToDelete(ad.id)}
                    disabled={deletingId === ad.id}
                    className="w-10 h-10 flex items-center justify-center text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50"
                    title="Delete Ad"
                  >
                    {deletingId === ad.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {adToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete this Ad?</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                Are you sure you want to permanently delete this ad? It will be removed from the gallery and cannot be recovered.
              </p>
              <div className="flex w-full gap-3">
                <button
                  onClick={() => setAdToDelete(null)}
                  disabled={deletingId !== null}
                  className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deletingId !== null}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  {deletingId ? <Loader2 size={18} className="animate-spin" /> : "Delete Ad"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
