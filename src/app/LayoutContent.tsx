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
        location={null}
        getLocation={() => {}}
        openDropdown={false}
        setOpenDropdown={() => {}}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
