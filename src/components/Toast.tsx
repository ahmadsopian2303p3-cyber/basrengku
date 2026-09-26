'use client';

import { useStore } from '@/lib/store';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast() {
  const toastMessage = useStore((state) => state.toastMessage);
  const clearToast = useStore((state) => state.clearToast);

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gray-900/95 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-red-500/30 backdrop-blur-md animate-bounce-short">
      <div className="bg-red-500/20 text-red-400 p-1.5 rounded-full">
        <CheckCircle2 className="w-5 h-5 text-red-500" />
      </div>
      <p className="text-sm font-medium">{toastMessage}</p>
      <button
        onClick={clearToast}
        className="ml-2 text-gray-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
