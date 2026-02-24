"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { FaGithub, FaLinkedin } from "react-icons/fa"

export default function ScreenTitle() {
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
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 border-t-2 border-slate-800 bg-black"
    >
      <div className="max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {/* Title */}
            <h2 className="font-display text-[12vw] sm:text-[8vw] lg:text-[5vw] leading-none text-cyan-400 mb-6 font-bold">
              OB/GYN MANAGER
            </h2>

            {/* Divider */}
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 mb-6" />

            {/* Description */}
            <p className="text-xl sm:text-2xl text-slate-400 leading-relaxed mb-8 font-medium">
              AI-powered ward scheduling and patient coordination.
              <br />
              <span className="text-white font-bold">
                Real-time updates. Intelligent allocation. Better outcomes.
              </span>
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass-card rounded-lg hover:border-cyan-500/60 hover:text-cyan-400 transition-colors cursor-pointer font-bold"
                aria-label="GitHub"
              >
                <FaGithub size={28} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass-card rounded-lg hover:border-cyan-500/60 hover:text-cyan-400 transition-colors cursor-pointer font-bold"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={28} />
              </a>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            } flex justify-center lg:justify-end`}
          >
            <div className="relative">
              <div className="w-64 h-80 sm:w-72 sm:h-96 border-4 border-white overflow-hidden">
                <Image
                  src="/images/profile.png"
                  alt="John Doe Profile Photo"
                  width={400}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent block */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
