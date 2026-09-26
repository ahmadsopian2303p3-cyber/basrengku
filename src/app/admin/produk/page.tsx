'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { Product } from '@/lib/types';
import { Package, Plus, Edit, Trash2, Search, X, Flame, ShieldCheck, Upload, ArrowLeft } from 'lucide-react';

export default function AdminProdukPage() {
  const isAdminLoggedIn = useStore((state) => state.isAdminLoggedIn);
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const deleteProduct = useStore((state) => state.deleteProduct);
  const showToast = useStore((state) => state.showToast);

  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Modal Form State
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(18000);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Product['category']>('Pedas Daun Jeruk');
  const [spiceLevel, setSpiceLevel] = useState<number>(4);
  const [stock, setStock] = useState<number>(100);
  const [weightGrams, setWeightGrams] = useState<number>(250);
  const [imageUrl, setImageUrl] = useState<string>('/images/basreng_pedas_jeruk.jpg');

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

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setName('');
    setPrice(18000);
    setDescription('');
    setCategory('Pedas Daun Jeruk');
    setSpiceLevel(4);
    setStock(100);
    setWeightGrams(250);
    setImageUrl('/images/basreng_pedas_jeruk.jpg');
    setModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setCategory(product.category);
    setSpiceLevel(product.spiceLevel);
    setStock(product.stock);
    setWeightGrams(product.weightGrams);
    setImageUrl(product.image);
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || price <= 0) {
      showToast('Harap isi nama dan harga produk!');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name,
        price,
        description,
        category,
        spiceLevel,
        stock,
        weightGrams,
        image: imageUrl,
      });
    } else {
      addProduct({
        name,
        price,
        description,
        category,
        spiceLevel,
        stock,
        weightGrams,
        image: imageUrl,
        isBestSeller: spiceLevel >= 4,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string, prodName: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus produk "${prodName}"?`)) {
      deleteProduct(id);
    }
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <Link href="/admin/dashboard" className="text-xs font-bold text-gray-500 hover:text-red-600 flex items-center gap-1 mb-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Dashboard Admin
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2">
            <Package className="w-8 h-8 text-red-600" />
            <span>Manajemen Produk Toko</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Tambah varian basreng baru, ubah harga, update stok, dan kelola deskripsi produk.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-5 py-3 rounded-2xl red-gradient-bg text-white font-extrabold text-xs shadow-lg shadow-red-500/25 flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5 text-amber-300" />
          <span>+ Tambah Produk Baru</span>
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-red-100 shadow-sm">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
          />
        </div>
        <span className="text-xs font-bold text-gray-500">Total: {filteredProducts.length} Produk</span>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-red-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-red-50/70 border-b border-red-100 text-red-900 font-extrabold">
              <tr>
                <th className="p-4">Foto</th>
                <th className="p-4">Nama Produk</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Pedas</th>
                <th className="p-4">Harga / Pcs</th>
                <th className="p-4">Stok</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-4">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-extrabold text-sm text-gray-900">{product.name}</div>
                    <div className="text-[11px] text-gray-400 line-clamp-1 max-w-xs">{product.description}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-800 font-extrabold text-[10px]">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-700">
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      Level {product.spiceLevel}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-red-600">
                    {formatRupiah(product.price)}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-gray-100 font-bold text-gray-800">
                      {product.stock} pcs
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="p-2 rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
                        title="Edit Produk"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors"
                        title="Hapus Produk"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-red-500/20 overflow-hidden space-y-4 p-6">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-extrabold text-lg text-gray-900">
                {editingProduct ? 'Edit Data Produk Basreng' : 'Tambah Varian Produk Baru'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Nama Produk *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Basreng Extra Pedas Daun Jeruk (250g)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Harga (Rp) *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold text-red-600"
                  />
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Stok Tersedia</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Kategori Produk</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none font-medium"
                  >
                    <option value="Pedas Daun Jeruk">Pedas Daun Jeruk</option>
                    <option value="Original">Original</option>
                    <option value="Spesial Rasa">Spesial Rasa</option>
                    <option value="Bundling">Bundling</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-gray-700 block mb-1">Level Pedas (0 - 5)</label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    value={spiceLevel}
                    onChange={(e) => setSpiceLevel(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Deskripsi Produk</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tulis deskripsi keunggulan cita rasa basreng..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">URL / File Foto Produk</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                  <div className="p-2.5 rounded-xl bg-gray-100 text-gray-600 cursor-pointer hover:bg-gray-200">
                    <Upload className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl red-gradient-bg text-white font-extrabold shadow-md hover:scale-105 transition-transform"
                >
                  Simpan Produk
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
