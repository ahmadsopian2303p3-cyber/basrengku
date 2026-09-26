import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Order, OrderStatus } from './types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data';

interface StoreState {
  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartSubtotal: () => number;
  getCartCount: () => number;

  // Products state (Admin & Catalog sync)
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Orders state
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  getOrderById: (orderId: string) => Order | undefined;

  // Admin Auth state
  isAdminLoggedIn: boolean;
  loginAdmin: (email: string, pass: string) => boolean;
  logoutAdmin: () => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart implementation
      cart: [],
      addToCart: (product, quantity = 1) => {
        const currentCart = get().cart;
        const existingIndex = currentCart.findIndex((item) => item.product.id === product.id);

        if (existingIndex > -1) {
          const updated = [...currentCart];
          updated[existingIndex].quantity += quantity;
          set({ cart: updated });
        } else {
          set({ cart: [...currentCart, { product, quantity }] });
        }
        get().showToast(`Success! ${product.name} dimasukkan ke keranjang.`);
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter((item) => item.product.id !== productId) });
        get().showToast('Item telah dihapus dari keranjang.');
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartSubtotal: () => {
        return get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
      },
      getCartCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      // Products implementation
      products: INITIAL_PRODUCTS,
      addProduct: (newProdData) => {
        const newId = `prod-${Date.now()}`;
        const newProd: Product = { ...newProdData, id: newId };
        set({ products: [newProd, ...get().products] });
        get().showToast('Produk baru berhasil ditambahkan!');
        return newProd;
      },
      updateProduct: (id, updated) => {
        set({
          products: get().products.map((p) => (p.id === id ? { ...p, ...updated } : p)),
        });
        get().showToast('Data produk berhasil diperbarui.');
      },
      deleteProduct: (id) => {
        set({ products: get().products.filter((p) => p.id !== id) });
        get().showToast('Produk telah dihapus.');
      },

      // Orders implementation
      orders: INITIAL_ORDERS,
      addOrder: (orderData) => {
        const orderId = `BRG-${Math.floor(10000 + Math.random() * 90000)}`;
        const newOrder: Order = {
          ...orderData,
          id: orderId,
          status: 'Diproses', // Otomatis langsung diproses tanpa persetujuan manual admin
          createdAt: new Date().toISOString(),
        };
        set({ orders: [newOrder, ...get().orders] });
        get().clearCart();
        get().showToast('🎉 Pesanan berhasil dibuat & LANGSUNG DIPROSES oleh Toko!');
        return newOrder;
      },
      updateOrderStatus: (orderId, status, trackingNumber) => {
        set({
          orders: get().orders.map((order) => {
            if (order.id === orderId) {
              return {
                ...order,
                status,
                ...(trackingNumber ? { trackingNumber } : {}),
              };
            }
            return order;
          }),
        });
        get().showToast(`Status pesanan ${orderId} diubah menjadi "${status}".`);
      },
      getOrderById: (orderId) => {
        return get().orders.find((o) => o.id.toLowerCase() === orderId.toLowerCase());
      },

      // Admin Auth implementation
      isAdminLoggedIn: false,
      loginAdmin: (email, pass) => {
        const cleanEmail = email.trim().toLowerCase();
        // Strict secret admin credentials
        const isValidAdmin = 
          (cleanEmail === 'ahmadsopian@barengku.com' || cleanEmail === 'ahmadsopian') && 
          pass === 'AdminBasreng2026!';

        if (isValidAdmin) {
          set({ isAdminLoggedIn: true });
          get().showToast('Selamat datang Admin Utama Barengku!');
          return true;
        }
        
        get().showToast('Email/Username atau password admin salah!');
        return false;
      },
      logoutAdmin: () => {
        set({ isAdminLoggedIn: false });
        get().showToast('Anda telah keluar dari halaman Admin.');
      },

      // Toast implementation
      toastMessage: null,
      showToast: (msg) => {
        set({ toastMessage: msg });
        setTimeout(() => {
          if (get().toastMessage === msg) {
            set({ toastMessage: null });
          }
        }, 3500);
      },
      clearToast: () => set({ toastMessage: null }),
    }),
    {
      name: 'barengku-storage-v1',
      partialize: (state) => ({
        cart: state.cart,
        products: state.products,
        orders: state.orders,
      }),
    }
  )
);
