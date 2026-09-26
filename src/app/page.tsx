'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { Flame, ShoppingBag, ArrowRight, Star, ShieldCheck, Truck, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);

  // Filter 3-4 best seller items
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-red-500/15 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -top-10 right-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge Top */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100/80 border border-red-200 text-red-700 text-xs font-bold tracking-wide shadow-sm backdrop-blur-sm">
                <Flame className="w-4 h-4 text-red-600 animate-pulse" />
                <span>Pelopor Basreng Pedas Daun Jeruk khas Metro</span>
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px]">TERFAVORIT</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-[1.15]">
                Renyahnya Nampol, <br />
                <span className="text-red-600">
                  Bumbu Merah Merona
                </span> Bikin Nagih!
              </h1>

              {/* Subheadline / Tagline */}
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Dibuat dari irisan bakso ikan segar pilihan, digoreng kriuk pas, diguyur bumbu rempah cabai merah merona dan wangi segar kaffir lime leaves. Sekali coba, dijamin nempel di lidah!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/produk"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl red-gradient-bg hover:bg-red-700 text-white font-extrabold text-base shadow-xl shadow-red-600/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 border border-amber-400/40"
                >
                  <ShoppingBag className="w-5 h-5 text-amber-300" />
                  <span>Pesan Sekarang</span>
                  <ArrowRight className="w-5 h-5 ml-1" />
                </Link>

                <Link
                  href="/tentang"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-red-50 text-gray-800 font-bold text-base border-2 border-red-200 hover:border-red-400 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Cerita Toko & Outlet</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200/80 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-xl font-extrabold text-red-600">100%</div>
                  <div className="text-xs text-gray-500 font-medium">Bumbu Cabai Asli</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl font-extrabold text-amber-600 flex items-center justify-center lg:justify-start gap-1">
                    <span>4.9</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-xs text-gray-500 font-medium">10,000+ Pelanggan</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-xl font-extrabold text-gray-900">QRIS</div>
                  <div className="text-xs text-gray-500 font-medium">Bayar Otomatis</div>
                </div>
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white red-soft-gradient p-2 group">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <Image
                    src="/images/basreng_pedas_jeruk.jpg"
                    alt="Basreng Pedas Daun Jeruk Barengku"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent"></div>
                  
                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-red-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                        Best Seller #1
                      </span>
                      <h4 className="font-extrabold text-sm text-gray-900 mt-1">
                        Basreng Pedas Daun Jeruk
                      </h4>
                      <p className="text-xs font-bold text-red-600">Rp 18.000 / 250g</p>
                    </div>
                    <button
                      onClick={() => addToCart(products[0])}
                      className="p-3 rounded-xl red-gradient-bg text-white shadow-md hover:scale-105 active:scale-95 transition-all"
                      title="Tambah ke keranjang"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Badge Decorative */}
              <div className="absolute -top-4 -left-4 bg-amber-400 text-gray-950 font-extrabold px-4 py-2 rounded-2xl shadow-lg border-2 border-white text-xs flex items-center gap-1.5 transform -rotate-6">
                <Sparkles className="w-4 h-4 fill-amber-700" />
                <span>Renyah & Fresh Setiap Hari!</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KATALOG SINGKAT (BEST SELLER) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-red-600 mb-1">
              <Flame className="w-4 h-4" />
              <span>Favorit Pelanggan</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Katalog Basreng Best Seller
            </h2>
          </div>
          <Link
            href="/produk"
            className="text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 hover:gap-2 transition-all"
          >
            <span>Lihat Semua Produk ({products.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 border border-red-100 shadow-lg shadow-red-500/5 hover:shadow-2xl hover:shadow-red-500/15 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Image & Spicy Badge */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Category & Spice level badge */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2.5 py-1 rounded-full bg-red-600 text-white font-extrabold text-[10px] shadow">
                      {product.category}
                    </span>
                  </div>

                  {product.spiceLevel > 0 && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-gray-950/80 backdrop-blur text-amber-400 font-bold text-[10px] flex items-center gap-1">
                      <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                      <span>Lvl {product.spiceLevel}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-base text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Price & Add button */}
              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-medium block">Harga</span>
                  <span className="text-lg font-extrabold text-red-600">
                    {formatRupiah(product.price)}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="px-4 py-2.5 rounded-xl red-gradient-bg hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-500/20 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>+ Keranjang</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KEUNGGULAN SECTION */}
      <section className="bg-red-600 text-white py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest bg-white/20 text-white px-3.5 py-1 rounded-full border border-white/30">
              Kenapa Harus Barengku?
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-3">
              Kualitas Bahan Super Premium
            </h2>
            <p className="text-sm text-red-100 mt-2">
              Kami menjaga standar kerenyahan dan cita rasa rempah khas asli Metro di setiap kemasan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-bold shadow-lg">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold">100% Rempah Cabai Asli</h3>
              <p className="text-xs text-red-100 leading-relaxed">
                Tanpa perisa sintetis atau pewarna buatan. Racikan cabai merah segar pilihan dan daun jeruk diproses higienis setiap hari.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-bold shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold">Tekstur Renyah Tidak Keras</h3>
              <p className="text-xs text-red-100 leading-relaxed">
                Diproduksi dari adonan ikan segar berkualat premium dengan teknik penggorengan suhu terukur sehingga renyah garing dan tidak membuat sakit gigi.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-400 text-gray-950 flex items-center justify-center font-bold shadow-lg">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold">Kirim Cepat ke Seluruh Indonesia</h3>
              <p className="text-xs text-red-100 leading-relaxed">
                Pengemasan bubble wrap tebal ganda. Integrasi kurir otomatis JNE, POS, TIKI, & J&T dengan pelacakan nomor resi otomatis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEJARAH SINGKAT TOKO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-red-100 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
              <HeartHandshake className="w-4 h-4" />
              <span>Sejarah Singkat Barengku</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Dari Dapur Rumah Hingga Jadi Camilan Favorit di Lampung
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Berdiri sejak tahun 2022 di Kota Metro, Lampung, Barengku diawali dari kecintaan pendiri pada camilan tradisional basreng. Melihat banyaknya basreng beredar yang terlalu keras atau amis, kami tergerak meracik formulasi bakso ikan segar dengan paduan bumbu merah kaffir lime leaves.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Kini Barengku telah melayani puluhan ribu transaksi secara online maupun offline di outlet resmi Metro.
            </p>
            <div className="pt-2">
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 underline"
              >
                <span>Baca kisah lengkap & alamat toko kami di sini</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-red-500 to-red-700 p-8 rounded-2xl text-white space-y-4">
            <h3 className="font-extrabold text-xl">Ingin Coba Varian Favorit?</h3>
            <p className="text-xs text-red-100">
              Dapatkan promo menarik pembeli pertama dan diskon paket bundling hemat!
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Pengiriman Setiap Hari (Senin - Minggu)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Bebas Pilih Level Pedas & Varian Rasa</span>
              </div>
            </div>
            <Link
              href="/produk"
              className="mt-2 block text-center py-3 px-4 bg-amber-400 text-gray-950 rounded-xl font-extrabold text-sm hover:bg-amber-300 transition-colors shadow-lg"
            >
              Belanja Basreng Sekarang
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
