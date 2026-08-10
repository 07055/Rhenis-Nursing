'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown } from 'lucide-react';
import SearchBar from './search';

const examLinks = [
  { label: 'ATI TEAS', href: '/pages/exams/ati-teas' },
  { label: 'HESI A2', href: '/pages/exams/hesi-a2' },
];

const nursingSchoolLinks = [
  {
    label: 'RN Nursing Test Bank',
    description: 'Registered Nurse prep',
    href: '/pages/exams/rn-nursing',
  },
  {
    label: 'LPN Nursing Test Bank',
    description: 'Licensed Practical Nurse prep',
    href: '/pages/exams/lpn-nursing',
  },
];

const moreLinks = [
  { label: 'About Us', href: '/pages/about' },
  { label: 'Entrance', href: '/pages/entrance' },
  { label: 'Resources', href: '/pages/resources' },
  { label: 'Contact Us', href: '/pages/contact-us' },
  { label: 'Terms of Service', href: '/pages/terms' },
  { label: 'Privacy Policy', href: '/pages/privacy-policy' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDropdown = (name: string) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border ${
        scrolled ? 'bg-[#0d1b2e]/95 backdrop-blur-md py-2 shadow-lg' : 'bg-[#0d1b2e] py-4'
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group" onClick={() => setOpenDropdown(null)}>
          <Image
            src="/logo/logo.webp"
            alt="Rhenis Nursing"
            width={28}
            height={28}
            priority
            className="w-7 h-7 object-contain"
          />
          <span className="font-serif text-lg font-semibold text-sage group-hover:text-coral transition-colors">
            Rhenis Nursing
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {examLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy/70 hover:text-navy transition-colors"
              onClick={() => setOpenDropdown(null)}
            >
              {link.label}
            </Link>
          ))}

          {/* Nursing School dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('nursing')}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                openDropdown === 'nursing' ? 'text-coral' : 'text-navy/70 hover:text-navy'
              }`}
              aria-expanded={openDropdown === 'nursing'}
              aria-haspopup="true"
            >
              Nursing School
              <ChevronDown
                className={`w-4 h-4 transition-transform ${openDropdown === 'nursing' ? 'rotate-180' : ''}`}
              />
            </button>
            {openDropdown === 'nursing' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                <div className="w-72 rounded-2xl border border-border bg-paper p-3 shadow-2xl">
                  {nursingSchoolLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="flex flex-col gap-0.5 rounded-xl px-4 py-3 hover:bg-paper-dim transition-colors"
                    >
                      <span className="font-serif text-sm font-semibold text-navy">{item.label}</span>
                      <span className="text-xs text-navy/50">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* More dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggleDropdown('more')}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                openDropdown === 'more' ? 'text-coral' : 'text-navy/70 hover:text-navy'
              }`}
              aria-expanded={openDropdown === 'more'}
              aria-haspopup="true"
            >
              More
              <ChevronDown
                className={`w-4 h-4 transition-transform ${openDropdown === 'more' ? 'rotate-180' : ''}`}
              />
            </button>
            {openDropdown === 'more' && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                <div className="w-72 rounded-2xl border border-border bg-paper p-3 shadow-2xl">
                  {moreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpenDropdown(null)}
                      className="block rounded-xl px-4 py-2.5 text-sm font-medium text-navy/70 hover:bg-paper-dim hover:text-navy transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Desktop search */}
        <div className="hidden lg:block">
          <SearchBar />
        </div>

        {/* Auth buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="px-5 py-2 rounded-full text-sm font-medium text-navy border border-border-light hover:bg-paper-dim transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2 rounded-full text-sm font-semibold text-paper bg-coral hover:bg-coral-hover transition-colors"
          >
            Register
          </Link>
        </div>

        {/* Mobile search + toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <SearchBar compact />
          <button
            className="text-navy p-1"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0d1b2e] border-t border-border px-5 pb-6 pt-2 max-h-[calc(100vh-70px)] overflow-y-auto">
          <div className="flex flex-col gap-1 py-2">
            <Link href="/" onClick={() => setMobileOpen(false)} className="py-2.5 text-sm font-medium text-navy hover:text-coral transition-colors">
              Home
            </Link>
            {examLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-navy hover:text-coral transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {nursingSchoolLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-navy hover:text-coral transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {moreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-2.5 text-sm font-medium text-navy/70 hover:text-coral transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-4 border-t border-border mt-2">
            <Link
              href="/auth/login"
              onClick={() => setMobileOpen(false)}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-navy border border-border-light text-center"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setMobileOpen(false)}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-paper bg-coral text-center"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
