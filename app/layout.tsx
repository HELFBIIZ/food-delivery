import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/cart-provider';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toast } from '@/components/toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FoodieGo — Хүргэлтийн үйлчилгээ',
  description:
    'Улаанбаатар хотын хамгийн хурдан хүргэлт. Шинэхэн амттай хоол 30 минутын дотор хүргэнэ.',
  keywords: ['хүргэлт', 'хоол', 'food delivery', 'Улаанбаатар', 'FoodieGo'],
  openGraph: {
    title: 'FoodieGo — Хүргэлтийн үйлчилгээ',
    description: 'Шинэхэн амттай хоол 30 минутын дотор хүргэнэ.',
    siteName: 'FoodieGo',
    type: 'website',
    locale: 'mn_MN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodieGo — Хүргэлтийн үйлчилгээ',
    description: 'Шинэхэн амттай хоол 30 минутын дотор хүргэнэ.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Үндсэн агуулга руу шилжих
        </a>
        <CartProvider>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
