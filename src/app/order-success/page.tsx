import OrderSuccess from "@/components/checkout/OrderSuccess";
import { Suspense } from "react";

export const metadata = {
  title: "Order Successful - Product Store",
  description: "Your order has been confirmed",
};

export default function OrderSuccessPage() {
  return (
    <>
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <OrderSuccess />
      </Suspense>
    </>
  );
}
