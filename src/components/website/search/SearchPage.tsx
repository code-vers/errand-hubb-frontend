"use client";
import { useState } from "react";
import FilterSearching from "./FilterSearching";
import SearchResult from "./SearchResult";
import { ErrandRunner, SearchFilters } from "@/types/search";

const mockErrandrs: ErrandRunner[] = [
  {
    id: 1,
    name: "Jessica M.",
    location: "Los Angeles, CA",
    bio: "Reliable and friendly errand runner available for grocery shopping, deliveries, and general errands throughout LA.",
    tags: ["Grocery", "Delivery", "Pet Care"],
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    videoThumb:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=52&fit=crop",
  },
  {
    id: 2,
    name: "Marcus T.",
    location: "Beverly Hills, CA",
    bio: "Experienced mover and handyman. Available for deliveries, moving help, and household tasks on short notice.",
    tags: ["Moving", "Handyman", "Delivery"],
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    videoThumb:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=80&h=52&fit=crop",
  },
  {
    id: 3,
    name: "Sandra R.",
    location: "Santa Monica, CA",
    bio: "Admin support, scheduling, and general errands. Great with pets and happy to help seniors with daily tasks.",
    tags: ["Admin", "Scheduling", "Seniors"],
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    videoThumb:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=80&h=52&fit=crop",
  },
  {
    id: 4,
    name: "Derek W.",
    location: "Culver City, CA",
    bio: "Fast and dependable. Specializes in pharmacy pickups, grocery runs, and package drop-offs same day.",
    tags: ["Pharmacy", "Grocery", "Packages"],
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    videoThumb:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=80&h=52&fit=crop",
  },
];

const SearchPage = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    errandType: "All Errands",
    city: "",
    state: "All States",
  });

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    // In a real app, you would fetch data here based on filters
    console.log("Searching with filters:", newFilters);
  };

  return (
    <div className='bg-[#f4f5f7] min-h-screen py-8'>
      <div className='max-w-385 mx-auto px-4 flex flex-col gap-8'>
        <FilterSearching onSearch={handleSearch} initialFilters={filters} />
        <SearchResult errandrs={mockErrandrs} />
      </div>
    </div>
  );
};

export default SearchPage;
