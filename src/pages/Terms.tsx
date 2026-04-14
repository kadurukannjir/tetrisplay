import { Link } from "wouter";

export default function Terms() {
  const lastUpdated = "April 1, 2025";

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="bg-gradient-to-b from-purple-950/20 to-gray-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs text-gray-500 mb-2">Last updated: {lastUpdated}</div>
          <h1 className="text-4xl font-black text-white mb-3">Terms of Service</h1>
          <p className="text-gray-400">
            Please read these Terms of Service carefully before using TetrisPlay. By accessing or using our service, you agree to be bound by these terms.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16 space-y-6">
        {[
          {
            title: "1. Acceptance of Terms",
            content: "By accessing and using TetrisPlay (the 'Service'), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service. These terms apply to all visitors, users, and anyone who accesses or uses the Service.",
          },
          {
            title: "2. Description of Service",
            content: "TetrisPlay provides a free, browser-based Tetris puzzle game along with gaming-related blog content, tips, and educational articles. The Service is provided 'as is' and may be modified, suspended, or discontinued at any time without notice. We do not charge for access to the core game or blog content.",
          },
          {
            title: "3. Acceptable Use",
            content: "You agree to use TetrisPlay only for lawful purposes and in a manner that does not infringe on the rights of others. You must not: (a) use the Service in any way that violates applicable laws or regulations; (b) attempt to disrupt, damage, or interfere with the Service or its servers; (c) use automated tools or bots to access the Service at a rate that burdens our infrastructure; (d) attempt to gain unauthorized access to any part of the Service; (e) use the Service to distribute malware or harmful code; (f) scrape or harvest data from the Service without our express written permission.",
          },
          {
            title: "4. Intellectual Property",
            content: "The content, design, graphics, and code of TetrisPlay are the intellectual property of TetrisPlay and its licensors, protected by copyright and other applicable laws. The Tetris game concept itself is a trademark of The Tetris Company. Our implementation is an independent, fan-created tribute. You may not reproduce, modify, distribute, or create derivative works based on our content without express written permission. You may share links to our content and blog articles for non-commercial purposes, provided you attribute TetrisPlay as the source.",
          },
          {
            title: "5. User-Generated Content",
            content: "If you submit content through our contact form or any other means, you grant TetrisPlay a non-exclusive, royalty-free license to use that content to respond to your inquiry and improve our Service. You represent that any content you submit does not violate any third-party rights and is not harmful, offensive, or illegal. We reserve the right to refuse or remove any submitted content at our discretion.",
          },
          {
            title: "6. Privacy and Data",
            content: "Your use of TetrisPlay is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to the data practices described in our Privacy Policy. Your game data is stored locally in your browser and is not transmitted to our servers.",
          },
          {
            title: "7. Third-Party Services and Advertising",
            content: "TetrisPlay may display advertisements served by Google AdSense and other third-party advertising networks. These advertisements are subject to the privacy policies and terms of service of the respective third parties. We are not responsible for the content of external advertisements. TetrisPlay may also link to third-party websites. We are not responsible for the content, privacy practices, or terms of those websites.",
          },
          {
            title: "8. Disclaimer of Warranties",
            content: "THE SERVICE IS PROVIDED 'AS IS' AND 'AS AVAILABLE' WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE. YOUR USE OF THE SERVICE IS AT YOUR SOLE RISK.",
          },
          {
            title: "9. Limitation of Liability",
            content: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, TETRISPLAY AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF, OR INABILITY TO USE, THE SERVICE. THIS INCLUDES BUT IS NOT LIMITED TO LOSS OF DATA, LOSS OF REVENUE, OR LOSS OF GOODWILL. OUR TOTAL LIABILITY FOR ANY CLAIM ARISING FROM THESE TERMS OR YOUR USE OF THE SERVICE SHALL NOT EXCEED $100.",
          },
          {
            title: "10. Changes to Terms",
            content: "We reserve the right to modify these Terms of Service at any time. When we make changes, we will update the 'Last Updated' date at the top of this page. Significant changes will be highlighted. Your continued use of the Service after changes become effective constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.",
          },
          {
            title: "11. Governing Law",
            content: "These Terms shall be governed by and construed in accordance with applicable law. Any disputes arising from these Terms or your use of the Service shall be subject to the exclusive jurisdiction of the competent courts in the relevant jurisdiction.",
          },
          {
            title: "12. Contact Information",
            content: "If you have questions about these Terms of Service, please contact us at hello@tetrisplay.io or through our Contact page.",
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
          <Link href="/contact" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  );
}
