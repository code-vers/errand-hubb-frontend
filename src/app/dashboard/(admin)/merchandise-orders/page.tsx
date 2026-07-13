'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { merchandiseOrdersService } from '@/services/merchandiseOrdersService';
import PageHeader from '@/components/dashboard/common/PageHeader';
import { Search, Loader2, Eye, X, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

const STATUSES = [
  { value: 'pending', label: 'Pending', color: '#F59E0B', bg: '#FEF3C7' },
  { value: 'accepted', label: 'Accepted', color: '#3B82F6', bg: '#DBEAFE' },
  { value: 'shipped', label: 'Shipped', color: '#6366F1', bg: '#E0E7FF' },
  { value: 'delivered', label: 'Delivered', color: '#10B981', bg: '#D1FAE5' },
  { value: 'cancelled', label: 'Cancelled', color: '#EF4444', bg: '#FEE2E2' },
];

export default function MerchandiseOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState('');
  
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await merchandiseOrdersService.getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
      toast.error('Failed to load merchandise orders');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (order: any) => {
    setSelectedOrder(order);
    setStatusUpdate(order.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  const handleStatusUpdate = async () => {
    if (!selectedOrder) return;
    try {
      await merchandiseOrdersService.updateOrderStatus(selectedOrder.id, statusUpdate);
      toast.success('Order status updated successfully');
      fetchOrders(); // Refresh list
      closeModal();
    } catch (error) {
      console.error('Failed to update status', error);
      toast.error('Failed to update order status');
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesStatus = activeStatus === 'all' || order.status === activeStatus;
      const matchesSearch = searchInput === '' || 
        order.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchInput.toLowerCase()) ||
        order.id?.toLowerCase().includes(searchInput.toLowerCase());
      
      return matchesStatus && matchesSearch;
    });
  }, [orders, activeStatus, searchInput]);

  const statusOptions = [
    { value: 'all', label: 'All Orders', count: orders.length },
    ...STATUSES.map((s) => ({
      ...s,
      count: orders.filter((o) => o.status === s.value).length,
    })),
  ];

  return (
    <div className="w-full p-6 pt-8 font-sans bg-[#F9FAFB] min-h-screen">
      <div className="mb-8">
        <PageHeader title="Merchandise Orders Management" />
      </div>

      <main className="space-y-6">
        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusOptions.map((opt) => {
            const isActive = activeStatus === opt.value;
            const activeBg = opt.value === 'all' ? '#EC6F27' : (opt as any).color || '#EC6F27';

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
              placeholder="Search by customer name, email, or order ID..."
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400 outline-none transition-all text-sm placeholder:text-gray-400"
            />
          </div>
          <button
            onClick={fetchOrders}
            className="px-6 py-3 rounded-xl font-bold text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all shadow-sm"
          >
            Refresh
          </button>
        </div>

        {/* Table View */}
        {isLoading ? (
          <div className="py-16 text-center">
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-[#EC6F27]" />
            <p className="mt-4 text-gray-500">Loading merchandise orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl p-16 text-center shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 font-sans">No orders found</h3>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto text-sm">
              No merchandise orders match your current filters or search criteria.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-gray-400 uppercase text-[10px] font-extrabold tracking-wider">
                    <th className="py-4 px-6">Order ID / Date</th>
                    <th className="py-4 px-6">Customer</th>
                    <th className="py-4 px-6">Total Amount</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredOrders.map((order: any) => {
                    const statusConfig = STATUSES.find((s) => s.value === order.status) || { label: order.status, color: '#6B7280', bg: '#F3F4F6' };

                    return (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-bold text-gray-900 line-clamp-1">{order.id.split('-')[0].toUpperCase()}</div>
                          <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                            {format(new Date(order.createdAt), "MMM dd, yyyy")}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-[#EC6F27] text-white shrink-0 flex items-center justify-center font-bold text-xs">
                              {order.name?.[0]?.toUpperCase() || 'C'}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-800">{order.name}</div>
                              <div className="text-[10px] text-gray-400">{order.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="font-semibold text-gray-800">
                            ${parseFloat(order.totalAmount).toFixed(2)}
                          </div>
                          <div className="text-[10px] text-gray-500 mt-0.5">
                            {order.items?.length || 0} items
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
                          <button
                            onClick={() => openModal(order)}
                            className="px-3 py-1.5 rounded-lg text-xs font-bold text-[#EC6F27] bg-[#EC6F27]/10 hover:bg-[#EC6F27]/20 transition-colors inline-flex items-center gap-1"
                          >
                            <Eye size={14} /> View Details
                          </button>
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

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-extrabold text-gray-800">Order #{selectedOrder.id.split('-')[0].toUpperCase()}</h2>
                <p className="text-xs text-gray-500 font-semibold">{format(new Date(selectedOrder.createdAt), "MMMM dd, yyyy 'at' h:mm a")}</p>
              </div>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-grow bg-gray-50/30">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">Customer Details</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#EC6F27]/10 text-[#EC6F27] flex items-center justify-center font-bold">
                      {selectedOrder.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{selectedOrder.name}</p>
                      <p className="text-sm text-gray-500">{selectedOrder.email}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <MapPin size={12} /> Shipping Address
                  </h3>
                  <p className="text-sm text-gray-800 font-medium">{selectedOrder.address}</p>
                  <p className="text-sm text-gray-600">{selectedOrder.city}, {selectedOrder.state} {selectedOrder.zipCode}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Ordered Items</h3>
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <table className="min-w-full divide-y divide-gray-100">
                    <thead className="bg-gray-50/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-[10px] font-extrabold text-gray-400 uppercase">Item</th>
                        <th className="px-4 py-3 text-center text-[10px] font-extrabold text-gray-400 uppercase">Qty</th>
                        <th className="px-4 py-3 text-right text-[10px] font-extrabold text-gray-400 uppercase">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedOrder.items && Array.isArray(selectedOrder.items) && selectedOrder.items.map((item: any, idx: number) => (
                        <tr key={idx} className="hover:bg-gray-50/30">
                          <td className="px-4 py-3 text-sm text-gray-800 font-semibold">{item.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 text-center font-medium">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm text-gray-800 text-right font-medium">${item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50/80">
                      <tr>
                        <td colSpan={2} className="px-4 py-4 text-xs font-extrabold text-gray-600 text-right uppercase tracking-wider">Total:</td>
                        <td className="px-4 py-4 text-base font-extrabold text-[#EC6F27] text-right">${parseFloat(selectedOrder.totalAmount).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-3">Update Order Status</h3>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <select 
                    value={statusUpdate}
                    onChange={(e) => setStatusUpdate(e.target.value)}
                    className="block w-full sm:w-[200px] pl-3 pr-8 py-2.5 text-sm font-semibold border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#EC6F27]/20 focus:border-[#EC6F27] rounded-lg border bg-gray-50 appearance-none"
                  >
                    {STATUSES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                  <button 
                    onClick={handleStatusUpdate}
                    disabled={statusUpdate === selectedOrder.status}
                    className="w-full sm:w-auto bg-[#EC6F27] text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-[#d66519] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
