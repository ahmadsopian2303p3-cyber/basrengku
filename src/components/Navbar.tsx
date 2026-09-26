'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/lib/store';
import { ShoppingBag, Flame, Menu, X, ShieldCheck, ChevronRight } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = useStore((state) => state.getCartCount());
  const isAdminLoggedIn = useStore((state) => state.isAdminLoggedIn);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Menu Produk', href: '/produk' },
    { name: 'Tentang Kami', href: '/tentang' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'glass-nav shadow-lg shadow-red-500/5 py-3' : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-2xl red-gradient-bg flex items-center justify-center text-white shadow-md shadow-red-500/30 group-hover:scale-105 transition-transform duration-200 border border-amber-400/50">
              <Flame className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-2xl tracking-tight text-gray-900 flex items-center gap-1">
                Bareng<span className="text-red-600">ku</span>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-red-600 -mt-1">
                Basreng Super Pedas
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-red-100 shadow-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                      : 'text-gray-700 hover:text-red-600 hover:bg-red-50/80'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Admin Badge (Only visible when logged in as Admin) */}
            {isAdminLoggedIn && (
              <Link
                href="/admin/dashboard"
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-full border bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>Panel Admin</span>
              </Link>
            )}

            {/* Shopping Cart Button */}
            <Link
              href="/keranjang"
              className="relative flex items-center justify-center w-11 h-11 rounded-full bg-red-600 text-white shadow-md shadow-red-600/30 hover:bg-red-700 hover:scale-105 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-gray-900 font-extrabold text-[11px] flex items-center justify-center shadow border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-red-600"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-b border-red-100 px-4 pt-4 pb-6 mt-2 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                  pathname === link.href
                    ? 'bg-red-600 text-white'
                    : 'text-gray-800 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-5 h-5 opacity-60" />
              </Link>
            ))}

            {isAdminLoggedIn && (
              <Link
                href="/admin/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold text-amber-700 bg-amber-50 border border-amber-200"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span>Dashboard Admin</span>
                </div>
                <ChevronRight className="w-5 h-5 opacity-60" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
