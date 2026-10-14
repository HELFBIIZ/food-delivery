import Image from 'next/image';

const dishes = [
  {
    name: 'Spicy Chicken Burger',
    description:
      'Juicy grilled chicken with pepper jack cheese, lettuce, tomato, and spicy mayo on a toasted brioche bun.',
    price: '$12.99',
    image:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    alt: 'Spicy grilled chicken burger',
  },
  {
    name: 'Classic Margherita Pizza',
    description:
      'Fresh mozzarella, ripe tomatoes, and basil on a crispy thin crust with extra virgin olive oil.',
    price: '$14.50',
    image:
      'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    alt: 'Classic margherita pizza',
  },
  {
    name: 'Thai Green Curry',
    description:
      'Authentic green curry with chicken, Thai eggplant, bamboo shoots, and sweet basil in coconut milk.',
    price: '$13.75',
    image:
      'https://images.unsplash.com/photo-1598514925271-7e547a6b647e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    alt: 'Thai green curry',
  },
];

const features = [
  {
    title: 'Fresh Ingredients',
    body: 'We partner with local farms and suppliers to ensure every ingredient is fresh, seasonal, and of the highest quality.',
  },
  {
    title: 'Fast Delivery',
    body: 'Our optimized delivery network ensures your food arrives hot and fresh, typically within 30-45 minutes.',
  },
  {
    title: 'Easy Ordering',
    body: 'Browse menus, customize your order, and track delivery in real-time with our user-friendly app.',
  },
  {
    title: 'Support Local',
    body: "By ordering with us, you're supporting local restaurants and helping your community thrive.",
  },
];

const stats = [
  { value: '30 min', label: 'Average delivery' },
  { value: '500+', label: 'Local restaurants' },
  { value: '4.9/5', label: 'Customer rating' },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-background/80 backdrop-blur-md dark:border-white/10 dark:bg-gray-900/70">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        >
          <a href="#" className="flex items-center gap-2 text-xl font-bold text-primary">
            <span aria-hidden="true">🍜</span>
            <span>FoodieGo</span>
          </a>
          <div className="flex items-center gap-6 text-sm font-medium">
            <a href="#menu" className="hidden text-foreground/80 transition-colors hover:text-primary sm:inline">
              Menu
            </a>
            <a href="#about" className="hidden text-foreground/80 transition-colors hover:text-primary sm:inline">
              About
            </a>
            <a href="#order" className="btn-primary px-5 py-2 text-sm">
              Order Now
            </a>
          </div>
        </nav>
      </header>

      <section className="relative flex-1 overflow-hidden bg-gradient-to-r from-primary/20 to-secondary/10 dark:from-primary/10 dark:to-secondary/5">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
            alt="A table full of freshly prepared food"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center sm:py-36">
          <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-white drop-shadow sm:text-5xl md:text-6xl">
            Delicious food, delivered fresh to your door
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90">
            Discover top local restaurants and get your favorites delivered hot in about 30 minutes.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href="#menu" className="btn-primary">
              Browse the Menu
            </a>
            <a href="#about" className="btn-secondary">
              Why FoodieGo?
            </a>
          </div>
          <dl className="mt-12 grid w-full max-w-2xl grid-cols-3 gap-4 text-white">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl bg-white/10 py-4 backdrop-blur">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold">{s.value}</dd>
                <dd className="mt-1 text-xs text-white/80">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="menu" className="scroll-mt-20 bg-background py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-primary sm:text-4xl">Today&apos;s Specials</h2>
            <p className="mt-3 text-foreground/70">
              Handpicked dishes from our most-loved kitchens, ready to order.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {dishes.map((dish) => (
              <article key={dish.name} className="food-card group relative h-72">
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="food-image"
                />
                <div className="food-content">
                  <h3 className="food-title">{dish.name}</h3>
                  <p className="food-description">{dish.description}</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="food-price">{dish.price}</p>
                    <a
                      href="#order"
                      className="btn-primary px-4 py-2 text-sm"
                      aria-label={`Order ${dish.name}`}
                    >
                      Order
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-white py-20 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">Why Choose Us?</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-black/5 bg-background/60 p-6 transition-shadow hover:shadow-md dark:border-white/10 dark:bg-gray-900/40"
              >
                <h3 className="text-xl font-semibold text-primary">{f.title}</h3>
                <p className="mt-2 text-foreground/70">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="order" className="scroll-mt-20 bg-gradient-to-r from-primary to-secondary py-20 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to satisfy your cravings?</h2>
          <p className="mt-4 text-lg text-white/90">
            Get free delivery on your first order — order in seconds.
          </p>
          <a href="#" className="btn-secondary mt-8 bg-white text-primary hover:bg-white/90">
            Start Your Order
          </a>
        </div>
      </section>
    </div>
  );
}
