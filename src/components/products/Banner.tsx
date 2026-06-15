'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cartStore';
import { Product } from '@/types/product';
import { PAGINATION, UI } from '@/constants';

interface BannerProps {
  products: Product[];
}

export default function Banner({ products }: BannerProps) {
  const { addToCart } = useCart();
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
    changeSlide(currentIndex === 0 ? bannerProducts.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    changeSlide((currentIndex + 1) % bannerProducts.length);
  };

  if (bannerProducts.length === 0) return null;

  const product = bannerProducts[currentIndex];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <section className="w-full bg-linear-to-r from-indigo-50 via-white to-purple-50">
      <div className="w-full px-4 xs:px-6 sm:px-8 lg:px-12 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 lg:gap-12 items-center py-8 sm:py-12 lg:py-16 min-h-[500px] sm:min-h-[550px] lg:min-h-[600px]">

            {/* LEFT — Product Info */}
            <div
              className={`flex flex-col justify-center order-2 lg:order-1 transition-opacity duration-300 ${
                fading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <span className="inline-block text-purple-600 text-xs xs:text-sm sm:text-base font-semibold mb-2 xs:mb-3 sm:mb-4 line-clamp-1 w-fit">
                Best Deal Online on {product.category}
              </span>

              <h1 className="text-xl xs:text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-2 xs:mb-3 sm:mb-4 lg:mb-6">
                {product.title}
              </h1>

              <p className="text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl text-slate-600 font-medium mb-4 xs:mb-6 sm:mb-8">
                Up to <span className="text-purple-600 font-bold">80% OFF</span> · ${product.price.toFixed(2)}
              </p>

              <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-3">
                <Link href={`/products/${product.id}`} className="w-full xs:w-auto">
                  <Button size="sm" className="w-full xs:w-auto text-xs xs:text-sm sm:text-base">
                    Shop Now
                  </Button>
                </Link>
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="sm"
                  className="flex items-center justify-center gap-1 xs:gap-2 w-full xs:w-auto text-xs xs:text-sm sm:text-base"
                >
                  <ShoppingCart size={16} className="xs:w-5 xs:h-5" /> Add to Cart
                </Button>
              </div>
            </div>

            {/* RIGHT — Product Image */}
            <div className="relative w-full h-48 xs:h-56 sm:h-64 lg:h-80 xl:h-96 order-1 lg:order-2 flex items-center justify-center">
              <div className="absolute w-[70%] aspect-square rounded-full bg-white shadow-inner" />
              <div
                className={`relative z-10 w-full h-full transition-opacity duration-300 ${
                  fading ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>

            {/* Prev / Next arrows */}
            <button
              onClick={goToPrevious}
              className="hidden sm:flex absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-white hover:bg-slate-100 text-slate-700 shadow-md transition-all z-30"
              aria-label="Previous"
            >
              <ChevronLeft size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>

            <button
              onClick={goToNext}
              className="hidden sm:flex absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-white hover:bg-slate-100 text-slate-700 shadow-md transition-all z-30"
              aria-label="Next"
            >
              <ChevronRight size={20} className="sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
            </button>

            {/* Slide dots */}
            <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2 z-30">
              {bannerProducts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setIsAutoPlay(false);
                    changeSlide(i);
                  }}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-slate-900 w-5 h-2 xs:w-6 sm:w-7 sm:h-2.5 lg:w-8 lg:h-3' : 'bg-slate-300 hover:bg-slate-400 w-2 h-2 sm:w-2.5 sm:h-2.5'
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}