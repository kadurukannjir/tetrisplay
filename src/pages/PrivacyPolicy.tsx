import { Link } from "wouter";

export default function PrivacyPolicy() {
  const lastUpdated = "April 1, 2025";

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-b from-purple-950/20 to-gray-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs text-gray-500 mb-2">Last updated: {lastUpdated}</div>
          <h1 className="text-4xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-gray-400">
            TetrisPlay is committed to protecting your privacy. This policy explains what information we collect and how we use it.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="space-y-8">
          {[
            {
              title: "1. Information We Collect",
              content: `**Information You Provide:** When you contact us through our contact form, we collect your name, email address, and the content of your message. This information is used solely to respond to your inquiry.

**Automatically Collected Data:** Like most websites, TetrisPlay automatically collects certain technical information when you visit, including your IP address, browser type and version, operating system, referring URLs, and pages viewed. This information is used to analyze site traffic and improve user experience.

**Game Data:** Your Tetris game scores and progress are stored locally in your browser's local storage and are never transmitted to our servers. We do not collect or have access to your in-game performance data.`,
            },
            {
              title: "2. How We Use Your Information",
              content: `We use the information we collect for the following purposes:

- **To provide and improve our service:** Understanding how visitors use our site helps us make improvements.
- **To respond to inquiries:** Contact form submissions are used exclusively to reply to your questions.
- **To analyze site performance:** Anonymous traffic data helps us understand which content is valuable to our visitors.
- **To comply with legal requirements:** We may use or disclose information if required by law or legal process.

We do not sell, rent, or trade your personal information to third parties for marketing purposes.`,
            },
            {
              title: "3. Cookies and Tracking Technologies",
              content: `TetrisPlay uses cookies and similar technologies to enhance your experience. Cookies are small text files stored in your browser.

**Essential Cookies:** Required for basic site functionality, such as remembering your preferences and game settings.

**Analytics Cookies:** We may use analytics services (such as Google Analytics) that use cookies to collect anonymous usage statistics. These cookies do not personally identify you and help us understand visitor behavior in aggregate.

**Advertising Cookies:** If we display advertisements through networks such as Google AdSense, those networks may use cookies to serve ads relevant to your interests based on your browsing history. You can opt out of personalized advertising through Google's Ad Settings.

You can control cookie settings through your browser preferences. Disabling certain cookies may limit some functionality of the site.`,
            },
            {
              title: "4. Third-Party Services",
              content: `TetrisPlay may use the following third-party services, each with their own privacy policies:

**Google Analytics:** We use Google Analytics to understand site traffic. Google Analytics collects data such as your approximate location, device information, and pages visited. This data is anonymized and does not personally identify you. You can opt out using the Google Analytics Opt-Out Browser Add-on.

**Google AdSense:** We may display advertisements served by Google AdSense. Google uses cookies to serve ads based on your visits to this and other websites. You can opt out of personalized ads at Google's Ad Settings page.

**Unsplash:** Blog images are sourced from Unsplash, an image hosting service. When images load, Unsplash may collect standard server log information.

We are not responsible for the privacy practices of these third-party services.`,
            },
            {
              title: "5. Data Security",
              content: `We implement appropriate technical and organizational measures to protect your information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is completely secure, and we cannot guarantee absolute security of information transmitted to or from our website.

Your game data is stored locally in your browser and is never transmitted to our servers, providing an additional layer of privacy for your gameplay.`,
            },
            {
              title: "6. Children's Privacy",
              content: `TetrisPlay is intended for a general audience and does not knowingly collect personal information from children under the age of 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us at hello@tetrisplay.io and we will promptly delete such information from our records.

If you are under 13 years old, please do not submit any personal information through our contact form or any other means.`,
            },
            {
              title: "7. Your Rights",
              content: `Depending on your location, you may have certain rights regarding your personal information:

**Access:** You may request access to the personal information we hold about you.
**Correction:** You may request that we correct inaccurate personal information.
**Deletion:** You may request deletion of your personal information, subject to certain legal exceptions.
**Objection:** You may object to the processing of your personal information in certain circumstances.
**Portability:** You may request a copy of your personal information in a structured, machine-readable format.

To exercise these rights, contact us at hello@tetrisplay.io. We will respond within 30 days.`,
            },
            {
              title: "8. Changes to This Policy",
              content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable law. When we make significant changes, we will update the "Last Updated" date at the top of this page. We encourage you to review this policy periodically.

Your continued use of TetrisPlay after changes become effective constitutes your acceptance of the revised policy.`,
            },
            {
              title: "9. Contact Us",
              content: `If you have questions about this Privacy Policy or our data practices, please contact us:

**TetrisPlay**
Email: hello@tetrisplay.io

You may also use our Contact page to send us a message directly.`,
            },
          ].map((section) => (
            <section key={section.title} className="bg-gray-900 border border-gray-700/40 rounded-xl p-6">
              <h2 className="text-lg font-black text-white mb-3">{section.title}</h2>
              <div className="text-gray-300 text-sm leading-relaxed space-y-2">
                {section.content.split("\n\n").map((para, idx) => {
                  if (para.startsWith("- ")) {
                    const items = para.split("\n").filter((l) => l.startsWith("- "));
                    return (
                      <ul key={idx} className="list-disc list-inside space-y-1">
                        {items.map((item, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>") }} />
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, "<strong class='text-white'>$1</strong>") }} />
                  );
                })}
              </div>
            </section>
          ))}

          <div className="flex gap-4 pt-4">
            <Link href="/terms" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
              Terms of Service →
            </Link>
            <Link href="/contact" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
              Contact Us →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
