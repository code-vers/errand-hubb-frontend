"use client";
import { useState, useMemo } from "react";
import FilterSearching from "./FilterSearching";
import SearchResult from "./SearchResult";
import { SearchFilters, Post } from "@/types/search";
import Pagination from "@/components/common/Pagination";
import { Loader2 } from "lucide-react";

const STATIC_POSTS: Post[] = [
  {
    "id": "4fded1f3-13a2-4d21-ad04-a9718138d523",
    "title": "Sandra R.",
    "description": "I am new Post Errand.",
    "city": "USA",
    "state": "New York",
    "budget": "14",
    "dateNeeded": "2026-06-20T00:00:00.000Z",
    "contactInfo": "sandra@gmail.com",
    "photoUrl": "",
    "status": "active",
    "createdAt": "2026-06-16T06:47:30.083Z",
    "youtubeLink": "https://www.youtube.com/watch?v=4b96HkmtbY8",
    "time": null,
    "category": {
      "id": "7973dcf1-5c54-4552-bafa-3b40c7a4206e",
      "name": "Personal Transport",
      "description": "Safe and reliable transport for you or your important items.",
      "icon": "🚗",
      "iconType": "emoji",
      "color": "#10b981",
      "status": "active"
    },
    "user": {
      "id": "4aa467ed-7f87-4c9e-9df9-b07f13f3ba24",
      "firstName": "Sandra ",
      "lastName": "International",
      "profileImage": "/media/profiles/profileImage-1781592364967-715941532.png",
      "profile": {
  "gallery": [
          "/media/profiles/gallery-1782111383937-276082902.png",
          "/media/profiles/gallery-1782111383938-668943295.png",
          "/media/profiles/gallery-1782111383938-507978134.png"
        ]
      }
    }
  },
  {
    "id": "41e986b6-4c29-47ad-bf25-c4923542b621",
    "title": "Marcus T.",
    "description": "This is Post Errand Post.",
    "city": "USA",
    "state": "New York",
    "budget": "12",
    "dateNeeded": "2026-06-20T00:00:00.000Z",
    "contactInfo": "marcus@gmail.com",
    "photoUrl": "",
    "status": "active",
    "createdAt": "2026-06-16T06:45:00.223Z",
    "youtubeLink": "https://www.youtube.com/watch?v=4b96HkmtbY8",
    "time": null,
    "category": {
      "id": "ee522b07-c43e-4136-bcac-bba637a47928",
      "name": "Grocery Shopping",
      "description": "Get your groceries delivered to your doorstep without any hassle.",
      "icon": "🛒",
      "iconType": "emoji",
      "color": "#ec6f27",
      "status": "active"
    },
    "user": {
      "id": "90f5307d-56ad-4ee1-ade9-cf7996423ba8",
      "firstName": "Marcus ",
      "lastName": "T.",
      "profileImage": "/media/profiles/profileImage-1781592196817-653585337.png",
      "profile": {
     "gallery": [
          "/media/profiles/gallery-1782111383937-276082902.png",
          "/media/profiles/gallery-1782111383938-668943295.png",
          "/media/profiles/gallery-1782111383938-507978134.png"
        ]
      }
    }
  },
  {
    "id": "8dd6b938-a796-4c78-b0e6-cc3355b92e06",
    "title": "Jasica M.",
    "description": "This is First Errand Post.",
    "city": "Dhaka",
    "state": "USA",
    "budget": "55",
    "dateNeeded": "2026-06-20T00:00:00.000Z",
    "contactInfo": "jasica@gmail.com",
    "photoUrl": "",
    "status": "active",
    "createdAt": "2026-06-16T05:54:34.642Z",
    "youtubeLink": "https://www.youtube.com/watch?v=4b96HkmtbY8",
    "time": null,
    "category": {
      "id": "eb85c380-73a9-463e-b8f4-708c3140fac9",
      "name": "Food Pickup",
      "description": "Your favorite meals from any restaurant delivered hot.",
      "icon": "🍔",
      "iconType": "emoji",
      "color": "#f59e0b",
      "status": "active"
    },
    "user": {
      "id": "229b5139-650f-4b66-b353-1ae7ef69783f",
      "firstName": "Jessica M.",
      "lastName": "Marla",
      "profileImage": "/media/profiles/profileImage-1781589150443-158812124.png",
      "profile": {
        "gallery": [
          "/media/profiles/gallery-1782111383937-276082902.png",
          "/media/profiles/gallery-1782111383938-668943295.png",
          "/media/profiles/gallery-1782111383938-507978134.png"
        ]
      }
    }
  }
];

const SearchPage = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    categoryId: "all",
    location: "",
    minBudget: "",
    maxBudget: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    workerName: "",
    workerEmail: "",
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (newFilters: SearchFilters) => {
    setIsLoading(true);
    setFilters(newFilters);
    setPage(1);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const filteredPosts = useMemo(() => {
    let result = [...STATIC_POSTS];

    // Search Keyword
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchLower) ||
          post.description.toLowerCase().includes(searchLower) ||
          post.category.name.toLowerCase().includes(searchLower) ||
          post.city.toLowerCase().includes(searchLower) ||
          post.state.toLowerCase().includes(searchLower)
      );
    }

    // Category Filter
    if (filters.categoryId && filters.categoryId !== "all") {
      result = result.filter((post) => post.category.id === filters.categoryId);
    }

    // Location Filter
    if (filters.location) {
      const locLower = filters.location.toLowerCase();
      result = result.filter(
        (post) =>
          post.city.toLowerCase().includes(locLower) ||
          post.state.toLowerCase().includes(locLower)
      );
    }

    // Worker Name Filter
    if (filters.workerName) {
      const nameLower = filters.workerName.toLowerCase();
      result = result.filter(
        (post) =>
          post.user.firstName.toLowerCase().includes(nameLower) ||
          post.user.lastName.toLowerCase().includes(nameLower)
      );
    }

    // Worker Email Filter
    if (filters.workerEmail) {
      const emailLower = filters.workerEmail.toLowerCase();
      result = result.filter(
        (post) =>
          post.contactInfo && post.contactInfo.toLowerCase().includes(emailLower)
      );
    }

    // Budget Min Filter
    if (filters.minBudget) {
      const min = parseFloat(filters.minBudget);
      if (!isNaN(min)) {
        result = result.filter(
          (post) => post.budget && parseFloat(post.budget) >= min
        );
      }
    }

    // Budget Max Filter
    if (filters.maxBudget) {
      const max = parseFloat(filters.maxBudget);
      if (!isNaN(max)) {
        result = result.filter(
          (post) => post.budget && parseFloat(post.budget) <= max
        );
      }
    }

    // Sorting
    result.sort((a, b) => {
      if (filters.sortBy === "budget") {
        const budgetA = parseFloat(a.budget || "0");
        const budgetB = parseFloat(b.budget || "0");
        return filters.sortOrder === "asc" ? budgetA - budgetB : budgetB - budgetA;
      }
      // Default: createdAt
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return filters.sortOrder === "asc" ? timeA - timeB : timeB - timeA;
    });

    return result;
  }, [filters]);

  const limit = 10;
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const startIndex = (page - 1) * limit;
  const posts = useMemo(() => {
    return filteredPosts.slice(startIndex, startIndex + limit);
  }, [filteredPosts, startIndex]);

  return (
    <div className='bg-[#f4f5f7] min-h-screen pt-12 pb-8'>
      <div className='max-w-7xl mx-auto px-4 flex flex-col gap-8'>
        <FilterSearching onSearch={handleSearch} initialFilters={filters} />

        {isLoading ? (
          <div className='flex justify-center items-center py-20'>
            <Loader2 className='w-10 h-10 animate-spin text-primary' />
          </div>
        ) : (
          <>
            <div className='flex justify-between items-center px-2'>
              <h2 className='text-xl font-bold text-gray-800'>
                {totalItems} Errands Found
              </h2>
            </div>

            <SearchResult posts={posts} />

            {totalPages > 1 && (
              <div className='mt-8'>
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
