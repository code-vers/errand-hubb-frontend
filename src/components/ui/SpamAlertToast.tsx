import { toast } from "sonner";

export const showSpamAlert = (successMessage?: string) => {
  toast.custom(
    (t) => (
      <div className="flex flex-col gap-2 w-full">
        {successMessage && (
          <div className="bg-white border border-gray-200 shadow-md rounded-lg p-4 flex items-center gap-3 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-800">{successMessage}</span>
          </div>
        )}
        <div 
          onClick={() => toast.dismiss(t)}
          className="bg-[#d93025] text-white p-4 md:p-5 font-bold text-center uppercase tracking-wide shadow-lg rounded-sm cursor-pointer w-full text-base leading-relaxed border border-red-800"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          IF YOU DO NOT SEE A<br />VERIFICATION EMAIL,<br />PLEASE CHECK YOUR<br />SPAM FOLDER
        </div>
      </div>
    ),
    { duration: 15000 }
  );
};
