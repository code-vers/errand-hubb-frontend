"use client";

import React, { useState, useEffect } from 'react';
import { Briefcase, CheckCircle2, Star, UserCheck, ChevronDown, ChevronUp, Loader2, Send } from 'lucide-react';
import { postService } from '@/services/post.service';
import { ChatConversation } from '@/types/messages';
import { toast } from 'sonner';

interface ChatTaskBarProps {
  conversation: ChatConversation;
  currentUserId: string;
  onSendMessage: (content: string, type?: string, metadata?: any) => void;
}

export const ChatTaskBar: React.FC<ChatTaskBarProps> = ({
  conversation,
  currentUserId,
  onSendMessage,
}) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const isClient = currentUserId === conversation.clientId;
  const clientId = conversation.clientId;
  const erranderId = conversation.errandId;

  const otherUser = isClient ? conversation.errand : conversation.client;
  const otherUserName = `${otherUser?.firstName || ''} ${otherUser?.lastName || ''}`.trim() || 'User';

  const fetchClientTasks = async () => {
    setIsLoading(true);
    try {
      if (isClient) {
        const res = await postService.getMyPosts();
        setPosts(res.data || []);
      } else {
        const res = await postService.findAll({ userId: clientId, status: 'all', limit: '50' });
        const clientPosts = res.data?.data || res.data || [];
        setPosts(clientPosts);
      }
    } catch (err) {
      console.error('Failed to load tasks for chat:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (conversation?.id) {
      fetchClientTasks();
    }

    const handleReviewSubmitted = () => {
      fetchClientTasks();
    };

    window.addEventListener('review-submitted', handleReviewSubmitted);
    return () => {
      window.removeEventListener('review-submitted', handleReviewSubmitted);
    };
  }, [conversation?.id, isClient, clientId]);

  const handleAssignPost = async (post: any) => {
    setActionLoadingId(post.id);
    try {
      await postService.assignPost(post.id, erranderId);
      toast.success(`Errand "${post.title}" assigned to ${otherUserName}!`);
      
      onSendMessage(
        `📋 Errand Assigned: I have assigned "${post.title}" ($${post.budget || post.reward || 0}) to ${otherUserName}!`,
        'text'
      );

      await fetchClientTasks();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to assign post');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleCompletePost = async (post: any) => {
    setActionLoadingId(post.id);
    try {
      await postService.markCompleted(post.id, erranderId);
      toast.success(`Errand "${post.title}" marked as Completed!`);

      onSendMessage(
        `✅ Errand Completed: "${post.title}" was marked as completed! Both parties can now leave a review.`,
        'text'
      );

      await fetchClientTasks();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Failed to complete post');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleRequestJob = (post: any) => {
    onSendMessage(
      `🙋‍♂️ Job Request: Hi ${otherUserName}, I would like to offer my service for your errand: "${post.title}" ($${post.budget || post.reward || 0})!`,
      'text'
    );
    toast.success('Interest sent to client in chat!');
  };

  const handleOpenReview = (post: any) => {
    const targetId = isClient ? erranderId : clientId;
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('open-review-modal', {
        detail: {
          postId: post.id,
          revieweeId: targetId,
          revieweeName: otherUserName,
          revieweeImage: otherUser?.profileImage,
        },
      });
      window.dispatchEvent(event);
    }
  };

  const relevantPosts = posts.filter((post) => {
    const isAssignedToThisErrander = post.assignedToId === erranderId || post.assignedTo?.id === erranderId;
    const isCompleted = post.status === 'Completed' || post.status === 'completed';
    const isUnassigned = !post.assignedToId && !post.assignedTo?.id && !isCompleted;
    return isUnassigned || isAssignedToThisErrander;
  });

  if (isLoading) return null;
  if (!relevantPosts || relevantPosts.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50/60 border-b border-orange-100/80 px-4 py-2.5 transition-all text-gray-900">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-800">
          <Briefcase size={16} className="text-[#ff6900]" />
          <span>Errand Tasks ({relevantPosts.length})</span>
          <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-extrabold uppercase">
            {isClient ? 'My Posts' : `${otherUserName}'s Errands`}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
        >
          <span>{isExpanded ? 'Hide Tasks' : 'View Tasks'}</span>
          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Expanded Task List */}
      {isExpanded && (
        <div className="mt-3 space-y-2 pt-2 border-t border-orange-200/50 max-h-56 overflow-y-auto pr-1">
          {relevantPosts.map((post) => {
            const isAssignedToThisErrander = post.assignedToId === erranderId || post.assignedTo?.id === erranderId;
            const isCompleted = post.status === 'Completed' || post.status === 'completed';
            const isAssignedAny = Boolean(post.assignedToId || post.assignedTo);

            return (
              <div
                key={post.id}
                className="p-3 bg-white rounded-xl border border-gray-100 shadow-2xs flex items-center justify-between gap-3 text-xs"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-gray-900 truncate" title={post.title}>
                      {post.title}
                    </h5>
                    <span className="font-black text-orange-600 shrink-0">
                      ${post.budget || post.reward || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {isCompleted ? (
                      <span className="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        Completed
                      </span>
                    ) : isAssignedToThisErrander ? (
                      <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        Assigned to {isClient ? otherUserName : 'You'}
                      </span>
                    ) : isAssignedAny ? (
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                        Assigned
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                        Open / Unassigned
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex items-center gap-1.5">
                  {actionLoadingId === post.id ? (
                    <Loader2 size={16} className="animate-spin text-orange-500" />
                  ) : isCompleted ? (
                    <button
                      type="button"
                      onClick={() => handleOpenReview(post)}
                      className="px-2.5 py-1.5 bg-[#ff6900] hover:bg-[#e05d00] text-white font-extrabold rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Star size={13} className="fill-white" />
                      <span>Review</span>
                    </button>
                  ) : isAssignedToThisErrander || (isClient && isAssignedAny) ? (
                    <button
                      type="button"
                      onClick={() => handleCompletePost(post)}
                      className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 size={13} />
                      <span>Complete</span>
                    </button>
                  ) : isClient && !isAssignedAny ? (
                    <button
                      type="button"
                      onClick={() => handleAssignPost(post)}
                      className="px-2.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <UserCheck size={13} />
                      <span>Assign {otherUser?.firstName || ''}</span>
                    </button>
                  ) : !isClient && !isAssignedAny ? (
                    <button
                      type="button"
                      onClick={() => handleRequestJob(post)}
                      className="px-2.5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-lg shadow-2xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Apply</span>
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ChatTaskBar;
