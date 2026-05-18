import { ErrandType } from "@/types/errand";

const ERRAND_TYPES: ErrandType[] = [
  { label: "Grocery", icon: "🛒" },
  { label: "Delivery", icon: "📦" },
  { label: "Pharmacy", icon: "💊" },
  { label: "Laundry", icon: "🧺" },
  { label: "Transport", icon: "🚗" },
  { label: "Pet Care", icon: "🐾" },
  { label: "Documents", icon: "📄" },
  { label: "Food", icon: "🍔" },
  { label: "Handyman", icon: "🧰" },
  { label: "Shopping", icon: "🛍️" },
  { label: "Wait in Line", icon: "🧍" },
  { label: "Mail", icon: "📮" },
];

interface ErrandTypePickerProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

const ErrandTypePicker = ({ selectedType, onSelect }: ErrandTypePickerProps) => {
  return (
    <aside className='w-full  bg-white p-4 rounded-md shadow-sm'>
      <h3 className='text-[#2a3a4a] text-xs font-extrabold uppercase tracking-wide'>
        Choose Errand Type
      </h3>

      <div className='mt-4 grid grid-cols-3 gap-2.5'>
        {ERRAND_TYPES.map((item) => {
          const isSelected = selectedType === item.label;
          return (
            <button
              key={item.label}
              type='button'
              onClick={() => onSelect(item.label)}
              className={`h-20 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 border-2 ${
                isSelected 
                  ? "bg-blue-50 border-[#1b539c] scale-[1.02] shadow-md" 
                  : "bg-[#efefef] border-transparent hover:bg-[#e5e5e5] hover:border-gray-200"
              }`}>
              <span className={`text-lg leading-none transition-transform ${isSelected ? "scale-125" : ""}`}>
                {item.icon}
              </span>
              <span className={`text-[10px] font-semibold text-center leading-tight ${isSelected ? "text-[#1b539c]" : "text-gray-600"}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default ErrandTypePicker;
