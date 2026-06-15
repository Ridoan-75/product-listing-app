'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';

interface BannerProps {
  products: Product[];
}

export default function Banner({ products }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [fading, setFading] = useState(false);

  const bannerProducts = products.slice(0, 5);

  const changeSlide = useCallback((newIndex: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFading(false);
    }, 300);
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
    console.log('Added to cart:', product.id);
  };

  return (
    <div className="w-full pt-6">
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-indigo-50 via-white to-purple-50">
        <div className="relative flex items-center justify-between gap-6 px-4 sm:px-12 lg:px-20 py-10 sm:py-14 lg:py-20 min-h-[320px] sm:min-h-[400px] lg:min-h-[460px]">

          {/* LEFT — Product Info */}
          <div
            className={`flex flex-col justify-center max-w-[55%] transition-opacity duration-300 ${
              fading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <span className="inline-block text-indigo-600 text-xs sm:text-sm font-semibold mb-3 line-clamp-1">
              Best Deal Online on {product.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight mb-4 line-clamp-2 uppercase">
              {product.title}
            </h1>

            <p className="text-slate-500 text-sm sm:text-base lg:text-lg font-medium mb-8">
              Up to <span className="text-indigo-600 font-bold">80% OFF</span> · ${product.price.toFixed(2)}
            </p>

            <div className="flex items-center gap-3">
              <Link href={`/products/${product.id}`}>
                <button className="bg-slate-900 hover:bg-slate-700 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm transition-all duration-200">
                  Shop Now
                </button>
              </Link>
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 border border-slate-200 hover:bg-white text-slate-900 bg-white/60 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold text-sm transition-all duration-200"
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </div>

          {/* RIGHT — Product Image */}
          <div className="relative w-[40%] sm:w-[35%] flex items-center justify-center">
            <div className="absolute w-[80%] aspect-square rounded-full bg-white shadow-inner" />
            <div
              className={`relative z-10 w-full h-48 sm:h-64 lg:h-80 transition-opacity duration-300 ${
                fading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="40vw"
                priority
              />
            </div>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-md transition-all z-20"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-md transition-all z-20"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {bannerProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIsAutoPlay(false);
                changeSlide(i);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex ? 'bg-slate-900 w-6 h-2' : 'bg-slate-300 hover:bg-slate-400 w-2 h-2'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}