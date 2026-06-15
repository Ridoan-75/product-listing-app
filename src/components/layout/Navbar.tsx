"use client";

import { Search, ShoppingCart, X, Menu } from "lucide-react";
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
        ? "border-b-3 transition-all border-violet-500"
        : "text-black"
    } cursor-pointer`;

  return (
    <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center gap-4">
        {/* logo */}
        <div className="flex gap-7 items-center">
          <Link href={"/"}>
            <h1 className="font-bold text-3xl">
              {" "}
              <span className="text-violet-600 font-serif">M</span>arketify
            </h1>
          </Link>
        </div>

        {/* search bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-md px-3 py-2 flex-1 max-w-md">
          <Search className="text-gray-500 h-5 w-5 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            className="bg-transparent outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>

        {/* menu section */}
        <nav className="flex gap-7 items-center">
          <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
            <li>
              <Link href={"/"} className={linkClass("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/product"} className={linkClass("/product")}>
                Products
              </Link>
            </li>
            <li>
              <Link href={"/about"} className={linkClass("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link href={"/contact"} className={linkClass("/contact")}>
                Contact
              </Link>
            </li>
          </ul>

          <Link href={"/cart"} className="relative">
            <ShoppingCart className="h-7 w-7" />
            <span className="bg-violet-600 px-2 rounded-full absolute -top-3 -right-3 text-white text-xs">
              {items.length}
            </span>
          </Link>

          <div className="hidden md:flex gap-3 items-center">
            {!user ? (
              <SignInButton mode="modal">
                <button className="bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-500 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            ) : null}
            <UserButton />
          </div>

          {openNav ? (
            <X
              onClick={() => setOpenNav(false)}
              className="h-7 w-7 md:hidden cursor-pointer"
            />
          ) : (
            <Menu
              onClick={() => setOpenNav(true)}
              className="h-7 w-7 md:hidden cursor-pointer"
            />
          )}
        </nav>
      </div>
      <ResponsiveMenu openNav={openNav} setOpenNav={setOpenNav} />
    </div>
  );
};

export default Navbar;