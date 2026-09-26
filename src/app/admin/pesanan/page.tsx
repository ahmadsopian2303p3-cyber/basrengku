'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Order, OrderStatus } from '@/lib/types';
import { Truck, Search, CheckCircle2, Clock, PackageCheck, Edit3, X, ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

export default function AdminPesananPage() {
  const isAdminLoggedIn = useStore((state) => state.isAdminLoggedIn);
  const orders = useStore((state) => state.orders);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('Semua');

  // Modal State for updating status & tracking resi number
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<OrderStatus>('Diproses');
  const [resiNumber, setResiNumber] = useState('');

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-gray-900">Akses Dibatasi</h1>
        <p className="text-xs text-gray-500">Anda harus login sebagai Admin terlebih dahulu.</p>
        <Link href="/admin/login" className="inline-block px-6 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl">
          Ke Halaman Login Admin
        </Link>
      </div>
    );
  }

  const handleOpenStatusModal = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setResiNumber(order.trackingNumber || '');
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOrder) {
      updateOrderStatus(selectedOrder.id, newStatus, resiNumber);
      setSelectedOrder(null);
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const statusTabs = ['Semua', 'Menunggu Pembayaran', 'Diproses', 'Dikirim', 'Selesai'];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatusTab === 'Semua' || order.status === selectedStatusTab;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <Link href="/admin/dashboard" className="text-xs font-bold text-gray-500 hover:text-red-600 flex items-center gap-1 mb-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard Admin
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <Truck className="w-8 h-8 text-red-600" />
          <span>Manajemen Pesanan & Resi Pengiriman</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Pantau pesanan masuk, ubah status ke Diproses/Dikirim, dan input nomor resi kurir.
        </p>
      </div>

      {/* Status Tabs & Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {statusTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedStatusTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedStatusTab === tab
                    ? 'red-gradient-bg text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari ID order, nama, kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-red-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none shadow-sm"
            />
          </div>

        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-red-50/70 border-b border-red-100 text-red-900 font-extrabold">
              <tr>
                <th className="p-4">ID Transaksi</th>
                <th className="p-4">Nama Pelanggan</th>
                <th className="p-4">Alamat & Kurir</th>
                <th className="p-4">Item Basreng</th>
                <th className="p-4">Total Bayar</th>
                <th className="p-4">Status & Resi</th>
                <th className="p-4 text-right">Aksi Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4 font-mono font-bold text-gray-900">
                    <Link href={`/pesanan/${order.id}`} target="_blank" className="hover:text-red-600 flex items-center gap-1">
                      #{order.id}
                      <ExternalLink className="w-3 h-3 text-gray-400" />
                    </Link>
                  </td>

                  <td className="p-4">
                    <div className="font-extrabold text-gray-900">{order.customerName}</div>
                    <div className="text-[11px] text-gray-500">{order.customerPhone}</div>
                  </td>

                  <td className="p-4">
                    <div className="text-gray-800 font-medium line-clamp-1 max-w-xs">{order.shippingAddress}, {order.city}</div>
                    <div className="text-[11px] font-bold text-red-600">{order.courier} ({order.courierService})</div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-0.5">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-gray-700 font-medium">
                          {item.quantity}x {item.product.name}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-4 font-extrabold text-red-600 text-sm">
                    {formatRupiah(order.totalAmount)}
                    <span className="text-[10px] text-gray-400 block font-normal">{order.paymentMethod}</span>
                  </td>

                  <td className="p-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-xs ${
                      order.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : order.status === 'Dikirim'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : order.status === 'Diproses'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-red-100 text-red-800 border border-red-200'
                    }`}>
                      {order.status}
                    </span>
                    {order.trackingNumber && (
                      <div className="text-[11px] font-mono text-gray-600 font-bold mt-1">
                        Resi: {order.trackingNumber}
                      </div>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenStatusModal(order)}
                      className="px-3.5 py-2 rounded-xl bg-gray-900 text-white font-bold text-xs hover:bg-red-600 transition-colors shadow flex items-center gap-1.5 ml-auto"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Update Status</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPDATE STATUS & RESI MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-500/20 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-base text-gray-900">
                Update Status Pesanan #{selectedOrder.id}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Pilih Status Baru</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as OrderStatus)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-bold text-gray-800 focus:ring-2 focus:ring-red-500 focus:outline-none"
                >
                  <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                  <option value="Diproses">Diproses (Kemasi Dapur)</option>
                  <option value="Dikirim">Dikirim (Serah Kurir)</option>
                  <option value="Selesai">Selesai (Sampai Diterima)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">
                  Nomor Resi Airwaybill ({selectedOrder.courier})
                </label>
                <input
                  type="text"
                  placeholder="Contoh: JNE882910394 / JT981048201"
                  value={resiNumber}
                  onChange={(e) => setResiNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-mono text-sm uppercase focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl red-gradient-bg text-white font-extrabold shadow-md hover:scale-105 transition-transform"
                >
                  Simpan Status & Resi
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
