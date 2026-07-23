"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Upload, Video, Building2, MapPin, Phone, Mail, Tag, Send, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAdsSubscription } from "@/hooks/useAdsSubscription";
import { useAdsCategories } from "@/hooks/useAdsCategories";
import { adsService } from "@/services/ads.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { InternationalPhoneInput } from "@/components/shared/InternationalPhoneInput";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validateEmail, validateAddress, validateBusinessName, validateGenericString, validateTextarea } from "@/lib/validation";

const PostAdPage = () => {
  const router = useRouter();
  const { subscription, loading: subLoading } = useAdsSubscription();
  const { categories, loading: catLoading } = useAdsCategories();

  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    address: "",
    telephone: "",
    email: "",
    categoryId: "",
    subcategoryId: "",
    youtubeLink: "",
    description: "",
  });
  
  const [adImage, setAdImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, touched, handleBlur, validateForm } = useFormValidation({
    title: (v) => validateGenericString(v, 120, "Title"),
    companyName: (v) => validateBusinessName(v),
    address: (v) => validateAddress(v),
    email: (v) => validateEmail(v),
    description: (v) => validateTextarea(v, 2000, "Description"),
    youtubeLink: (v) => validateGenericString(v, 200, "YouTube Link", false),
  });

  const selectedCategory = useMemo(() => {
    return categories.find(c => c.id === formData.categoryId);
  }, [categories, formData.categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAdImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(formData as any)) return;
    if (!adImage) {
      toast.error("Please upload an ad image.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // 1. Upload image
      const imageFormData = new FormData();
      imageFormData.append("file", adImage);
      const uploadRes = await adsService.uploadImage(imageFormData);
      const imageUrl = uploadRes.data.url;

      // 2. Submit Ad
      const adData = {
        title: formData.title,
        companyName: formData.companyName,
        description: formData.description,
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId || undefined,
        location: formData.address,
        contactInfo: `${formData.telephone} | ${formData.email}`,
        youtubeLink: formData.youtubeLink || undefined,
        imageUrl: imageUrl,
      };

      await adsService.create(adData);
      
      toast.success("Ad submitted successfully!");
      router.push('/ads');
    } catch (error: any) {
      toast.error(error.message || "Failed to submit ad. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-[var(--color-background)]";

  const labelClass =
    "text-xs font-bold text-[var(--color-secondary)] uppercase tracking-widest mb-2 flex items-center gap-2";

  if (subLoading || catLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface-dim)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  if (!subscription?.isSubscribed) {
    return (
      <div className="min-h-screen bg-[var(--color-surface-dim)] py-20 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 text-center shadow-xl border border-[var(--color-border)]">
          <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-[var(--color-primary)]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Subscription Required</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            To post your business in our Ads Gallery, you need an active Ads Subscription. 
            This is a separate $20/month plan designed specifically for promoting your business.
          </p>
          <Link
            href="/dashboard/ads-subscription"
            className="inline-block bg-[var(--color-primary)] text-white font-bold py-4 px-8 rounded-xl hover:bg-[var(--color-primary-dark)] transition-colors shadow-lg"
          >
            Subscribe to Post Ads
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-dim)] py-12 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--color-secondary)] tracking-tight">
            Post Your Business Ad
          </h1>
          <p className="text-[var(--color-muted)] mt-3 text-lg">
            Reach thousands of potential clients by showcasing your business in our directory.
          </p>
        </header>

        <main className="bg-white rounded-3xl shadow-xl border border-[var(--color-border)] overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
            
            {/* Image Upload Section */}
            <div className="flex flex-col items-center">
              <label className="text-sm font-bold text-[var(--color-secondary)] uppercase tracking-widest mb-4">
                Ad Display Image (Digital File)
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="relative w-full md:w-2/3 aspect-[4/5] md:aspect-[16/9] rounded-2xl border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-dim)] transition-all overflow-hidden group bg-gray-50"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Ad Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-[var(--color-muted)] group-hover:text-[var(--color-primary)] p-6 text-center">
                    <Upload size={48} strokeWidth={1.5} className="mb-4" />
                    <p className="font-bold">Click to upload your ad poster</p>
                    <p className="text-xs mt-2">Recommended: Vertical aspect ratio for best display in gallery</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept="image/*"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ad Title */}
              <div className="flex flex-col md:col-span-2">
                <label className={labelClass}>
                  <Tag size={14} className="text-[var(--color-primary)]" />
                  Ad Headline / Title
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="e.g. Expert Plumbing Services 24/7"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className={`${inputClass} ${touched.title && errors.title ? "border-red-500 focus:ring-red-500" : ""}`}
                  maxLength={120}
                  onBlur={(e) => handleBlur('title', e.target.value)}
                  aria-invalid={touched.title && !!errors.title}
                  aria-describedby={touched.title && errors.title ? "title-error" : undefined}
                />
                {touched.title && errors.title && (
                  <p id="title-error" className="text-red-500 text-xs mt-1 font-medium">{errors.title}</p>
                )}
              </div>

              {/* Company Name */}
              <div className="flex flex-col">
                <label className={labelClass}>
                  <Building2 size={14} className="text-[var(--color-primary)]" />
                  Company Name
                </label>
                <input
                  name="companyName"
                  type="text"
                  placeholder="e.g. Acme Services Ltd."
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className={`${inputClass} ${touched.companyName && errors.companyName ? "border-red-500 focus:ring-red-500" : ""}`}
                  maxLength={120}
                  onBlur={(e) => handleBlur('companyName', e.target.value)}
                  aria-invalid={touched.companyName && !!errors.companyName}
                  aria-describedby={touched.companyName && errors.companyName ? "companyName-error" : undefined}
                />
                {touched.companyName && errors.companyName && (
                  <p id="companyName-error" className="text-red-500 text-xs mt-1 font-medium">{errors.companyName}</p>
                )}
              </div>

              {/* Category & Subcategory */}
              <div className="flex flex-col md:col-span-2">
                <label className={labelClass}>
                  <Tag size={14} className="text-[var(--color-primary)]" />
                  Category / Subcategory
                </label>
                <select
                  name="categoryId"
                  required
                  value={formData.subcategoryId ? `sub_${formData.subcategoryId}_${formData.categoryId}` : (formData.categoryId ? `cat_${formData.categoryId}` : '')}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (!val) {
                      setFormData(prev => ({ ...prev, categoryId: '', subcategoryId: '' }));
                    } else if (val.startsWith('cat_')) {
                      setFormData(prev => ({ ...prev, categoryId: val.split('_')[1], subcategoryId: '' }));
                    } else if (val.startsWith('sub_')) {
                      const parts = val.split('_');
                      setFormData(prev => ({ ...prev, subcategoryId: parts[1], categoryId: parts[2] }));
                    }
                  }}
                  className={inputClass}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <optgroup key={cat.id} label={cat.name}>
                      <option value={`cat_${cat.id}`}>All {cat.name}</option>
                      {cat.subcategories?.map((sub: any) => (
                        <option key={sub.id} value={`sub_${sub.id}_${cat.id}`}>
                          {sub.name}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="flex flex-col md:col-span-2">
                <label className={labelClass}>
                  <MapPin size={14} className="text-[var(--color-primary)]" />
                  Business Location / Service Area
                </label>
                <input
                  name="address"
                  type="text"
                  placeholder="e.g. New York City, NY"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className={`${inputClass} ${touched.address && errors.address ? "border-red-500 focus:ring-red-500" : ""}`}
                  maxLength={150}
                  onBlur={(e) => handleBlur('address', e.target.value)}
                  aria-invalid={touched.address && !!errors.address}
                  aria-describedby={touched.address && errors.address ? "address-error" : undefined}
                />
                {touched.address && errors.address && (
                  <p id="address-error" className="text-red-500 text-xs mt-1 font-medium">{errors.address}</p>
                )}
              </div>

              {/* Telephone */}
              <div className="flex flex-col">
                <label className={labelClass}>
                  <Phone size={14} className="text-[var(--color-primary)]" />
                  Contact Number
                </label>
                <InternationalPhoneInput
                  name="telephone"
                  required
                  value={formData.telephone}
                  onChange={(value) => setFormData({ ...formData, telephone: value })}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <label className={labelClass}>
                  <Mail size={14} className="text-[var(--color-primary)]" />
                  Business Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="contact@business.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputClass} ${touched.email && errors.email ? "border-red-500 focus:ring-red-500" : ""}`}
                  maxLength={254}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                  aria-invalid={touched.email && !!errors.email}
                  aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                />
                {touched.email && errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Description */}
              <div className="flex flex-col md:col-span-2">
                <label className={labelClass}>
                  <Tag size={14} className="text-[var(--color-primary)]" />
                  Short Description
                </label>
                <textarea
                  name="description"
                  placeholder="Briefly describe your services..."
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className={`${inputClass} ${touched.description && errors.description ? "border-red-500 focus:ring-red-500" : ""}`}
                  rows={3}
                  maxLength={2000}
                  onBlur={(e) => handleBlur('description', e.target.value)}
                  aria-invalid={touched.description && !!errors.description}
                  aria-describedby={touched.description && errors.description ? "description-error" : undefined}
                />
                {touched.description && errors.description && (
                  <p id="description-error" className="text-red-500 text-xs mt-1 font-medium">{errors.description}</p>
                )}
              </div>

              {/* Youtube Link */}
              <div className="flex flex-col md:col-span-2">
                <label className={labelClass}>
                  <Video size={14} className="text-[var(--color-primary)]" />
                  YouTube Promo Link (Optional)
                </label>
                <input
                  name="youtubeLink"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.youtubeLink}
                  onChange={handleChange}
                  className={`${inputClass} ${touched.youtubeLink && errors.youtubeLink ? "border-red-500 focus:ring-red-500" : ""}`}
                  maxLength={200}
                  onBlur={(e) => handleBlur('youtubeLink', e.target.value)}
                  aria-invalid={touched.youtubeLink && !!errors.youtubeLink}
                  aria-describedby={touched.youtubeLink && errors.youtubeLink ? "youtubeLink-error" : undefined}
                />
                {touched.youtubeLink && errors.youtubeLink && (
                  <p id="youtubeLink-error" className="text-red-500 text-xs mt-1 font-medium">{errors.youtubeLink}</p>
                )}
                <p className="text-[10px] text-[var(--color-muted)] mt-2 italic">
                  Provide a YouTube link if you want a video play button to appear on your ad.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 bg-[var(--color-primary)] text-white font-bold py-5 rounded-2xl hover:bg-[var(--color-primary-dark)] transition-all shadow-lg hover:shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    Publish My Ad
                  </>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default PostAdPage;
