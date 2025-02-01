// order.model.ts
export interface Order {
  id?: number;
  items: OrderItem[];
  total: number;
  customerName: string;
  email: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: Date;
}

export interface OrderItem {
  coffeeId: number;
  name: string;
  quantity: number;
  price: number;
}
