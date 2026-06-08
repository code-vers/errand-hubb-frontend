import { Errand } from "@/types/errand";
import { useRef, useState } from "react";
import { Upload, X, Loader2, PlayCircle } from "lucide-react";

interface ErrandDetailsFormProps {
  formData: Errand;
  onChange: (field: keyof Errand, value: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

const ErrandDetailsForm = ({ formData, onChange, onSubmit, isSubmitting }: ErrandDetailsFormProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className='w-full  bg-white p-6 rounded-md shadow-sm'>
      <h2 className='text-[#2a3a4a] text-3xl font-extrabold'>Errand Details</h2>

      <form className='mt-6 flex flex-col gap-4' onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
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
              City
            </span>
            <input
              type='text'
              required
              value={formData.city || ""}
              onChange={(e) => onChange("city", e.target.value)}
              placeholder='City'
              className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
            />
          </label>
          <label className='flex flex-col gap-1.5'>
            <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
              State
            </span>
            <input
              type='text'
              required
              value={formData.state || ""}
              onChange={(e) => onChange("state", e.target.value)}
              placeholder='State'
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
            Upload Photos
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
            <p className='text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider'>Max 5 files</p>
          </div>

          {selectedImages.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-2'>
              {selectedImages.map((file, index) => (
                <div key={index} className='relative w-16 h-16 rounded-md overflow-hidden border border-gray-200'>
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt="preview" 
                    className='w-full h-full object-cover'
                  />
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                    className='absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-md'
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
