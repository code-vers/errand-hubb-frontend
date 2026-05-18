import { Errand } from "@/types/errand";

interface ErrandDetailsFormProps {
  formData: Errand;
  onChange: (field: keyof Errand, value: string) => void;
  onSubmit: () => void;
}

const ErrandDetailsForm = ({ formData, onChange, onSubmit }: ErrandDetailsFormProps) => {
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
            type='text'
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
            type='text'
            value={formData.dateNeeded || ""}
            onChange={(e) => onChange("dateNeeded", e.target.value)}
            placeholder='MM/DD/YYYY'
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Contact Info
          </span>
          <input
            type='text'
            value={formData.contactInfo || ""}
            onChange={(e) => onChange("contactInfo", e.target.value)}
            placeholder='Phone or email'
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        <label className='flex flex-col gap-1.5'>
          <span className='text-gray-600 text-xs font-bold uppercase tracking-wide'>
            Photo URL
          </span>
          <input
            type='text'
            value={formData.photoUrl || ""}
            onChange={(e) => onChange("photoUrl", e.target.value)}
            placeholder='https://...'
            className='h-11 rounded-md border border-gray-200 px-3 text-sm outline-none focus:border-[#1b539c] transition-colors'
          />
        </label>

        <button
          type='submit'
          className='mt-2 h-12 rounded-md bg-[#f27b2a] text-white text-sm font-bold tracking-wide uppercase hover:bg-orange-600 active:scale-95 transition-all shadow-sm'>
          Post Errand
        </button>
      </form>
    </section>
  );
};

export default ErrandDetailsForm;
