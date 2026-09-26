'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, Tag, Flame, Sparkles, AlertCircle } from 'lucide-react';

export default function KeranjangPage() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const clearCart = useStore((state) => state.clearCart);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);
  const showToast = useStore((state) => state.showToast);

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  const subtotal = getCartSubtotal();
  const totalAmount = Math.max(0, subtotal - appliedDiscount);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (code === 'BARENGKU10') {
      const disc = Math.round(subtotal * 0.1);
      setAppliedDiscount(disc);
      showToast('🎉 Kupon Diskon 10% Berhasil Dipasang!');
    } else if (code === 'SUPERPEDAS') {
      setAppliedDiscount(5000);
      showToast('🎉 Potongan Rp 5.000 Berhasil Dipasang!');
    } else {
      showToast('Kode kupon tidak valid. Gunakan: BARENGKU10');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 border-2 border-red-200 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Keranjang Belanja Masih Kosong
          </h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Yuk pilih basreng renyah bumbu merah favoritmu di menu produk sebelum kehabisan!
          </p>
        </div>
        <Link
          href="/produk"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl red-gradient-bg text-white font-extrabold text-sm shadow-xl shadow-red-500/20 hover:scale-105 transition-transform"
        >
          <Flame className="w-5 h-5 text-amber-300" />
          <span>Lihat Katalog Produk Sekarang</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-8 h-8 text-red-600" />
            <span>Keranjang Belanja ({cart.length} Item)</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review ulang kuantitas dan pesanan basreng Anda sebelum melanjutkan pembayaran.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-xl border border-red-200 hover:bg-red-100 flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" />
          <span>Kosongkan Keranjang</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-red-100 shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-4 justify-between"
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                    {product.category}
                  </span>
                  <h3 className="font-extrabold text-base text-gray-900">{product.name}</h3>
                  <p className="text-xs font-bold text-red-600">{formatRupiah(product.price)} / pcs</p>
                </div>
              </div>

              {/* Quantity Controls & Actions */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                {/* Qty +/- */}
                <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors shadow-xs active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-extrabold text-sm text-gray-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors shadow-xs active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Subtotal Item */}
                <div className="text-right">
                  <span className="text-[10px] text-gray-400 block font-medium">Subtotal Item</span>
                  <span className="text-base font-extrabold text-gray-900">
                    {formatRupiah(product.price * quantity)}
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  title="Hapus dari keranjang"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Coupon Code Section */}
          <div className="bg-white p-5 rounded-3xl border border-red-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
              <Tag className="w-4 h-4 text-red-500" />
              <span>Gunakan kode kupon promo: <strong className="text-red-600">BARENGKU10</strong></span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Masukkan Kupon..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500 uppercase font-mono"
              />
              <button
                onClick={handleApplyCoupon}
                className="px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-colors shadow"
              >
                Pasang
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Subtotal Summary */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-red-100 shadow-xl space-y-5 sticky top-28">
          <h2 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-3">
            Ringkasan Pesanan
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>Subtotal Produk ({cart.reduce((a, b) => a + b.quantity, 0)} Pcs)</span>
              <span className="font-bold text-gray-900">{formatRupiah(subtotal)}</span>
            </div>

            {appliedDiscount > 0 && (
              <div className="flex items-center justify-between text-emerald-600 font-bold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Diskon Kupon
                </span>
                <span>-{formatRupiah(appliedDiscount)}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-gray-500 text-xs">
              <span>Estimasi Ongkir</span>
              <span className="italic">Dihitung saat Checkout</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-bold block">Total Sementara</span>
              <span className="text-2xl font-extrabold text-red-600">{formatRupiah(totalAmount)}</span>
            </div>
          </div>

          {/* Checkout CTA */}
          <Link
            href="/checkout"
            className="w-full py-4 rounded-2xl red-gradient-bg hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <span>Lanjut ke Form Checkout</span>
            <ArrowRight className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2 text-[11px] text-gray-400 bg-gray-50 p-3 rounded-2xl">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>Garansi bumbu merah asli & ganti baru jika terjadi kesalahan kirim.</span>
          </div>
        </div>

      </div>

    </div>
  );
}
