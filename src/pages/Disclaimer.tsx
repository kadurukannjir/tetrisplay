import { Link } from "wouter";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-b from-purple-950/20 to-gray-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-black text-white mb-3">Disclaimer</h1>
          <p className="text-gray-400">
            Important information about the nature of TetrisPlay, our content, and our relationship with third parties.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-6">
        {[
          {
            title: "General Disclaimer",
            content: "TetrisPlay is an independent, fan-made gaming website that provides a free, browser-based implementation of the classic Tetris-style puzzle game for entertainment and educational purposes. The information and content on this website are provided in good faith and for general informational purposes only.",
          },
          {
            title: "Trademark Notice",
            content: "Tetris is a registered trademark of The Tetris Company, LLC. TetrisPlay is not affiliated with, endorsed by, or sponsored by The Tetris Company or its affiliates. Our implementation is an independently created tribute to the classic puzzle game concept. All trademarks referenced on this website belong to their respective owners.",
          },
          {
            title: "Blog Content Accuracy",
            content: "The blog articles and educational content published on TetrisPlay are written to the best of our knowledge and are intended to be informative and accurate. However, we make no warranties about the completeness, reliability, or accuracy of this information. Gaming tips, historical facts, and scientific claims should be independently verified. The views expressed in blog posts are those of the individual authors and do not constitute professional advice.",
          },
          {
            title: "Scientific Claims",
            content: "References to scientific research on our blog, including studies about the cognitive benefits of puzzle gaming, are provided for informational purposes. While we cite reputable sources, the scientific landscape evolves continuously and individual experiences may vary. Do not make medical, psychological, or health decisions based solely on information found on this website. Always consult qualified healthcare professionals for advice related to your specific circumstances.",
          },
          {
            title: "External Links",
            content: "TetrisPlay may contain links to external websites that are not operated by us. We have no control over the content and practices of those sites and cannot accept responsibility or liability for their respective privacy policies or terms of service. We encourage you to review the privacy policy and terms of any external site you visit.",
          },
          {
            title: "Advertising",
            content: "TetrisPlay may display advertisements from third-party advertising networks, including Google AdSense. The presence of an advertisement does not constitute an endorsement of the advertised product or service by TetrisPlay. All advertising is clearly distinguishable from our editorial content. We maintain full editorial independence and our content is not influenced by advertisers.",
          },
          {
            title: "Contact",
            content: "If you have concerns about any content on TetrisPlay or believe any information is inaccurate, please contact us at hello@tetrisplay.io. We take accuracy seriously and will review all legitimate concerns promptly.",
          },
        ].map((section) => (
          <section key={section.title} className="bg-gray-900 border border-gray-700/40 rounded-xl p-6">
            <h2 className="text-base font-black text-white mb-2">{section.title}</h2>
            <p className="text-gray-300 text-sm leading-relaxed">{section.content}</p>
          </section>
        ))}

        <div className="flex gap-4 pt-4">
          <Link href="/privacy-policy" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
            Privacy Policy →
          </Link>
          <Link href="/terms" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
            Terms of Service →
          </Link>
        </div>
      </div>
    </div>
  );
}
