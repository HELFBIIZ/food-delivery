import Link from 'next/link';
import { categories, dishes } from '@/lib/data';
import { DishCard } from '@/components/dish-card';

const features = [
  { title: 'Хурдан хүргэлт', body: '30 минутын дотор хаалган дээр.', emoji: '⚡' },
  { title: 'Шинэхэн орц', body: 'Өдөр бүр шинэ орцоор бэлтгэсэн.', emoji: '🥬' },
  { title: 'Аюулгүй төлбөр', body: 'Бэлэн, карт эсвэл QPay-аар.', emoji: '🔒' },
  { title: 'Тасралтгүй дэмжлэг', body: 'Асуудал гарвал 24/7 холбогдоно.', emoji: '📞' },
];

export default function HomePage() {
  const popular = dishes.filter((d) => d.popular);
  const homeCategories = categories.filter((c) => c.id !== 'all');

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-secondary">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
              🚀 30 минутын хүргэлт
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Амттай хоол, <br /> хаалган дээр тань
            </h1>
            <p className="mt-5 max-w-lg text-lg text-white/90">
              Улаанбаатарын шилдэг ресторануудаас дуртай хоолоо сонгож, хэдхэн
              товшилтоор захиалаарай.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-white px-6 py-3 font-semibold text-primary shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Меню үзэх
              </Link>
              <Link
                href="/orders"
                className="rounded-full border border-white/60 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Миний захиалгууд
              </Link>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              {[
                { value: '30 мин', label: 'Дундаж хүргэлт' },
                { value: '120+', label: 'Ресторан' },
                { value: '4.9★', label: 'Үнэлгээ' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                  <dd className="text-2xl font-bold">{s.value}</dd>
                  <dt className="mt-1 text-xs text-white/80">{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex items-center justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/15 text-[9rem] shadow-2xl backdrop-blur sm:h-80 sm:w-80 sm:text-[11rem]">
              🍔
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Ангилал</h2>
          <p className="mt-2 text-foreground/70">Өөрийн дуртай төрлөө сонгоорой.</p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {homeCategories.map((c) => (
              <Link
                key={c.id}
                href={`/menu?category=${c.id}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-md dark:border-white/10 dark:bg-gray-800"
              >
                <span className="text-4xl transition-transform group-hover:scale-110" aria-hidden="true">
                  {c.emoji}
                </span>
                <span className="font-medium text-foreground">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-gray-800/40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Популяр хоолнууд</h2>
              <p className="mt-2 text-foreground/70">Хамгийн их захиалагдсан амттанууд.</p>
            </div>
            <Link href="/menu" className="shrink-0 text-sm font-semibold text-primary hover:underline">
              Бүгдийг үзэх →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popular.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Хэрхэн ажилладаг вэ?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { n: '1', emoji: '🍽️', title: 'Хоол сонго', body: 'Менюгээс дуртай хоолоо сонгоод сагслаарай.' },
              { n: '2', emoji: '📝', title: 'Захиалга баталгаажуул', body: 'Хаяг, утасны дугаараа бөглөнө.' },
              { n: '3', emoji: '🛵', title: 'Хүргэлт хүлээн ав', body: '30 минутын дотор хаалган дээр хүрнэ.' },
            ].map((step) => (
              <div
                key={step.n}
                className="relative rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-gray-800"
              >
                <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {step.n}
                </span>
                <span className="text-5xl" aria-hidden="true">
                  {step.emoji}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-gray-800/40">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-2xl font-bold text-foreground sm:text-3xl">
            Яагаад бид гэж?
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-black/5 bg-background/60 p-6 transition hover:shadow-md dark:border-white/10 dark:bg-gray-900/40"
              >
                <span className="text-3xl" aria-hidden="true">
                  {f.emoji}
                </span>
                <h3 className="mt-3 font-semibold text-primary">{f.title}</h3>
                <p className="mt-1 text-sm text-foreground/70">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-secondary px-8 py-14 text-center text-white">
            <h2 className="text-3xl font-bold sm:text-4xl">Өлсөж байна уу?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">
              Одоо захиалаад 30 минутын дотор амттай хоолоо хүлээн аваарай.
            </p>
            <Link
              href="/menu"
              className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-semibold text-primary shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              Захиалга эхлүүлэх
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
