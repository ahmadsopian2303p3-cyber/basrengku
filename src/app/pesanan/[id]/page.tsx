'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import PaymentModal from '@/components/PaymentModal';
import { CheckCircle2, Clock, Truck, Package, Copy, ArrowLeft, ShieldCheck, Flame, CreditCard } from 'lucide-react';

export default function PesananPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const getOrderById = useStore((state) => state.getOrderById);
  const showToast = useStore((state) => state.showToast);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedResi, setCopiedResi] = useState(false);

  const order = getOrderById(orderId);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleCopyResi = () => {
    if (order?.trackingNumber) {
      navigator.clipboard.writeText(order.trackingNumber);
      setCopiedResi(true);
      showToast(`Nomor resi ${order.trackingNumber} tersalin!`);
      setTimeout(() => setCopiedResi(false), 2000);
    }
  };

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-gray-900">Pesanan Tidak Ditemukan</h1>
        <p className="text-xs text-gray-500">Nomor pesanan ID #{orderId} tidak terdaftar di sistem.</p>
        <Link href="/produk" className="inline-block px-6 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl">
          Kembali ke Menu Produk
        </Link>
      </div>
    );
  }

  const steps = [
    { title: 'Pesanan Dibuat', done: true, time: new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { title: 'Pembayaran Lunas', done: order.status !== 'Menunggu Pembayaran', time: 'Otomatis' },
    { title: 'Diproses Toko', done: order.status === 'Diproses' || order.status === 'Dikirim' || order.status === 'Selesai', time: 'Dapur Metro' },
    { title: 'Diserahkan Kurir', done: order.status === 'Dikirim' || order.status === 'Selesai', time: order.trackingNumber || 'Pending Resi' },
    { title: 'Selesai Diterima', done: order.status === 'Selesai', time: 'Tujuan' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-red-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>
        <span className="text-xs text-gray-400 font-mono">ID Pesanan: #{order.id}</span>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-100 shadow-xl space-y-8">
        
        {/* Status Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 font-medium">Status Transaksi</span>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold shadow-sm ${
                order.status === 'Selesai'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : order.status === 'Dikirim'
                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                  : order.status === 'Diproses'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-red-100 text-red-800 border border-red-200 animate-pulse'
              }`}>
                {order.status}
              </span>
              <span className="text-xs text-gray-500">• Metoda: {order.paymentMethod}</span>
            </div>
          </div>

          {order.status === 'Menunggu Pembayaran' && (
            <button
              onClick={() => setShowPaymentModal(true)}
              className="px-6 py-3 rounded-2xl red-gradient-bg text-white font-extrabold text-xs shadow-lg shadow-red-500/30 flex items-center gap-2 hover:scale-105 transition-all"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>Bayar Sekarang (Midtrans)</span>
            </button>
          )}
        </div>

        {/* Tracking Timeline */}
        <div className="space-y-4">
          <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-red-600" />
            <span>Status Pengiriman Kurir ({order.courier})</span>
          </h2>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center space-y-1.5 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  step.done ? 'bg-red-600 text-white shadow' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.done ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                </div>
                <span className="text-xs font-bold text-gray-800 leading-tight">{step.title}</span>
                <span className="text-[10px] text-gray-400 font-mono">{step.time}</span>
              </div>
            ))}
          </div>

          {/* Resi Box */}
          {order.trackingNumber && (
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-xs text-amber-800 font-bold block">Nomor Resi {order.courier}:</span>
                <span className="font-mono text-base font-extrabold text-gray-900">{order.trackingNumber}</span>
              </div>
              <button
                onClick={handleCopyResi}
                className="px-3 py-1.5 bg-amber-400 text-gray-950 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-amber-300 shadow-xs"
              >
                <Copy className="w-4 h-4" />
                <span>{copiedResi ? 'Tersalin!' : 'Salin Resi'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Order Items Review */}
        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-red-600" />
            <span>Rincian Produk Diorder</span>
          </h2>

          <div className="space-y-2">
            {order.items.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 font-bold">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 block">{product.name}</span>
                    <span className="text-gray-500">{quantity}x @ {formatRupiah(product.price)}</span>
                  </div>
                </div>
                <span className="font-extrabold text-gray-900">{formatRupiah(product.price * quantity)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total Cost Breakdown */}
        <div className="bg-red-50/70 p-5 rounded-2xl border border-red-100 space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal Produk</span>
            <span className="font-bold">{formatRupiah(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Ongkos Kirim ({order.courier})</span>
            <span className="font-bold">{formatRupiah(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-red-600 pt-2 border-t border-red-200">
            <span>Total Pembayaran</span>
            <span>{formatRupiah(order.totalAmount)}</span>
          </div>
        </div>

      </div>

      {/* Payment Gateway Modal */}
      {showPaymentModal && (
        <PaymentModal
          order={order}
          onClose={() => setShowPaymentModal(false)}
        />
      )}

    </div>
  );
}
