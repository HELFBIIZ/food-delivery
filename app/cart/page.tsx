'use client';

import Link from 'next/link';
import { FREE_DELIVERY_THRESHOLD } from '@/lib/data';
import { formatMNT } from '@/lib/format';
import { useCart } from '@/components/cart-provider';

export default function CartPage() {
  const {
    hydrated,
    entries,
    count,
    subtotal,
    deliveryFee,
    total,
    setQty,
    remove,
    clear,
  } = useCart();

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center text-foreground/60">
        Уншиж байна...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <span className="text-6xl" aria-hidden="true">
          🛒
        </span>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Таны сагс хоосон байна</h1>
        <p className="mt-2 text-foreground/70">
          Менюгээс дуртай хоолоо сонгоод сагсандаа нэмээрэй.
        </p>
        <Link href="/menu" className="btn-primary mt-8">
          Меню үзэх
        </Link>
      </div>
    );
  }

  const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(
    100,
    Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100)
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Сагс</h1>
          <p className="mt-1 text-foreground/70">{count} ширхэг бараа</p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-500/30 dark:hover:bg-red-500/10"
        >
          Сагс цэвэрлэх
        </button>
      </header>

      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {entries.map((entry) => (
            <li
              key={entry.dishId}
              className="flex gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-gray-800"
            >
              <div
                className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${entry.dish.gradient} text-4xl`}
                aria-hidden="true"
              >
                {entry.dish.emoji}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-semibold text-foreground">{entry.dish.name}</h2>
                  <button
                    type="button"
                    onClick={() => remove(entry.dishId)}
                    aria-label={`${entry.dish.name} устгах`}
                    className="text-foreground/40 transition hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
                <p className="mt-1 text-sm text-foreground/60">
                  Нэгж үнэ: {formatMNT(entry.dish.price)}
                </p>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="inline-flex items-center rounded-full border border-black/10 dark:border-white/15">
                    <button
                      type="button"
                      onClick={() => setQty(entry.dishId, entry.qty - 1)}
                      aria-label="Тоо багасгах"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-foreground/70 transition hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-foreground">
                      {entry.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(entry.dishId, entry.qty + 1)}
                      aria-label="Тоо нэмэх"
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg text-foreground/70 transition hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold text-primary">{formatMNT(entry.lineTotal)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-black/5 bg-white p-6 shadow-sm lg:sticky lg:top-24 dark:border-white/10 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-foreground">Захиалгын дүн</h2>

          {remainingForFree > 0 ? (
            <div className="mt-4">
              <p className="text-sm text-foreground/70">
                Үнэгүй хүргэлт авахын тулд{' '}
                <span className="font-semibold text-primary">{formatMNT(remainingForFree)}</span>{' '}
                дутуу байна.
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="mt-4 rounded-lg bg-green-50 px-3 py-2 text-sm font-medium text-green-700 dark:bg-green-500/10 dark:text-green-400">
              🎉 Танд үнэгүй хүргэлт хүртэх эрх бий!
            </p>
          )}

          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-foreground/80">
              <dt>Дэд дүн</dt>
              <dd>{formatMNT(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between text-foreground/70">
              <dt>Хүргэлтийн төлбөр</dt>
              <dd className={deliveryFee === 0 ? 'font-semibold text-green-600' : ''}>
                {deliveryFee === 0 ? 'Үнэгүй' : formatMNT(deliveryFee)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-black/10 pt-4 text-lg font-bold text-foreground dark:border-white/10">
              <span>Нийт</span>
              <span className="text-primary">{formatMNT(total)}</span>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
