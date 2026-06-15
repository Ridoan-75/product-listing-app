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
        ? "border-b-2 transition-all border-violet-500"
        : "text-gray-700"
    } cursor-pointer py-2`;

  if (!openNav) return null;

  return (
    <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4">
      <ul className="flex flex-col gap-4">
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
        <li className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
          {!user ? (
            <SignInButton mode="modal">
              <button className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-500 transition-colors flex-1">
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
