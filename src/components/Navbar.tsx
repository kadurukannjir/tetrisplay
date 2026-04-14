import { useState } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { href: "/", label: "Play Tetris" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-gray-950/95 border-b border-purple-500/20 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
              <span className="text-white font-black text-sm">T</span>
            </div>
            <span className="text-white font-black text-lg tracking-wide">
              Tetris<span className="text-purple-400">Play</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location === link.href
                    ? "bg-purple-600/20 text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="ml-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg transition-all shadow-lg shadow-purple-500/20"
            >
              Play Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-800 py-3 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  location === link.href
                    ? "bg-purple-600/20 text-purple-300"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block mx-4 mt-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold rounded-lg text-center transition-all"
            >
              Play Free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
