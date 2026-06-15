'use client';

import { useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Suspense } from "react";
import { Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="text-center py-12">
          <p className="text-slate-500">Loading...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-lg border border-slate-200 p-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Sign In Required
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              You need to sign in to your account before you can place an order. This helps us keep your order history and shipping information secure.
            </p>
            
            <SignInButton mode="modal">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block mb-4">
                Sign In to Continue
              </button>
            </SignInButton>

            <p className="text-sm text-slate-500 mt-6">
              Don't have an account? You'll be able to create one during sign-in.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 font-bold">✓</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Checkout
          </h1>
        </div>
        <p className="text-slate-500">
          Signed in as <span className="font-semibold text-slate-700">{user.firstName} {user.lastName}</span>
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 p-6 md:p-8">
        <Suspense fallback={<div>Loading...</div>}>
          <CheckoutForm />
        </Suspense>
      </div>
    </main>
  );
}
