'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { MOCK_COURIERS } from '@/lib/data';
import { Order, CourierOption } from '@/lib/types';
import PaymentModal from '@/components/PaymentModal';
import { CreditCard, Truck, User, Phone, MapPin, Mail, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useStore((state) => state.cart);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);
  const addOrder = useStore((state) => state.addOrder);
  const showToast = useStore((state) => state.showToast);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [province, setProvince] = useState('Lampung');
  const [city, setCity] = useState('Kota Metro');
  const [district, setDistrict] = useState('Metro Pusat');

  // Selected Courier
  const [selectedCourier, setSelectedCourier] = useState<CourierOption>(MOCK_COURIERS[0]);
  const [paymentMethod, setPaymentMethod] = useState('QRIS');

  // Active Created Order for Payment Modal
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const subtotal = getCartSubtotal();
  const shippingFee = selectedCourier.cost;
  const totalAmount = subtotal + shippingFee;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleCreateOrderAndPay = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !customerPhone || !shippingAddress) {
      showToast('Harap lengkapi nama, nomor telepon, dan alamat pengiriman!');
      return;
    }

    if (cart.length === 0) {
      showToast('Keranjang Anda kosong!');
      router.push('/produk');
      return;
    }

    const newOrder = addOrder({
      customerName,
      customerPhone,
      customerEmail: customerEmail || `${customerName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      shippingAddress,
      province,
      city,
      district,
      courier: selectedCourier.courier,
      courierService: selectedCourier.service,
      shippingFee,
      items: cart,
      subtotal,
      discount: 0,
      totalAmount,
      status: 'Diproses',
      paymentMethod,
    });

    setActiveOrder(newOrder);
  };

  if (cart.length === 0 && !activeOrder) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-gray-900">Keranjang Belanja Kosong</h1>
        <p className="text-xs text-gray-500">Silakan pilih produk terlebih dahulu sebelum checkout.</p>
        <button
          onClick={() => router.push('/produk')}
          className="px-6 py-3 bg-red-600 text-white text-xs font-bold rounded-xl shadow"
        >
          Ke Menu Produk
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

      {/* Title */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
          <CreditCard className="w-8 h-8 text-red-600" />
          <span>Checkout & Formulir Pengiriman</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Lengkapi data penerima dan pilih kurir pengiriman otomatis RajaOngkir.
        </p>
      </div>

      <form onSubmit={handleCreateOrderAndPay} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Form: Data Diri & Kurir */}
        <div className="lg:col-span-8 space-y-6">

          {/* Card 1: Data Penerima */}
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <User className="w-5 h-5 text-red-600" />
              <span>Data Penerima Pesanan</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Nomor WhatsApp / HP *</label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="font-bold text-gray-700 block mb-1">Alamat Email (Opsional)</label>
                <input
                  type="email"
                  placeholder="budi@gmail.com (Untuk bukti invoice elektronik)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Alamat Pengiriman */}
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <MapPin className="w-5 h-5 text-red-600" />
              <span>Alamat Pengiriman Lengkap</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Provinsi</label>
                <input
                  type="text"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Kota / Kabupaten</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Kecamatan</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 font-medium"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="font-bold text-gray-700 block mb-1">Alamat Jalan, No. Rumah, RT/RW *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Contoh: Jl. Ahmad Yani No. 45, Iringmulyo, Dekat Lapangan Ganjar Asri"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Pilihan Kurir (Integrasi RajaOngkir Mock) */}
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-red-600" />
                <span>Pilih Kurir Pengiriman (RajaOngkir)</span>
              </div>
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2.5 py-0.5 rounded-full">
                Cek Tarif Otomatis
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {MOCK_COURIERS.map((c) => (
                <label
                  key={c.id}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${selectedCourier.id === c.id
                    ? 'border-red-600 bg-red-50/70 shadow-sm'
                    : 'border-gray-200 bg-white hover:border-red-200'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="courier"
                      checked={selectedCourier.id === c.id}
                      onChange={() => setSelectedCourier(c)}
                      className="accent-red-600 w-4 h-4"
                    />
                    <div>
                      <span className="font-extrabold text-xs text-gray-900 block">
                        {c.courier} - {c.service}
                      </span>
                      <span className="text-[11px] text-gray-500">Estimasi {c.etd}</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs text-red-600">
                    {formatRupiah(c.cost)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Card 4: Metode Pembayaran Gateway */}
          <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm space-y-4">
            <h2 className="text-base font-extrabold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
              <ShieldCheck className="w-5 h-5 text-red-600" />
              <span>Metode Pembayaran</span>
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'QRIS', label: 'QRIS All Payment' },
                { id: 'Virtual Account', label: 'Virtual Account BCA/BRI/BNI' },
                { id: 'E-Wallet', label: 'GoPay / OVO / Dana' },
              ].map((pm) => (
                <button
                  type="button"
                  key={pm.id}
                  onClick={() => setPaymentMethod(pm.id)}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${paymentMethod === pm.id
                    ? 'border-red-600 bg-red-600 text-white shadow-md'
                    : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {pm.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Ringkasan Total & CTA */}
        <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-red-100 shadow-xl space-y-6 sticky top-28">
          <h2 className="text-lg font-extrabold text-gray-900 border-b border-gray-100 pb-3">
            Rincian Pembayaran
          </h2>

          {/* Item List Summary */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <span className="font-bold text-gray-900 block line-clamp-1">{product.name}</span>
                  <span className="text-gray-500">{quantity}x @ {formatRupiah(product.price)}</span>
                </div>
                <span className="font-extrabold text-gray-800">
                  {formatRupiah(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal Basreng</span>
              <span className="font-bold text-gray-900">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Ongkos Kirim ({selectedCourier.courier})</span>
              <span className="font-bold text-gray-900">{formatRupiah(shippingFee)}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-bold block">Total Yang Harus Dibayar</span>
              <span className="text-2xl font-extrabold text-red-600">{formatRupiah(totalAmount)}</span>
            </div>
          </div>

          {/* BAYAR SEKARANG BUTTON */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl red-gradient-bg hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <CreditCard className="w-5 h-5 text-amber-300" />
            <span>Bayar Sekarang</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>

          <div className="text-[11px] text-gray-500 text-center space-y-1">
            <p className="flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Verifikasi otomatis 24 Jam Nonstop</span>
            </p>
          </div>
        </div>

      </form>

      {/* MIDTRANS / XENDIT POPUP MODAL */}
      {activeOrder && (
        <PaymentModal
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}

    </div>
  );
}
