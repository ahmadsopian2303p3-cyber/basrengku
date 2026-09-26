'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ShieldCheck, Lock, Mail, Flame, KeyRound, ArrowRight } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const loginAdmin = useStore((state) => state.loginAdmin);
  const showToast = useStore((state) => state.showToast);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(email, password);
    if (success) {
      router.push('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md bg-white rounded-3xl p-8 border border-red-100 shadow-2xl space-y-6">
        
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl red-gradient-bg mx-auto flex items-center justify-center text-white shadow-lg shadow-red-500/30 border border-amber-400">
            <ShieldCheck className="w-8 h-8 text-amber-300" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Portal Login Admin Toko
          </h1>
          <p className="text-xs text-gray-500">
            Khusus Pemilik Toko & Pengelola Toko Basrengku.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Username / Email Admin</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Username / Email Admin"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Password Access</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl red-gradient-bg hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-500/30 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
          >
            <span>Masuk ke Dashboard Admin</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
