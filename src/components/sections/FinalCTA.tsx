"use client";

import { useState } from "react";
import EstimateModal from "@/components/EstimateModal";

export default function FinalCTA() {
  const [open, setOpen] = useState(false);

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
              href="tel:+16025551234"
              className="btn-secondary"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

      <EstimateModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}