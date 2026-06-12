"use client";

import { FC, useState, useEffect, useRef } from "react";
import { ChatConversation, ChatMessage } from "@/types/messages";
import { 
  Send, MoreVertical, Loader2, Circle, 
  Image as ImageIcon, Mic, Calendar, Paperclip, X,
  Play, Pause, MapPin, Smile, Pin, Undo, Trash2, Navigation
} from "lucide-react";
import { getImageUrl } from "@/configs/api.config";
import { format } from "date-fns";

interface ChatWindowProps {
  conversation: ChatConversation | null;
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (content: string, type?: string, metadata?: any) => void;
  onMessageAction: (action: 'pin' | 'unsend' | 'delete_for_me', messageId: string) => void;
  onTyping: (isTyping: boolean) => void;
  onUploadFile: (file: File) => Promise<string>;
  otherUserTyping: boolean;
  isLoading?: boolean;
  isConnected?: boolean;
}

const VoicePlayer = ({ url, isMe }: { url: string, isMe: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current && url) {
      audioRef.current = new Audio(getImageUrl(url) || "");
      audioRef.current.onended = () => setIsPlaying(false);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [url]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="px-4 py-3 flex items-center gap-3 min-w-[200px]">
      <button onClick={togglePlay} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isMe ? 'bg-white/20 hover:bg-white/30' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
        {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      </button>
      <div className="flex-1 h-1.5 bg-gray-200/30 rounded-full overflow-hidden relative">
        <div className={`absolute left-0 h-full bg-current opacity-50 ${isPlaying ? 'w-full transition-all duration-[30s] ease-linear' : 'w-0'}`} />
      </div>
      <span className="text-[10px] font-bold opacity-70">{isPlaying ? "Playing" : "Voice"}</span>
    </div>
  );
};

const ChatWindow: FC<ChatWindowProps> = ({
  conversation,
  messages,
  currentUserId,
  onSendMessage,
  onMessageAction,
  onTyping,
  onUploadFile,
  otherUserTyping,
  isLoading = false,
  isConnected = false,
}) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRefreshing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [inviteDate, setInviteDate] = useState("");
  const [inviteTime, setInviteTime] = useState("");
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  
  // Pinned messages sidebar
  const [showPinnedSidebar, setShowPinnedSidebar] = useState(false);
  const [showHeaderMenu, setShowHeaderMenu] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const pinnedMessages = messages.filter(m => m.isPinned && !m.isDeleted);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, otherUserTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && isConnected) {
      onSendMessage(input.trim(), "text");
      setInput("");
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      onTyping(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (isConnected) {
      onTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => onTyping(false), 2000);
    }
  };

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      await onUploadFile(file);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const file = new File([audioBlob], `voice-message-${Date.now()}.webm`, { type: 'audio/webm' });
        setUploading(true);
        try {
          await onUploadFile(file);
        } finally {
          setUploading(false);
        }
      };

      recorder.start();
      setIsRefreshing(true);
    } catch (err) {
      console.error("Recording error", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRefreshing(false);
    }
  };

  const sendCalendarInvite = () => {
    if (!inviteDate || !inviteTime) return;
    
    const dateTime = new Date(`${inviteDate}T${inviteTime}`).toISOString();
    onSendMessage(`Scheduled for ${format(new Date(dateTime), 'PPP p')}`, "calendar", { date: dateTime, event: "Errand Schedule", status: "pending" });
    setShowCalendar(false);
    setInviteDate("");
    setInviteTime("");
  };

  const acceptInvite = (msg: ChatMessage) => {
    if (!msg.metadata?.date) return;
    onSendMessage(`✅ I have accepted the invite for ${format(new Date(msg.metadata.date), 'PPP p')}. Looking forward to it!`, "text");
  };

  const sendLocation = (addressStr: string) => {
    onSendMessage(addressStr, "location", { address: addressStr });
    setShowLocation(false);
    setAddressInput("");
  };

  const shareCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        onSendMessage(`Shared Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`, "location", { lat, lng });
        setShowLocation(false);
      }, () => {
        alert("Failed to get location. Please type an address manually.");
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  if (!conversation) {
    return (
      <div className='flex-1 flex items-center justify-center bg-[#FDFCFB]'>
        <div className='text-center'>
          <div className='w-24 h-24 bg-orange-100/50 rounded-full flex items-center justify-center mx-auto mb-6'>
            <Send className='text-primary w-10 h-10' />
          </div>
          <h3 className='text-2xl font-bold text-gray-800'>Professional Inbox</h3>
          <p className='text-gray-500 max-w-xs mx-auto mt-3 leading-relaxed'>
            Connect with your clients and errandrs. Share images, voice messages, and schedule tasks effortlessly.
          </p>
        </div>
      </div>
    );
  }

  const otherUser = conversation.clientId === currentUserId ? conversation.errand : conversation.client;

  return (
    <div className='flex-1 flex flex-col h-full bg-white relative' onClick={() => { setActiveMenuId(null); setShowHeaderMenu(false); }}>
      
      {/* Pinned Messages Sidebar */}
      {showPinnedSidebar && (
        <div className="absolute top-0 right-0 h-full w-80 bg-white border-l border-gray-100 shadow-2xl z-30 flex flex-col animate-in slide-in-from-right-8">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#FDFCFB]">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Pin size={18} />
              <h3>Pinned Messages</h3>
            </div>
            <button onClick={() => setShowPinnedSidebar(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500">
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {pinnedMessages.length === 0 ? (
              <p className="text-sm text-gray-500 text-center mt-10">No pinned messages yet.</p>
            ) : (
              pinnedMessages.map((msg) => (
                <div key={`pin-${msg.id}`} className="bg-white p-4 rounded-2xl shadow-sm border border-orange-100 relative">
                  <Pin size={12} className="absolute top-3 right-3 text-orange-400" />
                  <p className="text-xs font-bold text-gray-500 mb-1">{msg.senderId === currentUserId ? 'You' : otherUser.firstName}</p>
                  <p className="text-sm text-gray-800 leading-relaxed">{msg.type === 'text' ? msg.content : `[${msg.type.toUpperCase()}]`}</p>
                  <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">{format(new Date(msg.createdAt), 'MMM d, HH:mm')}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className='px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10'>
        <div className='flex items-center gap-4'>
          <div className='relative'>
            <div className='w-12 h-12 rounded-2xl overflow-hidden bg-gray-100 shadow-sm'>
              {otherUser.profileImage ? (
                <img src={getImageUrl(otherUser.profileImage) || ""} alt={otherUser.firstName} className='w-full h-full object-cover' />
              ) : (
                <div className='w-full h-full flex items-center justify-center bg-primary text-white font-bold text-lg'>
                  {otherUser.firstName[0]}
                </div>
              )}
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`} />
          </div>
          <div>
            <h3 className='text-[16px] font-bold text-gray-900 tracking-tight'>
              {otherUser.firstName} {otherUser.lastName}
            </h3>
            <div className='flex items-center gap-1.5'>
              <span className='text-[11px] text-gray-400 font-semibold uppercase tracking-wider'>
                {isConnected ? "Active Now" : "Connecting..."}
              </span>
            </div>
          </div>
        </div>
        <div className='flex items-center relative'>
          <button 
            onClick={(e) => { e.stopPropagation(); setShowHeaderMenu(!showHeaderMenu); }} 
            className='p-2.5 hover:bg-gray-50 rounded-xl text-gray-400 transition-all active:scale-90'
          >
            <MoreVertical size={20} />
          </button>
          
          {showHeaderMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-20 animate-in fade-in">
              <button 
                onClick={() => { setShowPinnedSidebar(true); setShowHeaderMenu(false); }} 
                className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-orange-50 hover:text-primary flex items-center gap-2"
              >
                <Pin size={16} /> View Pinned Messages
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-6 space-y-8 bg-[#FDFCFB]/50 custom-scrollbar'>
        {isLoading ? (
          <div className='flex items-center justify-center h-full'>
            <Loader2 className='w-10 h-10 animate-spin text-primary opacity-20' />
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => {
              const isMe = msg.senderId === currentUserId;
              const isMenuOpen = activeMenuId === msg.id;

              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"} group`}>
                  
                  {/* Options Menu (Left for Me, Right for Other) */}
                  {isMe && (
                    <div className="relative flex items-center opacity-0 group-hover:opacity-100 transition-opacity mr-2">
                      <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(isMenuOpen ? null : msg.id); }} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <MoreVertical size={16} />
                      </button>
                      {isMenuOpen && (
                        <div className="absolute bottom-full right-0 mb-2 z-20 bg-white border border-gray-100 shadow-xl rounded-xl py-1 min-w-[140px] animate-in slide-in-from-bottom-2">
                          <button onClick={() => onMessageAction('pin', msg.id)} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Pin size={14} /> {msg.isPinned ? "Unpin Message" : "Pin Message"}
                          </button>
                          {!msg.isDeleted && (
                            <button onClick={() => onMessageAction('unsend', msg.id)} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-orange-500 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-50">
                              <Undo size={14} /> Unsend
                            </button>
                          )}
                          <button onClick={() => onMessageAction('delete_for_me', msg.id)} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-50">
                            <Trash2 size={14} /> Delete for me
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  <div className={`max-w-[75%] flex flex-col ${isMe ? "items-end" : "items-start"}`}>
                    
                    {/* Render based on type */}
                    <div className={`shadow-sm transition-all hover:shadow-md relative ${
                      isMe ? "bg-primary text-white rounded-2xl rounded-tr-none" : "bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100"
                    } ${msg.isDeleted ? 'bg-gray-100 text-gray-500 border-none !rounded-2xl' : ''}`}>
                      
                      {msg.isPinned && (
                        <div className={`absolute -top-3 ${isMe ? '-right-2' : '-left-2'} bg-orange-100 text-orange-500 p-1 rounded-full shadow-sm border border-white z-10`}>
                          <Pin size={12} fill="currentColor" />
                        </div>
                      )}

                      {msg.isDeleted ? (
                         <div className="px-5 py-3 text-[14px] italic opacity-80 flex items-center gap-2">
                           <Undo size={14} /> This message was unsent
                         </div>
                      ) : (
                        <>
                          {msg.type === "text" && <div className="px-5 py-3.5 text-[15px] leading-relaxed">{msg.content}</div>}
                          
                          {msg.type === "image" && (
                            <div className="p-1">
                              <img src={getImageUrl(msg.metadata?.url) || ""} alt="Shared" className="max-w-full rounded-xl max-h-[300px] object-cover cursor-pointer" />
                            </div>
                          )}
                          
                          {msg.type === "voice" && (
                            <VoicePlayer url={msg.metadata?.url} isMe={isMe} />
                          )}
                          
                          {msg.type === "calendar" && (
                            <div className="p-5 min-w-[240px]">
                              <div className="flex items-center gap-3 mb-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isMe ? 'bg-white/20 text-white' : 'bg-orange-50 text-primary'}`}>
                                    <Calendar size={20} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold uppercase tracking-wider opacity-80">Errand Schedule</p>
                                    <p className="text-sm font-bold opacity-90">{msg.metadata?.status === 'accepted' ? 'Accepted' : 'Proposal Invite'}</p>
                                  </div>
                              </div>
                              <div className={`rounded-xl p-3 mb-4 text-xs font-medium ${isMe ? 'bg-black/10' : 'bg-gray-50 text-gray-700'}`}>
                                  Date & Time:<br/>
                                  <span className="font-bold text-[13px]">{format(new Date(msg.metadata?.date || new Date()), 'PPP p')}</span>
                              </div>
                              {!isMe && (
                                <button 
                                  onClick={() => acceptInvite(msg)}
                                  className="w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all bg-primary text-white hover:bg-primary-dark shadow-md"
                                >
                                  Accept Invite
                                </button>
                              )}
                              {isMe && (
                                <div className="text-center text-xs font-bold uppercase tracking-widest opacity-80">
                                  Awaiting Response
                                </div>
                              )}
                            </div>
                          )}

                          {msg.type === "location" && (
                            <div className="p-5 min-w-[240px]">
                               <div className="flex items-center gap-3 mb-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isMe ? 'bg-white/20 text-white' : 'bg-orange-50 text-primary'}`}>
                                     <MapPin size={20} />
                                  </div>
                                  <div>
                                     <p className="text-xs font-bold uppercase tracking-wider opacity-80">Location Shared</p>
                                     <p className="text-sm font-bold opacity-90">View Map</p>
                                  </div>
                               </div>
                               <div className={`rounded-xl p-4 text-sm font-medium ${isMe ? 'bg-black/10' : 'bg-gray-50 text-gray-700'}`}>
                                  {msg.content}
                               </div>
                               <a 
                                 href={`https://maps.google.com/?q=${msg.metadata?.lat ? `${msg.metadata.lat},${msg.metadata.lng}` : msg.metadata?.address}`} 
                                 target="_blank" 
                                 rel="noreferrer"
                                 className="mt-4 flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all bg-white text-primary hover:bg-orange-50 shadow-sm"
                               >
                                 <Navigation size={14}/> Open in Maps
                               </a>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    <span className='text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest px-1'>
                      {format(new Date(msg.createdAt), 'HH:mm')}
                      {isMe && msg.isRead && !msg.isDeleted && <span className="text-primary ml-1">· Seen</span>}
                    </span>
                  </div>

                  {/* Options Menu for Other */}
                  {!isMe && (
                    <div className="relative flex items-center opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                      <button onClick={(e) => { e.stopPropagation(); setActiveMenuId(isMenuOpen ? null : msg.id); }} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
                        <MoreVertical size={16} />
                      </button>
                      {isMenuOpen && (
                        <div className="absolute bottom-full left-0 mb-2 z-20 bg-white border border-gray-100 shadow-xl rounded-xl py-1 min-w-[140px] animate-in slide-in-from-bottom-2">
                          <button onClick={() => onMessageAction('pin', msg.id)} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Pin size={14} /> {msg.isPinned ? "Unpin Message" : "Pin Message"}
                          </button>
                          <button onClick={() => onMessageAction('delete_for_me', msg.id)} className="w-full text-left px-4 py-2.5 text-xs font-semibold text-red-500 hover:bg-gray-50 flex items-center gap-2 border-t border-gray-50">
                            <Trash2 size={14} /> Delete for me
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
            {otherUserTyping && (
              <div className='flex justify-start'>
                <div className='bg-white px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1.5 shadow-sm border border-gray-100'>
                  <div className='w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]' />
                  <div className='w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]' />
                  <div className='w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce' />
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <footer className='p-6 border-t border-gray-100 bg-white relative'>
        <div className="flex items-center gap-2 mb-4">
           <button onClick={handleFileClick} className="p-2.5 hover:bg-orange-50 text-gray-400 hover:text-primary rounded-xl transition-all"><ImageIcon size={20} /></button>
           <button onClick={() => { setShowCalendar(!showCalendar); setShowLocation(false); }} className="p-2.5 hover:bg-orange-50 text-gray-400 hover:text-primary rounded-xl transition-all"><Calendar size={20} /></button>
           <button onClick={() => { setShowLocation(!showLocation); setShowCalendar(false); }} className="p-2.5 hover:bg-orange-50 text-gray-400 hover:text-primary rounded-xl transition-all"><MapPin size={20} /></button>
           <div className="w-px h-6 bg-gray-100 mx-1" />
           {uploading && <div className="text-[10px] font-bold text-primary animate-pulse uppercase tracking-widest">Uploading Media...</div>}
        </div>

        {showCalendar && (
           <div className="absolute bottom-full left-6 mb-2 bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 z-20 animate-in fade-in slide-in-from-bottom-4 w-72">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm">Schedule Errand</h4>
                <button onClick={() => setShowCalendar(false)} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Select date and time to invite {otherUser.firstName}.</p>
              
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Date</label>
                  <input type="date" value={inviteDate} onChange={e => setInviteDate(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Time</label>
                  <input type="time" value={inviteTime} onChange={e => setInviteTime(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>

              <button 
                onClick={sendCalendarInvite} 
                disabled={!inviteDate || !inviteTime}
                className="w-full bg-primary text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-primary-dark transition-all disabled:opacity-50 disabled:grayscale"
              >
                Send Invite
              </button>
           </div>
        )}

        {showLocation && (
           <div className="absolute bottom-full left-6 mb-2 bg-white border border-gray-100 shadow-2xl rounded-2xl p-5 z-20 animate-in fade-in slide-in-from-bottom-4 w-80">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-sm">Share Location</h4>
                <button onClick={() => setShowLocation(false)} className="text-gray-400 hover:text-gray-600"><X size={16}/></button>
              </div>
              <p className="text-xs text-gray-500 mb-4">Send an address or share your current location.</p>
              
              <div className="space-y-4 mb-5">
                <div>
                  <input type="text" value={addressInput} onChange={e => setAddressInput(e.target.value)} placeholder="Type an address..." className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary" />
                  <button 
                    onClick={() => sendLocation(addressInput)} 
                    disabled={!addressInput.trim()}
                    className="w-full mt-2 bg-gray-900 text-white py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50"
                  >
                    Send Address
                  </button>
                </div>
                
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-200"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-400 text-xs font-medium uppercase">Or</span>
                  <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button 
                  onClick={shareCurrentLocation} 
                  className="w-full flex items-center justify-center gap-2 bg-primary/10 text-primary py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-primary/20 transition-all"
                >
                  <Navigation size={14} /> Share Current Location
                </button>
              </div>
           </div>
        )}

        <form onSubmit={handleSubmit} className='flex items-center gap-4'>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,audio/*" />
          
          <div className='flex-1 relative group'>
            <input
              type='text'
              value={input}
              onChange={handleInputChange}
              disabled={!isConnected || isRecording}
              placeholder={isRecording ? 'Recording audio...' : (isConnected ? 'Write a message...' : 'Connecting...')}
              className='w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[15px] focus:outline-none focus:ring-2 focus:ring-primary/10 focus:bg-white transition-all pr-14 placeholder:text-gray-400'
            />
            <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors"><Smile size={22} /></button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onMouseDown={startRecording}
              onMouseUp={stopRecording}
              className={`w-14 h-14 flex items-center justify-center rounded-2xl transition-all active:scale-90 shadow-lg ${
                isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-orange-50 text-primary hover:bg-orange-100'
              }`}>
              <Mic size={24} />
            </button>
            
            <button
              type='submit'
              disabled={!input.trim() || !isConnected || isRecording}
              className='w-14 h-14 flex items-center justify-center bg-primary text-white rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark active:scale-95 transition-all disabled:opacity-50 disabled:grayscale'>
              <Send size={24} />
            </button>
          </div>
        </form>
      </footer>
    </div>
  );
};

export default ChatWindow;
