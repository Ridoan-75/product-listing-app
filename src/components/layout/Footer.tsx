"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              <span className="text-violet-500">M</span>arketify
            </h2>
            <p className="text-sm text-gray-400">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-violet-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-violet-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-violet-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-violet-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-violet-400 transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-400 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-violet-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-sm text-gray-400 mb-2">Email: support@marketify.com</p>
            <p className="text-sm text-gray-400">Phone: +1-800-MARKETIFY</p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; 2024 Marketify. All rights reserved.
            </p>
            <p className="text-sm text-gray-400 flex items-center gap-2">
              Made with <Heart className="h-4 w-4 text-red-500" /> by Marketify Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
