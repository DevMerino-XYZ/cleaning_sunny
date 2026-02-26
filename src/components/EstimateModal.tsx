"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EstimateModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

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
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-bg rounded-3xl p-10 shadow-2xl border border-text/10"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-heading">
            Request a Free Estimate
          </h2>
          <button
            onClick={onClose}
            className="text-text/60 hover:text-text text-xl"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <form className="space-y-6">
          <input
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg"
          />

          <input
            placeholder="Phone Number"
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg"
          />

          <textarea
            placeholder="Tell us about your cleaning needs..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-text/20 bg-bg"
          />

          <button type="submit" className="btn-primary w-full">
            Send Request
          </button>
        </form>
      </div>
    </div>
  );
}