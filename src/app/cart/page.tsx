'use client';

import { useCart } from "@/store/cartStore";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartPage() {
  const { items } = useCart();

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Shopping Cart
        </h1>
        <p className="text-slate-500">
          {items.length === 0
            ? "Your cart is empty"
            : `${items.length} item${items.length !== 1 ? "s" : ""} in cart`}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md">
            <CartSummary />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary />
          </div>
        </div>
      )}
    </>
  );
}
