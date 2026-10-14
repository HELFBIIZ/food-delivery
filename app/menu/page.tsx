import { Suspense } from 'react';
import type { Metadata } from 'next';
import { MenuClient } from '@/components/menu-client';

export const metadata: Metadata = {
  title: 'Меню — FoodieGo',
  description: 'Амттай хоолнуудыг үзэж, сагсандаа нэмээрэй.',
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-6 py-20 text-center text-foreground/60">
          Уншиж байна...
        </div>
      }
    >
      <MenuClient />
    </Suspense>
  );
}
