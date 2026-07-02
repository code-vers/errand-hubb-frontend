"use client";

import { useEffect, useState } from "react";
import { messageService } from "@/services/message.service";
import PageHeader from "@/components/dashboard/common/PageHeader";
import { Loader2, MessageSquare, User, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const AdminMessagesPage = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await messageService.getAdminConversations();
        setConversations(response.data);
      } catch (error) {
        console.error("Failed to fetch admin conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConversations();
  }, []);

  if (isLoading) {
    return (
      <div className='p-12 text-center'>
        <Loader2 className='w-10 h-10 animate-spin mx-auto text-primary' />
        <p className='mt-4 text-muted'>Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className='p-6 space-y-6'>
      <PageHeader title='Global Conversations' />
      
      <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        <table className='w-full text-left border-collapse'>
          <thead className='bg-gray-50 border-b border-gray-100'>
            <tr>
              <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest'>Client</th>
              <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest'>Errandr</th>
              <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest'>Messages</th>
              <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest'>Last Active</th>
              <th className='px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right'>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-50'>
            {conversations.length === 0 ? (
              <tr>
                <td colSpan={5} className='px-6 py-12 text-center text-gray-400'>
                  No active conversations found on the platform.
                </td>
              </tr>
            ) : (
              conversations.map((conv) => (
                <tr key={conv.id} className='hover:bg-gray-50 transition-colors'>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600'>
                        <User size={14} />
                      </div>
                      <div>
                        <p className='text-sm font-bold text-gray-900'>{conv.client.firstName} {conv.client.lastName}</p>
                        <p className='text-[10px] text-gray-400 font-medium'>{conv.client.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <div className='w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600'>
                        <User size={14} />
                      </div>
                      <div>
                        <p className='text-sm font-bold text-gray-900'>{conv.errand.firstName} {conv.errand.lastName}</p>
                        <p className='text-[10px] text-gray-400 font-medium'>{conv.errand.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-1.5'>
                      <MessageSquare size={14} className='text-gray-400' />
                      <span className='text-sm font-bold text-gray-700'>{conv._count.messages}</span>
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-1.5 text-gray-500'>
                      <Clock size={14} />
                      <span className='text-xs font-medium'>
                        {formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true })}
                      </span>
                    </div>
                  </td>
                  <td className='px-6 py-4 text-right'>
                    <button 
                      className='text-xs font-bold text-primary hover:underline'
                      onClick={() => alert("Feature coming soon: View Logs")}
                    >
                      VIEW LOGS
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMessagesPage;
