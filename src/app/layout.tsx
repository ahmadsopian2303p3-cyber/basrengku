import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

export const metadata: Metadata = {
  title: 'Barengku - Basreng Super Pedas Daun Jeruk khas Metro',
  description: 'Toko Basreng Super Pedas khas Metro Lampung. Nikmati sensasi kriuk renyah bumbu merah merona kaffir lime leaves. Beli online via QRIS & gratis ongkir!',
  keywords: ['basreng', 'basreng pedas', 'basreng daun jeruk', 'kuliner metro', 'snack pedas', 'basrenng ku', 'barengku'],
  openGraph: {
    title: 'Barengku - Basreng Super Pedas Daun Jeruk',
    description: 'Sensasi basreng renyah bumbu merah melimpah khas Metro, Lampung!',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#fcf8f8] text-gray-900 font-sans antialiased selection:bg-red-500 selection:text-white">
        <Navbar />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
        <Toast />
      </body>
    </html>
  );
}
