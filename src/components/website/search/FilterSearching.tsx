"use client";
import { SearchFilters } from "@/types/search";
import { useState, useEffect } from "react";
import { categoryService } from "@/services/category.service";
import { Category } from "@/types/categories";
import { Filter, ChevronDown, ChevronUp } from "lucide-react";

const STATIC_CATEGORIES: Category[] = [
  { id: "ee522b07-c43e-4136-bcac-bba637a47928", name: "Grocery Shopping", icon: "🛒", iconType: "emoji", color: "#ec6f27", description: "Get your groceries delivered to your doorstep without any hassle.", status: "active" },
  { id: "fast-delivery-id", name: "Fast Delivery", icon: "📦", iconType: "emoji", color: "#3b82f6", description: "Swift and secure delivery of your packages anywhere in the city.", status: "active" },
  { id: "pharmacy-pickup-id", name: "Pharmacy Pickup", icon: "💊", iconType: "emoji", color: "#ef4444", description: "We'll pick up your prescriptions and health essentials for you.", status: "active" },
  { id: "laundry-services-id", name: "Laundry Services", icon: "🧺", iconType: "emoji", color: "#8b5cf6", description: "Professional laundry pickup and delivery at your convenience.", status: "active" },
  { id: "7973dcf1-5c54-4552-bafa-3b40c7a4206e", name: "Personal Transport", icon: "🚗", iconType: "emoji", color: "#10b981", description: "Safe and reliable transport for you or your important items.", status: "active" },
  { id: "pet-care-id", name: "Pet Care", icon: "🐾", iconType: "emoji", color: "#ec4899", description: "Walking, feeding, and caring for your furry friends.", status: "active" },
  { id: "document-handling-id", name: "Document Handling", icon: "📄", iconType: "emoji", color: "#6b7280", description: "Safe transport and filing of your important documents.", status: "active" },
  { id: "eb85c380-73a9-463e-b8f4-708c3140fac9", name: "Food Pickup", icon: "🍔", iconType: "emoji", color: "#f59e0b", description: "Your favorite meals from any restaurant delivered hot.", status: "active" },
  { id: "handyman-help-id", name: "Handyman Help", icon: "🧰", iconType: "emoji", color: "#063b5c", description: "Expert help for small repairs and home maintenance tasks.", status: "active" },
  { id: "personal-shopping-id", name: "Personal Shopping", icon: "🛍️", iconType: "emoji", color: "#ec6f27", description: "Someone to do your shopping and finding the best deals.", status: "active" },
  { id: "wait-in-line-id", name: "Wait in Line", icon: "🧍", iconType: "emoji", color: "#3b82f6", description: "We'll wait in line for you at the DMV, concerts, or any event.", status: "active" },
  { id: "mail-post-id", name: "Mail & Post", icon: "📮", iconType: "emoji", color: "#22c55e", description: "Handling your mail, stamps, and post office errands.", status: "active" },
  { id: "plumbing-id", name: "Plumbing", icon: "🔧", iconType: "emoji", color: "#3b82f6", description: "Professional plumbing services and repairs.", status: "active" },
  { id: "electrical-id", name: "Electrical", icon: "⚡", iconType: "emoji", color: "#eab308", description: "Electrical repairs and installations.", status: "active" },
  { id: "hvac-id", name: "HVAC / Heating & Air Conditioning", icon: "❄️", iconType: "emoji", color: "#06b6d4", description: "Heating and cooling system maintenance.", status: "active" },
  { id: "appliance-repair-id", name: "Appliance Repair", icon: "🔌", iconType: "emoji", color: "#64748b", description: "Repair services for home appliances.", status: "active" },
  { id: "handyman-services-id", name: "Handyman Services", icon: "🔨", iconType: "emoji", color: "#d97706", description: "General home repairs and odd jobs.", status: "active" },
  { id: "locksmith-id", name: "Locksmith", icon: "🔑", iconType: "emoji", color: "#f59e0b", description: "Lock installation and unlocking services.", status: "active" },
  { id: "pest-control-id", name: "Pest Control", icon: "🐜", iconType: "emoji", color: "#84cc16", description: "Pest extermination and control services.", status: "active" },
  { id: "roofing-id", name: "Roofing", icon: "🏠", iconType: "emoji", color: "#a16207", description: "Roof repairs and installations.", status: "active" },
  { id: "flooring-id", name: "Flooring", icon: "🪵", iconType: "emoji", color: "#92400e", description: "Flooring installation and repairs.", status: "active" },
  { id: "painting-id", name: "Painting", icon: "🖌️", iconType: "emoji", color: "#3b82f6", description: "Interior and exterior painting services.", status: "active" },
  { id: "drywall-repair-id", name: "Drywall Repair", icon: "🧱", iconType: "emoji", color: "#a8a29e", description: "Drywall installation and repair.", status: "active" },
  { id: "window-installation-repair-id", name: "Window Installation & Repair", icon: "🪟", iconType: "emoji", color: "#38bdf8", description: "Window replacement and repairs.", status: "active" },
  { id: "pressure-washing-id", name: "Pressure Washing", icon: "💦", iconType: "emoji", color: "#0ea5e9", description: "Exterior pressure washing services.", status: "active" },
  { id: "gutter-cleaning-id", name: "Gutter Cleaning", icon: "🍂", iconType: "emoji", color: "#d97706", description: "Professional gutter cleaning.", status: "active" },
  { id: "insulation-id", name: "Insulation", icon: "🌡️", iconType: "emoji", color: "#f97316", description: "Home insulation services.", status: "active" },
  { id: "house-cleaning-id", name: "House Cleaning", icon: "🧹", iconType: "emoji", color: "#14b8a6", description: "General house cleaning services.", status: "active" },
  { id: "deep-cleaning-id", name: "Deep Cleaning", icon: "🧽", iconType: "emoji", color: "#0d9488", description: "Thorough deep cleaning for your home.", status: "active" },
  { id: "move-in-move-out-cleaning-id", name: "Move-In / Move-Out Cleaning", icon: "📦", iconType: "emoji", color: "#6366f1", description: "Cleaning services for moving.", status: "active" },
  { id: "carpet-cleaning-id", name: "Carpet Cleaning", icon: "🧶", iconType: "emoji", color: "#8b5cf6", description: "Professional carpet cleaning.", status: "active" },
  { id: "window-cleaning-id", name: "Window Cleaning", icon: "✨", iconType: "emoji", color: "#38bdf8", description: "Streak-free window cleaning.", status: "active" },
  { id: "office-cleaning-id", name: "Office Cleaning", icon: "🏢", iconType: "emoji", color: "#64748b", description: "Commercial and office cleaning.", status: "active" },
  { id: "junk-removal-id", name: "Junk Removal", icon: "🗑️", iconType: "emoji", color: "#78716c", description: "Removal of unwanted items and junk.", status: "active" },
  { id: "remodeling-id", name: "Remodeling", icon: "🏗️", iconType: "emoji", color: "#f59e0b", description: "Home remodeling and renovation.", status: "active" },
  { id: "general-contracting-id", name: "General Contracting", icon: "👷", iconType: "emoji", color: "#d97706", description: "General contracting services.", status: "active" },
  { id: "kitchen-remodeling-id", name: "Kitchen Remodeling", icon: "🍳", iconType: "emoji", color: "#f97316", description: "Kitchen upgrades and remodeling.", status: "active" },
  { id: "bathroom-remodeling-id", name: "Bathroom Remodeling", icon: "🛁", iconType: "emoji", color: "#06b6d4", description: "Bathroom renovation services.", status: "active" },
  { id: "concrete-work-id", name: "Concrete Work", icon: "🧱", iconType: "emoji", color: "#9ca3af", description: "Concrete pouring and repairs.", status: "active" },
  { id: "framing-id", name: "Framing", icon: "🪵", iconType: "emoji", color: "#92400e", description: "Structural framing services.", status: "active" },
  { id: "masonry-id", name: "Masonry", icon: "🧱", iconType: "emoji", color: "#78716c", description: "Brickwork and masonry.", status: "active" },
  { id: "fence-installation-id", name: "Fence Installation", icon: "🤺", iconType: "emoji", color: "#a16207", description: "Fence building and repairs.", status: "active" },
  { id: "deck-building-id", name: "Deck Building", icon: "🪵", iconType: "emoji", color: "#92400e", description: "Custom deck construction.", status: "active" },
  { id: "landscaping-id", name: "Landscaping", icon: "🌳", iconType: "emoji", color: "#16a34a", description: "Professional landscaping services.", status: "active" },
  { id: "lawn-care-id", name: "Lawn Care", icon: "🌱", iconType: "emoji", color: "#22c55e", description: "Lawn mowing and maintenance.", status: "active" },
  { id: "tree-trimming-id", name: "Tree Trimming", icon: "✂️", iconType: "emoji", color: "#15803d", description: "Tree pruning and removal.", status: "active" },
  { id: "gardening-id", name: "Gardening", icon: "🌷", iconType: "emoji", color: "#ec4899", description: "Garden care and planting.", status: "active" },
  { id: "sprinkler-repair-id", name: "Sprinkler Repair", icon: "🚿", iconType: "emoji", color: "#0ea5e9", description: "Irrigation system repairs.", status: "active" },
  { id: "pool-cleaning-id", name: "Pool Cleaning", icon: "🏊", iconType: "emoji", color: "#0284c7", description: "Swimming pool maintenance.", status: "active" },
  { id: "snow-removal-id", name: "Snow Removal", icon: "❄️", iconType: "emoji", color: "#94a3b8", description: "Snow plowing and clearing.", status: "active" },
  { id: "movers-id", name: "Movers", icon: "🚚", iconType: "emoji", color: "#3b82f6", description: "Professional moving services.", status: "active" },
  { id: "packing-services-id", name: "Packing Services", icon: "📦", iconType: "emoji", color: "#f59e0b", description: "Packing and unpacking assistance.", status: "active" },
  { id: "furniture-assembly-id", name: "Furniture Assembly", icon: "🪑", iconType: "emoji", color: "#8b5cf6", description: "Assembly of flat-pack furniture.", status: "active" },
  { id: "hauling-id", name: "Hauling", icon: "🚛", iconType: "emoji", color: "#64748b", description: "Transporting large items.", status: "active" },
  { id: "delivery-services-id", name: "Delivery Services", icon: "🛵", iconType: "emoji", color: "#10b981", description: "Local delivery services.", status: "active" },
  { id: "towing-id", name: "Towing", icon: "🛻", iconType: "emoji", color: "#dc2626", description: "Vehicle towing services.", status: "active" },
  { id: "auto-repair-id", name: "Auto Repair", icon: "🚘", iconType: "emoji", color: "#dc2626", description: "General auto repair services.", status: "active" },
  { id: "car-detailing-id", name: "Car Detailing", icon: "✨", iconType: "emoji", color: "#38bdf8", description: "Professional car detailing.", status: "active" },
  { id: "mobile-mechanic-id", name: "Mobile Mechanic", icon: "👨‍🔧", iconType: "emoji", color: "#f59e0b", description: "On-the-go auto repairs.", status: "active" },
  { id: "tire-services-id", name: "Tire Services", icon: "🛞", iconType: "emoji", color: "#1f2937", description: "Tire replacement and repair.", status: "active" },
  { id: "oil-change-id", name: "Oil Change", icon: "🛢️", iconType: "emoji", color: "#fb923c", description: "Quick oil change services.", status: "active" },
  { id: "car-wash-id", name: "Car Wash", icon: "🧽", iconType: "emoji", color: "#0ea5e9", description: "Exterior and interior car washing.", status: "active" },
  { id: "hair-stylist-id", name: "Hair Stylist", icon: "💇", iconType: "emoji", color: "#ec4899", description: "Haircutting and styling services.", status: "active" },
  { id: "barber-id", name: "Barber", icon: "💈", iconType: "emoji", color: "#3b82f6", description: "Professional barber services.", status: "active" },
  { id: "makeup-artist-id", name: "Makeup Artist", icon: "💄", iconType: "emoji", color: "#db2777", description: "Makeup for events and occasions.", status: "active" },
  { id: "nail-technician-id", name: "Nail Technician", icon: "💅", iconType: "emoji", color: "#f472b6", description: "Manicure and pedicure services.", status: "active" },
  { id: "massage-therapy-id", name: "Massage Therapy", icon: "💆", iconType: "emoji", color: "#8b5cf6", description: "Relaxing massage therapy.", status: "active" },
  { id: "personal-trainer-id", name: "Personal Trainer", icon: "🏋️", iconType: "emoji", color: "#f97316", description: "Fitness training and coaching.", status: "active" },
  { id: "accounting-bookkeeping-id", name: "Accounting / Bookkeeping", icon: "📊", iconType: "emoji", color: "#10b981", description: "Financial tracking and bookkeeping.", status: "active" },
  { id: "tax-preparation-id", name: "Tax Preparation", icon: "📄", iconType: "emoji", color: "#059669", description: "Assistance with tax filing.", status: "active" },
  { id: "legal-services-id", name: "Legal Services", icon: "⚖️", iconType: "emoji", color: "#1f2937", description: "Legal advice and consultation.", status: "active" },
  { id: "notary-public-id", name: "Notary Public", icon: "🖋️", iconType: "emoji", color: "#475569", description: "Document notarization services.", status: "active" },
  { id: "marketing-services-id", name: "Marketing Services", icon: "📈", iconType: "emoji", color: "#3b82f6", description: "Digital and traditional marketing.", status: "active" },
  { id: "graphic-design-id", name: "Graphic Design", icon: "🎨", iconType: "emoji", color: "#ec4899", description: "Professional graphic design.", status: "active" },
  { id: "printing-services-id", name: "Printing Services", icon: "🖨️", iconType: "emoji", color: "#64748b", description: "Document and material printing.", status: "active" },
  { id: "virtual-assistant-id", name: "Virtual Assistant", icon: "💻", iconType: "emoji", color: "#8b5cf6", description: "Remote administrative support.", status: "active" },
  { id: "computer-repair-id", name: "Computer Repair", icon: "💻", iconType: "emoji", color: "#3b82f6", description: "PC and Mac repair services.", status: "active" },
  { id: "phone-repair-id", name: "Phone Repair", icon: "📱", iconType: "emoji", color: "#2563eb", description: "Smartphone repair and screen replacement.", status: "active" },
  { id: "it-support-id", name: "IT Support", icon: "🖥️", iconType: "emoji", color: "#1d4ed8", description: "Technical support and troubleshooting.", status: "active" },
  { id: "wi-fi-setup-id", name: "Wi-Fi Setup", icon: "📶", iconType: "emoji", color: "#0ea5e9", description: "Network and router setup.", status: "active" },
  { id: "website-design-id", name: "Website Design", icon: "🌐", iconType: "emoji", color: "#8b5cf6", description: "Web development and design.", status: "active" },
  { id: "app-development-id", name: "App Development", icon: "📲", iconType: "emoji", color: "#10b981", description: "Mobile application development.", status: "active" },
  { id: "cybersecurity-id", name: "Cybersecurity", icon: "🔒", iconType: "emoji", color: "#ef4444", description: "Security auditing and protection.", status: "active" },
  { id: "tutoring-id", name: "Tutoring", icon: "📚", iconType: "emoji", color: "#f59e0b", description: "Academic tutoring for all ages.", status: "active" },
  { id: "music-lessons-id", name: "Music Lessons", icon: "🎵", iconType: "emoji", color: "#ec4899", description: "Instrument and vocal lessons.", status: "active" },
  { id: "language-lessons-id", name: "Language Lessons", icon: "🗣️", iconType: "emoji", color: "#3b82f6", description: "Learn a new language.", status: "active" },
  { id: "test-prep-id", name: "Test Prep", icon: "📝", iconType: "emoji", color: "#10b981", description: "Preparation for standardized tests.", status: "active" },
  { id: "driving-lessons-id", name: "Driving Lessons", icon: "🚗", iconType: "emoji", color: "#f97316", description: "Driving instruction and practice.", status: "active" },
  { id: "catering-id", name: "Catering", icon: "🍽️", iconType: "emoji", color: "#f59e0b", description: "Food services for events.", status: "active" },
  { id: "dj-services-id", name: "DJ Services", icon: "🎧", iconType: "emoji", color: "#8b5cf6", description: "Music and entertainment.", status: "active" },
  { id: "photography-id", name: "Photography", icon: "📷", iconType: "emoji", color: "#3b82f6", description: "Professional photography services.", status: "active" },
  { id: "videography-id", name: "Videography", icon: "🎥", iconType: "emoji", color: "#ef4444", description: "Event video recording and editing.", status: "active" },
  { id: "event-planning-id", name: "Event Planning", icon: "📅", iconType: "emoji", color: "#ec4899", description: "Comprehensive event coordination.", status: "active" },
  { id: "party-rentals-id", name: "Party Rentals", icon: "🎈", iconType: "emoji", color: "#10b981", description: "Rental equipment for parties.", status: "active" },
  { id: "security-services-id", name: "Security Services", icon: "🛡️", iconType: "emoji", color: "#1f2937", description: "Event security and crowd control.", status: "active" },
  { id: "dog-walking-id", name: "Dog Walking", icon: "🐕", iconType: "emoji", color: "#10b981", description: "Daily dog walking services.", status: "active" },
  { id: "pet-sitting-id", name: "Pet Sitting", icon: "🐈", iconType: "emoji", color: "#f59e0b", description: "In-home pet care.", status: "active" },
  { id: "grooming-id", name: "Grooming", icon: "✂️", iconType: "emoji", color: "#ec4899", description: "Pet grooming and bathing.", status: "active" },
  { id: "pet-training-id", name: "Pet Training", icon: "🎾", iconType: "emoji", color: "#3b82f6", description: "Obedience and behavior training.", status: "active" },
  { id: "veterinary-services-id", name: "Veterinary Services", icon: "🩺", iconType: "emoji", color: "#ef4444", description: "Medical care for pets.", status: "active" },
  { id: "babysitting-id", name: "Babysitting", icon: "👶", iconType: "emoji", color: "#f472b6", description: "Childcare services.", status: "active" },
  { id: "elder-care-id", name: "Elder Care", icon: "👵", iconType: "emoji", color: "#8b5cf6", description: "Assistance for senior citizens.", status: "active" },
  { id: "companion-care-id", name: "Companion Care", icon: "🤝", iconType: "emoji", color: "#10b981", description: "Companionship for those in need.", status: "active" },
  { id: "house-sitting-id", name: "House Sitting", icon: "🏡", iconType: "emoji", color: "#f59e0b", description: "Home monitoring while you're away.", status: "active" },
  { id: "grocery-delivery-id", name: "Grocery Delivery", icon: "🛒", iconType: "emoji", color: "#ec6f27", description: "Groceries brought to your door.", status: "active" },
  { id: "prescription-pickup-id", name: "Prescription Pickup", icon: "💊", iconType: "emoji", color: "#ef4444", description: "Pharmacy medication pickup.", status: "active" },
  { id: "courier-services-id", name: "Courier Services", icon: "📦", iconType: "emoji", color: "#3b82f6", description: "Package delivery and courier.", status: "active" },
  { id: "food-delivery-id", name: "Food Delivery", icon: "🍔", iconType: "emoji", color: "#f59e0b", description: "Restaurant food delivery.", status: "active" },
  { id: "private-investigator-id", name: "Private Investigator", icon: "🕵️", iconType: "emoji", color: "#1f2937", description: "Private investigation services.", status: "active" },
  { id: "security-guard-services-id", name: "Security Guard Services", icon: "👮", iconType: "emoji", color: "#374151", description: "Personal or property security.", status: "active" },
  { id: "personal-assistant-id", name: "Personal Assistant", icon: "💼", iconType: "emoji", color: "#8b5cf6", description: "Dedicated personal assistance.", status: "active" },
  { id: "concierge-services-id", name: "Concierge Services", icon: "🛎️", iconType: "emoji", color: "#d97706", description: "Premium lifestyle management.", status: "active" },
  { id: "custom-requests-other-id", name: "Custom Requests / Other", icon: "🌟", iconType: "emoji", color: "#6366f1", description: "Any other custom tasks you need.", status: "active" }
];

interface FilterSearchingProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

const FilterSearching = ({
  onSearch,
  initialFilters,
}: FilterSearchingProps) => {
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getActive();
        if (data && data.length > 0) {
          setCategories(data);
        } else {
          setCategories(STATIC_CATEGORIES);
        }
      } catch (error) {
        console.error("Failed to load categories, using fallback static categories", error);
        setCategories(STATIC_CATEGORIES);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearchClick = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const defaultFilters: SearchFilters = {
      search: "",
      categoryId: "all",
      location: "",
      minBudget: "",
      maxBudget: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      workerName: "",
    };
    setFilters(defaultFilters);
    onSearch(defaultFilters);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearchClick();
  };

  return (
    <div className='max-w-7xl mx-auto w-full'>
      <div className='bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden w-full transition-all duration-300'>
        {/* Mobile Toggle Header */}
        <div 
          className='flex md:hidden justify-between items-center cursor-pointer select-none p-4 bg-gray-50 hover:bg-gray-100/50 border-b border-gray-100 transition-colors'
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
        >
          <div className='flex items-center gap-2 text-primary'>
            <Filter size={18} />
            <span className='font-bold text-[13px] uppercase tracking-wider text-gray-700'>Search Filters</span>
          </div>
          {isMobileFilterOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
        </div>

        {/* Filter Content */}
        <form 
          onSubmit={handleSearchSubmit} 
          className={`${isMobileFilterOpen ? 'flex' : 'hidden'} md:flex flex-col p-5 md:p-6 gap-6 w-full`}
        >
          {/* Grid Layout for Fields */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6'>
            
            {/* Keyword Search */}
            <div className='flex flex-col gap-1.5 lg:col-span-2'>
              <label htmlFor='search' className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                What do you need help with?
              </label>
              <input
                id='search'
                type='text'
                placeholder='e.g. Delivery, Cleaning, Tech Support'
                value={filters.search}
                onChange={(e) => handleInputChange("search", e.target.value)}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>

            {/* Category Dropdown */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor='category' className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                Category
              </label>
              <select
                id='category'
                value={filters.categoryId}
                onChange={(e) => handleInputChange("categoryId", e.target.value)}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white cursor-pointer'
              >
                <option value='all'>All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div className='flex flex-col gap-1.5'>
              <label htmlFor='location' className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                Location
              </label>
              <input
                id='location'
                type='text'
                placeholder='City or State...'
                value={filters.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>

            {/* Worker Details */}
            <div className='flex flex-col gap-1.5 lg:col-span-2'>
              <label htmlFor='workerName' className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                Worker Details (Name or Email)
              </label>
              <input
                id='workerName'
                type='text'
                placeholder='e.g. John Smith or john@example.com'
                value={filters.workerName || ""}
                onChange={(e) => handleInputChange("workerName", e.target.value)}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all'
              />
            </div>

            {/* Max Budget Slider */}
            <div className='flex flex-col gap-1.5 justify-center'>
              <label className='text-[11px] font-bold text-[#555555] uppercase tracking-wider flex justify-between items-center'>
                <span>Max Budget</span>
                <span className="text-primary font-extrabold text-[13px]">${filters.maxBudget || "500"}</span>
              </label>
              <div className="h-10 flex items-center px-1">
                <input
                  type='range'
                  min='5'
                  max='500'
                  step='5'
                  value={filters.maxBudget || "500"}
                  onChange={(e) => handleInputChange("maxBudget", e.target.value)}
                  className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary'
                />
              </div>
            </div>

            {/* Sort By Dropdown */}
            <div className='flex flex-col gap-1.5'>
              <label className='text-[11px] font-bold text-[#555555] uppercase tracking-wider'>
                Sort By
              </label>
              <select
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [by, order] = e.target.value.split('-');
                  setFilters((prev) => ({ ...prev, sortBy: by, sortOrder: order as "asc" | "desc" }));
                }}
                className='h-10 w-full border border-gray-200 rounded-lg px-3 text-[13px] text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-white cursor-pointer'
              >
                <option value='createdAt-desc'>Newest First</option>
                <option value='createdAt-asc'>Oldest First</option>
                <option value='budget-desc'>Highest Budget</option>
                <option value='budget-asc'>Lowest Budget</option>
              </select>
            </div>

          </div>

          {/* Action Buttons */}
          <div className='flex justify-end gap-3 pt-5 border-t border-gray-100 mt-2'>
            <button
              type='button'
              onClick={handleReset}
              className='h-10 px-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 font-bold text-[12px] uppercase tracking-wider rounded-lg transition-all duration-200'
            >
              Reset
            </button>
            <button
              type='submit'
              className='h-10 px-8 bg-primary hover:bg-primary/95 active:scale-[0.98] text-white font-bold text-[12px] uppercase tracking-wider rounded-lg transition-all duration-200 shadow-md shadow-primary/20'
            >
              Search Errands
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FilterSearching;
