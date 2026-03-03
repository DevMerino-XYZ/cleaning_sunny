// components/CallModal.tsx
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CallModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const phoneNumber = "+1 (602) 690-0183"; // formato legible
  const telNumber = "+16026900183"; // solo dígitos para tel:

  // Cerrar con Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Animación de entrada
  useEffect(() => {
    if (!isOpen) return;
    gsap.fromTo(
      modalRef.current,
      { y: 30, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
    );
  }, [isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    // Podrías mostrar un toast o cambiar el texto del botón temporalmente
    alert("Number copied to clipboard!");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-bg rounded-2xl shadow-2xl border border-text/10 p-6"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Call Sunny’s Cleaning</h3>
          <button
            onClick={onClose}
            className="text-text/50 hover:text-text text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <p className="text-text/70 mb-4">
          Our team is available to assist you. Click the button below to call directly.
        </p>

        <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 mb-4 text-center">
          <p className="text-sm text-text/60 mb-1">📞 Phone Number</p>
          <p className="text-2xl font-bold text-primary">{phoneNumber}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`tel:${telNumber}`}
            className="flex-1 bg-primary text-white text-center py-3 rounded-xl font-semibold hover:brightness-110 transition"
          >
            Call Now
          </a>
          <button
            onClick={copyToClipboard}
            className="flex-1 border border-text/10 text-text py-3 rounded-xl font-semibold hover:bg-text/5 transition"
          >
            Copy Number
          </button>
        </div>

        <p className="text-xs text-text/40 text-center mt-4">
          Mon–Fri, 8am – 6pm | Sat, 9am – 2pm
        </p>
      </div>
    </div>
  );
}