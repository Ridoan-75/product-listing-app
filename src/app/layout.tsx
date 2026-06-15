import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/QueryProvider";
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
      className={cn("h-full", "antialiased")}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <QueryProvider>
            <LayoutContent>{children}</LayoutContent>
          </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
