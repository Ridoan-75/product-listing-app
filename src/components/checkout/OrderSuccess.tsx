'use client';

import Link from "next/link";
import { CheckCircle, Package, Truck, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderSuccess() {
  // In a real app, this would come from route params or state
  const orderId = "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
    .toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="space-y-8">
      {/* Success Icon & Message */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse"></div>
            <CheckCircle className="relative w-20 h-20 text-green-600" strokeWidth={1.5} />
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          Order Confirmed!
        </h1>
        <p className="text-lg text-slate-600 mb-2">
          Thank you for your purchase
        </p>
        <p className="text-slate-500">
          Your order has been successfully placed and is being processed
        </p>
      </div>

      {/* Order Details Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8 max-w-2xl mx-auto w-full">
        <div className="space-y-6">
          {/* Order ID */}
          <div className="border-b border-slate-200 pb-6">
            <p className="text-sm text-slate-600 mb-2">Order ID</p>
            <p className="text-2xl font-bold text-slate-900 font-mono">{orderId}</p>
            <p className="text-xs text-slate-500 mt-2">
              Check your email for confirmation and tracking details
            </p>
          </div>

          {/* Order Status Timeline */}
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-700">Order Status</p>
            
            <div className="space-y-4">
              {/* Processing */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Package size={20} className="text-green-600" />
                  </div>
                  <div className="w-1 h-12 bg-green-200 mt-2"></div>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-slate-900">Order Processing</p>
                  <p className="text-sm text-slate-500">Your order is being prepared</p>
                </div>
              </div>

              {/* Shipping */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck size={20} className="text-blue-600" />
                  </div>
                  <div className="w-1 h-12 bg-slate-200 mt-2"></div>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-slate-900">On the Way</p>
                  <p className="text-sm text-slate-500">
                    Estimated delivery: {estimatedDelivery}
                  </p>
                </div>
              </div>

              {/* Delivered */}
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <Home size={20} className="text-slate-400" />
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-slate-900">Delivered</p>
                  <p className="text-sm text-slate-500">Your order will be delivered soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto w-full">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <p className="text-sm font-semibold text-blue-900 mb-1">📧 Confirmation</p>
          <p className="text-xs text-blue-700">
            Check your email for order confirmation
          </p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <p className="text-sm font-semibold text-purple-900 mb-1">📦 Tracking</p>
          <p className="text-xs text-purple-700">
            Track your shipment in account
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-sm font-semibold text-green-900 mb-1">💬 Support</p>
          <p className="text-xs text-green-700">
            Contact us if you need help
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto w-full">
        <Link href="/products" className="flex-1">
          <Button className="w-full">
            Continue Shopping
          </Button>
        </Link>
        <Link href="/" className="flex-1">
          <Button variant="outline" className="w-full">
            Back Home
          </Button>
        </Link>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 max-w-2xl mx-auto w-full">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          <details className="group cursor-pointer">
            <summary className="font-medium text-slate-700 group-open:text-blue-600 transition">
              When will my order arrive?
            </summary>
            <p className="text-sm text-slate-600 mt-2">
              Most orders arrive within 5-7 business days. You'll receive tracking information via email once your order ships.
            </p>
          </details>
          <hr className="border-slate-200" />
          <details className="group cursor-pointer">
            <summary className="font-medium text-slate-700 group-open:text-blue-600 transition">
              Can I modify or cancel my order?
            </summary>
            <p className="text-sm text-slate-600 mt-2">
              You can modify or cancel your order within 1 hour of purchase. Contact support immediately for assistance.
            </p>
          </details>
          <hr className="border-slate-200" />
          <details className="group cursor-pointer">
            <summary className="font-medium text-slate-700 group-open:text-blue-600 transition">
              What's your return policy?
            </summary>
            <p className="text-sm text-slate-600 mt-2">
              We offer a 30-day return policy for all products. Items must be in original condition and packaging.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
