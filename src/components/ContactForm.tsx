"use client";

import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      e.currentTarget.reset();
    }
  }

  return (
    <section id="contact" className="py-28 bg-bg">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl text-center mb-12">
          Request a Free Estimate
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-on-primary/5 p-10 rounded-3xl border border-text/10"
        >
          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg"
          />

          <textarea
            name="message"
            placeholder="Tell us about your cleaning needs..."
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg"
          />

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

          {success && (
            <p className="text-green-600 text-center mt-4">
              ✅ Message sent successfully!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}