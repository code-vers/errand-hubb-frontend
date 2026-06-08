import { Post } from "@/types/search";
import { MapPin, FolderX } from "lucide-react";
import Image from "next/image";
import icon from "../../../../public/icon.svg";

interface SearchResultProps {
  posts: Post[];
}

const SearchResult = ({ posts }: SearchResultProps) => {
  if (posts.length === 0) {
    return (
      <div className='text-center py-20 bg-white rounded-[10px] shadow-sm'>
        <FolderX
          className='mx-auto h-16 w-16 text-gray-300 mb-4'
          strokeWidth={1}
        />
        <h3 className='text-xl font-bold text-gray-800'>No Errands Found</h3>
        <p className='mt-2 text-gray-500 font-medium'>
          Try adjusting your search filters to find more results.
        </p>
      </div>
    );
  }

  return (
    <div className='w-full font-sans antialiased text-[#2a3a4a]'>
      {/* Dashed outer border grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {posts.map((post) => (
          <article
            key={post.id}
            className='bg-white rounded shadow-sm p-6 flex flex-col border border-gray-100'>
            {/* Top row: avatar + info + media */}
            <div className='flex gap-4 mb-3'>
              {/* Avatar */}
              <div className='shrink-0'>
                <Image
                  width={85}
                  height={85}
                  src={post.user.profileImage || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"}
                  alt={`${post.user.firstName} profile`}
                  className='w-20 h-20 rounded object-cover'
                />
              </div>

              {/* Name / location / more images + media icons */}
              <div className='grow'>
                <div className='flex justify-between items-start'>
                  <div>
                    <h2 className='text-[16px] font-bold text-secondary leading-tight'>
                      {post.user.firstName} {post.user.lastName}
                    </h2>
                    <div className='flex items-center text-[12px] font-normal text-[#555555] mt-0.5'>
                      <MapPin className='w-3 h-3 text-red-500 mr-1 shrink-0' />
                      {post.city}, {post.state}
                    </div>
                    <a
                      href='#'
                      className='text-primary text-[11px] font-semibold hover:underline inline-block mt-0.5'>
                      More Images
                    </a>
                  </div>

                  {/* Play + video thumb */}
                  <div className='flex items-center gap-2'>
                    <button className='text-[#1b539c] hover:text-blue-800 transition-colors'>
                      <Image src={icon} height={50} width={50} alt='icon' />
                    </button>
                    {/* <Image
                      height={60}
                      width={80}
                      src={person.videoThumb}
                      alt='Video preview'
                      className='w-10 h-10 rounded object-cover border border-gray-200'
                    /> */}
                  </div>
                </div>

                {/* Bio */}
                <p className='text-[13px] text-foreground mb-4 leading-snug grow'>
                  {post.description}
                </p>

                {/* Tags */}
                <div className='flex flex-wrap gap-2 mb-5'>
                  {[post.category.name, post.budget ? `$${post.budget}` : 'Flexible'].map((tag) => (
                    <span
                      key={tag}
                      className='bg-surface-dim text-secondary text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#E5E5E5]'>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Contact button */}
                <div>
                  <button className='bg-[#f27b2a] hover:bg-orange-600 active:scale-95 text-white text-[12px] font-bold py-2 px-6 rounded shadow-sm transition-all uppercase tracking-wide'>
                    Contact
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
