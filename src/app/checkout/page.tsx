'use client';

import { useUser } from '@clerk/nextjs';
import { SignInButton } from '@clerk/nextjs';
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Lock } from 'lucide-react';

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center">
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
              <Button size="lg" className="mb-4">
                Sign In to Continue
              </Button>
            </SignInButton>

            <p className="text-sm text-slate-500 mt-6">
              Don't have an account? You'll be able to create one during sign-in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
}
