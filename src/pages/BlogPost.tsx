import { useParams, Link } from "wouter";
import { blogPosts } from "@/data/blogPosts";
import { useEffect } from "react";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === params.slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-black text-white mb-3">Article Not Found</h1>
        <p className="text-gray-400 mb-6">The article you're looking for doesn't exist.</p>
        <Link href="/blog" className="px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg">
          Back to Blog
        </Link>
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);
  const otherRelated = blogPosts.filter((p) => p.id !== post.id && p.category !== post.category).slice(0, 2 - related.length);
  const relatedPosts = [...related, ...otherRelated];

  function renderContent(content: string) {
    const lines = content.trim().split("\n");
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i].trim();
      if (!line) { i++; continue; }

      if (line.startsWith("## ")) {
        elements.push(
          <h2 key={i} className="text-2xl font-black text-white mt-8 mb-3">
            {line.replace("## ", "")}
          </h2>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        elements.push(
          <p key={i} className="text-gray-200 font-bold mb-2">
            {line.slice(2, -2)}
          </p>
        );
      } else if (line.startsWith("- ")) {
        const items: string[] = [];
        while (i < lines.length && lines[i].trim().startsWith("- ")) {
          items.push(lines[i].trim().replace("- ", ""));
          i++;
        }
        elements.push(
          <ul key={`ul-${i}`} className="list-disc list-inside space-y-1.5 mb-4 text-gray-300 text-sm leading-relaxed">
            {items.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
            ))}
          </ul>
        );
        continue;
      } else {
        const html = line
          .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          .replace(/\*(.*?)\*/g, "<em>$1</em>")
          .replace(/&times;/g, "×");
        elements.push(
          <p key={i} className="text-gray-300 text-sm leading-relaxed mb-3"
            dangerouslySetInnerHTML={{ __html: html }} />
        );
      }
      i++;
    }
    return elements;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Image */}
      <div className="w-full h-56 sm:h-72 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="w-full h-full bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent -mt-full" />
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-12 relative pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-purple-400 transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-gray-400 truncate">{post.title}</span>
        </nav>

        {/* Article Header */}
        <div className="mb-8">
          <span className="bg-purple-600/20 text-purple-300 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/20">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4 leading-tight">{post.title}</h1>
          <p className="text-gray-300 text-base leading-relaxed mb-4">{post.excerpt}</p>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="w-8 h-8 bg-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {post.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <span className="text-gray-300 font-medium">{post.author}</span>
              <div className="flex gap-2">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose-sm bg-gray-900/50 border border-gray-700/30 rounded-2xl p-6 sm:p-8 mb-10">
          {renderContent(post.content)}
        </article>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-6 mb-10 text-center">
          <h3 className="text-xl font-black text-white mb-2">Ready to Play?</h3>
          <p className="text-gray-400 text-sm mb-4">Try our free Tetris game right in your browser — no downloads, no sign-up required.</p>
          <Link href="/" className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all">
            Play Tetris Free
          </Link>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-white mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`}>
                  <article className="bg-gray-900 border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/40 transition-all group cursor-pointer">
                    <div className="h-32 overflow-hidden">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-xs text-purple-400">{rp.category}</span>
                      <h3 className="text-sm font-bold text-white mt-1 leading-snug">{rp.title}</h3>
                      <p className="text-xs text-gray-500 mt-1">{rp.readTime} min · {rp.date}</p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <Link href="/blog" className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
