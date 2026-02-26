"use client";

import { useState, useEffect } from "react";
import EstimateModal from "@/components/EstimateModal";

export default function FinalCTA() {
  const [open, setOpen] = useState(false);

  // Cerrar modal con Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <section className="py-28 bg-bg">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl mb-6">
            Ready for a Cleaner, More Organized Space?
          </h2>

          <p className="text-text/70 max-w-2xl mx-auto mb-12">
            Partner with a cleaning company that values discipline, quality,
            and professionalism.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => setOpen(true)}
              className="btn-primary"
            >
              Get a Free Estimate
            </button>

            <a
              href="tel: +(160) 26900 183"
              className="btn-secondary"
              aria-label="Call Sunny’s Cleaning Service"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <EstimateModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}