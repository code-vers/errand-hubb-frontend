'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Plus,
  Search,
  Loader2,
  AlertCircle,
  Play,
  ArrowUp,
  ArrowDown,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Upload,
  Sparkles,
  MapPin,
  Save,
  Pin,
  LayoutGrid,
  List,
  GripVertical,
  Layers,
} from 'lucide-react';
import { adsService } from '@/services/ads.service';
import { useAdsCategories } from '@/hooks/useAdsCategories';
import { getImageUrl } from '@/configs/api.config';
import PageHeader from '@/components/dashboard/common/PageHeader';

interface AdItem {
  id: string;
  title: string;
  companyName: string;
  description: string;
  imageUrl?: string;
  location?: string;
  contactInfo?: string;
  youtubeLink?: string;
  status: 'active' | 'inactive';
  position: number;
  createdAt: string;
  category?: { id: string; name: string };
  subcategory?: { id: string; name: string };
  user?: { id: string; firstName?: string; lastName?: string; email?: string };
}

export default function AdminAdsManagement() {
  const [ads, setAds] = useState<AdItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [positionInputs, setPositionInputs] = useState<Record<string, number>>({});
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // View Mode: 'gallery' (Card Grid) vs 'table' (List View)
  const [viewMode, setViewMode] = useState<'gallery' | 'table'>('gallery');

  // Drag and Drop States
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<AdItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    companyName: '',
    description: '',
    categoryId: '',
    subcategoryId: '',
    location: '',
    contactInfo: '',
    youtubeLink: '',
    imageUrl: '',
    position: 1,
    status: 'active',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { categories } = useAdsCategories();

  const safeCategories = useMemo(() => {
    return Array.isArray(categories) ? categories : [];
  }, [categories]);

  const selectedCatObj = useMemo(() => {
    return safeCategories.find((c: any) => c.id === formData.categoryId);
  }, [safeCategories, formData.categoryId]);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const fetchAllAds = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: any = await adsService.findAll({
        includeAll: 'true',
        limit: '100',
      });
      const list = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response)
            ? response
            : [];

      // Sort by position > 0 ascending, then createdAt descending
      const sorted = [...list].sort((a, b) => {
        const posA = a.position && a.position > 0 ? a.position : 99999;
        const posB = b.position && b.position > 0 ? b.position : 99999;
        if (posA !== posB) return posA - posB;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

      setAds(sorted);

      const posMap: Record<string, number> = {};
      sorted.forEach((item, idx) => {
        posMap[item.id] = item.position && item.position > 0 ? item.position : idx + 1;
      });
      setPositionInputs(posMap);
    } catch (err: any) {
      console.error('Failed to fetch ads:', err);
      setError('Failed to load ads. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAds();
  }, []);

  const filteredAds = useMemo(() => {
    return ads.filter((ad) => {
      const matchesSearch =
        !search ||
        ad.companyName?.toLowerCase().includes(search.toLowerCase()) ||
        ad.title?.toLowerCase().includes(search.toLowerCase()) ||
        ad.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCat = !categoryFilter || ad.category?.id === categoryFilter;
      const matchesStatus = !statusFilter || ad.status === statusFilter;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [ads, search, categoryFilter, statusFilter]);

  // Helper to reassign sequential positions to an array of ads and save to backend
  const saveAllSequentialPositions = async (adList: AdItem[]) => {
    setIsSavingOrder(true);
    try {
      const orders = adList.map((ad, idx) => ({
        id: ad.id,
        position: idx + 1,
      }));

      await adsService.reorderAds(orders);

      const updatedList = adList.map((ad, idx) => ({
        ...ad,
        position: idx + 1,
      }));

      setAds(updatedList);

      const posMap: Record<string, number> = {};
      updatedList.forEach((ad, idx) => {
        posMap[ad.id] = idx + 1;
      });
      setPositionInputs(posMap);
      showToast('Ad positions & serial order updated!');
    } catch (err) {
      console.error('Failed to update serial order:', err);
      alert('Failed to update serial order.');
    } finally {
      setIsSavingOrder(false);
    }
  };

  const handlePositionInputChange = (id: string, val: number) => {
    setPositionInputs((prev) => ({ ...prev, [id]: val }));
  };

  // Drag & Drop Handlers
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragOverIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = async (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const listCopy = [...filteredAds];
    const [draggedItem] = listCopy.splice(draggedIndex, 1);
    listCopy.splice(targetIndex, 0, draggedItem);

    setDraggedIndex(null);
    setDragOverIndex(null);

    await saveAllSequentialPositions(listCopy);
  };

  // Smart position change (shifts existing item back when an item is moved to position X)
  const handleSmartPositionInput = async (adId: string, newPositionVal: number) => {
    const currentIndex = filteredAds.findIndex((a) => a.id === adId);
    if (currentIndex === -1) return;

    const targetIndex = Math.max(0, Math.min(filteredAds.length - 1, newPositionVal - 1));
    if (currentIndex === targetIndex) return;

    const listCopy = [...filteredAds];
    const [movedItem] = listCopy.splice(currentIndex, 1);
    listCopy.splice(targetIndex, 0, movedItem);

    await saveAllSequentialPositions(listCopy);
  };

  const moveUp = async (index: number) => {
    if (index <= 0) return;
    const listCopy = [...filteredAds];
    const temp = listCopy[index];
    listCopy[index] = listCopy[index - 1];
    listCopy[index - 1] = temp;
    await saveAllSequentialPositions(listCopy);
  };

  const moveDown = async (index: number) => {
    if (index >= filteredAds.length - 1) return;
    const listCopy = [...filteredAds];
    const temp = listCopy[index];
    listCopy[index] = listCopy[index + 1];
    listCopy[index + 1] = temp;
    await saveAllSequentialPositions(listCopy);
  };

  const pinToTop = async (index: number) => {
    if (index <= 0) return;
    const listCopy = [...filteredAds];
    const [selected] = listCopy.splice(index, 1);
    listCopy.unshift(selected);
    await saveAllSequentialPositions(listCopy);
  };

  const handleToggleStatus = async (ad: AdItem) => {
    const newStatus = ad.status === 'active' ? 'inactive' : 'active';
    try {
      await adsService.update(ad.id, { status: newStatus });
      setAds((prev) =>
        prev.map((item) => (item.id === ad.id ? { ...item, status: newStatus } : item))
      );
      showToast(`Ad status changed to ${newStatus}`);
    } catch (err) {
      console.error('Failed to toggle status:', err);
      alert('Failed to toggle ad status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this ad poster?')) return;
    try {
      await adsService.delete(id);
      setAds((prev) => prev.filter((item) => item.id !== id));
      showToast('Ad deleted successfully.');
    } catch (err) {
      console.error('Failed to delete ad:', err);
      alert('Failed to delete ad.');
    }
  };

  const openCreateModal = () => {
    setEditingAd(null);
    setFormData({
      title: '',
      companyName: '',
      description: '',
      categoryId: safeCategories[0]?.id || '',
      subcategoryId: '',
      location: '',
      contactInfo: '',
      youtubeLink: '',
      imageUrl: '',
      position: ads.length + 1,
      status: 'active',
    });
    setImageFile(null);
    setImagePreview(null);
    setIsModalOpen(true);
  };

  const openEditModal = (ad: AdItem) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title || '',
      companyName: ad.companyName || '',
      description: ad.description || '',
      categoryId: ad.category?.id || safeCategories[0]?.id || '',
      subcategoryId: ad.subcategory?.id || '',
      location: ad.location || '',
      contactInfo: ad.contactInfo || '',
      youtubeLink: ad.youtubeLink || '',
      imageUrl: ad.imageUrl || '',
      position: ad.position || 1,
      status: ad.status || 'active',
    });
    setImageFile(null);
    setImagePreview(ad.imageUrl ? getImageUrl(ad.imageUrl) : null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let uploadedUrl = formData.imageUrl;

      if (imageFile) {
        const fileData = new FormData();
        fileData.append('file', imageFile);
        const uploadRes: any = await adsService.uploadImage(fileData);
        uploadedUrl = uploadRes?.data?.url || uploadRes?.url || uploadedUrl;
      }

      if (!formData.categoryId) {
        alert('Please select a category.');
        setSubmitting(false);
        return;
      }

      const payload: any = {
        title: formData.title.trim(),
        companyName: formData.companyName.trim(),
        description: formData.description.trim(),
        categoryId: formData.categoryId,
        position: Number(formData.position) || 1,
        status: formData.status,
      };

      if (formData.subcategoryId && formData.subcategoryId.trim() !== '') {
        payload.subcategoryId = formData.subcategoryId.trim();
      }

      if (formData.location && formData.location.trim() !== '') {
        payload.location = formData.location.trim();
      }

      if (formData.contactInfo && formData.contactInfo.trim() !== '') {
        payload.contactInfo = formData.contactInfo.trim();
      }

      if (formData.youtubeLink && formData.youtubeLink.trim() !== '') {
        let yt = formData.youtubeLink.trim();
        if (!/^https?:\/\//i.test(yt)) {
          yt = `https://${yt}`;
        }
        payload.youtubeLink = yt;
      }

      if (uploadedUrl && uploadedUrl.trim() !== '') {
        payload.imageUrl = uploadedUrl.trim();
      }

      if (editingAd) {
        await adsService.update(editingAd.id, payload);
      } else {
        await adsService.adminCreate(payload);
      }

      setIsModalOpen(false);
      showToast(editingAd ? 'Ad updated successfully!' : 'Ad published successfully!');
      await fetchAllAds();
    } catch (err: any) {
      console.error('Failed to save ad:', err);
      const backendError = err?.response?.data?.message;
      let errorMsg = 'Failed to save ad. Please check form inputs.';
      if (Array.isArray(backendError)) {
        errorMsg = backendError
          .map((e: any) => (typeof e === 'object' ? e.message || JSON.stringify(e) : e))
          .join(', ');
      } else if (typeof backendError === 'string') {
        errorMsg = backendError;
      } else if (err?.message) {
        errorMsg = err.message;
      }
      alert(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='p-6 space-y-6 bg-slate-50/50 min-h-screen relative'>
      {/* Toast Notification */}
      {successToast && (
        <div className='fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-300'>
          <CheckCircle2 className='text-emerald-400' size={20} />
          <span className='text-sm font-bold'>{successToast}</span>
        </div>
      )}

      <PageHeader title='Ads & Banner Management' />

      {/* Action Bar & Controls */}
      <div className='flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm'>
        <div className='flex flex-col sm:flex-row gap-3 flex-1'>
          {/* Search Input */}
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-400' size={18} />
            <input
              type='text'
              placeholder='Search company, title, or keyword...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22] focus:border-transparent transition-all'
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22] cursor-pointer'
          >
            <option value=''>All Categories</option>
            {safeCategories.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22] cursor-pointer'
          >
            <option value=''>All Statuses</option>
            <option value='active'>Active Only</option>
            <option value='inactive'>Inactive Only</option>
          </select>
        </div>

        {/* View Mode Toggle & Create Ad Button */}
        <div className='flex items-center gap-3 shrink-0'>
          {/* View Toggle */}
          <div className='flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200'>
            <button
              type='button'
              onClick={() => setViewMode('gallery')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'gallery'
                  ? 'bg-white text-[#F47A22] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <LayoutGrid size={15} /> Gallery Grid
            </button>
            <button
              type='button'
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-[#F47A22] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List size={15} /> List Table
            </button>
          </div>

          <button
            type='button'
            onClick={openCreateModal}
            className='flex items-center gap-2 bg-[#F47A22] hover:bg-[#d96515] active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all cursor-pointer'
          >
            <Plus size={18} />
            <span>Post New Ad</span>
          </button>
        </div>
      </div>

      {/* Guide Banner */}
      <div className='p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs text-amber-900 font-medium shadow-2xs'>
        <div className='flex items-center gap-2.5'>
          <Sparkles className='text-amber-600 shrink-0' size={18} />
          <span>
            <strong>Drag & Drop Reordering:</strong> Drag any poster card or table row to change serial order. Typing a number (e.g. <code>1</code>) automatically shifts existing items back!
          </span>
        </div>
        {isSavingOrder && (
          <span className='flex items-center gap-1.5 text-amber-700 font-extrabold bg-amber-100 px-3 py-1 rounded-full animate-pulse shrink-0'>
            <Loader2 size={13} className='animate-spin' /> Updating Serial Positions...
          </span>
        )}
      </div>

      {/* Ads Container (Gallery View vs Table View) */}
      {loading ? (
        <div className='flex items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm'>
          <Loader2 className='w-8 h-8 animate-spin text-[#F47A22]' />
        </div>
      ) : error ? (
        <div className='p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 flex items-center gap-3'>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      ) : filteredAds.length === 0 ? (
        <div className='p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3'>
          <p className='text-slate-500 font-bold text-base'>No Business Ads Found</p>
          <p className='text-slate-400 text-xs max-w-sm mx-auto'>
            No business ads found matching your criteria. Click &quot;Post New Ad&quot; to publish a new ad.
          </p>
        </div>
      ) : viewMode === 'gallery' ? (
        /* ---------------- GALLERY / GRID VIEW WITH DRAG & DROP ---------------- */
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {filteredAds.map((ad, index) => {
            const serialNum = index + 1;
            const isTopAd = serialNum === 1;
            const isDragging = draggedIndex === index;
            const isOver = dragOverIndex === index;

            return (
              <div
                key={ad.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col group relative ${
                  isDragging
                    ? 'opacity-40 border-dashed border-[#F47A22] scale-95 shadow-none'
                    : isOver
                      ? 'border-2 border-[#F47A22] shadow-xl scale-[1.02]'
                      : isTopAd
                        ? 'border-2 border-amber-400 shadow-md hover:shadow-xl'
                        : 'border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Top Serial Badge Bar */}
                <div className='px-4 py-3 bg-slate-900 text-white flex items-center justify-between gap-2 border-b border-slate-800 cursor-grab active:cursor-grabbing select-none'>
                  <div className='flex items-center gap-2'>
                    <GripVertical size={16} className='text-slate-400 group-hover:text-[#F47A22] transition-colors' />
                    {isTopAd ? (
                      <span className='font-black text-xs px-2.5 py-0.5 rounded-full bg-amber-500 text-white shadow-xs animate-pulse'>
                        🏆 #1 (TOP AD)
                      </span>
                    ) : serialNum === 2 ? (
                      <span className='font-extrabold text-xs px-2.5 py-0.5 rounded-full bg-slate-700 text-white'>
                        🥈 #2
                      </span>
                    ) : serialNum === 3 ? (
                      <span className='font-extrabold text-xs px-2.5 py-0.5 rounded-full bg-amber-700 text-white'>
                        🥉 #3
                      </span>
                    ) : (
                      <span className='font-bold text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300'>
                        #{serialNum}
                      </span>
                    )}
                  </div>

                  {/* Serial input & quick move actions */}
                  <div className='flex items-center gap-1.5' onClick={(e) => e.stopPropagation()}>
                    <input
                      type='number'
                      min={1}
                      value={positionInputs[ad.id] ?? serialNum}
                      onChange={(e) =>
                        handlePositionInputChange(ad.id, parseInt(e.target.value) || serialNum)
                      }
                      onBlur={(e) =>
                        handleSmartPositionInput(ad.id, parseInt(e.target.value) || serialNum)
                      }
                      className='w-12 text-center py-0.5 text-xs bg-slate-800 text-white border border-slate-700 rounded font-black outline-none focus:ring-1 focus:ring-[#F47A22]'
                    />
                    <button
                      type='button'
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                      className='p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer'
                      title='Move Up'
                    >
                      <ArrowUp size={14} />
                    </button>
                    <button
                      type='button'
                      onClick={() => moveDown(index)}
                      disabled={index === filteredAds.length - 1}
                      className='p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer'
                      title='Move Down'
                    >
                      <ArrowDown size={14} />
                    </button>
                  </div>
                </div>

                {/* Ad Poster Graphic Container */}
                <div className='relative w-full aspect-[3/4] bg-slate-100 overflow-hidden flex items-center justify-center border-b border-slate-100'>
                  <img
                    src={getImageUrl(ad.imageUrl) || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713'}
                    alt={ad.companyName}
                    className='w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500'
                  />

                  {/* Status Overlay Badge */}
                  <div className='absolute top-3 right-3'>
                    <button
                      type='button'
                      onClick={() => handleToggleStatus(ad)}
                      className={`text-[11px] font-extrabold px-3 py-1 rounded-full backdrop-blur-md shadow-md border cursor-pointer transition-all ${
                        ad.status === 'active'
                          ? 'bg-emerald-500/90 text-white border-emerald-400'
                          : 'bg-slate-900/80 text-white border-slate-700'
                      }`}
                    >
                      {ad.status === 'active' ? '✓ ACTIVE' : '✕ INACTIVE'}
                    </button>
                  </div>
                </div>

                {/* Poster Info & Card Footer */}
                <div className='p-4 space-y-2.5 flex-1 flex flex-col justify-between bg-white'>
                  <div>
                    <h3 className='font-bold text-slate-900 text-base leading-snug line-clamp-1'>
                      {ad.companyName}
                    </h3>
                    <p className='text-xs font-semibold text-[#F47A22] line-clamp-1 mb-1'>
                      {ad.title}
                    </p>
                    <p className='text-xs text-slate-500 line-clamp-2 leading-relaxed'>
                      {ad.description}
                    </p>
                  </div>

                  <div className='pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs'>
                    <span className='inline-block text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase'>
                      {ad.category?.name || 'General'}
                    </span>

                    <div className='flex items-center gap-2'>
                      {index > 0 && (
                        <button
                          type='button'
                          onClick={() => pinToTop(index)}
                          className='flex items-center gap-1 text-[11px] font-extrabold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-200 transition-colors cursor-pointer'
                        >
                          <Pin size={11} /> Pin #1
                        </button>
                      )}

                      <button
                        type='button'
                        onClick={() => openEditModal(ad)}
                        className='p-1.5 text-slate-600 hover:text-[#F47A22] hover:bg-orange-50 rounded-lg transition-colors cursor-pointer'
                        title='Edit Ad'
                      >
                        <Edit2 size={16} />
                      </button>

                      <button
                        type='button'
                        onClick={() => handleDelete(ad.id)}
                        className='p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer'
                        title='Delete Ad'
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ---------------- TABLE / LIST VIEW WITH DRAG & DROP ---------------- */
        <div className='bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left text-sm border-collapse'>
              <thead>
                <tr className='bg-slate-50 border-b border-slate-200 text-slate-500 font-bold text-xs uppercase tracking-wider'>
                  <th className='py-3.5 px-4 w-44 text-center'>Serial Position</th>
                  <th className='py-3.5 px-4'>Ad Poster Details</th>
                  <th className='py-3.5 px-4'>Category</th>
                  <th className='py-3.5 px-4'>Location</th>
                  <th className='py-3.5 px-4'>Posted By</th>
                  <th className='py-3.5 px-4 text-center'>Status</th>
                  <th className='py-3.5 px-4 text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-100'>
                {filteredAds.map((ad, index) => {
                  const serialNum = index + 1;
                  const isTopAd = serialNum === 1;
                  const isDragging = draggedIndex === index;
                  const isOver = dragOverIndex === index;

                  return (
                    <tr
                      key={ad.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={() => handleDrop(index)}
                      className={`transition-colors cursor-grab active:cursor-grabbing ${
                        isDragging
                          ? 'opacity-40 bg-orange-50'
                          : isOver
                            ? 'bg-orange-100/50 border-y-2 border-[#F47A22]'
                            : isTopAd
                              ? 'bg-amber-50/40 hover:bg-amber-50/70'
                              : 'hover:bg-slate-50/80'
                      }`}
                    >
                      {/* Serial Position Control Column */}
                      <td className='py-3.5 px-4 text-center align-middle'>
                        <div className='flex flex-col items-center gap-2' onClick={(e) => e.stopPropagation()}>
                          {/* Badge */}
                          {isTopAd ? (
                            <span className='inline-flex items-center gap-1 font-black text-xs px-2.5 py-1 rounded-lg bg-amber-500 text-white shadow-xs border border-amber-600 animate-pulse'>
                              🏆 #1 (TOP AD)
                            </span>
                          ) : serialNum === 2 ? (
                            <span className='inline-flex items-center gap-1 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-slate-200 text-slate-800 border border-slate-300'>
                              🥈 #2
                            </span>
                          ) : serialNum === 3 ? (
                            <span className='inline-flex items-center gap-1 font-extrabold text-xs px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-200'>
                              🥉 #3
                            </span>
                          ) : (
                            <span className='inline-flex items-center gap-1 font-bold text-xs px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 border border-slate-200'>
                              #{serialNum}
                            </span>
                          )}

                          {/* Reordering Controls */}
                          <div className='flex items-center justify-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200'>
                            <button
                              type='button'
                              onClick={() => moveUp(index)}
                              disabled={index === 0 || isSavingOrder}
                              className='p-1 text-slate-600 hover:text-[#F47A22] hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors'
                              title='Move Position Up'
                            >
                              <ArrowUp size={15} />
                            </button>

                            <input
                              type='number'
                              min={1}
                              value={positionInputs[ad.id] ?? serialNum}
                              onChange={(e) =>
                                handlePositionInputChange(ad.id, parseInt(e.target.value) || serialNum)
                              }
                              onBlur={(e) =>
                                handleSmartPositionInput(ad.id, parseInt(e.target.value) || serialNum)
                              }
                              className='w-11 text-center py-0.5 text-xs bg-white border border-slate-200 rounded-md font-extrabold outline-none focus:ring-1 focus:ring-[#F47A22]'
                            />

                            <button
                              type='button'
                              onClick={() => moveDown(index)}
                              disabled={index === filteredAds.length - 1 || isSavingOrder}
                              className='p-1 text-slate-600 hover:text-[#F47A22] hover:bg-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors'
                              title='Move Position Down'
                            >
                              <ArrowDown size={15} />
                            </button>
                          </div>

                          {/* Set #1 Top Button */}
                          {index > 0 && (
                            <button
                              type='button'
                              onClick={() => pinToTop(index)}
                              disabled={isSavingOrder}
                              className='flex items-center gap-1 text-[10px] font-extrabold text-amber-700 bg-amber-100 hover:bg-amber-200 px-2 py-0.5 rounded-full border border-amber-300 transition-colors cursor-pointer'
                              title='Set as Top Ad #1'
                            >
                              <Pin size={10} /> Set #1 Top
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Poster Info */}
                      <td className='py-3.5 px-4 align-middle'>
                        <div className='flex items-start gap-3'>
                          <div className='w-14 h-18 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0 relative'>
                            <img
                              src={getImageUrl(ad.imageUrl) || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713'}
                              alt={ad.companyName}
                              className='w-full h-full object-cover'
                            />
                          </div>
                          <div className='space-y-0.5 max-w-xs'>
                            <h4 className='font-bold text-slate-800 line-clamp-1'>{ad.companyName}</h4>
                            <p className='text-xs font-semibold text-[#F47A22] line-clamp-1'>{ad.title}</p>
                            <p className='text-[11px] text-slate-400 line-clamp-1'>{ad.description}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className='py-3.5 px-4 align-middle'>
                        <div className='space-y-1'>
                          <span className='inline-block text-[11px] font-extrabold text-[#F47A22] bg-orange-50 px-2 py-0.5 rounded border border-orange-100'>
                            {ad.category?.name || 'General'}
                          </span>
                          {ad.subcategory && (
                            <p className='text-[10px] text-slate-400 font-medium'>{ad.subcategory.name}</p>
                          )}
                        </div>
                      </td>

                      {/* Location */}
                      <td className='py-3.5 px-4 align-middle text-xs font-medium text-slate-600'>
                        {ad.location ? (
                          <span className='flex items-center gap-1'>
                            <MapPin size={13} className='text-slate-400' />
                            {ad.location}
                          </span>
                        ) : (
                          <span className='text-slate-400'>N/A</span>
                        )}
                      </td>

                      {/* Posted By */}
                      <td className='py-3.5 px-4 align-middle text-xs text-slate-600'>
                        <p className='font-bold text-slate-700'>
                          {ad.user?.firstName ? `${ad.user.firstName} ${ad.user.lastName || ''}` : 'Admin'}
                        </p>
                        <p className='text-[10px] text-slate-400'>{ad.user?.email || 'System'}</p>
                      </td>

                      {/* Status Toggle */}
                      <td className='py-3.5 px-4 align-middle text-center' onClick={(e) => e.stopPropagation()}>
                        <button
                          type='button'
                          onClick={() => handleToggleStatus(ad)}
                          className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full border cursor-pointer transition-all ${
                            ad.status === 'active'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                          }`}
                        >
                          {ad.status === 'active' ? (
                            <>
                              <CheckCircle2 size={12} /> Active
                            </>
                          ) : (
                            <>
                              <XCircle size={12} /> Inactive
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className='py-3.5 px-4 align-middle text-right' onClick={(e) => e.stopPropagation()}>
                        <div className='flex items-center justify-end gap-1.5'>
                          <button
                            type='button'
                            onClick={() => openEditModal(ad)}
                            className='p-1.5 text-slate-600 hover:text-[#F47A22] hover:bg-orange-50 rounded-lg transition-colors cursor-pointer'
                            title='Edit Ad'
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            type='button'
                            onClick={() => handleDelete(ad.id)}
                            className='p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer'
                            title='Delete Ad'
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admin Create / Edit Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto'>
          <div className='bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 relative border border-slate-200 max-h-[90vh] overflow-y-auto'>
            {/* Modal Header */}
            <div className='flex items-center justify-between border-b border-slate-100 pb-4'>
              <div>
                <h3 className='text-lg font-bold text-slate-800'>
                  {editingAd ? 'Edit Ad Details' : 'Post New Business Ad'}
                </h3>
                <p className='text-xs text-slate-400 mt-0.5'>
                  {editingAd ? 'Update poster content or change position order.' : 'Publish a new ad poster directly to the gallery.'}
                </p>
              </div>
              <button
                type='button'
                onClick={() => setIsModalOpen(false)}
                className='p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer'
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleFormSubmit} className='space-y-4'>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Company Name */}
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-1'>
                    Company Name <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                    placeholder='e.g. Happy Pups Pet Care'
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22]'
                  />
                </div>

                {/* Ad Title */}
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-1'>
                    Ad Title / Subtitle <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='text'
                    required
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder='e.g. Dog Walker & Pet Care Specialist'
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22]'
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className='block text-xs font-bold text-slate-600 mb-1'>
                  Description <span className='text-red-500'>*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder='Write ad description details...'
                  className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22]'
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Category */}
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-1'>
                    Category <span className='text-red-500'>*</span>
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, categoryId: e.target.value, subcategoryId: '' }))
                    }
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22] cursor-pointer'
                  >
                    <option value=''>Select Category</option>
                    {safeCategories.map((c: any) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory */}
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-1'>Subcategory</label>
                  <select
                    value={formData.subcategoryId}
                    onChange={(e) => setFormData((prev) => ({ ...prev, subcategoryId: e.target.value }))}
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22] cursor-pointer'
                    disabled={!selectedCatObj?.subcategories?.length}
                  >
                    <option value=''>Select Subcategory</option>
                    {selectedCatObj?.subcategories?.map((sub: any) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Location */}
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-1'>Location</label>
                  <input
                    type='text'
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder='e.g. Los Angeles, CA'
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22]'
                  />
                </div>

                {/* YouTube Link */}
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-1'>YouTube Video Link</label>
                  <input
                    type='url'
                    value={formData.youtubeLink}
                    onChange={(e) => setFormData((prev) => ({ ...prev, youtubeLink: e.target.value }))}
                    placeholder='https://www.youtube.com/watch?v=...'
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22]'
                  />
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {/* Position Serial Number */}
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-1'>
                    Position Serial # <span className='text-xs text-slate-400 font-normal'>(#1 = Top)</span>
                  </label>
                  <input
                    type='number'
                    min={1}
                    value={formData.position}
                    onChange={(e) => setFormData((prev) => ({ ...prev, position: parseInt(e.target.value) || 1 }))}
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22] font-bold'
                  />
                </div>

                {/* Status */}
                <div>
                  <label className='block text-xs font-bold text-slate-600 mb-1'>Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as any }))}
                    className='w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#F47A22] cursor-pointer'
                  >
                    <option value='active'>Active</option>
                    <option value='inactive'>Inactive</option>
                  </select>
                </div>
              </div>

              {/* Poster Image File Upload / URL */}
              <div>
                <label className='block text-xs font-bold text-slate-600 mb-1'>
                  Ad Poster Image <span className='text-xs text-slate-400 font-normal'>(Ratio 3:4 recommended)</span>
                </label>

                <div className='flex items-center gap-4'>
                  <div className='relative w-20 h-24 bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center'>
                    {imagePreview ? (
                      <img src={imagePreview} alt='Preview' className='w-full h-full object-cover' />
                    ) : (
                      <Upload className='text-slate-400' size={20} />
                    )}
                  </div>

                  <div className='space-y-2 flex-1'>
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleFileChange}
                      className='block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#F47A22] file:text-white hover:file:bg-[#d96515] cursor-pointer'
                    />
                    <p className='text-[11px] text-slate-400'>
                      Or enter image path / URL (e.g. <code>/ads/image.png</code>):
                    </p>
                    <input
                      type='text'
                      value={formData.imageUrl}
                      onChange={(e) => {
                        setFormData((prev) => ({ ...prev, imageUrl: e.target.value }));
                        if (e.target.value) setImagePreview(getImageUrl(e.target.value));
                      }}
                      placeholder='/ads/image.png or http...'
                      className='w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#F47A22]'
                    />
                  </div>
                </div>
              </div>

              {/* Form Footer Actions */}
              <div className='flex items-center justify-end gap-3 pt-4 border-t border-slate-100'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={submitting}
                  className='flex items-center gap-2 bg-[#F47A22] hover:bg-[#d96515] text-white text-sm font-bold px-6 py-2 rounded-xl shadow-sm cursor-pointer disabled:opacity-50 transition-all'
                >
                  {submitting && <Loader2 className='w-4 h-4 animate-spin' />}
                  <span>{editingAd ? 'Update Ad' : 'Publish Ad'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
