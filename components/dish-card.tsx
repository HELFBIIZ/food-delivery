'use client';

import type { Dish } from '@/lib/data';
import { formatMNT } from '@/lib/format';
import { useCart } from './cart-provider';

export function DishCard({ dish }: { dish: Dish }) {
  const { add } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-gray-800">
      <div
        className={`relative flex h-40 items-center justify-center bg-gradient-to-br ${dish.gradient}`}
      >
        <span
          aria-hidden="true"
          className="text-6xl drop-shadow-md transition-transform duration-300 group-hover:scale-110"
        >
          {dish.emoji}
        </span>
        {dish.popular && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-primary shadow">
            🔥 Популяр
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-black/25 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          ⏱ {dish.minutes} мин
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-snug text-foreground">{dish.name}</h3>
          <span className="shrink-0 text-sm font-medium text-amber-500">★ {dish.rating}</span>
        </div>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-foreground/70">
          {dish.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-primary">{formatMNT(dish.price)}</span>
          <button
            type="button"
            onClick={() => add(dish.id)}
            className="btn-primary px-4 py-2 text-sm"
          >
            Сагслах
          </button>
        </div>
      </div>
    </article>
  );
}
