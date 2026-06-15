'use client';

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/product";
import { useCart } from "@/store/cartStore";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const subtotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 relative flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 100px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="font-semibold text-slate-900 line-clamp-2 hover:text-blue-600">
          {item.title}
        </h3>
        <p className="text-slate-500 text-sm">${item.price.toFixed(2)}</p>
        <p className="text-xs text-slate-400">Category: {item.category}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1">
          <button
            onClick={() =>
              item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
            }
            disabled={item.quantity === 1}
            className="p-1 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-semibold text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-slate-100 rounded"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right flex-shrink-0">
          <p className="text-sm text-slate-500">Subtotal</p>
          <p className="text-lg font-bold text-slate-900">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label="Remove item from cart"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
