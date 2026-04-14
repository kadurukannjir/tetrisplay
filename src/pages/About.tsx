import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-950/30 to-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-3">About TetrisPlay</h1>
          <p className="text-gray-400 text-lg">
            Our mission is to bring the joy of classic puzzle gaming to everyone, everywhere, for free.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16">
        {/* Mission */}
        <section className="mb-12">
          <div className="bg-gray-900 border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-black text-white mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              TetrisPlay was created with a simple belief: great games should be accessible to everyone. We believe that the timeless appeal of Tetris — its perfect balance of simplicity and depth, challenge and reward — deserves to live freely on the web, available to anyone with a browser.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We built this platform to provide a clean, fast, ad-friendly gaming experience that respects our users while celebrating one of the greatest games ever invented. No sign-ups, no paywalls, no bloated downloads — just pure puzzle gaming, instantly available.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "🎮",
                title: "Free Gaming",
                desc: "We believe classic games should be free. TetrisPlay is fully free-to-play with no hidden costs, subscriptions, or premium paywalls.",
              },
              {
                icon: "🧠",
                title: "Education Through Play",
                desc: "Games are powerful learning tools. Our blog explores the science of gaming, cognitive benefits, and strategies to improve your skills.",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                desc: "We collect minimal data and are transparent about how we use it. Your gaming sessions are yours — we don't sell or exploit personal information.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-gray-900 border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/30 transition-colors"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="mb-12">
          <div className="bg-gray-900 border border-gray-700/50 rounded-2xl p-8">
            <h2 className="text-2xl font-black text-white mb-4">Our Story</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              TetrisPlay started as a personal project by a small team of developers and puzzle game enthusiasts who grew up playing Tetris on everything from brick Game Boys to chunky CRT monitors. We wanted to recreate that experience — faithful to the original, but optimized for modern browsers and devices.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              What began as a weekend coding project quickly became something more. We added blog posts to share our love of gaming history and science. We obsessed over smooth gameplay, proper controls, and mobile touch support. We made sure every page of the site offered genuine value — not just filler content.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Today, TetrisPlay serves players from around the world who simply want to enjoy a great game on their lunch break, during a commute, or while taking a screen break from intensive work. We're proud to offer that experience, completely free.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-black text-white mb-6">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { name: "Alex Rivera", role: "Founder & Lead Developer", initials: "AR", color: "bg-purple-700", bio: "Full-stack developer with 10+ years of experience building web applications. Tetris enthusiast since age 8." },
              { name: "Sarah Chen", role: "Content & Research Lead", initials: "SC", color: "bg-blue-700", bio: "Writer and researcher specializing in gaming psychology and the science of play. PhD in Cognitive Science." },
              { name: "Jordan Lee", role: "Game Design & UX", initials: "JL", color: "bg-green-700", bio: "UI/UX designer with a passion for gaming interfaces. Former competitive Tetris player and speedrunning enthusiast." },
              { name: "Maria Santos", role: "Community & Blog Editor", initials: "MS", color: "bg-red-700", bio: "Gaming journalist and editor who has covered the video game industry for over eight years." },
            ].map((member) => (
              <div key={member.name} className="bg-gray-900 border border-gray-700/50 rounded-xl p-5 flex gap-4">
                <div className={`${member.color} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-white font-bold">{member.name}</h3>
                  <p className="text-purple-400 text-xs font-medium mb-1">{member.role}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-purple-900/20 border border-purple-500/20 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-white mb-2">Ready to Play?</h2>
          <p className="text-gray-400 mb-5">Experience the classic puzzle game that has captivated billions of players worldwide.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-full transition-all">
              Play Tetris
            </Link>
            <Link href="/contact" className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-full transition-all">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
