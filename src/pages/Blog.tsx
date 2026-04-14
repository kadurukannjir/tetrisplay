import { Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { useState } from "react";

const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-950/30 to-gray-950 py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-3">Gaming Blog</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the world of puzzle gaming — from the history of Tetris to science-backed tips for improving your play.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {activeCategory === "All" && (
          <Link href={`/blog/${blogPosts[0].slug}`}>
            <article className="mb-8 bg-gray-900 border border-gray-700/50 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all group cursor-pointer">
              <div className="md:flex">
                <div className="md:w-2/5 h-56 md:h-auto overflow-hidden">
                  <img
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-600/20 text-purple-300 text-xs font-medium px-2 py-0.5 rounded">Featured</span>
                    <span className="text-xs text-purple-400">{blogPosts[0].category}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white mb-2 leading-tight">{blogPosts[0].title}</h2>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{blogPosts[0].excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="text-gray-300 font-medium">{blogPosts[0].author}</span>
                    <span>·</span>
                    <span>{blogPosts[0].readTime} min read</span>
                    <span>·</span>
                    <span>{blogPosts[0].date}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(activeCategory === "All" ? filtered.slice(1) : filtered).map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="bg-gray-900 border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all hover:-translate-y-0.5 group cursor-pointer h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-xs text-purple-400 font-medium mb-1">{post.category}</span>
                  <h2 className="text-base font-bold text-white mb-2 leading-snug flex-1">{post.title}</h2>
                  <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto">
                    <span className="text-gray-300 font-medium">{post.author}</span>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">No articles in this category yet.</div>
        )}
      </div>
    </div>
  );
}
