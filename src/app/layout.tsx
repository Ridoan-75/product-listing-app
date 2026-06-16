import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryProvider";
import { ToastProvider } from "@/components/ui/toast-provider";
import LayoutContent from "./LayoutContent";

export const metadata: Metadata = {
  title: "Marketify",
  description: "Discover amazing products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full scroll-smooth scroll-pt-24", "antialiased")}
    >
      <body className="min-h-full flex flex-col bg-linear-to-b from-slate-50 to-gray-100">
        <ClerkProvider>
          <QueryProvider>
            <ToastProvider>
              <LayoutContent>{children}</LayoutContent>
            </ToastProvider>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
