export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Pedas Daun Jeruk' | 'Original' | 'Spesial Rasa' | 'Bundling';
  image: string;
  spiceLevel: number; // 0 to 5
  stock: number;
  isBestSeller?: boolean;
  weightGrams: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  notes?: string;
}

export type OrderStatus = 'Menunggu Pembayaran' | 'Diproses' | 'Dikirim' | 'Selesai';

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  shippingAddress: string;
  province: string;
  city: string;
  district: string;
  courier: string; // JNE, POS, TIKI, J&T
  courierService: string;
  shippingFee: number;
  items: CartItem[];
  subtotal: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  trackingNumber?: string;
  createdAt: string;
}

export interface CourierOption {
  id: string;
  courier: string;
  service: string;
  etd: string;
  cost: number;
}
