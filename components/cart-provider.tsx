'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DELIVERY_FEE,
  FREE_DELIVERY_THRESHOLD,
  getDish,
  type Dish,
} from '@/lib/data';

export type CartLine = {
  dishId: string;
  qty: number;
};

export type CartEntry = CartLine & { dish: Dish; lineTotal: number };

export type OrderStatus = 'pending' | 'preparing' | 'delivering' | 'delivered';

export type OrderItem = {
  dishId: string;
  name: string;
  emoji: string;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: {
    name: string;
    phone: string;
    address: string;
    note?: string;
  };
  payment: 'cash' | 'card' | 'qpay';
  slot: string;
  status: OrderStatus;
};

type CartContextValue = {
  hydrated: boolean;
  lines: CartLine[];
  entries: CartEntry[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  orders: Order[];
  add: (dishId: string, qty?: number) => void;
  remove: (dishId: string) => void;
  setQty: (dishId: string, qty: number) => void;
  clear: () => void;
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => Order;
  toast: string | null;
};

const CART_KEY = 'foodiego-cart';
const ORDERS_KEY = 'foodiego-orders';

const CartContext = createContext<CartContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    // Hydrate client-only state from localStorage after mount to avoid
    // server/client hydration mismatches. This is an intentional one-time sync.
    /* eslint-disable react-hooks/set-state-in-effect */
    setLines(readStorage<CartLine[]>(CART_KEY, []));
    setOrders(readStorage<Order[]>(ORDERS_KEY, []));
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, hydrated]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const add = useCallback((dishId: string, qty = 1) => {
    const dish = getDish(dishId);
    if (!dish) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.dishId === dishId);
      if (existing) {
        return prev.map((l) =>
          l.dishId === dishId ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { dishId, qty }];
    });
    setToast(`${dish.emoji} ${dish.name} сагсанд нэмэгдлээ`);
  }, []);

  const remove = useCallback((dishId: string) => {
    setLines((prev) => prev.filter((l) => l.dishId !== dishId));
  }, []);

  const setQty = useCallback((dishId: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.dishId !== dishId);
      return prev.map((l) => (l.dishId === dishId ? { ...l, qty } : l));
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const placeOrder = useCallback(
    (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
      const newOrder: Order = {
        ...order,
        id: 'FD' + Date.now().toString().slice(-8),
        createdAt: new Date().toISOString(),
        status: 'pending',
      };
      setOrders((prev) => [newOrder, ...prev]);
      setLines([]);
      return newOrder;
    },
    []
  );

  const entries = useMemo<CartEntry[]>(() => {
    return lines
      .map((line) => {
        const dish = getDish(line.dishId);
        if (!dish) return null;
        return { ...line, dish, lineTotal: dish.price * line.qty };
      })
      .filter((entry): entry is CartEntry => entry !== null);
  }, [lines]);

  const count = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.qty, 0),
    [entries]
  );

  const subtotal = useMemo(
    () => entries.reduce((sum, entry) => sum + entry.lineTotal, 0),
    [entries]
  );

  const deliveryFee =
    subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;

  const total = subtotal + deliveryFee;

  const value: CartContextValue = {
    hydrated,
    lines,
    entries,
    count,
    subtotal,
    deliveryFee,
    total,
    orders,
    add,
    remove,
    setQty,
    clear,
    placeOrder,
    toast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
