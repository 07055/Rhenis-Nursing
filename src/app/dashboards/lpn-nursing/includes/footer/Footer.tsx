"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRightSidebar } from "@/lib/contexts/panel/layout/includes/sidebar/RightSidebarContext";

const quickLinks = [
  { href: "/pages/about", label: "About Us" },
  { href: "/#how-it-works", label: "How We Help" },
  { href: "/#exams", label: "Exam Tracks" },
  { href: "/pages/resources", label: "Resources" },
  { href: "/pages/contact-us", label: "Contact Us" },
  { href: "/pages/terms", label: "Terms of Service" },
  { href: "/pages/privacy-policy", label: "Privacy Policy" },
];

export default function Footer() {
  const rightSidebar = useRightSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  const getSidebarWidth = (sidebar: typeof rightSidebar) => {
    if (!isClient) return 0;
    if (sidebar.isClosed) return 0;
    if (sidebar.isOpened) return 256;
    return 80;
  };

  const rightWidth = getSidebarWidth(rightSidebar);

  return (
    <footer
      className="border-t border-white/10"
      style={{ marginRight: rightWidth }}
    >
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <img
                src="/logo/logo.webp"
                alt="Rhenis Nursing"
                className="w-7 h-7 shrink-0 object-contain"
              />
              <span className="font-serif text-lg font-semibold text-white">
                Rhenis Nursing
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-gray-400">
              Nursing exam-prep built by nurses, for nurses. Study smarter, pass
              faster.
            </p>
            <p className="text-sm leading-relaxed max-w-xs mt-3 text-gray-400">
              We are always there for You !
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-gray-500 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-xs tracking-widest uppercase text-gray-500 mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <a
                  href="tel:+18702596083"
                  className="hover:text-white transition-colors"
                >
                  +1 (870) 259-6083
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@rhenisnursing.com"
                  className="hover:text-white transition-colors"
                >
                  support@rhenisnursing.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
