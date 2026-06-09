import React from "react";
import { Post, PostAction } from "@/types/post";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { Trash2, Edit2 } from "lucide-react";

interface PostCardProps {
  post: Post;
  onAction: (postId: string, action: PostAction["type"]) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onAction }) => {
  const getStatusStyle = (status: Post["status"]) => {
    const styles = {
      open: "text-success bg-green-50",
      pending: "text-yellow-600 bg-yellow-50",
      completed: "text-status-blue bg-blue-50",
      flagged: "text-error bg-red-50",
      all: "text-foreground bg-gray-50",
    };
    return styles[status] || styles.all;
  };

  const getStatusDot = (status: Post["status"]) => {
    const dots = {
      open: "bg-success",
      pending: "bg-yellow-500",
      completed: "bg-status-blue",
      flagged: "bg-error",
      all: "bg-gray-400",
    };
    return dots[status] || dots.all;
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleToggle = (checked: boolean) => {
    onAction(post.id, checked ? "mark_active" : "mark_inactive");
  };

  const handleDelete = () => {
    if (window.confirm("Warning: Are you sure you want to permanently remove this post? This action cannot be undone.")) {
      onAction(post.id, "remove");
    }
  };

  return (
    <article className='bg-white rounded-2xl p-6 shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition-shadow duration-200'>
      <div>
        {/* Header */}
        <div className='flex justify-between items-start mb-4'>
          <h3 className='text-[14px] font-bold text-foreground leading-tight pr-4 line-clamp-2'>
            {post.title}
          </h3>
          <span
            className={`px-3 py-1 inline-flex items-center text-[10px] leading-4 font-bold rounded-full border border-current shrink-0 mt-1 ${getStatusStyle(post.status)}`}>
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${getStatusDot(post.status)}`}></span>
            {post.status.toUpperCase()}
          </span>
        </div>

        {/* Details */}
        <div className='space-y-3 mb-6'>
          <div className='flex justify-between text-sm'>
            <span className='text-text-secondary text-[12px]'>
              Client:{" "}
              <span className='font-bold text-foreground'>
                {post.client.name}
              </span>
            </span>
            <span className='text-text-secondary font-medium text-[12px]'>
              {post.category}
            </span>
          </div>

          <div className='flex justify-between text-sm items-end'>
            <span className='text-text-secondary text-[12px]'>{post.date}</span>
            <span className='text-lg font-bold text-foreground'>
              {formatCurrency(post.budget)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div>
        <div className='border-t border-border pt-4 flex items-center justify-between'>
          <div className="flex items-center gap-3">
             <span className={`text-[11px] font-bold uppercase tracking-wider ${post.isActive ? "text-success" : "text-muted"}`}>
               {post.isActive ? "Active" : "Inactive"}
             </span>
             <ToggleSwitch 
               id={`toggle-${post.id}`}
               name={`toggle-${post.id}`}
               checked={post.isActive}
               onChange={handleToggle}
             />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => onAction(post.id, "edit")}
              className="p-2 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
              aria-label="Edit post"
            >
              <Edit2 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-lg bg-red-50 text-error hover:bg-red-100 transition-colors"
              aria-label="Remove post"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
