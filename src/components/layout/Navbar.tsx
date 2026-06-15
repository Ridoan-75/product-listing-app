"use client";

import { ShoppingCart, X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { UserButton, SignInButton, useUser } from '@clerk/nextjs'
import { useCart } from "@/store/cartStore";
import ResponsiveMenu from "./ResponsiveMenu";

interface NavbarProps {
  location?: { country: string; state: string };
  getLocation: () => void;
  openDropdown: boolean;
  setOpenDropdown: (value: boolean) => void;
}

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }: NavbarProps) => {
  const { items } = useCart();
  const { user } = useUser();
  const [openNav, setOpenNav] = useState(false);
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `${
      pathname === path
        ? "border-b-3 transition-all border-purple-600"
        : "text-purple-600 hover:text-purple-500"
    } cursor-pointer transition-colors`;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 py-6 shadow-lg px-4 md:px-0" role="banner">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        {/* Logo */}
        <Link href={"/"} aria-label="Marketify - Go to home page" className="shrink-0">
          <h1 className="font-bold text-3xl md:text-4xl">
            {" "}
            <span className="text-purple-600 font-serif">M</span><span className="text-slate-900">arketify</span>
          </h1>
        </Link>

        {/* Navigation menu - centered */}
        <nav className="hidden md:flex gap-8 items-center flex-1 justify-center" aria-label="Main navigation">
          <ul className="flex gap-8 items-center text-lg font-semibold text-purple-600">
            <li>
              <Link href={"/"} className={linkClass("/")} aria-current={pathname === "/" ? "page" : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/products"} className={linkClass("/products")} aria-current={pathname === "/products" ? "page" : undefined}>
                Products
              </Link>
            </li>
            <li>
              <Link href={"/about"} className={linkClass("/about")} aria-current={pathname === "/about" ? "page" : undefined}>
                About
              </Link>
            </li>
            <li>
              <Link href={"/contact"} className={linkClass("/contact")} aria-current={pathname === "/contact" ? "page" : undefined}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right section - Cart and Profile */}
        <div className="flex gap-4 md:gap-6 items-center ml-auto">
          <Link href={"/cart"} className="relative" aria-label={`Shopping cart with ${items.length} items`}>
            <ShoppingCart className="h-6 w-6 md:h-8 md:w-8 text-purple-600 hover:text-purple-500 transition-colors" aria-hidden="true" />
            <span 
              className="bg-purple-600 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs font-bold"
              aria-label={`${items.length} items in cart`}
            >
              {items.length}
            </span>
          </Link>

          <div className="hidden md:flex gap-4 items-center">
            {!user ? (
              <SignInButton mode="modal">
                <button 
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors font-semibold"
                  aria-label="Sign in to your account"
                >
                  Sign In
                </button>
              </SignInButton>
            ) : null}
            <div className="scale-125 transform-gpu">
              <UserButton />
            </div>
          </div>

          {/* Mobile: Profile */}
          <div className="md:hidden">
            <UserButton />
          </div>

          {/* Hamburger - larger on mobile */}
          {openNav ? (
            <button
              onClick={() => setOpenNav(false)}
              className="h-10 w-10 md:hidden cursor-pointer text-purple-600"
              aria-label="Close navigation menu"
              aria-expanded="true"
            >
              <X aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={() => setOpenNav(true)}
              className="h-10 w-10 md:hidden cursor-pointer text-purple-600"
              aria-label="Open navigation menu"
              aria-expanded="false"
            >
              <Menu aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
};

export default Navbar;