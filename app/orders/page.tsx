'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart, type Order } from '@/components/cart-provider';
import { formatDate, formatMNT } from '@/lib/format';

const statusSteps = ['Хүлээн авсан', 'Бэлтгэж байна', 'Хүргэлтэд', 'Хүргэгдсэн'];

function statusIndex(order: Order): number {
  if (order.status === 'delivered') return 3;
  const minutes = (Date.now() - new Date(order.createdAt).getTime()) / 60000;
  if (minutes < 2) return 0;
  if (minutes < 15) return 1;
  return 2;
}

const paymentLabels: Record<Order['payment'], string> = {
  cash: 'Бэлнээр',
  card: 'Картаар',
  qpay: 'QPay',
};

export default function OrdersPage() {
  const { hydrated, orders, add } = useCart();
  const router = useRouter();

  function reorder(order: Order) {
    order.items.forEach((item) => add(item.dishId, item.qty));
    router.push('/cart');
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center text-foreground/60">
        Уншиж байна...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <span className="text-6xl" aria-hidden="true">
          📦
        </span>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Захиалга байхгүй байна</h1>
        <p className="mt-2 text-foreground/70">Та одоогоор захиалга хийгээгүй байна.</p>
        <Link href="/menu" className="btn-primary mt-8">
          Захиалга эхлүүлэх
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Миний захиалгууд</h1>
        <p className="mt-2 text-foreground/70">Нийт {orders.length} захиалга.</p>
      </header>

      <ul className="space-y-6">
        {orders.map((order) => {
          const step = statusIndex(order);
          return (
            <li
              key={order.id}
              className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-gray-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-6 py-4 dark:border-white/10">
                <div>
                  <p className="font-semibold text-foreground">#{order.id}</p>
                  <p className="text-sm text-foreground/60">{formatDate(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-foreground/70 dark:bg-white/10">
                    {paymentLabels[order.payment]}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {statusSteps[step]}
                  </span>
                </div>
              </div>

              <div className="px-6 pt-5">
                <ol className="flex items-center">
                  {statusSteps.map((label, i) => {
                    const done = i <= step;
                    return (
                      <li key={label} className="flex flex-1 flex-col items-center">
                        <div className="flex w-full items-center">
                          <span
                            className={`h-0.5 flex-1 ${i === 0 ? 'opacity-0' : done ? 'bg-primary' : 'bg-black/10 dark:bg-white/10'}`}
                          />
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              done
                                ? 'bg-primary text-white'
                                : 'bg-black/10 text-foreground/50 dark:bg-white/10'
                            }`}
                          >
                            {done ? '✓' : i + 1}
                          </span>
                          <span
                            className={`h-0.5 flex-1 ${
                              i === statusSteps.length - 1
                                ? 'opacity-0'
                                : i < step
                                  ? 'bg-primary'
                                  : 'bg-black/10 dark:bg-white/10'
                            }`}
                          />
                        </div>
                        <span
                          className={`mt-1.5 text-[11px] ${done ? 'font-medium text-primary' : 'text-foreground/50'}`}
                        >
                          {label}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <ul className="mt-5 divide-y divide-black/5 px-6 dark:divide-white/10">
                {order.items.map((item) => (
                  <li key={item.dishId} className="flex items-center gap-3 py-3 text-sm">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/5 text-lg dark:bg-white/10"
                      aria-hidden="true"
                    >
                      {item.emoji}
                    </span>
                    <span className="flex-1 text-foreground/80">
                      {item.name}
                      <span className="text-foreground/50"> × {item.qty}</span>
                    </span>
                    <span className="font-medium text-foreground">
                      {formatMNT(item.price * item.qty)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/5 px-6 py-4 dark:border-white/10">
                <div className="text-sm text-foreground/70">
                  Хүргэлт: {order.customer.address}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-primary">
                    {formatMNT(order.total)}
                  </span>
                  <button
                    type="button"
                    onClick={() => reorder(order)}
                    className="btn-secondary px-4 py-2 text-sm"
                  >
                    Дахин захиалах
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
