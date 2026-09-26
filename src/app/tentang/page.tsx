'use client';

import { MapPin, Phone, Mail, Clock, ShieldCheck, Heart, Sparkles, Camera, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '@/lib/data';

export default function TentangPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-extrabold uppercase border border-red-200">
          <Sparkles className="w-4 h-4 text-red-600" />
          <span>Mengenal Barengku Lebih Dekat</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Cerita Dibalik Basreng Pedas No. 1 di Metro, Lampung
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Dari rasa cinta pada kuliner tradisional Indonesia, kami berkomitmen menyajikan produk camilan berkualitas dengan kebersihan terjamin dan bumbu rempah pilihan khas racikan tangan sendiri.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-red-100 shadow-xl space-y-4">
          <h2 className="text-2xl font-extrabold text-gray-900 border-l-4 border-red-600 pl-3">
            Visi & Misi Kami
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Barengku lahir dari dapur rumahan di Kota Metro pada tahun 2022. Berawal dari keprihatinan kami terhadap banyaknya produk basreng di pasaran yang memiliki tekstur sangat keras, berbau amis, dan memakai bumbu sintetis.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Oleh karena itu, kami memelopori pengolahan <strong className="text-red-600">Bakso Ikan Segar Berkualitas Premium</strong> yang diiris tipis seragam, digoreng dengan tingkat kekeringan presisi agar tidak keras saat dikunyah, lalu dibalur bumbu pedas manis daun jeruk alami.
          </p>
          <div className="pt-3 grid grid-cols-2 gap-4 text-xs font-bold text-gray-800">
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-2xl border border-red-100">
              <ShieldCheck className="w-5 h-5 text-red-600 flex-shrink-0" />
              <span>Bahan Baku Teruji & Halal</span>
            </div>
            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-2xl border border-amber-100">
              <Heart className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Tanpa Pengawet Buatan</span>
            </div>
          </div>
        </div>

        {/* Store Highlights Card */}
        <div className="red-gradient-bg text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-6 relative overflow-hidden border border-amber-400/40">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Outlet Fisik Metro</span>
            <h3 className="text-2xl font-extrabold">Bisa Datang Langsung / COD</h3>
            <p className="text-xs text-red-100 leading-relaxed">
              Anda warga Metro atau sedang berkunjung ke Lampung? Silakan mampir ke toko fisik kami untuk membeli langsung basreng fresh hangat dari penggorengan!
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-white">Alamat Toko:</span>
                <span className="text-red-100">{STORE_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <div>
                <span className="font-bold block text-white">Jam Operasional:</span>
                <span className="text-red-100">{STORE_INFO.openHours}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-amber-300 flex-shrink-0" />
              <div>
                <span className="font-bold block text-white">Layanan Pelanggan / WA:</span>
                <span className="text-red-100">{STORE_INFO.phone}</span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-amber-400 text-gray-950 font-extrabold text-xs flex items-center gap-2 hover:bg-amber-300 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-gray-950" />
              <span>Chat WhatsApp Outlet</span>
            </a>
            <a
              href={`https://instagram.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-white/20 text-white font-bold text-xs flex items-center gap-2 hover:bg-white/30 backdrop-blur"
            >
              <Camera className="w-4 h-4" />
              <span>{STORE_INFO.socials.instagram}</span>
            </a>
          </div>
        </div>
      </div>

      {/* GOOGLE MAPS INTEGRATION */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-red-100 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Titik Lokasi Toko Fisik</span>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight mt-1">
              Google Maps Outlet Barengku Metro
            </h2>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-100"
          >
            Buka di Google Maps App ↗
          </a>
        </div>

        {/* Embedded Map iFrame */}
        <div className="relative w-full h-[380px] rounded-2xl overflow-hidden border border-gray-200 shadow-inner">
          <iframe
            src={STORE_INFO.googleMapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Barengku Metro Lampung"
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

    </div>
  );
}
