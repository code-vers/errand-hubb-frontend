"use client";

import React, { useRef, useState } from "react";
import { Upload, Video, Building2, MapPin, Phone, Mail, Tag, Send } from "lucide-react";
import { toast } from "sonner";

const PostAdPage = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    address: "",
    telephone: "",
    email: "",
    businessCategory: "",
    youtubeLink: "",
  });
  const [adImage, setAdImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Ad submitted successfully! It will be reviewed by our team.");
      setIsSubmitting(false);
      // Reset form
      setFormData({
        companyName: "",
        address: "",
        telephone: "",
        email: "",
        businessCategory: "",
        youtubeLink: "",
      });
      setAdImage(null);
      setPreviewUrl(null);
    }, 1500);
  };

  const inputClass =
    "w-full px-4 py-3 border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-foreground)] placeholder-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:border-[var(--color-primary)] transition-all bg-[var(--color-background)]";

  const labelClass =
    "text-xs font-bold text-[var(--color-secondary)] uppercase tracking-widest mb-2 flex items-center gap-2";

  const categories = [
    "Grocery",
    "IT Services",
    "Pet Services",
    "Logistics",
    "Cleaning",
    "Landscaping",
    "Plumbing",
    "Electrical",
    "Events",
    "Health & Beauty",
  ];

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
                className="relative w-full md:w-2/3 aspect-[16/9] rounded-2xl border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-surface-dim)] transition-all overflow-hidden group"
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="Ad Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center text-[var(--color-muted)] group-hover:text-[var(--color-primary)]">
                    <Upload size={48} strokeWidth={1.5} className="mb-4" />
                    <p className="font-bold">Click to upload your ad image</p>
                    <p className="text-xs mt-1">Recommended size: 1280x720 (16:9)</p>
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
                  className={inputClass}
                />
              </div>

              {/* Business Category */}
              <div className="flex flex-col">
                <label className={labelClass}>
                  <Tag size={14} className="text-[var(--color-primary)]" />
                  Business Category
                </label>
                <select
                  name="businessCategory"
                  required
                  value={formData.businessCategory}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="flex flex-col md:col-span-2">
                <label className={labelClass}>
                  <MapPin size={14} className="text-[var(--color-primary)]" />
                  Full Business Address
                </label>
                <input
                  name="address"
                  type="text"
                  placeholder="Street, City, State, ZIP"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Telephone */}
              <div className="flex flex-col">
                <label className={labelClass}>
                  <Phone size={14} className="text-[var(--color-primary)]" />
                  Telephone / Contact No.
                </label>
                <input
                  name="telephone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  required
                  value={formData.telephone}
                  onChange={handleChange}
                  className={inputClass}
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
                  className={inputClass}
                />
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
                  className={inputClass}
                />
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
