'use client';

import Link from 'next/link';
import { Flame, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { STORE_INFO } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-10 border-t-4 border-red-600 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-gray-800">

          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl red-gradient-bg flex items-center justify-center text-white border border-amber-400">
                <Flame className="w-5 h-5 text-amber-300" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Bareng<span className="text-red-500">ku</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Pelopor Basreng Super Pedas Daun Jeruk khas Metro Lampung. Dibuat dari olahan bakso ikan segar pilihan dengan racikan bumbu rempah asli 100% tanpa pengawet buatan.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-amber-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Garansi 100% Renyah & Higienis</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-red-500 pl-3">
              Navigasi Halaman
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-red-400 transition-colors flex items-center gap-2">
                  <span>›</span> Beranda
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-red-400 transition-colors flex items-center gap-2">
                  <span>›</span> Katalog Produk Basreng
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-red-400 transition-colors flex items-center gap-2">
                  <span>›</span> Tentang Kami & Outlet Metro
                </Link>
              </li>
              <li>
                <Link href="/keranjang" className="hover:text-red-400 transition-colors flex items-center gap-2">
                  <span>›</span> Keranjang Belanja
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Location */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-red-500 pl-3">
              Kontak & Outlet
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href={`https://wa.me/${STORE_INFO.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-red-400">
                  {STORE_INFO.phone} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <span>{STORE_INFO.email}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="text-xs text-amber-300 font-medium">{STORE_INFO.openHours}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Payment Methods */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white uppercase tracking-wider border-l-2 border-red-500 pl-3">
              Pembayaran Otomatis
            </h3>
            <p className="text-xs text-gray-400">
              Mendukung penuh pembayaran instan via:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {['QRIS', 'BCA', 'BRI', 'BNI', 'SeaBank', 'GoPay', 'OVO', 'Dana', 'ShopeePay'].map((pm) => (
                <span
                  key={pm}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-gray-900 text-gray-200 border border-gray-800"
                >
                  {pm}
                </span>
              ))}
            </div>
            <p className="text-[12px] text-gray-500 pt-2">
              *Verifikasi pembayaran otomatis instant update status pesanan.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p className="flex items-center gap-1">
            © 2026 Barengku. Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in Metro, Lampung.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/produk" className="hover:text-gray-300">Produk Best Seller</Link>
            <Link href="/tentang" className="hover:text-gray-300">Lokasi Toko</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
