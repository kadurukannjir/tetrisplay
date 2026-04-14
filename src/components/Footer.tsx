import { Link } from "wouter";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full bg-gray-950 border-t border-gray-800 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white font-black text-xs">T</span>
              </div>
              <span className="text-white font-black text-base">
                Tetris<span className="text-purple-400">Play</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Play the classic Tetris game for free in your browser. No downloads, no sign-ups — just pure puzzle fun. Sharpen your mind and beat your high score.
            </p>
          </div>

          {/* Game */}
          <div>
            <h4 className="text-gray-200 font-semibold text-sm mb-3 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Play Tetris</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-gray-200 font-semibold text-sm mb-3 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {year} TetrisPlay. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Free browser-based puzzle game — no account required
          </p>
        </div>
      </div>
    </footer>
  );
}
