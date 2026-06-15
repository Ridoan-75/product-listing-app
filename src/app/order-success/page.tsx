import OrderSuccess from "@/components/checkout/OrderSuccess";
import { Suspense } from "react";

export const metadata = {
  title: "Order Successful - Product Store",
  description: "Your order has been confirmed",
};

export default function OrderSuccessPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <OrderSuccess />
      </Suspense>
    </main>
  );
}
