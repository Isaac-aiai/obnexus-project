"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Mail } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"

export default function ScreenCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 border-t-2 border-slate-800 bg-black"
    >
      {/* Main CTA */}
      <div
        className={`w-full max-w-4xl transition-all duration-700 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <Link
          href="/chat"
          className="group glass-card block w-full p-8 sm:p-12 lg:p-16 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-none mb-4 font-bold text-white">
                CHAT WITH<br />
                <span className="text-cyan-400 group-hover:text-cyan-500">obnexus</span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-400 group-hover:text-slate-300 transition-colors font-medium">
                Ask about OB/GYN scheduling, ward management, and patient care coordination
              </p>
            </div>
            <ArrowRight className="w-12 h-12 sm:w-16 sm:h-16 group-hover:translate-x-4 transition-transform flex-shrink-0 text-cyan-400" />
          </div>
        </Link>
      </div>

      {/* Secondary Contact Options */}
      <div
        className={`mt-12 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="font-display text-sm text-slate-500 uppercase tracking-widest self-center font-bold">
          OR REACH OUT DIRECTLY
        </span>
        <div className="flex gap-4 justify-center">
          <a
            href="mailto:sanhe@johndoe.me"
            className="p-3 glass-card rounded-lg hover:border-cyan-500/60 hover:text-cyan-400 transition-colors cursor-pointer font-bold"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 glass-card rounded-lg hover:border-cyan-500/60 hover:text-cyan-400 transition-colors cursor-pointer font-bold"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}
