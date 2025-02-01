export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  customerName: string;
  email: string;
  phone?: string;
  notes?: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed';
  date: string;
}
