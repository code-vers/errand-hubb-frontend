"use client";

import { useEffect, useState } from "react";
import { postService } from "@/services/post.service";
import { Loader2, Plus, Edit, Trash2, MapPin, Calendar, DollarSign } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import PageHeader from "../../common/PageHeader";
import { useConfirm } from "@/context/ConfirmationContext";

const MyPostsPage = () => {
  const confirm = useConfirm();
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await postService.getMyPosts();
      setPosts(response.data);
    } catch (error: any) {
      console.error("Failed to fetch posts", error);
      if (error.message !== 'SUBSCRIPTION_REQUIRED') {
        toast.error(error.message || "Failed to load your posts");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Delete Post",
      message: "Are you sure you want to delete this post? This action cannot be undone.",
      type: "danger",
      confirmLabel: "Delete",
    });

    if (!isConfirmed) return;

    try {
      await postService.delete(id);
      toast.success("Post deleted successfully");
      setPosts(posts.filter((p) => p.id !== id));
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  if (isLoading) {
    return (
      <div className='p-12 text-center'>
        <Loader2 className='w-10 h-10 animate-spin mx-auto text-primary' />
        <p className='mt-4 text-muted'>Loading your posts...</p>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      <div className='flex justify-between items-center'>
        <PageHeader title='My Errand Posts' />
        <Link 
          href="/post-errand"
          className='flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95'
        >
          <Plus size={18} />
          <span>Post New Errand</span>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className='bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100'>
          <div className='w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Plus className='text-gray-300 w-10 h-10' />
          </div>
          <h3 className='text-xl font-bold text-gray-800'>No posts yet</h3>
          <p className='text-gray-500 mt-2 max-w-xs mx-auto'>
            You haven't posted any errands yet. Start by creating your first post to offer your services.
          </p>
          <Link 
            href="/post-errand"
            className='inline-block mt-6 text-primary font-bold hover:underline'
          >
            Create your first post &rarr;
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {posts.map((post) => (
            <div key={post.id} className='bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col'>
              <div className='p-5 flex-1'>
                <div className='flex justify-between items-start mb-4'>
                  <span 
                    className='px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider'
                    style={{ backgroundColor: `${post.category?.color}15`, color: post.category?.color }}
                  >
                    {post.category?.name}
                  </span>
                  <div className='flex gap-2'>
                    <Link 
                      href={`/post-errand?id=${post.id}`}
                      className='p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors'
                    >
                      <Edit size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className='p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors'
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <h3 className='text-lg font-bold text-gray-900 line-clamp-1 mb-2'>{post.title}</h3>
                <p className='text-sm text-gray-600 line-clamp-3 mb-4 h-15'>{post.description}</p>

                <div className='space-y-2.5'>
                  <div className='flex items-center gap-2 text-xs text-gray-500 font-medium'>
                    <MapPin size={14} className='text-gray-400' />
                    <span>{post.city}, {post.state}</span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-gray-500 font-medium'>
                    <Calendar size={14} className='text-gray-400' />
                    <span>{post.dateNeeded ? new Date(post.dateNeeded).toLocaleDateString() : 'Flexible Date'}</span>
                  </div>
                  <div className='flex items-center gap-2 text-xs text-blue-600 font-bold'>
                    <DollarSign size={14} />
                    <span>Budget: ${post.budget}</span>
                  </div>
                </div>
              </div>
              <div className='p-4 bg-gray-50 border-t border-gray-50 flex items-center justify-between'>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${post.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
                  {post.status}
                </span>
                <span className='text-[10px] text-gray-400 font-bold uppercase'>
                  Posted {new Date(post.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
