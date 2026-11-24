import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Events', path: '/events' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0c0c0e]/90 backdrop-blur-md border-b border-line shadow-lg">
      {/* Sleek, clean single-tier navigation bar without top info strip */}
      <div className="flex justify-between items-center max-w-[1440px] mx-auto px-[4vw] py-3.5">
        <Link
          to="/"
          className="flex items-center gap-3.5 group"
        >
          <img
            src="/assets/logo.png"
            alt="BohoBar Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover border border-gold/40 shadow-lg group-hover:scale-105 transition-transform"
          />
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-ink group-hover:text-gold transition-colors">
            BohoBar
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-3">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`text-xs uppercase tracking-[0.15em] font-medium px-4 py-2 transition-all ${
                  isActive(link.path)
                    ? 'text-gold shadow-[inset_0_-2px_0_#c8a45a]'
                    : 'text-soft hover:text-ink'
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Dedicated Book a Table CTA Button */}
        <div className="hidden md:block">
          <Link
            to="/book"
            className="inline-block bg-gold hover:bg-transparent text-[#17120a] hover:text-gold border border-gold px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-medium rounded-sm transition-all duration-200 shadow-md"
          >
            Book a table
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-ink hover:text-gold p-1"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-panel/95 backdrop-blur-xl border-b border-line px-[5vw] py-4 space-y-3">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 text-sm uppercase tracking-wider ${
                    isActive(link.path) ? 'text-gold font-semibold' : 'text-soft hover:text-ink'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2 border-t border-line">
            <Link
              to="/book"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-gold text-[#17120a] py-2.5 rounded-sm font-medium text-xs uppercase tracking-widest"
            >
              Book a table
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
