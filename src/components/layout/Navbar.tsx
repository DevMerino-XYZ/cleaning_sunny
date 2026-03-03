"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import gsap from "gsap"
import ThemeToggle from "@/components/ui/ThemeToggle"
import EstimateModal from "@/components/EstimateModal" // <-- Importar el modal

export default function Navbar() {
  const navRef = useRef<HTMLElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)
  const lastScrollY = useRef(0)
  const isHidden = useRef(false)

  const [menuOpen, setMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [logoSrc, setLogoSrc] = useState("/logo-blue.png")
  const [estimateOpen, setEstimateOpen] = useState(false) // <-- Estado para el modal

  // Referencia para usar el valor actualizado de isDark dentro del event listener de scroll
  const isDarkRef = useRef(isDark)

  // Detectar cambios en el tema (clase 'dark' en el html)
  useEffect(() => {
    const checkDark = () => {
      const dark = document.documentElement.classList.contains("dark")
      setIsDark(dark)
    }
    checkDark()

    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  // Mantener la referencia actualizada con el último valor de isDark
  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  // Actualizar el logo cuando cambie el tema
  useEffect(() => {
    setLogoSrc(isDark ? "/logo-white.png" : "/logo-blue.png")
  }, [isDark])

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Residential", href: "#residential" },
    { label: "Commercial", href: "#commercial" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ]

  // Scroll behavior (shrink + hide) con fondo adaptable al tema
  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const handleScroll = () => {
      const currentScroll = window.scrollY

      // Colores según el tema actual (usando la referencia)
      const bgColor =
        currentScroll > 50
          ? isDarkRef.current
            ? "rgba(15,23,42,0.92)"  // fondo oscuro semitransparente (#0F172A)
            : "rgba(255,255,255,0.92)" // fondo claro semitransparente
          : "transparent"

      const blur = currentScroll > 50 ? "blur(12px)" : "blur(0px)"
      const shadow =
        currentScroll > 50
          ? "0 4px 12px rgba(0,0,0,0.05)"
          : "0 0px 0px rgba(0,0,0,0)"

      gsap.to(nav, {
        height: currentScroll > 50 ? 64 : 80,
        backgroundColor: bgColor,
        backdropFilter: blur,
        boxShadow: shadow,
        duration: 0.35,
        ease: "power2.out",
      })

      // Hide on scroll down
      if (currentScroll > lastScrollY.current && currentScroll > 120) {
        if (!isHidden.current) {
          isHidden.current = true
          gsap.to(nav, { y: "-100%", duration: 0.35 })
        }
      } else {
        if (isHidden.current) {
          isHidden.current = false
          gsap.to(nav, { y: "0%", duration: 0.35 })
        }
      }

      lastScrollY.current = currentScroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mobile menu animation
  useEffect(() => {
    const menu = mobileMenuRef.current
    if (!menu) return

    if (menuOpen) {
      document.body.style.overflow = "hidden"
      gsap.to(menu, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      })
    } else {
      document.body.style.overflow = "auto"
      gsap.to(menu, {
        x: "100%",
        duration: 0.35,
        ease: "power3.inOut",
      })
    }
  }, [menuOpen])

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 h-20 flex items-center transition-all"
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 w-full flex items-center justify-between">
          {/* Logo - cambia dinámicamente según el tema */}
          <Link href="#home">
            <Image
              src={logoSrc}
              alt="Sunny's Cleaning Service LLC"
              width={140}
              height={36}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-8 items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative text-sm font-medium uppercase tracking-wide hover:text-primary transition"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </Link>
            ))}

            <ThemeToggle />

            {/* Botón Get a Free Estimate en desktop - ahora abre el modal */}
            <button
              onClick={() => setEstimateOpen(true)}
              className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold hover:brightness-110 transition"
            >
              Get a Free Estimate
            </button>
          </nav>

          {/* Mobile Right Side */}
          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative w-8 h-6 flex flex-col justify-between text-text"
            >
              <span
                className={`h-[2px] w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[10px]" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-full bg-current transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[10px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer - ahora usa variables de tema */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-72 h-full bg-bg text-text shadow-xl z-40 p-8 flex flex-col gap-8 translate-x-full lg:hidden"
      >
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="text-lg font-medium hover:text-primary transition"
          >
            {item.label}
          </Link>
        ))}

        {/* Botón Get a Free Estimate en móvil - cierra menú y abre modal */}
        <button
          onClick={() => {
            setMenuOpen(false)
            setEstimateOpen(true)
          }}
          className="mt-6 bg-primary text-white text-center py-3 rounded-xl font-semibold"
        >
          Get a Free Estimate
        </button>
      </div>

      {/* Modal de estimación */}
      <EstimateModal isOpen={estimateOpen} onClose={() => setEstimateOpen(false)} />
    </>
  )
}