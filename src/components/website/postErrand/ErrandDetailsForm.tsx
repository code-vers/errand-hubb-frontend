import { CityDropdown, StateDropdown } from '@/components/shared/StateCityDropdown';
import { getImageUrl } from '@/configs/api.config';
import { useFormValidation } from '@/hooks/useFormValidation';
import { validateCityState, validateGenericString, validateTextarea, validateBudget } from '@/lib/validation';
import { Category } from '@/types/categories';
import { Errand } from '@/types/errand';
import { ChevronDown, Loader2, PlayCircle, Upload, X } from 'lucide-react';
import { useRef } from 'react';
import { toast } from 'sonner';

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
    title: (v) => validateGenericString(v || '', 120, 'Title'),
    description: (v) => validateTextarea(v || '', 2000, 'Description'),
    city: (v) => validateCityState(v || '', 'City'),
    state: (v) => validateCityState(v || '', 'State'),
    budget: (v) => validateBudget(v || '', true),
    contactInfo: (v) => validateGenericString(v || '', 150, 'Contact Info'),
    youtubeLink: (v) => validateGenericString(v || '', 200, 'YouTube Link', false),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setNewGalleryFiles((prev) => {
        const combined = [...prev, ...files];
        if (existingGallery.length + combined.length > 5) {
          toast.error('You can upload up to 5 gallery images in total.');
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

      <form
        className='mt-6 flex flex-col gap-4'
        onSubmit={(e) => {
          e.preventDefault();
          const isValid = validateForm(formData as any);
          if (isValid) {
            onSubmit();
          } else {
            const desc = (formData.description || '').trim();
            if (desc.length > 2000) {
              toast.error('Description cannot exceed 2000 characters.');
            } else if (errors.description) {
              toast.error(errors.description);
            } else {
              const firstErr = Object.values(errors).find((err) => Boolean(err));
              toast.error(firstErr || 'Please fill out all required fields correctly.');
            }
          }
        }}
      >
        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Errand Title
          </span>
          <input
            type='text'
            required
            value={formData.title || ''}
            onChange={(e) => onChange('title', e.target.value)}
            onBlur={() => handleBlur('title', formData.title || '')}
            placeholder='Enter errand title...'
            className={`h-11 rounded-md border px-3 text-sm outline-none transition-colors ${
              errors.title && touched.title ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-[#1b539c]'
            }`}
          />
          {errors.title && touched.title && (
            <span className='text-xs text-red-500 font-semibold'>{errors.title}</span>
          )}
        </label>

        {/* Category Dropdown (Synchronized with Sidebar) */}
        <label className='flex flex-col gap-1.5 relative'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Select Errand Category
          </span>
          <div className='relative'>
            <select
              required
              value={formData.categoryId || ''}
              onChange={(e) => onChange('categoryId', e.target.value)}
              className='w-full h-11 appearance-none rounded-md border border-gray-200 pl-3 pr-10 text-sm outline-none focus:border-[#1b539c] transition-colors bg-white'
            >
              <option value='' disabled>
                Choose a category...
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.iconType === 'emoji' ? `${cat.icon} ` : ''}
                  {cat.name}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'>
              <ChevronDown size={16} />
            </div>
          </div>
        </label>

        {formData.id && (
          <label className='flex flex-col gap-1.5 relative'>
            <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
              Visibility (Active/Inactive)
            </span>
            <div className='relative'>
              <select
                required
                value={formData.postState || 'active'}
                onChange={(e) => onChange('postState', e.target.value)}
                className='w-full h-11 appearance-none rounded-md border border-gray-200 pl-3 pr-10 text-sm outline-none focus:border-[#1b539c] transition-colors bg-white'
              >
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
                <option value='closed'>Closed</option>
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'>
                <ChevronDown size={16} />
              </div>
            </div>
          </label>
        )}

        <label className='flex flex-col gap-1.5 relative'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Errand Progress Status
          </span>
          <div className='relative'>
            <select
              required
              value={
                formData.status === 'active'
                  ? 'Pending Pickup'
                  : formData.status || 'Pending Pickup'
              }
              onChange={(e) => onChange('status', e.target.value)}
              className='w-full h-11 appearance-none rounded-md border border-gray-200 pl-3 pr-10 text-sm outline-none focus:border-[#1b539c] transition-colors bg-white'
            >
              <option value='Pending Pickup'>Pending Pickup</option>
              <option value='ASAP'>ASAP</option>
              <option value='Scheduled'>Scheduled</option>
              <option value='In Progress'>In Progress</option>
              <option value='Completed'>Completed</option>
              <option value='Cancelled'>Cancelled</option>
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500'>
              <ChevronDown size={16} />
            </div>
          </div>
        </label>

        <label className='flex flex-col gap-1.5'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
              Description
            </span>
            <span
              className={`text-[11px] font-bold ${
                (formData.description?.length || 0) > 2000
                  ? 'text-red-500 font-extrabold'
                  : 'text-gray-400'
              }`}>
              {formData.description?.length || 0} / 2000 characters
            </span>
          </div>
          <textarea
            required
            value={formData.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            onBlur={() => handleBlur('description', formData.description || '')}
            placeholder='Describe your errand in detail...'
            className={`min-h-28 rounded-md border px-3 py-2 text-sm outline-none transition-colors resize-none ${
              errors.description && touched.description
                ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                : 'border-gray-200 focus:border-[#1b539c]'
            }`}
          />
          {errors.description && touched.description && (
            <span className='text-xs text-red-500 font-semibold mt-0.5'>
              {errors.description}
            </span>
          )}
        </label>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
          <label className='flex flex-col gap-1.5'>
            <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>State</span>
            <StateDropdown
              required
              value={formData.state || ''}
              onChange={(e) => {
                onChange('state', e.target.value);
                onChange('city', '');
              }}
              className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
            />
          </label>
          <label className='flex flex-col gap-1.5'>
            <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>City</span>
            <CityDropdown
              required
              stateName={formData.state || ''}
              value={formData.city || ''}
              onChange={(e) => onChange('city', e.target.value)}
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
            min='0'
            value={formData.budget || ''}
            onChange={(e) => onChange('budget', e.target.value)}
            onBlur={() => handleBlur('budget', formData.budget || '')}
            placeholder='e.g. 25'
            className={`h-11 rounded-md border px-3 text-sm outline-none transition-colors ${
              errors.budget && touched.budget ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-[#1b539c]'
            }`}
          />
          {errors.budget && touched.budget && (
            <span className='text-xs text-red-500 font-semibold'>{errors.budget}</span>
          )}
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Date Needed
          </span>
          <input
            type='date'
            required
            min={new Date().toISOString().split('T')[0]}
            value={formData.dateNeeded || ''}
            onChange={(e) => onChange('dateNeeded', e.target.value)}
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
            value={formData.contactInfo || ''}
            onChange={(e) => onChange('contactInfo', e.target.value)}
            onBlur={() => handleBlur('contactInfo', formData.contactInfo || '')}
            placeholder='Phone or email'
            className={`h-11 rounded-md border px-3 text-sm outline-none transition-colors ${
              errors.contactInfo && touched.contactInfo ? 'border-red-400 bg-red-50/20' : 'border-gray-200 focus:border-[#1b539c]'
            }`}
          />
          {errors.contactInfo && touched.contactInfo && (
            <span className='text-xs text-red-500 font-semibold'>{errors.contactInfo}</span>
          )}
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide flex items-center gap-1.5'>
            <PlayCircle size={14} className='text-red-500' /> YouTube Video Link (Optional)
          </span>
          <input
            type='url'
            value={formData.youtubeLink || ''}
            onChange={(e) => onChange('youtubeLink', e.target.value)}
            placeholder='https://www.youtube.com/watch?v=...'
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        <div className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            UPLOAD PHOTOS OF ERRAND (OPTIONAL)
          </span>
          <div
            onClick={() => fileInputRef.current?.click()}
            className='border-2 border-dashed border-gray-200 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-[#1b539c] transition-colors bg-gray-50'
          >
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept='image/*'
              className='hidden'
            />
            <Upload className='w-8 h-8 text-gray-400 mb-2' />
            <p className='text-sm text-gray-500 font-medium'>Click to upload images</p>
            <p className='text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider'>
              Max 5 files total
            </p>
          </div>

          {(existingGallery.length > 0 || newGalleryFiles.length > 0) && (
            <div className='flex flex-wrap gap-2 mt-2'>
              {/* Existing Images */}
              {existingGallery.map((url, index) => (
                <div
                  key={`existing-${index}`}
                  className='relative w-16 h-16 rounded-md overflow-hidden border border-gray-200'
                >
                  <img
                    src={getImageUrl(url)}
                    alt='existing preview'
                    className='w-full h-full object-cover'
                  />
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeExistingImage(index);
                    }}
                    className='absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl-md flex items-center justify-center'
                  >
                    <X className='w-3 h-3' />
                  </button>
                </div>
              ))}
              {/* New Images */}
              {newGalleryFiles.map((file, index) => (
                <div
                  key={`new-${index}`}
                  className='relative w-16 h-16 rounded-md overflow-hidden border border-gray-200'
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt='new preview'
                    className='w-full h-full object-cover'
                  />
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNewImage(index);
                    }}
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
          className='mt-2 h-12 rounded-md bg-[#f27b2a] text-white text-sm font-bold tracking-wide uppercase hover:bg-orange-600 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='w-5 h-5 animate-spin' />
              Processing...
            </>
          ) : formData.id ? (
            'Update Errand'
          ) : (
            'Post Errand'
          )}
        </button>
      </form>
    </section>
  );
};

export default ErrandDetailsForm;
