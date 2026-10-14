export type CategoryId =
  | 'all'
  | 'burger'
  | 'pizza'
  | 'sushi'
  | 'salad'
  | 'drink'
  | 'dessert';

export type Dish = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Exclude<CategoryId, 'all'>;
  emoji: string;
  gradient: string;
  rating: number;
  minutes: number;
  popular?: boolean;
};

export type Category = {
  id: CategoryId;
  label: string;
  emoji: string;
};

export const categories: Category[] = [
  { id: 'all', label: 'Бүгд', emoji: '🍽️' },
  { id: 'burger', label: 'Бургер', emoji: '🍔' },
  { id: 'pizza', label: 'Пицца', emoji: '🍕' },
  { id: 'sushi', label: 'Суши', emoji: '🍣' },
  { id: 'salad', label: 'Салат', emoji: '🥗' },
  { id: 'drink', label: 'Ундаа', emoji: '🥤' },
  { id: 'dessert', label: 'Амттан', emoji: '🍰' },
];

export const dishes: Dish[] = [
  {
    id: 'burger-spicy-chicken',
    name: 'Халуун ногоотой тахианы бургер',
    description:
      'Шарсан тахианы мах, пеппер жек бяслаг, салат, улаан лооль, халуун ногоотой майонез.',
    price: 12500,
    category: 'burger',
    emoji: '🍔',
    gradient: 'from-orange-400 to-red-500',
    rating: 4.8,
    minutes: 25,
    popular: true,
  },
  {
    id: 'burger-double-beef',
    name: 'Давхар үхрийн бургер',
    description: 'Хоёр давхар үхрийн мах, чеддер бяслаг, сонгино, тусгай соус.',
    price: 15900,
    category: 'burger',
    emoji: '🍔',
    gradient: 'from-amber-500 to-orange-600',
    rating: 4.9,
    minutes: 28,
    popular: true,
  },
  {
    id: 'burger-veggie',
    name: 'Вегетариан бургер',
    description: 'Буурцаг, ногооны котлет, авокадо, помидор, шинэ ногоо.',
    price: 11500,
    category: 'burger',
    emoji: '🥬',
    gradient: 'from-lime-400 to-green-600',
    rating: 4.5,
    minutes: 22,
  },
  {
    id: 'pizza-margherita',
    name: 'Маргарита пицца',
    description: 'Моцарелла бяслаг, улаан лооль, базилик, оливын тос.',
    price: 18900,
    category: 'pizza',
    emoji: '🍕',
    gradient: 'from-red-400 to-rose-600',
    rating: 4.7,
    minutes: 30,
    popular: true,
  },
  {
    id: 'pizza-pepperoni',
    name: 'Пепперони пицца',
    description: 'Пепперони хиам, моцарелла, доматны соус, оригано.',
    price: 21500,
    category: 'pizza',
    emoji: '🍕',
    gradient: 'from-rose-500 to-red-700',
    rating: 4.9,
    minutes: 30,
    popular: true,
  },
  {
    id: 'pizza-four-cheese',
    name: 'Дөрвөн бяслагтай пицца',
    description: 'Моцарелла, чеддер, пармезан, дорблю бяслаг.',
    price: 23900,
    category: 'pizza',
    emoji: '🍕',
    gradient: 'from-yellow-400 to-amber-600',
    rating: 4.8,
    minutes: 32,
  },
  {
    id: 'sushi-philadelphia',
    name: 'Филадельфия ролл',
    description: 'Салмон загас, крем бяслаг, өргөст хэмх, авокадо.',
    price: 24500,
    category: 'sushi',
    emoji: '🍣',
    gradient: 'from-orange-300 to-pink-500',
    rating: 4.9,
    minutes: 35,
    popular: true,
  },
  {
    id: 'sushi-california',
    name: 'Калифорниа ролл',
    description: 'Хавчны мах, авокадо, өргөст хэмх, тобико.',
    price: 19900,
    category: 'sushi',
    emoji: '🍣',
    gradient: 'from-pink-400 to-rose-600',
    rating: 4.7,
    minutes: 35,
  },
  {
    id: 'sushi-spicy-tuna',
    name: 'Халуун ногоотой туна ролл',
    description: 'Туна загас, халуун ногоотой майонез, ногоон сонгино.',
    price: 17500,
    category: 'sushi',
    emoji: '🍣',
    gradient: 'from-red-400 to-orange-600',
    rating: 4.6,
    minutes: 33,
  },
  {
    id: 'salad-caesar',
    name: 'Цезарь салат',
    description: 'Романо салат, шарсан тахиа, пармезан, крутон, цезарь соус.',
    price: 12900,
    category: 'salad',
    emoji: '🥗',
    gradient: 'from-lime-400 to-green-600',
    rating: 4.6,
    minutes: 18,
  },
  {
    id: 'salad-greek',
    name: 'Грекийн салат',
    description: 'Улаан лооль, өргөст хэмх, фета бяслаг, хар чидун, оливкой тос.',
    price: 11900,
    category: 'salad',
    emoji: '🥗',
    gradient: 'from-green-400 to-emerald-600',
    rating: 4.5,
    minutes: 15,
  },
  {
    id: 'drink-white-coffee',
    name: 'Цагаан кофе',
    description: 'Шинэхэн хуурсан кофе, сүү, зөөлөн хөөс.',
    price: 4500,
    category: 'drink',
    emoji: '☕',
    gradient: 'from-amber-600 to-yellow-800',
    rating: 4.7,
    minutes: 10,
  },
  {
    id: 'drink-orange-juice',
    name: 'Жүржний шинэ шүүс',
    description: '100% шинэхэн шахагдсан жүржний шүүс.',
    price: 5500,
    category: 'drink',
    emoji: '🧃',
    gradient: 'from-orange-400 to-amber-500',
    rating: 4.8,
    minutes: 8,
  },
  {
    id: 'drink-lemonade',
    name: 'Мөстэй лимонад',
    description: 'Лимон, гаа, мөс, байгалийн зөгийн бал.',
    price: 5900,
    category: 'drink',
    emoji: '🥤',
    gradient: 'from-yellow-300 to-lime-500',
    rating: 4.6,
    minutes: 8,
  },
  {
    id: 'dessert-chocolate-cake',
    name: 'Шоколадтай бялуу',
    description: 'Зөөлөн шоколадтай бялуу, ганашийн бүрхүүлтэй.',
    price: 8900,
    category: 'dessert',
    emoji: '🍰',
    gradient: 'from-amber-700 to-rose-900',
    rating: 4.8,
    minutes: 12,
  },
  {
    id: 'dessert-cheesecake',
    name: 'Нью-Йорк чийзкейк',
    description: 'Крем бяслагтай чийзкейк, жигд бялууны суурьтай.',
    price: 9500,
    category: 'dessert',
    emoji: '🍰',
    gradient: 'from-yellow-300 to-orange-400',
    rating: 4.9,
    minutes: 12,
    popular: true,
  },
  {
    id: 'dessert-ice-cream',
    name: 'Зөгийн балтай зайрмаг',
    description: 'Ванилийн зайрмаг, байгалийн зөгийн бал, самар.',
    price: 6900,
    category: 'dessert',
    emoji: '🍦',
    gradient: 'from-pink-300 to-purple-400',
    rating: 4.7,
    minutes: 10,
  },
];

export const DELIVERY_FEE = 3000;
export const FREE_DELIVERY_THRESHOLD = 30000;

export function getDish(id: string): Dish | undefined {
  return dishes.find((d) => d.id === id);
}

export function getCategoryLabel(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
