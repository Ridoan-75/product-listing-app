"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LayoutContentProps {
  children: React.ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  return (
    <>
      <Navbar
        location={undefined}
        getLocation={() => {}}
        openDropdown={false}
        setOpenDropdown={() => {}}
      />
      <main className="flex-1 pt-24 bg-linear-to-b from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
