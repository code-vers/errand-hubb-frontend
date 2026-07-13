'use client';

import React, { useState, useEffect } from 'react';
import { adminMessagesService } from '@/services/adminMessagesService';
import PageHeader from '@/components/dashboard/common/PageHeader';
import { Loader2, RefreshCw, MessageSquare, Search, User, Eye, X } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { getImageUrl } from '@/configs/api.config';

export default function AdminMessagesPage() {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConv, setSelectedConv] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  
  const [isLoadingList, setIsLoadingList] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setIsLoadingList(true);
      const data = await adminMessagesService.getAllConversations();
      setConversations(data);
    } catch (error) {
      toast.error('Failed to load conversations');
    } finally {
      setIsLoadingList(false);
    }
  };

  const loadMessages = async (conv: any) => {
    setSelectedConv(conv);
    try {
      setIsLoadingMessages(true);
      const data = await adminMessagesService.getMessages(conv.id);
      setMessages(data);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const refreshCurrentChat = async () => {
    if (selectedConv) {
      await loadMessages(selectedConv);
    }
  };

  const closeChatModal = () => {
    setSelectedConv(null);
    setMessages([]);
  };

  const filteredConversations = conversations.filter(c => {
    const clientName = `${c.client.firstName} ${c.client.lastName}`.toLowerCase();
    const errandName = `${c.errand.firstName} ${c.errand.lastName}`.toLowerCase();
    const search = searchTerm.toLowerCase();
    return clientName.includes(search) || errandName.includes(search);
  });

  const renderAvatar = (user: any) => {
    if (user?.profileImage) {
      return (
        <img 
          src={getImageUrl(user.profileImage)} 
          alt={user.firstName}
          className="w-full h-full object-cover"
        />
      );
    }
    return <User size={16} className="text-gray-400" />;
  };

  return (
    <div className="w-full p-6 pt-8 font-sans bg-[#F9FAFB] min-h-[calc(100vh-64px)] relative">
      <div className="mb-6 flex justify-between items-end">
        <PageHeader title="Admin Message Logs" />
        <button 
          onClick={fetchConversations}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <RefreshCw size={16} className={isLoadingList ? 'animate-spin' : ''} />
          Refresh List
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
          <div className="relative w-64">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </span>
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
            />
          </div>
          <span className="text-sm text-gray-500 font-semibold">{filteredConversations.length} total conversations</span>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Client</th>
                <th className="px-6 py-4 font-semibold">Errandr</th>
                <th className="px-6 py-4 font-semibold">Latest Message</th>
                <th className="px-6 py-4 font-semibold">Last Updated</th>
                <th className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoadingList ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <Loader2 size={24} className="animate-spin text-orange-500 mx-auto mb-2" />
                    Loading conversations...
                  </td>
                </tr>
              ) : filteredConversations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    <MessageSquare size={32} className="mx-auto mb-3 opacity-20" />
                    No conversations found.
                  </td>
                </tr>
              ) : (
                filteredConversations.map((conv) => {
                  const latestMsg = conv.messages?.[0];
                  return (
                    <tr key={conv.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                            {renderAvatar(conv.client)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{conv.client.firstName} {conv.client.lastName}</p>
                            <p className="text-xs text-gray-500">{conv.client.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                            {renderAvatar(conv.errand)}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{conv.errand.firstName} {conv.errand.lastName}</p>
                            <p className="text-xs text-gray-500">{conv.errand.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate text-gray-600">
                        {latestMsg ? latestMsg.content : <span className="italic text-gray-400">No messages</span>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-medium">
                        {format(new Date(conv.updatedAt), 'MMM dd, yyyy h:mm a')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => loadMessages(conv)}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EC6F27]/10 text-[#EC6F27] hover:bg-[#EC6F27] hover:text-white rounded-md text-xs font-bold transition-colors"
                        >
                          <Eye size={14} />
                          View Logs
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chat Logs Modal */}
      {selectedConv && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#F9FAFB] w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10">
            
            {/* Modal Header */}
            <div className="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-6">
                <div>
                  <h2 className="text-lg font-extrabold text-gray-900 leading-tight">Conversation Logs</h2>
                  <p className="text-xs font-medium text-gray-500">
                    ID: <span className="font-mono text-[10px] bg-gray-100 px-1 rounded">{selectedConv.id}</span>
                  </p>
                </div>
                
                <div className="w-px h-8 bg-gray-200"></div>
                
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                      {renderAvatar(selectedConv.client)}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-blue-500">Client</div>
                      <div className="text-sm font-bold text-gray-800">{selectedConv.client.firstName} {selectedConv.client.lastName}</div>
                    </div>
                  </div>
                  
                  <div className="w-6 flex items-center justify-center">
                    <MessageSquare size={16} className="text-gray-300" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                      {renderAvatar(selectedConv.errand)}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Errandr</div>
                      <div className="text-sm font-bold text-gray-800">{selectedConv.errand.firstName} {selectedConv.errand.lastName}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={refreshCurrentChat}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                  title="Refresh Logs"
                >
                  <RefreshCw size={18} className={isLoadingMessages ? 'animate-spin' : ''} />
                </button>
                <div className="w-px h-6 bg-gray-200"></div>
                <button 
                  onClick={closeChatModal}
                  className="p-2 bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50 custom-scrollbar relative">
              {isLoadingMessages ? (
                <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center z-10 text-gray-500">
                  <Loader2 size={32} className="animate-spin text-orange-500 mb-3" />
                  <span className="font-semibold">Loading message history...</span>
                </div>
              ) : null}

              {messages.length === 0 && !isLoadingMessages ? (
                <div className="h-full flex items-center justify-center text-gray-400">
                  <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
                    <MessageSquare size={24} className="mb-2 opacity-50" />
                    <p className="font-semibold text-sm">No messages have been sent yet.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((msg) => {
                    const isClient = msg.senderId === selectedConv.client.id;
                    const alignLeft = isClient;
                    
                    return (
                      <div key={msg.id} className={`flex ${alignLeft ? 'justify-start' : 'justify-end'}`}>
                        <div className={`flex max-w-[80%] gap-3 ${alignLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                          
                          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-auto bg-gray-200 flex items-center justify-center border border-white shadow-sm text-gray-400">
                            {renderAvatar(msg.sender)}
                          </div>
                          
                          <div className={`flex flex-col ${alignLeft ? 'items-start' : 'items-end'}`}>
                            <span className="text-[10px] font-bold text-gray-400 mb-1 mx-1 flex items-center gap-1.5">
                              {msg.sender.firstName} 
                              <span className={`px-1.5 py-0.5 rounded-sm text-[8px] uppercase tracking-wider font-extrabold ${isClient ? 'bg-blue-100 text-blue-600' : 'bg-emerald-100 text-emerald-600'}`}>
                                {isClient ? 'Client' : 'Errandr'}
                              </span>
                            </span>
                            <div 
                              className={`px-4 py-3 text-sm shadow-sm ${
                                alignLeft 
                                  ? 'bg-white text-gray-800 rounded-2xl rounded-bl-sm border border-gray-100' 
                                  : 'bg-[#EC6F27] text-white rounded-2xl rounded-br-sm'
                              }`}
                            >
                              {msg.content}
                            </div>
                            <span className="text-[10px] font-semibold text-gray-400 mt-1.5 mx-1">
                              {format(new Date(msg.createdAt), 'MMM dd, h:mm a')}
                            </span>
                          </div>
                          
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
