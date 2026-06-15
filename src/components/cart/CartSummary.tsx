'use client';

import Link from "next/link";
import { useCart } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function CartSummary() {
  const { items, getTotal } = useCart();
  
  const subtotal = getTotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6 text-center">
        <ShoppingBag className="mx-auto mb-4 text-slate-400" size={48} />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Your cart is empty
        </h3>
        <p className="text-slate-500 mb-6">
          Add some products to get started!
        </p>
        <Link href="/">
          <Button className="w-full">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-4">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

      {/* Items Count */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
        <span className="text-slate-600">
          Items ({items.length})
        </span>
        <span className="font-semibold text-slate-900">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Tax */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
        <span className="text-slate-600">Tax (10%)</span>
        <span className="font-semibold text-slate-900">
          ${tax.toFixed(2)}
        </span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
        <span className="text-slate-600">
          Shipping
          {shipping === 0 && (
            <span className="ml-2 inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
              FREE
            </span>
          )}
        </span>
        <span className="font-semibold text-slate-900">
          ${shipping.toFixed(2)}
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-slate-900">Total</span>
        <span className="text-2xl font-bold text-blue-600">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      <Link href="/checkout" className="block mb-3">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
          Proceed to Checkout
        </Button>
      </Link>

      {/* Continue Shopping Button */}
      <Link href="/">
        <Button variant="outline" className="w-full">
          Continue Shopping
        </Button>
      </Link>

      {/* Free Shipping Info */}
      {shipping > 0 && (
        <p className="text-xs text-slate-500 text-center mt-4">
          Free shipping on orders over $100
        </p>
      )}
    </div>
  );
}
