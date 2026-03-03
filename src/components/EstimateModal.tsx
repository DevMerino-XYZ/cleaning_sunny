"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormDataState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  propertyType: "residential" | "commercial" | "";
  services: string[];
  frequency: string;
  preferredDate: string;
  preferredTime: string;
  hasPets: boolean;
  notes: string;
  company: string; // honeypot
};

const servicesList = [
  "General Cleaning",
  "Deep Cleaning",
  "Window Cleaning",
  "Office & Commercial Cleaning",
  "Residential Cleaning",
  "Trash Removal",
  "Move-In / Move-Out Cleaning",
  "Post-Construction Cleaning",
];

const frequencyOptions = [
  { value: "one-time", label: "One-Time Service" },
  { value: "weekly", label: "Weekly Cleaning" },
  { value: "bi-weekly", label: "Bi-Weekly Cleaning" },
  { value: "monthly", label: "Monthly Cleaning" },
];

export default function EstimateModal({ isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyType: "",
    services: [],
    frequency: "",
    preferredDate: "",
    preferredTime: "",
    hasPets: false,
    notes: "",
    company: "",
  });

  // Cerrar con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Control de scroll y animación de entrada
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    setCurrentStep(1); // reset al abrir

    gsap.fromTo(
      modalRef.current,
      { y: 40, opacity: 0, scale: 0.98 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }
    );

    return () => {
      document.body.style.overflow = "auto";
      setLoading(false);
      setSuccess(false);
      setError(null);
    };
  }, [isOpen]);

  // Animar cambio de paso
  useEffect(() => {
    if (!isOpen) return;
    const steps = [step1Ref, step2Ref, step3Ref];
    steps.forEach((ref, index) => {
      if (ref.current) {
        gsap.to(ref.current, {
          opacity: index + 1 === currentStep ? 1 : 0,
          x: index + 1 === currentStep ? 0 : index + 1 < currentStep ? -20 : 20,
          duration: 0.3,
          ease: "power2.inOut",
          display: index + 1 === currentStep ? "block" : "none",
        });
      }
    });

    // Animar barra de progreso
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${(currentStep / 3) * 100}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [currentStep, isOpen]);

  const updateForm = (field: keyof FormDataState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const validateStep1 = () => {
    return formData.name.trim() !== "" && formData.email.trim() !== "";
  };

  const validateStep2 = () => {
    return formData.services.length > 0 && formData.frequency !== "";
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) {
      setError("Please fill in your name and email.");
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      setError("Please select at least one service and a frequency.");
      return;
    }
    setError(null);
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError(null);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validateStep2()) {
      setError("Please complete all required fields.");
      return;
    }

    setLoading(true);
    setSuccess(false);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      propertyType: formData.propertyType,
      services: formData.services,
      frequency: formData.frequency,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      hasPets: formData.hasPets,
      notes: formData.notes,
      company: formData.company, // honeypot
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
      // Reset form after success
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        propertyType: "",
        services: [],
        frequency: "",
        preferredDate: "",
        preferredTime: "",
        hasPets: false,
        notes: "",
        company: "",
      });
      setCurrentStep(1);
    } catch (err: any) {
      setError(err?.message || "Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-6"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-bg rounded-3xl shadow-2xl border border-text/10 overflow-hidden"
      >
        {/* Header con progreso */}
        <div className="p-6 lg:p-8 border-b border-text/10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary">
              Request a Free Estimate
            </h2>
            <button
              onClick={onClose}
              className="text-text/50 hover:text-text text-2xl transition-colors"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-text/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-primary rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-text/60">
            <span className={currentStep >= 1 ? "text-primary font-medium" : ""}>1. Your Info</span>
            <span className={currentStep >= 2 ? "text-primary font-medium" : ""}>2. Service Details</span>
            <span className={currentStep >= 3 ? "text-primary font-medium" : ""}>3. Review & Send</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Honeypot */}
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={(e) => updateForm("company", e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Step 1: Personal Info */}
          <div ref={step1Ref} className="p-6 lg:p-8 space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">Full Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateForm("name", e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-text/10 bg-bg placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateForm("email", e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-text/10 bg-bg placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateForm("phone", e.target.value)}
                  placeholder="(123) 456-7890"
                  className="w-full px-4 py-3 rounded-xl border border-text/10 bg-bg placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">Property Type</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => updateForm("propertyType", e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl border border-text/10 bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                >
                  <option value="">Select type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-text/70">Service Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => updateForm("address", e.target.value)}
                placeholder="Street, city, zip"
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-bg placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Step 2: Service Details */}
          <div ref={step2Ref} className="p-6 lg:p-8 space-y-5 hidden">
            <div>
              <label className="block text-sm font-medium mb-2 text-text/70">Select Services *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {servicesList.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                      formData.services.includes(service)
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-text/10 hover:border-text/30 text-text"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {formData.services.includes(service) ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      )}
                    </svg>
                    <span className="text-sm font-medium">{service}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-text/70">Frequency *</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {frequencyOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => updateForm("frequency", option.value)}
                    className={`px-4 py-3 rounded-xl border transition-all ${
                      formData.frequency === option.value
                        ? "bg-primary/10 border-primary text-primary"
                        : "border-text/10 hover:border-text/30 text-text"
                    }`}
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">Preferred Date</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => updateForm("preferredDate", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-text/10 bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">Preferred Time</label>
                <input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => updateForm("preferredTime", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-text/10 bg-bg text-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasPets"
                checked={formData.hasPets}
                onChange={(e) => updateForm("hasPets", e.target.checked)}
                className="w-5 h-5 rounded border-text/10 text-primary focus:ring-primary"
              />
              <label htmlFor="hasPets" className="text-sm text-text/70">This property has pets</label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-text/70">Additional Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateForm("notes", e.target.value)}
                placeholder="Any special requests or details..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-text/10 bg-bg placeholder-text/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
              />
            </div>
          </div>

          {/* Step 3: Review & Send */}
          <div ref={step3Ref} className="p-6 lg:p-8 space-y-5 hidden">
            <div className="bg-primary/5 p-5 rounded-xl border border-primary/20">
              <h3 className="text-lg font-semibold text-primary mb-3">Review your request</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium text-text/70">Name:</span> {formData.name || "—"}</p>
                <p><span className="font-medium text-text/70">Email:</span> {formData.email || "—"}</p>
                <p><span className="font-medium text-text/70">Phone:</span> {formData.phone || "—"}</p>
                <p><span className="font-medium text-text/70">Address:</span> {formData.address || "—"}</p>
                <p><span className="font-medium text-text/70">Property Type:</span> {formData.propertyType ? (formData.propertyType === "residential" ? "Residential" : "Commercial") : "—"}</p>
                <p><span className="font-medium text-text/70">Services:</span> {formData.services.length > 0 ? formData.services.join(", ") : "—"}</p>
                <p><span className="font-medium text-text/70">Frequency:</span> {frequencyOptions.find(o => o.value === formData.frequency)?.label || "—"}</p>
                <p><span className="font-medium text-text/70">Preferred Date:</span> {formData.preferredDate || "—"}</p>
                <p><span className="font-medium text-text/70">Preferred Time:</span> {formData.preferredTime || "—"}</p>
                <p><span className="font-medium text-text/70">Has Pets:</span> {formData.hasPets ? "Yes" : "No"}</p>
                <p><span className="font-medium text-text/70">Notes:</span> {formData.notes || "—"}</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-4 rounded-xl font-semibold transition-all duration-300 hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          </div>

          {/* Footer con navegación */}
          <div className="p-6 lg:p-8 border-t border-text/10 flex justify-between">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2 border border-text/10 rounded-xl text-text/70 hover:bg-text/5 transition"
              >
                Back
              </button>
            )}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="ml-auto px-6 py-2 bg-primary text-white rounded-xl hover:brightness-110 transition"
              >
                Continue
              </button>
            ) : (
              <div /> // placeholder para mantener espacio
            )}
          </div>

          {/* Mensajes de error/success */}
          {error && (
            <div className="px-6 lg:px-8 pb-6">
              <p className="text-red-600 dark:text-red-400 text-center font-medium">
                 {error}
              </p>
            </div>
          )}
          {success && (
            <div className="px-6 lg:px-8 pb-6">
              <p className="text-green-600 dark:text-green-400 text-center font-medium">
                 Your message has been sent successfully!
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}