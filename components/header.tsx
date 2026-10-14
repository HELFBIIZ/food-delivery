'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from './cart-provider';

const navItems = [
  { href: '/', label: 'Нүүр' },
  { href: '/menu', label: 'Меню' },
  { href: '/orders', label: 'Захиалгууд' },
];

export function Header() {
  const pathname = usePathname();
  const { count, hydrated } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-background/85 backdrop-blur-md dark:border-white/10 dark:bg-gray-900/75">
      <nav
        aria-label="Үндсэн навигаци"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6"
      >
        <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-primary">
          <span aria-hidden="true" className="text-xl">
            🍜
          </span>
          <span>FoodieGo</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const active =
              item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors sm:px-4 ${
                  active
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/75 hover:bg-black/5 hover:text-primary dark:hover:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/cart"
            className="relative ml-1 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary"
            aria-label={`Сагс — ${count} бараа`}
          >
            <span aria-hidden="true">🛒</span>
            <span className="hidden sm:inline">Сагс</span>
            {hydrated && count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-primary shadow ring-1 ring-primary/30">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
