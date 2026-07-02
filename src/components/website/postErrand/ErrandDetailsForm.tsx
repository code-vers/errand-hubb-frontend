import { Errand } from "@/types/errand";
import { useRef } from "react";
import { Upload, X, Loader2, PlayCircle, ChevronDown } from "lucide-react";
import { Category } from "@/types/categories";
import { toast } from "sonner";
import { getImageUrl } from "@/configs/api.config";
import { useFormValidation } from "@/hooks/useFormValidation";
import { validateCityState, validateGenericString, validateTextarea } from "@/lib/validation";
import { StateDropdown, CityDropdown } from "@/components/shared/StateCityDropdown";

interface ErrandDetailsFormProps {
  formData: Errand;
  categories: Category[];
  onChange: (field: keyof Errand, value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  existingGallery: string[];
  setExistingGallery: React.Dispatch<React.SetStateAction<string[]>>;
  newGalleryFiles: File[];
  setNewGalleryFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const ErrandDetailsForm = ({
  formData,
  categories,
  onChange,
  onSubmit,
  isSubmitting,
  existingGallery,
  setExistingGallery,
  newGalleryFiles,
  setNewGalleryFiles,
}: ErrandDetailsFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { errors, touched, handleBlur, validateForm } = useFormValidation({
    title: (v) => validateGenericString(v || "", 120, "Title"),
    description: (v) => validateTextarea(v || "", 5000, "Description"),
    city: (v) => validateCityState(v || "", "City"),
    state: (v) => validateCityState(v || "", "State"),
    budget: (v) => validateGenericString(String(v || ""), 20, "Budget"),
    contactInfo: (v) => validateGenericString(v || "", 150, "Contact Info"),
    youtubeLink: (v) => validateGenericString(v || "", 200, "YouTube Link", false),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewGalleryFiles((prev) => {
        const combined = [...prev, ...files];
        if (existingGallery.length + combined.length > 5) {
          toast.error("You can upload up to 5 gallery images in total.");
          return combined.slice(0, 5 - existingGallery.length);
        }
        return combined;
      });
    }
  };

  const removeNewImage = (index: number) => {
    setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingGallery((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className='w-full  bg-white p-6 rounded-md shadow-sm'>
      <h2 className='text-[#2a3a4a] text-3xl font-extrabold'>Errand Details</h2>

      <form className='mt-6 flex flex-col gap-4' onSubmit={(e) => { e.preventDefault(); if(validateForm(formData as any)) onSubmit(); }}>
        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Errand Title
          </span>
          <input
            type='text'
            required
            value={formData.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder='Enter errand title...'
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        {/* Category Dropdown (Synchronized with Sidebar) */}
        <label className='flex flex-col gap-1.5 relative'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Select Errand Category
          </span>
          <div className="relative">
            <select
              required
              value={formData.categoryId || ""}
              onChange={(e) => onChange("categoryId", e.target.value)}
              className='w-full h-11 appearance-none rounded-md border border-gray-200 pl-3 pr-10 text-sm outline-none focus:border-[#1b539c] transition-colors bg-white'
            >
              <option value="" disabled>Choose a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.iconType === "emoji" ? `${cat.icon} ` : ""}{cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <ChevronDown size={16} />
            </div>
          </div>
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Description
          </span>
          <textarea
            required
            value={formData.description || ""}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder='Describe your errand in detail...'
            className='min-h-28 rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#1b539c] transition-colors resize-none'
          />
        </label>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <label className='flex flex-col gap-1.5'>
            <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
              State
            </span>
            <StateDropdown
              required
              value={formData.state || ""}
              onChange={(e) => {
                onChange("state", e.target.value);
                onChange("city", "");
              }}
              className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
            />
          </label>
          <label className='flex flex-col gap-1.5'>
            <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
              City
            </span>
            <CityDropdown
              required
              stateName={formData.state || ""}
              value={formData.city || ""}
              onChange={(e) => onChange("city", e.target.value)}
              className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
            />
          </label>
        </div>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Your Budget ($)
          </span>
          <input
            type='number'
            required
            value={formData.budget || ""}
            onChange={(e) => onChange("budget", e.target.value)}
            placeholder='e.g. 25'
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Date Needed
          </span>
          <input
            type='date'
            required
            value={formData.dateNeeded || ""}
            onChange={(e) => onChange("dateNeeded", e.target.value)}
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Contact Info
          </span>
          <input
            type='text'
            required
            value={formData.contactInfo || ""}
            onChange={(e) => onChange("contactInfo", e.target.value)}
            placeholder='Phone or email'
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5'>
            <PlayCircle size={14} className="text-red-500" /> YouTube Video Link (Optional)
          </span>
          <input
            type='url'
            value={formData.youtubeLink || ""}
            onChange={(e) => onChange("youtubeLink", e.target.value)}
            placeholder='https://www.youtube.com/watch?v=...'
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        <div className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Portfolio Gallery (Max 5 images)
          </span>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className='border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#1b539c] transition-colors bg-gray-50'
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple 
              accept="image/*"
              className='hidden' 
            />
            <Upload className='w-8 h-8 text-gray-400 mb-2' />
            <p className='text-sm text-gray-500 font-medium'>Click to upload images</p>
            <p className='text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider'>Max 5 files total</p>
          </div>

          {(existingGallery.length > 0 || newGalleryFiles.length > 0) && (
            <div className='flex flex-wrap gap-2 mt-2'>
              {/* Existing Images */}
              {existingGallery.map((url, index) => (
                <div key={`existing-${index}`} className='relative w-16 h-16 rounded-md overflow-hidden border border-gray-200'>
                  <img 
                    src={getImageUrl(url)} 
                    alt="existing preview" 
                    className='w-full h-full object-cover'
                  />
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeExistingImage(index); }}
                    className='absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-md flex items-center justify-center'
                  >
                    <X className='w-3 h-3' />
                  </button>
                </div>
              ))}
              {/* New Images */}
              {newGalleryFiles.map((file, index) => (
                <div key={`new-${index}`} className='relative w-16 h-16 rounded-md overflow-hidden border border-gray-200'>
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="new preview" 
                    className='w-full h-full object-cover'
                  />
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeNewImage(index); }}
                    className='absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-md flex items-center justify-center'
                  >
                    <X className='w-3 h-3' />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-2 h-12 rounded-md bg-[#f27b2a] text-white text-sm font-bold tracking-wide uppercase hover:bg-orange-600 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'>
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </>
          ) : (
            formData.id ? "Update Errand" : "Post Errand"
          )}
        </button>
      </form>
    </section>
  );
};

export default ErrandDetailsForm;
