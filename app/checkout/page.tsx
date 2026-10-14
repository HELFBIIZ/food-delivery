'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart, type Order } from '@/components/cart-provider';
import { formatMNT } from '@/lib/format';

const slots = [
  'Аль болох хурдан',
  '12:00 – 13:00',
  '13:00 – 14:00',
  '18:00 – 19:00',
  '19:00 – 20:00',
];

const payments: { value: 'cash' | 'card' | 'qpay'; label: string; emoji: string }[] = [
  { value: 'cash', label: 'Бэлнээр', emoji: '💵' },
  { value: 'card', label: 'Картаар', emoji: '💳' },
  { value: 'qpay', label: 'QPay', emoji: '📱' },
];

export default function CheckoutPage() {
  const { hydrated, entries, count, subtotal, deliveryFee, total, placeOrder } = useCart();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    note: '',
    slot: slots[0],
    payment: 'cash' as 'cash' | 'card' | 'qpay',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState<Order | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Нэрээ бүтэн бичнэ үү.';
    if (!/^[0-9+\-\s]{8,}$/.test(form.phone.trim()))
      next.phone = 'Утасны дугаараа зөв оруулна уу.';
    if (form.address.trim().length < 5)
      next.address = 'Хүргэлтийн хаягаа дэлгэрэнгүй бичнэ үү.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const order = placeOrder({
      items: entries.map((entry) => ({
        dishId: entry.dish.id,
        name: entry.dish.name,
        emoji: entry.dish.emoji,
        price: entry.dish.price,
        qty: entry.qty,
      })),
      subtotal,
      deliveryFee,
      total,
      customer: {
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        note: form.note.trim() || undefined,
      },
      payment: form.payment,
      slot: form.slot,
    });
    setPlaced(order);
  }

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-24 text-center text-foreground/60">
        Уншиж байна...
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-5xl dark:bg-green-500/15">
          ✅
        </div>
        <h1 className="mt-6 text-3xl font-bold text-foreground">Захиалга амжилттай!</h1>
        <p className="mt-3 text-foreground/70">
          Таны захиалгын дугаар{' '}
          <span className="font-semibold text-primary">#{placed.id}</span>. Бид удахгүй
          холбогдож, хүргэлтийг эхлүүлнэ.
        </p>
        <div className="mt-6 w-full rounded-2xl border border-black/5 bg-white p-6 text-left dark:border-white/10 dark:bg-gray-800">
          <div className="flex items-center justify-between text-sm text-foreground/70">
            <span>Нийт дүн</span>
            <span className="font-bold text-primary">{formatMNT(placed.total)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-foreground/70">
            <span>Төлбөр</span>
            <span className="font-medium text-foreground">
              {payments.find((p) => p.value === placed.payment)?.label}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-foreground/70">
            <span>Хүргэх хугацаа</span>
            <span className="font-medium text-foreground">{placed.slot}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-foreground/70">
            <span>Хаяг</span>
            <span className="max-w-[60%] text-right font-medium text-foreground">
              {placed.customer.address}
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/orders" className="btn-primary">
            Захиалгаа харах
          </Link>
          <Link href="/menu" className="btn-secondary">
            Дахин захиалах
          </Link>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
        <span className="text-6xl" aria-hidden="true">
          🧾
        </span>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Захиалах бараа алга</h1>
        <p className="mt-2 text-foreground/70">
          Эхлээд менюгээс хоолоо сонгоно уу.
        </p>
        <Link href="/menu" className="btn-primary mt-8">
          Меню үзэх
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold text-foreground">Захиалга баталгаажуулах</h1>
      <p className="mt-2 text-foreground/70">Мэдээллээ бөглөөд захиалгаа илгээгээрэй.</p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-foreground">Хүргэлтийн мэдээлэл</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field
                label="Нэр"
                value={form.name}
                onChange={(v) => update('name', v)}
                error={errors.name}
                placeholder="Бат-Эрдэнэ"
                autoComplete="name"
              />
              <Field
                label="Утасны дугаар"
                value={form.phone}
                onChange={(v) => update('phone', v)}
                error={errors.phone}
                placeholder="99112233"
                type="tel"
                autoComplete="tel"
              />
              <div className="sm:col-span-2">
                <Field
                  label="Хүргэлтийн хаяг"
                  value={form.address}
                  onChange={(v) => update('address', v)}
                  error={errors.address}
                  placeholder="Сүхбаатар дүүрэг, 3-р хороо, 12-р байр, 5 тоот"
                  autoComplete="street-address"
                />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Нэмэлт тайлбар (сонголтоор)"
                  value={form.note}
                  onChange={(v) => update('note', v)}
                  placeholder="Давхар 1, орцны код 1234..."
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-foreground">Хүргэх хугацаа</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => update('slot', slot)}
                  aria-pressed={form.slot === slot}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    form.slot === slot
                      ? 'border-primary bg-primary text-white'
                      : 'border-black/10 bg-white text-foreground/80 hover:border-primary/40 dark:border-white/15 dark:bg-gray-900'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-foreground">Төлбөрийн хэлбэр</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {payments.map((p) => (
                <label
                  key={p.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                    form.payment === p.value
                      ? 'border-primary ring-2 ring-primary/20'
                      : 'border-black/10 hover:border-primary/40 dark:border-white/15'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.value}
                    checked={form.payment === p.value}
                    onChange={() => update('payment', p.value)}
                    className="h-4 w-4 accent-primary"
                  />
                  <span className="text-xl" aria-hidden="true">
                    {p.emoji}
                  </span>
                  <span className="font-medium text-foreground">{p.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-2xl border border-black/5 bg-white p-6 shadow-sm lg:sticky lg:top-24 dark:border-white/10 dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-foreground">Захиалгын хураангуй</h2>
          <ul className="mt-4 space-y-3">
            {entries.map((entry) => (
              <li key={entry.dishId} className="flex items-center gap-3 text-sm">
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${entry.dish.gradient} text-xl`}
                  aria-hidden="true"
                >
                  {entry.dish.emoji}
                </span>
                <span className="flex-1 text-foreground/80">
                  {entry.dish.name}
                  <span className="text-foreground/50"> × {entry.qty}</span>
                </span>
                <span className="font-medium text-foreground">
                  {formatMNT(entry.lineTotal)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-3 border-t border-black/10 pt-4 text-sm dark:border-white/10">
            <div className="flex justify-between text-foreground/70">
              <dt>Дэд дүн ({count})</dt>
              <dd>{formatMNT(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-foreground/70">
              <dt>Хүргэлт</dt>
              <dd className={deliveryFee === 0 ? 'font-semibold text-green-600' : ''}>
                {deliveryFee === 0 ? 'Үнэгүй' : formatMNT(deliveryFee)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-4 text-lg font-bold text-foreground dark:border-white/10">
              <dt>Нийт</dt>
              <dd className="text-primary">{formatMNT(total)}</dd>
            </div>
          </dl>

          <button type="submit" className="btn-primary mt-6 w-full">
            Захиалга илгээх
          </button>
          <Link
            href="/cart"
            className="mt-3 block text-center text-sm font-medium text-foreground/60 hover:text-primary"
          >
            ← Сагс руу буцах
          </Link>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-foreground outline-none transition placeholder:text-foreground/40 focus:ring-2 focus:ring-primary/20 dark:bg-gray-900 ${
          error ? 'border-red-400 focus:border-red-400' : 'border-black/10 focus:border-primary dark:border-white/15'
        }`}
      />
      {error && <span className="mt-1 block text-sm text-red-500">{error}</span>}
    </label>
  );
}
