'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Product } from '@/types/product';

interface BannerProps {
  products: Product[];
}

export default function Banner({ products }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Get 3 random featured products for banner
  const bannerProducts = products.slice(0, 3);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerProducts.length);
    }, 5000); // Auto-rotate every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, bannerProducts.length]);

  const goToPrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) =>
      prev === 0 ? bannerProducts.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % bannerProducts.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  if (bannerProducts.length === 0) return null;

  const currentProduct = bannerProducts[currentIndex];

  return (
    <div className="mb-12">
      {/* Main Banner */}
      <div className="relative bg-gradient-to-r from-blue-50 to-slate-50 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-6 md:p-10 h-[400px] md:h-[500px]">
          {/* Product Image */}
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={currentProduct.image}
                alt={currentProduct.title}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-4">
            <div>
              <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                Featured
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 line-clamp-3">
                {currentProduct.title}
              </h2>
            </div>

            <p className="text-slate-600 text-sm md:text-base line-clamp-2">
              {currentProduct.description}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-slate-900">
                  {currentProduct.rating.rate}
                </span>
              </div>
              <span className="text-slate-500 text-sm">
                ({currentProduct.rating.count} reviews)
              </span>
            </div>

            {/* Price & CTA */}
            <div className="space-y-4">
              <p className="text-3xl md:text-4xl font-bold text-slate-900">
                ${currentProduct.price.toFixed(2)}
              </p>
              <Link href={`/products/${currentProduct.id}`}>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg transition-all z-10"
          aria-label="Previous product"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-900 p-2 rounded-full shadow-lg transition-all z-10"
          aria-label="Next product"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {bannerProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-blue-600 w-8'
                : 'bg-slate-300 w-2 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
