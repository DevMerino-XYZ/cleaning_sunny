"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EstimateModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    gsap.fromTo(
      modalRef.current,
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
    );

    return () => {
      document.body.style.overflow = "auto";
      setLoading(false);
      setSuccess(false);
      setError(null);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      company: formData.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to send message.");

      setSuccess(true);
      e.currentTarget.reset();
    } catch (err: any) {
      setError(err.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md lg:max-w-2xl bg-bg rounded-3xl p-6 lg:p-10 shadow-2xl border border-text/10"
      >
        <div className="flex justify-between items-center mb-6 lg:mb-8">
          <h2 className="text-xl lg:text-2xl font-semibold">Request a Free Estimate</h2>
          <button
            onClick={onClose}
            className="text-text/60 hover:text-text text-xl"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <input
            name="name"
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <input
            name="phone"
            placeholder="Phone Number (optional)"
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition"
          />

          <textarea
            name="message"
            placeholder="Tell us about your cleaning needs..."
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Request"}
          </button>

          {/* Success message */}
          {success && (
            <p className="text-green-600 text-center mt-2 font-medium">
              ✅ Your message has been sent successfully!
            </p>
          )}

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-center mt-2 font-medium">
              ❌ {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}