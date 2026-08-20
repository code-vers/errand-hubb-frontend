"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import { Upload, Video, Building2, MapPin, Phone, Mail, Tag, Save, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAdsCategories } from "@/hooks/useAdsCategories";
import { adsService } from "@/services/ads.service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageHeader from "../../common/PageHeader";
import { getImageUrl } from "@/configs/api.config";
import { InternationalPhoneInput } from "@/components/shared/InternationalPhoneInput";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validateEmail, validateAddress, validateBusinessName, validateGenericString, validateTextarea, validatePhone } from "@/lib/validation";

export default function EditAdPage({ id }: { id: string }) {
  const router = useRouter();
  const { categories, loading: catLoading } = useAdsCategories();

  const [loading, setLoading] = useState(true);
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
    status: "active",
  });
  
  const [adImage, setAdImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { errors, touched, handleBlur, validateForm } = useFormValidation({
    title: (v) => validateGenericString(v, 120, "Title"),
    companyName: (v) => validateBusinessName(v),
    address: (v) => validateAddress(v),
    telephone: (v) => validatePhone(v, true),
    email: (v) => validateEmail(v),
    description: (v) => validateTextarea(v, 2000, "Description"),
    youtubeLink: (v) => validateGenericString(v, 200, "YouTube Link", false),
  });

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await adsService.findOne(id);
        const ad = res.data;
        
        let phone = "";
        let email = "";
        if (ad.contactInfo) {
          const parts = ad.contactInfo.split(" | ");
          phone = parts[0] || "";
          email = parts[1] || "";
        }

        setFormData({
          title: ad.title || "",
          companyName: ad.companyName || "",
          address: ad.location || "",
          telephone: phone,
          email: email,
          categoryId: ad.categoryId || "",
          subcategoryId: ad.subcategoryId || "",
          youtubeLink: ad.youtubeLink || "",
          description: ad.description || "",
          status: ad.status || "active",
        });
        
        if (ad.imageUrl) {
          setExistingImageUrl(getImageUrl(ad.imageUrl));
        }
      } catch (error: any) {
        toast.error("Failed to load ad details");
        router.push("/dashboard/my-ads");
      } finally {
        setLoading(false);
      }
    };
    fetchAd();
  }, [id, router]);

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
    setIsSubmitting(true);
    
    try {
      let imageUrl = undefined;
      
      // Upload new image if selected
      if (adImage) {
        const imageFormData = new FormData();
        imageFormData.append("file", adImage);
        const uploadRes = await adsService.uploadImage(imageFormData);
        imageUrl = uploadRes.data.url;
      }

      // Submit Ad
      const adData = {
        title: formData.title,
        companyName: formData.companyName,
        description: formData.description,
        categoryId: formData.categoryId,
        subcategoryId: formData.subcategoryId || undefined,
        location: formData.address,
        contactInfo: `${formData.telephone} | ${formData.email}`,
        youtubeLink: formData.youtubeLink || undefined,
        status: formData.status,
        ...(imageUrl && { imageUrl }),
      };

      await adsService.update(id, adData);
      
      toast.success("Ad updated successfully!");
      router.push('/dashboard/my-ads');
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Failed to update ad. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-[var(--color-background)]";

  const labelClass =
    "text-xs font-bold text-[var(--color-secondary)] uppercase tracking-widest mb-2 flex items-center gap-2";

  if (loading || catLoading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface-dim)] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary)]" />
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/my-ads" className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-gray-600">
          <ArrowLeft size={20} />
        </Link>
        <PageHeader title="Edit Ad" />
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden max-w-4xl">
        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          
          {/* Image Upload Section */}
          <div className="flex flex-col items-center">
            <label className="text-sm font-bold text-[var(--color-secondary)] uppercase tracking-widest mb-4">
              Ad Display Image (Digital File)
            </label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full md:w-2/3 aspect-[16/9] rounded-2xl border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-dim)] transition-all overflow-hidden group bg-gray-50"
            >
              {previewUrl || existingImageUrl ? (
                <img src={previewUrl || existingImageUrl!} alt="Ad Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-[var(--color-muted)] group-hover:text-[var(--color-primary)] p-6 text-center">
                  <Upload size={48} strokeWidth={1.5} className="mb-4" />
                  <p className="font-bold">Click to change your ad poster</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-bold bg-[var(--color-primary)] px-4 py-2 rounded-lg">Change Image</span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
              />
            </div>
            <p className="text-red-500 text-xs sm:text-sm font-medium mt-3 text-center">
              Artwork size: 3.5 x 4.5 with aspect ratio: 7:9 which would equal 1400 x 800 pixels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Status */}
            <div className="flex flex-col md:col-span-2">
                <label className={labelClass}>
                  <Tag size={14} className="text-[var(--color-primary)]" />
                  Status
                </label>
                <select
                  name="status"
                  required
                  value={formData.status}
                  onChange={handleChange}
                  className={`${inputClass} font-bold`}
                >
                  <option value="active">Active (Visible)</option>
                  <option value="inactive">Inactive (Hidden)</option>
                </select>
              </div>

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

            {/* Main Category */}
            <div className="flex flex-col">
              <label className={labelClass}>
                <Tag size={14} className="text-[var(--color-primary)]" />
                Category
              </label>
              <select
                name="categoryId"
                required
                value={formData.categoryId}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select a category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            {selectedCategory && selectedCategory.subcategories?.length > 0 && (
              <div className="flex flex-col md:col-span-2">
                <label className={labelClass}>
                  <Tag size={14} className="text-[var(--color-primary)]" />
                  Subcategory
                </label>
                <select
                  name="subcategoryId"
                  value={formData.subcategoryId}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a specific service</option>
                  {selectedCategory.subcategories.map((sub: any) => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>
            )}

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
                id="telephone"
                required
                value={formData.telephone}
                onChange={(value) => {
                  setFormData({ ...formData, telephone: value });
                  if (touched.telephone) {
                    handleBlur('telephone', value);
                  }
                }}
                onBlur={() => handleBlur('telephone', formData.telephone)}
                hasError={touched.telephone && !!errors.telephone}
                aria-invalid={touched.telephone && !!errors.telephone}
                aria-describedby={touched.telephone && errors.telephone ? "telephone-error" : undefined}
              />
              {touched.telephone && errors.telephone && (
                <p id="telephone-error" className="text-red-500 text-xs mt-1 font-medium">{errors.telephone}</p>
              )}
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
                rows={4}
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
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-[var(--color-primary)] text-white font-bold py-4 rounded-xl hover:bg-[var(--color-primary-dark)] transition-all shadow-lg hover:shadow-xl active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
            >
              {isSubmitting ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
