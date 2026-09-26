'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Order } from '@/lib/types';
import { useStore } from '@/lib/store';
import { QrCode, CreditCard, Wallet, Copy, Check, ShieldCheck, X, Sparkles, ArrowRight } from 'lucide-react';

interface PaymentModalProps {
  order: Order;
  onClose: () => void;
}

export default function PaymentModal({ order, onClose }: PaymentModalProps) {
  const router = useRouter();
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);
  const showToast = useStore((state) => state.showToast);

  const [activeTab, setActiveTab] = useState<'qris' | 'va' | 'ewallet'>('qris');
  const [selectedBank, setSelectedBank] = useState<'BCA' | 'BRI' | 'BNI' | 'SeaBank'>('BCA');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const vaNumbers = {
    BCA: `88019${Math.floor(10000000 + Math.random() * 90000000)}`,
    BRI: `12809${Math.floor(10000000 + Math.random() * 90000000)}`,
    BNI: `98801${Math.floor(10000000 + Math.random() * 90000000)}`,
    SeaBank: `78901${Math.floor(10000000 + Math.random() * 90000000)}`,
  };

  const handleCopyVA = () => {
    navigator.clipboard.writeText(vaNumbers[selectedBank]);
    setCopied(true);
    showToast(`Nomor VA ${selectedBank} berhasil disalin!`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSuccessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      updateOrderStatus(order.id, 'Diproses');
      showToast('🎉 Pembayaran Berhasil Terverifikasi! Pesanan Anda LANGSUNG DIPROSES otomatis oleh Dapur Metro.');
      setIsProcessing(false);
      onClose();
      router.push(`/pesanan/${order.id}`);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-red-500/20 overflow-hidden">
        
        {/* Header Midtrans / Xendit simulated bar */}
        <div className="red-gradient-bg px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight leading-none">
                Payment Gateway Midtrans / Xendit
              </h3>
              <p className="text-[11px] text-red-100 font-medium">
                Sistem Pembayaran Otomatis 24 Jam
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Summary */}
        <div className="bg-red-50/80 px-6 py-3 border-b border-red-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Total Tagihan Pesanan</span>
            <span className="text-xs text-red-600 font-bold">ID #{order.id}</span>
          </div>
          <div className="text-right">
            <span className="text-xl font-extrabold text-red-600">{formatRupiah(order.totalAmount)}</span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-gray-100 bg-gray-50">
          <button
            onClick={() => setActiveTab('qris')}
            className={`flex-1 py-3 px-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'qris'
                ? 'border-red-600 text-red-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>QRIS Instant</span>
          </button>
          <button
            onClick={() => setActiveTab('va')}
            className={`flex-1 py-3 px-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'va'
                ? 'border-red-600 text-red-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Virtual Account</span>
          </button>
          <button
            onClick={() => setActiveTab('ewallet')}
            className={`flex-1 py-3 px-2 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
              activeTab === 'ewallet'
                ? 'border-red-600 text-red-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>E-Wallet</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 space-y-4">
          {/* 1. QRIS TAB */}
          {activeTab === 'qris' && (
            <div className="text-center space-y-4">
              <p className="text-xs text-gray-600">
                Scan kode QRIS ini menggunakan <span className="font-bold text-gray-800">GoPay, OVO, ShopeePay, Dana, BCA Mobile</span>, atau aplikasi m-Banking Anda.
              </p>
              <div className="inline-block p-4 bg-white border-2 border-dashed border-red-300 rounded-2xl shadow-inner">
                {/* Simulated QR Code visual */}
                <div className="w-48 h-48 bg-gray-900 rounded-xl p-2 flex flex-col items-center justify-between text-white relative">
                  <div className="w-full text-[9px] font-mono text-center tracking-widest bg-red-600 rounded py-0.5 font-bold">
                    QRIS BARENGKU OFFICIAL
                  </div>
                  {/* Fake QR pattern */}
                  <div className="grid grid-cols-6 gap-1.5 w-36 h-36 bg-white p-2 rounded-lg">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className={`rounded-xs ${
                          (i * 7 + 3) % 5 === 0 || i === 0 || i === 5 || i === 30 || i === 35
                            ? 'bg-gray-900'
                            : (i * 3) % 2 === 0
                            ? 'bg-red-600'
                            : 'bg-amber-400'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-300 font-bold">NMID: ID102948201938</span>
                </div>
              </div>
              <div className="text-xs text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                ⚡ Verifikasi pembayaran berlangsung otomatis tanpa perlu unggah bukti transfer.
              </div>
            </div>
          )}

          {/* 2. VA TAB */}
          {activeTab === 'va' && (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-2">
                {(['BCA', 'BRI', 'BNI', 'SeaBank'] as const).map((bank) => (
                  <button
                    key={bank}
                    onClick={() => setSelectedBank(bank)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                      selectedBank === bank
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {bank}
                  </button>
                ))}
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                  <span>Nomor Virtual Account ({selectedBank}):</span>
                  <span className="text-emerald-600 font-bold">Status: Menunggu</span>
                </div>
                <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-300">
                  <span className="font-mono text-lg font-bold tracking-wider text-gray-900">
                    {vaNumbers[selectedBank]}
                  </span>
                  <button
                    onClick={handleCopyVA}
                    className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 px-3 py-1.5 rounded-lg bg-red-50"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
                <ol className="text-[11px] text-gray-500 list-decimal pl-4 space-y-1 pt-1">
                  <li>Buka M-Banking / ATM Bank {selectedBank}.</li>
                  <li>Pilih menu Bayar / Transfer ke Virtual Account.</li>
                  <li>Masukkan nomor VA di atas dan lunasi senilai {formatRupiah(order.totalAmount)}.</li>
                </ol>
              </div>
            </div>
          )}

          {/* 3. E-WALLET TAB */}
          {activeTab === 'ewallet' && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600">Pilih aplikasi E-Wallet favorit Anda:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { name: 'GoPay', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
                  { name: 'OVO', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  { name: 'ShopeePay', color: 'bg-orange-50 text-orange-700 border-orange-200' },
                  { name: 'Dana', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                ].map((ew) => (
                  <div
                    key={ew.name}
                    className={`p-3 rounded-2xl border ${ew.color} flex items-center justify-between font-bold text-sm cursor-pointer hover:scale-[1.02] transition-transform`}
                  >
                    <span>{ew.name}</span>
                    <span className="text-xs underline">Buka App</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SIMULATOR ACTION BUTTON FOR USER TESTING */}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={handleSimulateSuccessPayment}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 red-gradient-bg hover:bg-red-700 text-white rounded-2xl font-extrabold text-sm shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              {isProcessing ? (
                <span>Memproses Webhook Midtrans...</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
                  <span>Simulasikan Pembayaran Berhasil (Webhook)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-2">
              *Dalam versi produksi, Webhook Payment Gateway akan langsung mengubah status order secara otomatis real-time.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
