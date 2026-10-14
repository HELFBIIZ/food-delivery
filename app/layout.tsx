import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FoodieGo — Fresh Food Delivery',
  description:
    'Delicious food delivered fresh from your favorite local restaurants. Fast, easy, and reliable food delivery.',
  openGraph: {
    title: 'FoodieGo — Fresh Food Delivery',
    description: 'Delicious food delivered fresh from your favorite local restaurants.',
    siteName: 'FoodieGo',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FoodieGo — Fresh Food Delivery',
    description: 'Delicious food delivered fresh from your favorite local restaurants.',
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2 focus:text-black"
        >
          Skip to main content
        </a>
        <main id="main" className="flex-1">
          {children}
        </main>
        <footer className="border-t border-black/10 bg-white/50 px-4 py-8 text-center text-sm text-gray-600 dark:border-white/10 dark:bg-gray-900/40 dark:text-gray-400">
          <div className="mx-auto max-w-7xl">
            &copy; {new Date().getFullYear()} FoodieGo. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
