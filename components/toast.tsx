'use client';

import { useCart } from './cart-provider';

export function Toast() {
  const { toast } = useCart();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
    >
      {toast && (
        <div className="animate-fade-in rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-xl ring-1 ring-white/10">
          {toast}
        </div>
      )}
    </div>
  );
}
