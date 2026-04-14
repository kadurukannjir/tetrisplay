import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="bg-gradient-to-b from-purple-950/30 to-gray-950 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-black text-white mb-3">Contact Us</h1>
          <p className="text-gray-400 text-lg">
            Have a question, suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-5">
            <div className="bg-gray-900 border border-gray-700/50 rounded-xl p-5">
              <h3 className="text-white font-bold mb-3">Get in Touch</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                We typically respond within 1–2 business days. Whether it's a bug report, feature request, or general question — we're happy to help.
              </p>
            </div>

            {[
              { icon: "✉️", label: "Email", value: "hello@tetrisplay.io" },
              { icon: "🕐", label: "Response Time", value: "1–2 business days" },
              { icon: "🌍", label: "Location", value: "Available Worldwide" },
            ].map((item) => (
              <div key={item.label} className="bg-gray-900 border border-gray-700/50 rounded-xl p-4 flex items-start gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-xs text-purple-400 font-medium">{item.label}</p>
                  <p className="text-gray-300 text-sm">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="bg-gray-900 border border-gray-700/50 rounded-xl p-4">
              <h4 className="text-white text-sm font-bold mb-2">Common Topics</h4>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Bug reports and technical issues</li>
                <li>• Feature requests and suggestions</li>
                <li>• Advertising and partnership inquiries</li>
                <li>• General feedback and questions</li>
                <li>• Content and blog submissions</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h2 className="text-2xl font-black text-white mb-2">Message Sent!</h2>
                <p className="text-gray-400 mb-5">
                  Thank you for reaching out. We've received your message and will get back to you within 1–2 business days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-full transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-gray-900 border border-gray-700/50 rounded-2xl p-6 sm:p-8 space-y-5"
              >
                <h2 className="text-xl font-black text-white">Send a Message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 font-medium mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Your name"
                      className={`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all ${errors.name ? "border-red-500" : "border-gray-700"}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 font-medium mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="your@email.com"
                      className={`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all ${errors.email ? "border-red-500" : "border-gray-700"}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Subject *</label>
                  <select
                    value={form.subject}
                    onChange={(e) => handleChange("subject", e.target.value)}
                    className={`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all ${errors.subject ? "border-red-500" : "border-gray-700"}`}
                  >
                    <option value="">Select a subject...</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="feedback">General Feedback</option>
                    <option value="partnership">Partnership / Advertising</option>
                    <option value="content">Content Submission</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Message *</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Write your message here (minimum 20 characters)..."
                    className={`w-full bg-gray-800 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 transition-all resize-none ${errors.message ? "border-red-500" : "border-gray-700"}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  <p className="text-xs text-gray-600 mt-1">{form.message.length} characters</p>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all"
                >
                  Send Message
                </button>
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our{" "}
                  <a href="/privacy-policy" className="text-purple-400 hover:text-purple-300">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
