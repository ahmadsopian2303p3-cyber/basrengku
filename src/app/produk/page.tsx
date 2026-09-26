'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/types';
import { Search, Flame, ShoppingBag, Plus, Minus, Filter, Sparkles } from 'lucide-react';

export default function ProdukPage() {
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<number | null>(null);

  // Local state for product quantities before adding to cart
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const getQuantity = (id: string) => quantities[id] || 1;

  const handleIncreaseQty = (id: string) => {
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  };

  const handleDecreaseQty = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const handleAddToCartWithQty = (product: Product) => {
    const qty = getQuantity(product.id);
    addToCart(product, qty);
    // Reset quantity back to 1
    setQuantities((prev) => ({ ...prev, [product.id]: 1 }));
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const categories = ['Semua', 'Pedas Daun Jeruk', 'Original', 'Spesial Rasa', 'Bundling'];

  // Filter products based on search, category, and spice level
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'Semua' || product.category === selectedCategory;

    const matchesSpice =
      selectedSpiceLevel === null || product.spiceLevel === selectedSpiceLevel;

    return matchesSearch && matchesCategory && matchesSpice;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="red-gradient-bg rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl border border-amber-400/30">
        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase">
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Katalog Lengkap Basreng Ku</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Pilihan Basreng Paling Nagih
          </h1>
          <p className="text-sm text-red-100 leading-relaxed">
            Temukan varian rasa basreng super renyah favoritmu. Olahan bakso ikan asli disajikan higienis dengan jaminan bumbu merah merona.
          </p>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-amber-400/10 blur-3xl pointer-events-none"></div>
      </div>

      {/* Search & Filter Controls */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'red-gradient-bg text-white shadow-md shadow-red-500/20 scale-105'
                    : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari basreng, pedas, keju..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-red-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            />
          </div>

        </div>

        {/* Level Pedas Filter buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200/60">
          <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-red-500" /> Filter Level Pedas:
          </span>
          <button
            onClick={() => setSelectedSpiceLevel(null)}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
              selectedSpiceLevel === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Semua Level
          </button>
          {[0, 1, 4, 5].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedSpiceLevel(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                selectedSpiceLevel === lvl
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <Flame className="w-3 h-3" />
              <span>Level {lvl}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-red-100 space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-gray-800">Produk tidak ditemukan</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Coba ubah kata kunci pencarian atau reset filter level pedas Anda.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('Semua');
              setSelectedSpiceLevel(null);
            }}
            className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-xl shadow"
          >
            Reset Semua Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentQty = getQuantity(product.id);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl p-5 border border-red-100 shadow-lg shadow-red-500/5 hover:shadow-2xl hover:shadow-red-500/15 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Image Container */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-3 py-1 rounded-full bg-red-600 text-white font-extrabold text-xs shadow">
                        {product.category}
                      </span>
                      {product.isBestSeller && (
                        <span className="px-2.5 py-1 rounded-full gold-badge text-xs font-bold flex items-center gap-1 shadow">
                          <Sparkles className="w-3 h-3" /> Best
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gray-950/80 backdrop-blur text-amber-400 font-bold text-xs flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                      <span>Level {product.spiceLevel}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur text-gray-700 text-[11px] font-semibold">
                      Berat: {product.weightGrams}g
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Interactive Quantity Selector & Price Footer */}
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 font-medium block">Harga / Pcs</span>
                      <span className="text-xl font-extrabold text-red-600">
                        {formatRupiah(product.price)}
                      </span>
                    </div>

                    {/* Quantity Selector (+) and (-) */}
                    <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-200">
                      <button
                        onClick={() => handleDecreaseQty(product.id)}
                        className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors shadow-xs active:scale-95"
                        title="Kurangi jumlah"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-6 text-center font-extrabold text-sm text-gray-900">
                        {currentQty}
                      </span>
                      <button
                        onClick={() => handleIncreaseQty(product.id)}
                        className="w-8 h-8 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors shadow-xs active:scale-95"
                        title="Tambah jumlah"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Add to cart CTA */}
                  <button
                    onClick={() => handleAddToCartWithQty(product)}
                    className="w-full py-3 rounded-2xl red-gradient-bg hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-500/20 flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-300" />
                    <span>+ Masukkan ke Keranjang ({currentQty})</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
