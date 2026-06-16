"use client";
import { useState, useEffect } from "react";
import FilterSearching from "./FilterSearching";
import SearchResult from "./SearchResult";
import { SearchFilters } from "@/types/search";
import Pagination from "@/components/common/Pagination";
import { Loader2 } from "lucide-react";
import { useAllErrands } from "@/hooks/useProfile";

const SearchPage = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    categoryId: "all",
    location: "",
    minBudget: "",
    maxBudget: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data: allErrands, isLoading } = useAllErrands();
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (!allErrands) {
      setFilteredData([]);
      return;
    }

    let result = [...allErrands];

    // 1. Search filter (Name, Bio, Services)
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((user: any) => {
        const name = `${user.firstName} ${user.lastName}`.toLowerCase();
        const bio = (user.profile?.bio || "").toLowerCase();
        const services = (user.profile?.services || "").toLowerCase();
        const postTitle = (user.posts?.[0]?.title || "").toLowerCase();
        return name.includes(q) || bio.includes(q) || services.includes(q) || postTitle.includes(q);
      });
    }

    // 2. Location filter
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter((user: any) => {
        const city = (user.profile?.city || "").toLowerCase();
        const state = (user.profile?.state || "").toLowerCase();
        return city.includes(loc) || state.includes(loc);
      });
    }

    // 3. Budget filter
    if (filters.minBudget) {
      const min = parseFloat(filters.minBudget);
      result = result.filter((user: any) => {
        const rate = parseFloat(user.profile?.ratePerHour || "0");
        return rate >= min;
      });
    }
    if (filters.maxBudget) {
      const max = parseFloat(filters.maxBudget);
      result = result.filter((user: any) => {
        const rate = parseFloat(user.profile?.ratePerHour || "99999");
        return rate <= max;
      });
    }

    // Convert User data into the shape SearchResult expects (a mock "Post")
    const mappedToPosts = result.map((user: any) => {
      const latestPost = user.posts?.[0];
      const profile = user.profile;
      
      const youtubeLink = (latestPost?.youtubeLink || latestPost?.youtube_link || profile?.youtubeLink || profile?.youtube_link || "").trim();

      return {
        id: user.id,
        title: latestPost?.title || `${user.firstName} ${user.lastName}`,
        description: profile?.bio || latestPost?.description || "Available for Errands",
        city: profile?.city || "Unknown City",
        state: profile?.state || "",
        budget: profile?.ratePerHour || latestPost?.budget || null,
        youtubeLink: typeof youtubeLink === 'string' ? youtubeLink.trim() : "",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          profileImage: user.profileImage,
        },
        category: {
          name: profile?.services ? profile.services.split(',')[0].trim() : "General Errands"
        }
      };
    });

    setFilteredData(mappedToPosts);
  }, [allErrands, filters]);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  // Frontend Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / limit) || 1;
  const paginatedData = filteredData.slice((page - 1) * limit, page * limit);

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

            <SearchResult posts={paginatedData} />

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
