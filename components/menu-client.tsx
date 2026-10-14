'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories, dishes } from '@/lib/data';
import { DishCard } from './dish-card';

type SortKey = 'popular' | 'price-asc' | 'price-desc' | 'rating';

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'popular', label: 'Онцлох' },
  { value: 'price-asc', label: 'Үнэ: багаас их' },
  { value: 'price-desc', label: 'Үнэ: ихээс бага' },
  { value: 'rating', label: 'Үнэлгээ өндөр' },
];

function isCategory(value: string | null): value is string {
  return !!value && categories.some((c) => c.id === value);
}

export function MenuClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get('category');
  const category = isCategory(categoryParam) ? categoryParam : 'all';

  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('popular');

  function selectCategory(id: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === 'all') {
      params.delete('category');
    } else {
      params.set('category', id);
    }
    const qs = params.toString();
    router.replace(qs ? `/menu?${qs}` : '/menu', { scroll: false });
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = dishes.filter((dish) => {
      const matchesCategory = category === 'all' || dish.category === category;
      const matchesQuery =
        q === '' ||
        dish.name.toLowerCase().includes(q) ||
        dish.description.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    const sorted = [...list];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.popular ?? false) - Number(a.popular ?? false));
    }
    return sorted;
  }, [category, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground sm:text-4xl">Меню</h1>
        <p className="mt-2 text-foreground/70">
          Дуртай хоолоо сонгоод сагсандаа нэмээрэй.
        </p>
      </header>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative block w-full lg:max-w-sm">
          <span className="sr-only">Хоол хайх</span>
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50">
            🔍
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Хоол хайх..."
            className="w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-4 text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/15 dark:bg-gray-800"
          />
        </label>

        <label className="flex items-center gap-2 text-sm text-foreground/70">
          <span>Эрэмбэлэх:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-black/10 bg-white px-4 py-2.5 font-medium text-foreground shadow-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-white/15 dark:bg-gray-800"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => selectCategory(c.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-black/10 bg-white text-foreground/80 hover:border-primary/40 hover:text-primary dark:border-white/15 dark:bg-gray-800'
              }`}
            >
              <span aria-hidden="true">{c.emoji}</span>
              {c.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-black/15 py-20 text-center dark:border-white/15">
          <span className="text-5xl" aria-hidden="true">
            🔍
          </span>
          <h2 className="mt-4 text-lg font-semibold text-foreground">Хоол олдсонгүй</h2>
          <p className="mt-1 text-sm text-foreground/70">
            Өөр түлхүүр үг эсвэл ангилал сонгож үзээрэй.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              selectCategory('all');
            }}
            className="btn-secondary mt-6"
          >
            Шүүлтүүр цэвэрлэх
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      )}
    </div>
  );
}
