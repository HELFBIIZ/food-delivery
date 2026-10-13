import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      {/* Hero Section */}
      <section className="flex-1 bg-gradient-to-r from-primary/20 to-secondary/10 dark:from-primary/10 dark:to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Hero food image"
            className="object-cover"
            layout="fill"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
          <h1 className="text-4xl font-bold text-primary dark:text-primary/90 mb-4">
            Delicious Food Delivered Fresh
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-xl">
            Enjoy restaurant-quality meals from your favorite local spots, delivered right to your doorstep.
          </p>
          <div className="flex space-x-4">
            <a href="#menu" className="btn-primary fade-in">
              Browse Menu
            </a>
            <a href="#about" className="btn-secondary fade-in">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 bg-background dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12 dark:text-primary/90">
            Today's Specials
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Food Card 1 */}
            <div className="food-card relative h-48 fade-in">
              <Image
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Spicy Chicken Burger"
                className="food-image"
                layout="fill"
                priority
              />
              <div className="food-content">
                <h3 className="food-title">Spicy Chicken Burger</h3>
                <p className="food-description">
                  Juicy grilled chicken with pepper jack cheese, lettuce, tomato, and spicy mayo on a toasted brioche bun.
                </p>
                <p className="food-price">$12.99</p>
                <a href="#" className="btn-primary w-full mt-4">
                  Order Now
                </a>
              </div>
            </div>
            {/* Food Card 2 */}
            <div className="food-card relative h-48 fade-in">
              <Image
                src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Margherita Pizza"
                className="food-image"
                layout="fill"
                priority
              />
              <div className="food-content">
                <h3 className="food-title">Classic Margherita Pizza</h3>
                <p className="food-description">
                  Fresh mozzarella, ripe tomatoes, and basil on a crispy thin crust with extra virgin olive oil.
                </p>
                <p className="food-price">$14.50</p>
                <a href="#" className="btn-primary w-full mt-4">
                  Order Now
                </a>
              </div>
            </div>
            {/* Food Card 3 */}
            <div className="food-card relative h-48 fade-in">
              <Image
                src="https://images.unsplash.com/photo-1598514925271-7e547a6b647e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Thai Green Curry"
                className="food-image"
                layout="fill"
                priority
              />
              <div className="food-content">
                <h3 className="food-title">Thai Green Curry</h3>
                <p className="food-description">
                  Authentic green curry with chicken, Thai eggplant, bamboo shoots, and sweet basil in coconut milk.
                </p>
                <p className="food-price">$13.75</p>
                <a href="#" className="btn-primary w-full mt-4">
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary mb-12 dark:text-primary/90">
            Why Choose Us?
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary dark:text-primary/90">
                Fresh Ingredients
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                We partner with local farms and suppliers to ensure every ingredient is fresh, seasonal, and of the highest quality.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary dark:text-primary/90">
                Fast Delivery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our optimized delivery network ensures your food arrives hot and fresh, typically within 30-45 minutes.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary dark:text-primary/90">
                Easy Ordering
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Browse menus, customize your order, and track delivery in real-time with our user-friendly app.
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-primary dark:text-primary/90">
                Support Local
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                By ordering with us, you're supporting local restaurants and helping your community thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Satisfy Your Cravings?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Download our app and get free delivery on your first order.
          </p>
          <a href="#" className="btn-secondary text-white hover:bg-white/20">
            Get the App
          </a>
        </div>
      </section>
    </div>
  );
}