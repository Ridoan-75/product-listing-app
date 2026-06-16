"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useCart } from "@/store/cartStore";
import { useToast } from "@/components/ui/toast-provider";
import { Product } from "@/types/product";
import { PAGINATION, UI } from "@/constants";

interface BannerProps {
  products: Product[];
}

const ACCENT_COLORS = [
  {
    bg: "bg-[#e8e4f5]",
    badge: "bg-violet-600 text-white",
    btn: "bg-violet-700 hover:bg-violet-600",
    price: "text-violet-700",
    cartBtn: "border-violet-300 text-violet-700 hover:bg-violet-100",
    dot: "bg-violet-500",
    dotInactive: "bg-violet-300",
    imgBg: "bg-transparent",
  },
  {
    bg: "bg-[#fdefd6]",
    badge: "bg-orange-500 text-white",
    btn: "bg-orange-500 hover:bg-orange-400",
    price: "text-orange-600",
    cartBtn: "border-orange-300 text-orange-600 hover:bg-orange-100",
    dot: "bg-orange-500",
    dotInactive: "bg-orange-300",
    imgBg: "bg-transparent",
  },
  {
    bg: "bg-[#d4f0ea]",
    badge: "bg-emerald-600 text-white",
    btn: "bg-emerald-600 hover:bg-emerald-500",
    price: "text-emerald-700",
    cartBtn: "border-emerald-300 text-emerald-700 hover:bg-emerald-100",
    dot: "bg-emerald-500",
    dotInactive: "bg-emerald-300",
    imgBg: "bg-transparent",
  },
  {
    bg: "bg-[#d6e8fb]",
    badge: "bg-blue-600 text-white",
    btn: "bg-blue-600 hover:bg-blue-500",
    price: "text-blue-700",
    cartBtn: "border-blue-300 text-blue-700 hover:bg-blue-100",
    dot: "bg-blue-500",
    dotInactive: "bg-blue-300",
    imgBg: "bg-transparent",
  },
  {
    bg: "bg-[#fce4ef]",
    badge: "bg-pink-600 text-white",
    btn: "bg-pink-600 hover:bg-pink-500",
    price: "text-pink-700",
    cartBtn: "border-pink-300 text-pink-700 hover:bg-pink-100",
    dot: "bg-pink-500",
    dotInactive: "bg-pink-300",
    imgBg: "bg-transparent",
  },
];

function DotsComponent({
  bannerProducts,
  currentIndex,
  accent,
  setIsAutoPlay,
  changeSlide,
}: {
  bannerProducts: Product[];
  currentIndex: number;
  accent: (typeof ACCENT_COLORS)[0];
  setIsAutoPlay: (value: boolean) => void;
  changeSlide: (index: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {bannerProducts.map((_, i) => (
        <button
          key={i}
          onClick={() => {
            setIsAutoPlay(false);
            changeSlide(i);
          }}
          className={`rounded-full transition-all duration-300 ${
            i === currentIndex
              ? `${accent.dot} w-6 h-2.5`
              : `${accent.dotInactive} w-2.5 h-2.5`
          }`}
          aria-label={`Slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

function ArrowBtnComponent({
  dir,
  goToPrevious,
  goToNext,
}: {
  dir: "prev" | "next";
  goToPrevious: () => void;
  goToNext: () => void;
}) {
  return (
    <button
      onClick={dir === "prev" ? goToPrevious : goToNext}
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/70 border border-white/80 text-slate-600 hover:bg-white transition-all shadow-sm"
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      {dir === "prev" ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
    </button>
  );
}

export default function Banner({ products }: BannerProps) {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [fading, setFading] = useState(false);

  const bannerProducts = products.slice(0, PAGINATION.BANNER_PRODUCTS_COUNT);

  const changeSlide = useCallback((newIndex: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFading(false);
    }, UI.ANIMATION_DURATION);
  }, []);

  useEffect(() => {
    if (!isAutoPlay || bannerProducts.length === 0) return;
    const interval = setInterval(() => {
      changeSlide((currentIndex + 1) % bannerProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, currentIndex, bannerProducts.length, changeSlide]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    changeSlide(
      currentIndex === 0 ? bannerProducts.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    changeSlide((currentIndex + 1) % bannerProducts.length);
  };

  if (bannerProducts.length === 0) return null;

  const product = bannerProducts[currentIndex];
  const accent = ACCENT_COLORS[currentIndex % ACCENT_COLORS.length];
  const originalPrice = (product.price * 1.25).toFixed(2);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    addToast(`${product.title} added to cart!`, 'success');
  };

  return (
    <section
      className={`w-screen relative left-1/2 -translate-x-1/2 transition-colors duration-500 ${accent.bg} overflow-hidden`}
    >
      <div className="md:hidden px-5 pt-6 pb-8">
        {/* Badge */}
        <div className="mb-3">
          <span
            className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${accent.badge}`}
          >
            Weekend Discount
          </span>
        </div>

        {/* Title */}
        <h1
          className={`text-2xl font-black text-slate-900 leading-tight tracking-tight mb-2 line-clamp-3 transition-all duration-300 ${
            fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
          }`}
        >
          {product.title}
        </h1>

        <p className="text-xs text-slate-500 mb-4 leading-relaxed">
          We have prepared special discounts for you on grocery products. Dont
          miss these opportunities...
        </p>

        {/* Image */}
        <div
          className={`relative w-full h-52 mb-5 transition-all duration-300 ${
            fading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain drop-shadow-xl"
            sizes="100vw"
            priority
          />
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-black ${accent.price}`}>
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-slate-400 line-through">
              ${originalPrice}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAddToCart}
              className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white border ${accent.cartBtn} active:scale-90 shadow-sm transition-all cursor-pointer`}
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
            <Link href={`/products/${product.id}`}>
              <button
                className={`h-10 px-5 rounded-xl text-white text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center gap-1.5 ${accent.btn} cursor-pointer`}
              >
                Shop Now <ArrowRight size={13} />
              </button>
            </Link>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-5">
          <DotsComponent
            bannerProducts={bannerProducts}
            currentIndex={currentIndex}
            accent={accent}
            setIsAutoPlay={setIsAutoPlay}
            changeSlide={changeSlide}
          />
        </div>
      </div>
      <div className="hidden md:flex lg:hidden items-center gap-4 px-10 py-10 min-h-[380px] max-w-screen-xl mx-auto">
        {/* Left content */}
        <div
          className={`flex-1 min-w-0 transition-all duration-300 ${fading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
        >
          <span
            className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 ${accent.badge}`}
          >
            Weekend Discount
          </span>

          <h1 className="text-[1.85rem] font-black text-slate-900 leading-tight tracking-tight mb-2 line-clamp-3">
            {product.title}
          </h1>

          <p className="text-sm text-slate-500 mb-5 leading-relaxed max-w-xs">
            We have prepared special discounts for you on grocery products. Dont
            miss these opportunities...
          </p>

          <div className="flex items-baseline gap-2 mb-5">
            <span className={`text-3xl font-black ${accent.price}`}>
              ${product.price.toFixed(2)}
            </span>
            <span className="text-sm text-slate-400 line-through">
              ${originalPrice}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Link href={`/products/${product.id}`}>
              <button
                className={`inline-flex items-center gap-2 text-white text-sm font-bold px-6 py-3 rounded-xl active:scale-[0.98] transition-all shadow-sm ${accent.btn} cursor-pointer`}
              >
                Shop Now <ArrowRight size={14} />
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              className={`inline-flex items-center gap-2 bg-white text-sm font-bold px-4 py-3 rounded-xl border hover:bg-white/80 active:scale-[0.98] transition-all shadow-sm ${accent.cartBtn} cursor-pointer`}
            >
              <ShoppingCart size={14} />
            </button>
          </div>

          {/* Dots + arrows */}
          <div className="flex items-center gap-2.5">
            <ArrowBtnComponent
              dir="prev"
              goToPrevious={goToPrevious}
              goToNext={goToNext}
            />
            <DotsComponent
              bannerProducts={bannerProducts}
              currentIndex={currentIndex}
              accent={accent}
              setIsAutoPlay={setIsAutoPlay}
              changeSlide={changeSlide}
            />
            <ArrowBtnComponent
              dir="next"
              goToPrevious={goToPrevious}
              goToNext={goToNext}
            />
          </div>
        </div>

        {/* Right image */}
        <div
          className={`w-60 shrink-0 transition-all duration-300 ${fading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
        >
          <div className="relative w-full aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="240px"
              priority
            />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center min-h-[500px] max-w-screen-2xl mx-auto px-14 xl:px-20 2xl:px-28 gap-10">
        {/* LEFT — text content */}
        <div
          className={`flex-1 min-w-0 py-16 transition-all duration-300 ${fading ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"}`}
        >
          {/* Badge */}
          <div className="mb-4">
            <span
              className={`inline-block text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest ${accent.badge}`}
            >
              Weekend Discount
            </span>
          </div>

          {/* Dynamic product title, bold & large */}
          <h1 className="text-4xl xl:text-5xl font-black text-slate-900 leading-[1.08] tracking-tight mb-3 line-clamp-3 max-w-lg">
            {product.title}
          </h1>

          <p className="text-sm text-slate-500 mb-7 max-w-sm leading-relaxed">
            We have prepared special discounts for you on grocery products. Dont
            miss these opportunities...
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-7">
            <span className={`text-4xl xl:text-5xl font-black ${accent.price}`}>
              ${product.price.toFixed(2)}
            </span>
            <span className="text-lg text-slate-400 line-through">
              ${originalPrice}
            </span>
            <span className="text-xs text-slate-400 ml-1">
              Dont miss this limited time offer.
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 mb-10">
            <Link href={`/products/${product.id}`}>
              <button
                className={`inline-flex items-center gap-2 text-white text-sm font-bold px-7 py-3.5 rounded-xl active:scale-[0.98] transition-all shadow-md ${accent.btn} cursor-pointer`}
              >
                Shop Now
              </button>
            </Link>
            <button
              onClick={handleAddToCart}
              className={`inline-flex items-center gap-2 bg-white text-sm font-bold px-5 py-3.5 rounded-xl border hover:bg-white/80 active:scale-[0.98] transition-all shadow-sm ${accent.cartBtn} cursor-pointer`}
            >
              <ShoppingCart size={15} /> Add to Cart
            </button>
          </div>

          {/* Dot nav */}
          <div className="flex items-center gap-2.5">
            <ArrowBtnComponent
              dir="prev"
              goToPrevious={goToPrevious}
              goToNext={goToNext}
            />
            <DotsComponent
              bannerProducts={bannerProducts}
              currentIndex={currentIndex}
              accent={accent}
              setIsAutoPlay={setIsAutoPlay}
              changeSlide={changeSlide}
            />
            <ArrowBtnComponent
              dir="next"
              goToPrevious={goToPrevious}
              goToNext={goToNext}
            />
          </div>
        </div>
        <div
          className={`shrink-0 w-[420px] xl:w-[480px] 2xl:w-[520px] flex items-center justify-center py-10 transition-all duration-300 ${
            fading ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="relative w-full aspect-square">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(min-width: 1536px) 520px, (min-width: 1280px) 480px, 420px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
