"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

interface ResponsiveMenuProps {
  openNav: boolean;
  setOpenNav: (value: boolean) => void;
}

const ResponsiveMenu = ({ openNav, setOpenNav }: ResponsiveMenuProps) => {
  const pathname = usePathname();
  const { user } = useUser();

  const linkClass = (path: string) =>
    `${
      pathname === path
        ? "border-l-3 transition-all border-purple-600 text-purple-600 font-semibold"
        : "text-slate-700 hover:text-purple-600"
    } cursor-pointer py-3 pl-3 block transition-colors`;

  if (!openNav) return null;

  return (
    <div className="md:hidden fixed top-24 left-4 right-4 bg-white border-2 border-purple-200 rounded-lg shadow-lg py-4 px-4 z-40">
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/" className={linkClass("/")} onClick={() => setOpenNav(false)}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className={linkClass("/products")} onClick={() => setOpenNav(false)}>
            Products
          </Link>
        </li>
        <li>
          <Link href="/about" className={linkClass("/about")} onClick={() => setOpenNav(false)}>
            About
          </Link>
        </li>
        <li>
          <Link href="/contact" className={linkClass("/contact")} onClick={() => setOpenNav(false)}>
            Contact
          </Link>
        </li>
        <li className="pt-3 mt-2 border-t border-purple-200 flex items-center justify-between gap-3">
          {!user ? (
            <SignInButton mode="modal">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors flex-1 font-semibold">
                Sign In
              </button>
            </SignInButton>
          ) : null}
          <div className={!user ? "flex-1" : "w-full"}>
            <UserButton />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ResponsiveMenu;
