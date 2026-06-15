'use client';

import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";
import { useCart } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Lock } from "lucide-react";

export default function CartSummary() {
  const { items, getTotal } = useCart();
  const { user, isLoaded } = useUser();
  
  const subtotal = getTotal();
  const tax = subtotal * 0.1; // 10% tax
  const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
  const total = subtotal + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 p-6 text-center" role="region" aria-label="Empty cart message">
        <ShoppingBag className="mx-auto mb-4 text-slate-400" size={48} aria-hidden="true" />
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
    <div className="bg-white rounded-lg border border-slate-200 p-6 sticky top-4" role="region" aria-label="Order summary">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>

      {/* Items Count */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
        <span className="text-slate-600">
          Items (<span aria-live="polite">{items.length}</span>)
        </span>
        <span className="font-semibold text-slate-900" aria-label={`Subtotal: $${subtotal.toFixed(2)}`}>
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Tax */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
        <span className="text-slate-600">Tax (10%)</span>
        <span className="font-semibold text-slate-900" aria-label={`Tax amount: $${tax.toFixed(2)}`}>
          ${tax.toFixed(2)}
        </span>
      </div>

      {/* Shipping */}
      <div className="flex justify-between items-center mb-6 pb-6 border-b border-slate-200">
        <span className="text-slate-600">
          Shipping
          {shipping === 0 && (
            <span className="ml-2 inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded" aria-label="Free shipping offer">
              FREE
            </span>
          )}
        </span>
        <span className="font-semibold text-slate-900" aria-label={`Shipping charge: $${shipping.toFixed(2)}`}>
          ${shipping.toFixed(2)}
        </span>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-bold text-slate-900">Total</span>
        <span className="text-2xl font-bold text-blue-600" aria-live="polite" aria-label={`Total amount: $${total.toFixed(2)}`}>
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Checkout Button */}
      {!isLoaded ? (
        <Button className="w-full bg-slate-400 cursor-not-allowed text-white" disabled>
          Loading...
        </Button>
      ) : !user ? (
        <SignInButton mode="modal">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2">
            <Lock size={18} />
            Sign In to Checkout
          </Button>
        </SignInButton>
      ) : (
        <Link href="/checkout" className="block mb-3">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" aria-label="Proceed to checkout">
            Proceed to Checkout
          </Button>
        </Link>
      )}
      
      {user && <div className="mb-3"></div>}

      {/* Continue Shopping Button */}
      <Link href="/">
        <Button variant="outline" className="w-full" aria-label="Continue shopping">
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
