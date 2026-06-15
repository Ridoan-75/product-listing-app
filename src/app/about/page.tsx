'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-slate-900">About Marketify</h1>

        <p className="text-slate-700 text-lg">
          Welcome to{' '}
          <span className="font-semibold text-purple-600">Marketify</span>, your
          one-stop destination for quality products and exceptional service. From
          essentials to premium items, we're here to make shopping easy, affordable,
          and enjoyable.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-600">Our Mission</h2>
          <p className="text-slate-700 text-base">
            At Marketify, our mission is to make quality products accessible to
            everyone. We're passionate about connecting people with the items they
            need to enhance their lives — all at competitive prices and delivered
            with speed and care.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-600">
            Why Choose Marketify?
          </h2>
          <ul className="list-disc pl-6 text-slate-700 space-y-2">
            <li>Curated selection of quality products</li>
            <li>Fast and secure shipping</li>
            <li>Dedicated customer support, always ready to help</li>
            <li>Easy returns and hassle-free shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-purple-600">Our Vision</h2>
          <p className="text-slate-700 text-base">
            We envision a future where shopping is simple and accessible. At
            Marketify, we're committed to staying ahead, offering quality products
            that are both practical and affordable.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Join the Marketify Community
          </h3>
          <p className="text-slate-700 mb-6">
            Whether you're looking for everyday essentials or something special —
            Marketify has something for everyone.
          </p>
          <Link href="/products">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
