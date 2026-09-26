'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import {
  TrendingUp,
  DollarSign,
  Package,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  PlusCircle,
  Truck
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';

export default function AdminDashboardPage() {
  const router = useRouter();
  const isAdminLoggedIn = useStore((state) => state.isAdminLoggedIn);
  const logoutAdmin = useStore((state) => state.logoutAdmin);
  const orders = useStore((state) => state.orders);
  const products = useStore((state) => state.products);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h1 className="text-2xl font-extrabold text-gray-900">Akses Dibatasi</h1>
        <p className="text-xs text-gray-500">Anda harus login sebagai Admin terlebih dahulu.</p>
        <Link href="/admin/login" className="inline-block px-6 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl">
          Ke Halaman Login Admin
        </Link>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders
    .filter((o) => o.status !== 'Menunggu Pembayaran')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const completedOrders = orders.filter((o) => o.status === 'Selesai').length;
  const pendingProcessOrders = orders.filter((o) => o.status === 'Diproses').length;
  const activeProductsCount = products.length;

  // Chart Data: Weekly Sales Trend
  const salesChartData = [
    { day: 'Senin', sales: 420000 },
    { day: 'Selasa', sales: 580000 },
    { day: 'Rabu', sales: 350000 },
    { day: 'Kamis', sales: 890000 },
    { day: 'Jumat', sales: 1200000 },
    { day: 'Sabtu', sales: 1650000 },
    { day: 'Minggu', sales: 1400000 },
  ];

  // Status breakdown data
  const statusData = [
    { name: 'Menunggu', count: orders.filter((o) => o.status === 'Menunggu Pembayaran').length, color: '#EF4444' },
    { name: 'Diproses', count: orders.filter((o) => o.status === 'Diproses').length, color: '#F59E0B' },
    { name: 'Dikirim', count: orders.filter((o) => o.status === 'Dikirim').length, color: '#3B82F6' },
    { name: 'Selesai', count: orders.filter((o) => o.status === 'Selesai').length, color: '#10B981' },
  ];

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header Admin Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-red-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl red-gradient-bg flex items-center justify-center text-white border border-amber-400 shadow">
            <ShieldCheck className="w-7 h-7 text-amber-300" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
              Dashboard Utama Admin
            </h1>
            <p className="text-xs text-gray-500">
              Ringkasan Penjualan & Performa Toko Barengku Metro
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/admin/produk"
            className="px-4 py-2.5 rounded-xl bg-red-50 text-red-700 font-bold text-xs hover:bg-red-100 border border-red-200 flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" />
            <span>Manajemen Produk</span>
          </Link>

          <Link
            href="/admin/pesanan"
            className="px-4 py-2.5 rounded-xl red-gradient-bg text-white font-bold text-xs hover:bg-red-700 shadow-md flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4" />
            <span>Pesanan Masuk</span>
          </Link>

          <button
            onClick={() => {
              logoutAdmin();
              router.push('/admin/login');
            }}
            className="px-3.5 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold text-xs hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* METRICS STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Card 1: Total Pendapatan */}
        <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-lg shadow-red-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Pendapatan</span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{formatRupiah(totalRevenue)}</div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% dari minggu lalu</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pesanan Sukses */}
        <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-lg shadow-red-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pesanan Sukses</span>
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{completedOrders} Pesanan</div>
            <div className="text-[11px] text-gray-500 mt-1">Status Lunas & Terkirim</div>
          </div>
        </div>

        {/* Card 3: Perlu Diproses */}
        <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-lg shadow-red-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Menunggu Diproses</span>
            <div className="p-2.5 rounded-2xl bg-amber-50 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-amber-600">{pendingProcessOrders} Pesanan</div>
            <div className="text-[11px] text-amber-700 font-bold mt-1">Siap dikemas Dapur Metro</div>
          </div>
        </div>

        {/* Card 4: Total Produk Aktif */}
        <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-lg shadow-red-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Katalog Produk</span>
            <div className="p-2.5 rounded-2xl bg-red-50 text-red-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-extrabold text-gray-900">{activeProductsCount} Varian</div>
            <div className="text-[11px] text-gray-500 mt-1">Siap order online</div>
          </div>
        </div>

      </div>

      {/* RECHARTS SALES CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Area Chart: Grafik Penjualan */}
        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-red-100 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-gray-900">Grafik Penjualan Mingguan</h2>
              <p className="text-xs text-gray-500">Tren uang masuk (Rp) per hari selama 7 hari terakhir</p>
            </div>
            <span className="text-xs font-extrabold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              Recharts Live Analytics
            </span>
          </div>

          <div className="h-72 w-full pt-2">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesChartData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(val) => `Rp${val / 1000}k`} />
                  <Tooltip
                    formatter={(value: any) => [formatRupiah(Number(value)), 'Penjualan']}
                    contentStyle={{ borderRadius: '16px', border: '1px solid #FCA5A5', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#DC2626" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Right Bar Chart: Order Status Breakdown */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-red-100 shadow-xl space-y-4">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-lg font-extrabold text-gray-900">Status Pesanan</h2>
            <p className="text-xs text-gray-500">Distribusi pesanan masuk berdasarkan status</p>
          </div>

          <div className="h-64 w-full">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#4B5563' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#4B5563' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <Link
              href="/admin/pesanan"
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <span>Kelola Daftar Transaksi</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

      {/* RECENT TRANSACTIONS TABLE SNAPSHOT */}
      <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h2 className="text-lg font-extrabold text-gray-900">Transaksi Terbaru Masuk</h2>
          <Link href="/admin/pesanan" className="text-xs font-bold text-red-600 hover:underline">
            Lihat Semua Pesanan ({orders.length}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500 font-bold">
                <th className="pb-3">ID Pesanan</th>
                <th className="pb-3">Pelanggan</th>
                <th className="pb-3">Kota</th>
                <th className="pb-3">Total</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-3 font-mono font-bold text-gray-900">#{order.id}</td>
                  <td className="py-3 font-bold text-gray-800">{order.customerName}</td>
                  <td className="py-3 text-gray-600">{order.city}</td>
                  <td className="py-3 font-extrabold text-red-600">{formatRupiah(order.totalAmount)}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      order.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.status === 'Dikirim'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'Diproses'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString('id-ID')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
