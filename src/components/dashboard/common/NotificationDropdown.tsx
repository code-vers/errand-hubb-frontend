"use client";

import { FC, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketContext";
import { notificationService } from "@/services/notification.service";
import { Bell, Check, CheckCheck, Loader2, MessageSquare, Briefcase, BellOff } from "lucide-react";
import { toast } from "sonner";

interface NotificationMetadata {
  redirectUrl?: string;
  conversationId?: string;
  postId?: string;
  senderName?: string;
}

interface NotificationItem {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  metadata: NotificationMetadata | null;
  isRead: boolean;
  createdAt: string;
}

const NotificationDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [inAppNotifsOn, setInAppNotifsOn] = useState(true);

  useEffect(() => {
    const loadPrefs = () => {
      const prefsStr = localStorage.getItem("errand_notif_prefs");
      if (prefsStr) {
        try {
          const prefs = JSON.parse(prefsStr);
          if (prefs.inAppNotifications === false) {
            setInAppNotifsOn(false);
            return;
          }
        } catch (e) {}
      }
      setInAppNotifsOn(true);
    };

    loadPrefs();
    window.addEventListener("notif_prefs_updated", loadPrefs);
    return () => window.removeEventListener("notif_prefs_updated", loadPrefs);
  }, []);
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  const router = useRouter();

  // Fetch initial notifications and count
  const loadNotificationsData = async () => {
    setIsLoading(true);
    try {
      const [notifsResp, countResp] = await Promise.all([
        notificationService.getNotifications(1, 10),
        notificationService.getUnreadCount(),
      ]);

      if (notifsResp?.data?.success !== false) {
        setNotifications(notifsResp?.data?.data || []);
      }
      if (countResp?.data?.success !== false) {
        setUnreadCount(countResp?.data?.count || 0);
      }
    } catch (err: any) {
      console.error("NOTIFICATIONS: Failed to fetch notifications:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadNotificationsData();
  }, []);

  // Listen to WebSocket events for real-time notifications
  useEffect(() => {
    if (!socket) return;

    const handleNotificationReceived = (notification: NotificationItem) => {
      // Prepend to list
      setNotifications((prev) => [notification, ...prev.slice(0, 9)]);
      setUnreadCount((prev) => prev + 1);

      // Trigger a toast for non-message notifications (message toasts are handled in SocketContext.tsx)
      if (notification.type !== "new_message") {
        let shouldShowToast = true;
        try {
          const prefsStr = localStorage.getItem("errand_notif_prefs");
          if (prefsStr) {
            const prefs = JSON.parse(prefsStr);
            if (prefs.inAppNotifications === false) shouldShowToast = false;
          }
        } catch (e) {}

        if (shouldShowToast) {
          toast.info(notification.title, {
            description: notification.message,
            action: {
              label: "View",
              onClick: () => {
                handleNotificationClick(notification);
              },
            },
          });
        }
      }
    };

    const handleUnreadCountUpdate = (data: { count: number }) => {
      setUnreadCount(data.count);
    };

    socket.on("notification_received", handleNotificationReceived);
    socket.on("unread_notifications_count", handleUnreadCountUpdate);

    return () => {
      socket.off("notification_received", handleNotificationReceived);
      socket.off("unread_notifications_count", handleUnreadCountUpdate);
    };
  }, [socket]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Refresh notifications when opening
      loadNotificationsData();
    }
  };

  const handleMarkAsRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const resp = await notificationService.markAsRead(id);
      if (resp?.data) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err: any) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAsUnread = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const resp = await notificationService.markAsUnread(id);
      if (resp?.data) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === id ? { ...n, isRead: false } : n))
        );
        setUnreadCount((prev) => prev + 1);
      }
    } catch (err: any) {
      toast.error("Failed to mark notification as unread");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
      toast.success("All notifications marked as read");
    } catch (err: any) {
      toast.error("Failed to mark all as read");
    }
  };

  const handleNotificationClick = async (notification: NotificationItem) => {
    setIsOpen(false);
    
    // Automatically mark as read if not already read
    if (!notification.isRead) {
      try {
        await notificationService.markAsRead(notification.id);
        setNotifications((prev) =>
          prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      } catch (err) {
        console.error("Failed to automatically mark notification as read:", err);
      }
    }

    const redirectUrl = notification.metadata?.redirectUrl || "/dashboard";
    router.push(redirectUrl);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={toggleDropdown}
        className="relative w-12 h-12 flex bg-warning-bg items-center justify-center rounded-lg hover:bg-hover transition-colors focus:outline-none cursor-pointer"
        aria-label="Notifications"
      >
        <Bell className="text-[#EC6F27] w-6 h-6" />
        {inAppNotifsOn && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <h3 className="font-semibold text-gray-800 text-sm md:text-base">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 focus:outline-none"
              >
                <CheckCheck size={14} />
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-[350px] overflow-y-auto divide-y divide-gray-50">
            {isLoading && notifications.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400">
                <Loader2 className="animate-spin text-primary mb-2" size={24} />
                <span className="text-xs">Loading notifications...</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-gray-400 text-center px-6">
                <BellOff size={32} className="text-gray-300 mb-3" />
                <p className="text-sm font-medium text-gray-600">No notifications yet</p>
                <p className="text-xs text-gray-400 mt-1">We will notify you when something exciting happens!</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`px-5 py-4 flex gap-3 hover:bg-gray-50 cursor-pointer transition-colors relative ${
                    !notification.isRead ? "bg-[#FFF8F2]/60" : "bg-white"
                  }`}
                >
                  {/* Icon Indicator */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    notification.type === "new_message" 
                      ? "bg-blue-50 text-blue-500" 
                      : "bg-orange-50 text-[#EC6F27]"
                  }`}>
                    {notification.type === "new_message" ? (
                      <MessageSquare size={16} />
                    ) : (
                      <Briefcase size={16} />
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className={`text-xs font-semibold truncate ${
                        !notification.isRead ? "text-gray-900" : "text-gray-600"
                      }`}>
                        {notification.title}
                      </p>
                      <span className="text-[10px] text-gray-400 shrink-0 font-medium">
                        {formatTime(notification.createdAt)}
                      </span>
                    </div>
                    <p className={`text-xs mt-1 line-clamp-2 ${
                      !notification.isRead ? "text-gray-700 font-medium" : "text-gray-500"
                    }`}>
                      {notification.message}
                    </p>
                  </div>

                  {/* Dot/Action Button */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    {!notification.isRead ? (
                      <button
                        onClick={(e) => handleMarkAsRead(notification.id, e)}
                        className="w-5 h-5 rounded-full hover:bg-orange-100 flex items-center justify-center transition-colors focus:outline-none"
                        title="Mark as read"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EC6F27]" />
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleMarkAsUnread(notification.id, e)}
                        className="w-5 h-5 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                        title="Mark as unread"
                      >
                        <Check size={12} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
