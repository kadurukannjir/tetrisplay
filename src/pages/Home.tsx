import Tetris from "@/components/Tetris";
import { Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";

export default function Home() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-950 via-purple-950/20 to-gray-950 py-12 px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-purple-300 text-xs font-medium">Free to Play — No Download Required</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
              Play <span className="text-purple-400">Tetris</span> Online
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              The classic block puzzle game, reimagined for your browser. Free, instant, and endlessly satisfying.
            </p>
          </div>

          {/* Game */}
          <div className="flex justify-center">
            <Tetris />
          </div>
        </div>
      </section>

      {/* How to Play */}
      <section className="py-14 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-2">How to Play</h2>
          <p className="text-gray-400 text-center text-sm mb-8">Master these simple controls to dominate the leaderboard</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { key: "← →", label: "Move left/right", icon: "↔" },
              { key: "↑ or X", label: "Rotate piece", icon: "↻" },
              { key: "↓", label: "Soft drop", icon: "↓" },
              { key: "Space", label: "Hard drop", icon: "⚡" },
            ].map((ctrl) => (
              <div
                key={ctrl.key}
                className="bg-gray-900 border border-gray-700/50 rounded-xl p-4 text-center hover:border-purple-500/40 transition-colors"
              >
                <div className="text-3xl mb-2">{ctrl.icon}</div>
                <div className="bg-gray-800 text-purple-300 text-xs font-mono rounded px-2 py-1 mb-2 inline-block">{ctrl.key}</div>
                <p className="text-gray-400 text-xs">{ctrl.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-purple-900/20 border border-purple-500/20 rounded-xl text-center">
            <p className="text-sm text-purple-200">
              <strong>Pro tip:</strong> Keep one column empty on the edge for I-pieces. Clearing 4 lines at once (a "Tetris") gives 800 &times; your level bonus!
            </p>
          </div>
        </div>
      </section>

      {/* Why Play */}
      <section className="py-14 px-4 bg-gray-900/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-black text-white text-center mb-2">Why Play Tetris?</h2>
          <p className="text-gray-400 text-center text-sm mb-8">Science-backed benefits of the world's most iconic puzzle game</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: "Sharpens Your Mind",
                desc: "Tetris exercises spatial reasoning, pattern recognition, and working memory — cognitive skills that transfer to real life.",
                color: "text-purple-400",
                bg: "bg-purple-900/20 border-purple-500/20",
              },
              {
                title: "Reduces Stress",
                desc: "Studies show puzzle games trigger a flow state, reducing cortisol levels and providing genuine mental relaxation.",
                color: "text-blue-400",
                bg: "bg-blue-900/20 border-blue-500/20",
              },
              {
                title: "Improves Focus",
                desc: "Regular puzzle gaming trains sustained attention and makes you more resilient to distraction in all areas of life.",
                color: "text-green-400",
                bg: "bg-green-900/20 border-green-500/20",
              },
            ].map((item) => (
              <div key={item.title} className={`${item.bg} border rounded-xl p-6`}>
                <h3 className={`text-lg font-bold ${item.color} mb-2`}>{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-14 px-4 bg-gray-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-white mb-1">Latest from the Blog</h2>
              <p className="text-gray-400 text-sm">Gaming tips, history, and science</p>
            </div>
            <Link href="/blog" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-gray-900 border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all hover:-translate-y-0.5 group cursor-pointer">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-purple-400 font-medium">{post.category}</span>
                    <h3 className="text-sm font-bold text-white mt-1 mb-2 leading-snug line-clamp-2">{post.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{post.readTime} min read</span>
                      <span>·</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
