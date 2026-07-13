'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { adminUsersService } from '@/services/adminUsersService';
import PageHeader from '@/components/dashboard/common/PageHeader';
import { Search, Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { getImageUrl } from '@/configs/api.config';

const STATUSES = [
  { value: 'active', label: 'Active', color: '#10B981', bg: '#D1FAE5' },
  { value: 'pending', label: 'Pending', color: '#F59E0B', bg: '#FEF3C7' },
  { value: 'deactivated', label: 'Blocked', color: '#EF4444', bg: '#FEE2E2' },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  const [userToConfirm, setUserToConfirm] = useState<any>(null);
  const [isConfirmingBlock, setIsConfirmingBlock] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await adminUsersService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const openConfirmModal = (user: any) => {
    setUserToConfirm(user);
    setIsConfirmingBlock(true);
  };

  const executeToggleBlock = async () => {
    if (!userToConfirm) return;
    
    setIsProcessing(true);
    const isCurrentlyBlocked = userToConfirm.status === 'deactivated';
    const newStatus = isCurrentlyBlocked ? 'active' : 'deactivated';

    try {
      await adminUsersService.updateUserStatus(userToConfirm.id, newStatus);
      toast.success(`User successfully ${isCurrentlyBlocked ? 'unblocked' : 'blocked'}`);
      
      // Update local state without refetching all users
      setUsers(prev => prev.map(u => u.id === userToConfirm.id ? { ...u, status: newStatus } : u));
      setIsConfirmingBlock(false);
      setUserToConfirm(null);
    } catch (error) {
      console.error('Failed to update user status', error);
      toast.error('Failed to update user status');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesStatus = activeStatus === 'all' || user.status === activeStatus;
      const searchStr = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase();
      const matchesSearch = searchInput === '' || searchStr.includes(searchInput.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [users, activeStatus, searchInput]);

  const statusOptions = [
    { value: 'all', label: 'All Users', count: users.length },
    ...STATUSES.map((s) => ({
      ...s,
      count: users.filter((u) => u.status === s.value).length,
    })),
  ];

  return (
    <div className="w-full p-6 pt-8 font-sans bg-[#F9FAFB] min-h-screen">
      <div className="mb-8">
        <PageHeader title="User Management" />
      </div>

      <main className="space-y-6">
        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusOptions.map((opt) => {
            const isActive = activeStatus === opt.value;
            const activeBg = opt.value === 'all' ? '#EC6F27' : opt.color || '#EC6F27';

            return (
              <button
                key={opt.value}
                onClick={() => setActiveStatus(opt.value)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'bg-white text-gray-500 border border-gray-100 hover:border-orange-200'
                }`}
                style={isActive ? { backgroundColor: activeBg } : undefined}
              >
                {opt.label}
                {opt.count > 0 && (
                  <span className={`ml-1.5 py-0.5 px-1.5 rounded-full text-[9px] ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {opt.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative flex items-center">
            <span className="absolute left-4 text-orange-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by user name or email..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={fetchUsers}
            className="px-6 py-3 rounded-xl font-bold text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all shadow-sm"
          >
            Refresh
          </button>
        </div>

        {/* Table View */}
        {isLoading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-[#EC6F27]" />
            <p className="mt-4 text-gray-500">Loading users...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 font-sans">No users found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm">
              No users match your current filters or search criteria.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-extrabold tracking-wider">
                    <th className="py-4 px-6">User</th>
                    <th className="py-4 px-6">Role</th>
                    <th className="py-4 px-6">Joined Date</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredUsers.map((user: any) => {
                    const statusConfig = STATUSES.find((s) => s.value === user.status) || { label: user.status, color: '#6B7280', bg: '#F3F4F6' };
                    const isBlocked = user.status === 'deactivated';

                    return (
                      <tr key={user.id} className={`hover:bg-gray-50/50 transition-colors ${isBlocked ? 'opacity-70 bg-red-50/30' : ''}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-100 flex items-center justify-center">
                              {user.profileImage ? (
                                <img
                                  src={getImageUrl(user.profileImage)}
                                  alt={`${user.firstName} ${user.lastName}`}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="font-bold text-gray-500 text-sm">{user.firstName?.[0]?.toUpperCase()}</span>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{user.firstName} {user.lastName}</div>
                              <div className="text-[11px] text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-700">
                            {user.role}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-xs text-gray-500 font-semibold">
                            {format(new Date(user.createdAt), "MMM dd, yyyy")}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span 
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider inline-block"
                            style={{ color: statusConfig.color, backgroundColor: statusConfig.bg }}
                          >
                            {statusConfig.label}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-right">
                          {user.role !== 'admin' && (
                            <button
                              onClick={() => openConfirmModal(user)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 ${
                                isBlocked 
                                  ? 'text-[#10B981] bg-[#10B981]/10 hover:bg-[#10B981]/20' 
                                  : 'text-[#EF4444] bg-[#EF4444]/10 hover:bg-[#EF4444]/20'
                              }`}
                            >
                              {isBlocked ? (
                                <>
                                  <ShieldCheck size={14} /> Unblock
                                </>
                              ) : (
                                <>
                                  <ShieldAlert size={14} /> Block
                                </>
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      {isConfirmingBlock && userToConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="p-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${userToConfirm.status === 'deactivated' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
                {userToConfirm.status === 'deactivated' ? <ShieldCheck size={24} /> : <ShieldAlert size={24} />}
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {userToConfirm.status === 'deactivated' ? 'Unblock' : 'Block'} User
              </h2>
              <p className="text-gray-500 text-sm">
                Are you sure you want to {userToConfirm.status === 'deactivated' ? 'unblock' : 'block'} <strong className="text-gray-700">{userToConfirm.firstName} {userToConfirm.lastName}</strong>? 
                {userToConfirm.status !== 'deactivated' && " They will not be able to log in to the platform anymore."}
              </p>
            </div>
            <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsConfirmingBlock(false);
                  setUserToConfirm(null);
                }}
                disabled={isProcessing}
                className="px-4 py-2 rounded-lg font-bold text-sm text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={executeToggleBlock}
                disabled={isProcessing}
                className={`px-4 py-2 rounded-lg font-bold text-sm text-white transition-colors flex items-center gap-2 ${
                  userToConfirm.status === 'deactivated' ? 'bg-[#10B981] hover:bg-[#059669]' : 'bg-[#EF4444] hover:bg-[#DC2626]'
                }`}
              >
                {isProcessing && <Loader2 size={16} className="animate-spin" />}
                {userToConfirm.status === 'deactivated' ? 'Yes, Unblock' : 'Yes, Block'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
