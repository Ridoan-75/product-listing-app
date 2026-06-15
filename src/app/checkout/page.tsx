import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Suspense } from "react";

export const metadata = {
  title: "Checkout - Product Store",
  description: "Complete your purchase",
};

export default function CheckoutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
          Checkout
        </h1>
        <p className="text-slate-500">
          Please fill in your details to complete your order
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
