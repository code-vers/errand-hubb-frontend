import api from './api/axios';

export interface MerchandiseOrderData {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  items: any;
  totalAmount: number;
}

export const merchandiseOrdersService = {
  createOrder: async (data: MerchandiseOrderData) => {
    const response = await api.post('/merchandise-orders', data);
    return response.data;
  },

  getAllOrders: async () => {
    const response = await api.get('/merchandise-orders');
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string) => {
    const response = await api.patch(`/merchandise-orders/${id}/status`, { status });
    return response.data;
  }
};
