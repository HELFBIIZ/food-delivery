import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-white/60 dark:border-white/10 dark:bg-gray-900/50">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold text-primary">
            <span aria-hidden="true">🍜</span>
            <span>FoodieGo</span>
          </div>
          <p className="mt-3 text-sm text-foreground/70">
            Улаанбаатар хотын хамгийн хурдан хүргэлт. Шинэхэн амттай хоол 30 минутын дотор.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Цэс</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/70">
            <li>
              <Link className="hover:text-primary" href="/">
                Нүүр
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/menu">
                Меню
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/cart">
                Сагс
              </Link>
            </li>
            <li>
              <Link className="hover:text-primary" href="/orders">
                Захиалгууд
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Үйлчилгээ</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/70">
            <li>Хотын дотор хүргэлт</li>
            <li>30 минутын баталгаа</li>
            <li>Онлайн төлбөр</li>
            <li>Ажлын өдрүүд: 10:00 – 23:00</li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground">Холбоо барих</h3>
          <ul className="mt-3 space-y-2 text-sm text-foreground/70">
            <li>📞 +976 7000-0000</li>
            <li>✉️ hello@foodiego.mn</li>
            <li>📍 Сүхбаатар дүүрэг, Улаанбаатар</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/5 px-6 py-6 text-center text-sm text-foreground/60 dark:border-white/10">
        &copy; {new Date().getFullYear()} FoodieGo. Бүх эрх хуулиар хамгаалагдсан.
      </div>
    </footer>
  );
}
