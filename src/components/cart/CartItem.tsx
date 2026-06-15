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
    <div className="flex flex-col sm:flex-row gap-4 p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow" role="article" aria-label={`Cart item: ${item.title}`}>
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 relative flex-shrink-0">
        <Image
          src={item.image}
          alt={`Product image: ${item.title}`}
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
        <p className="text-slate-500 text-sm" aria-label={`Price: $${item.price.toFixed(2)}`}>
          ${item.price.toFixed(2)}
        </p>
        <p className="text-xs text-slate-400">
          Category: <span aria-label={`Product category: ${item.category}`}>{item.category}</span>
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2 border border-slate-200 rounded-lg p-1" role="group" aria-label="Quantity selector">
          <button
            onClick={() =>
              item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
            }
            disabled={item.quantity === 1}
            className="p-1 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed rounded"
            aria-label={`Decrease quantity for ${item.title}`}
          >
            <Minus size={16} aria-hidden="true" />
          </button>
          <span className="w-8 text-center font-semibold text-sm" aria-live="polite" aria-atomic="true">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-slate-100 rounded"
            aria-label={`Increase quantity for ${item.title}`}
          >
            <Plus size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Subtotal */}
        <div className="text-right flex-shrink-0">
          <p className="text-sm text-slate-500">Subtotal</p>
          <p className="text-lg font-bold text-slate-900" aria-label={`Subtotal: $${subtotal.toFixed(2)}`}>
            ${subtotal.toFixed(2)}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          aria-label={`Remove ${item.title} from cart`}
        >
          <Trash2 size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
