import type { Metadata } from "next";
import OrderMenu from "@/components/OrderMenu";

export const metadata: Metadata = {
  title: "Order Online | MY3 Family Restaurant, Gajwel",
  description: "Order Hyderabadi biryani, kebabs and curries from MY3 in Gajwel. Pick your dishes and send your order on WhatsApp.",
  alternates: { canonical: "/order" },
};

export default function OrderPage() {
  return <OrderMenu />;
}
