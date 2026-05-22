import React from "react";
import { Post, PostAction } from "@/types/post";

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

  const getActionButtons = (post: Post): PostAction[] => {
    const buttons: PostAction[] = [
      {
        type: "edit",
        label: "Edit",
        className: "bg-gray-100 text-text-secondary hover:bg-gray-200",
      },
    ];

    if (post.isActive) {
      buttons.push({
        type: "mark_inactive",
        label: "Mark Inactive",
        className: "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
      });
    } else {
      buttons.push({
        type: "mark_active",
        label: "Mark Active",
        className: "bg-green-50 text-success hover:bg-green-100",
      });
    }

    buttons.push({
      type: "remove",
      label: "Remove",
      className: "bg-red-50 text-error hover:bg-red-100",
    });

    return buttons;
  };

  const actions = getActionButtons(post);

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
            <span className='text-text-secondary'>
              Client:{" "}
              <span className='font-bold text-foreground'>
                {post.client.name}
              </span>
            </span>
            <span className='text-text-secondary font-medium'>
              {post.category}
            </span>
          </div>

          <div className='flex justify-between text-sm items-end'>
            <span className='text-text-secondary'>{post.date}</span>
            <span className='text-lg font-bold text-foreground'>
              {formatCurrency(post.budget)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div>
        <div className='border-t border-border pt-4 flex flex-wrap gap-2'>
          {actions.map((action) => (
            <button
              key={action.type}
              onClick={() => onAction(post.id, action.type)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${action.className}`}
              aria-label={`${action.label} ${post.title}`}>
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </article>
  );
};

export default PostCard;
