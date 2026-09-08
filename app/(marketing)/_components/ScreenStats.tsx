"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { achievementStats } from "@/data/achievement-stats"

export default function ScreenStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center border-t-2 border-slate-800 py-16 bg-black"
    >
      {/* Section Title */}
      <div className="px-4 sm:px-6 lg:px-8 mb-12">
        <h2
          className={`font-display text-[10vw] sm:text-[6vw] text-white font-bold transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          CAPABILITIES
        </h2>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-0 px-4 sm:px-6 lg:px-8 min-w-max">
          {achievementStats.map((stat, index) => {
            const isClickable = stat.href && stat.href.trim() !== ""

            const cardContent = (
              <div className="flex flex-col justify-center items-center h-full">
                {/* Huge Number */}
                <div className="font-display text-[20vw] sm:text-[12vw] md:text-[10vw] leading-none mb-4 text-white font-bold">
                  {stat.number}
                </div>
                {/* Description */}
                <div className="font-display text-2xl sm:text-3xl text-slate-400 uppercase tracking-wider text-center font-semibold">
                  {stat.description}
                </div>
              </div>
            )

            const cardClass = `
              w-[80vw] sm:w-[50vw] md:w-[40vw] h-[50vh] sm:h-[60vh]
              glass-card
              flex items-center justify-center
              transition-all duration-500
              ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
            `

            if (isClickable) {
              return (
                <Link
                  key={index}
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${cardClass} hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer group`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col justify-center items-center h-full">
                    <div className="font-display text-[20vw] sm:text-[12vw] md:text-[10vw] leading-none mb-4 text-cyan-400 group-hover:text-cyan-500 transition-colors font-bold">
                      {stat.number}
                    </div>
                    <div className="font-display text-2xl sm:text-3xl text-slate-400 group-hover:text-slate-300 uppercase tracking-wider text-center transition-colors font-semibold">
                      {stat.description}
                    </div>
                  </div>
                </Link>
              )
            }

            return (
              <div
                key={index}
                className={cardClass}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="px-4 sm:px-6 lg:px-8 mt-8">
        <p
          className={`font-display text-sm text-slate-500 uppercase tracking-widest transition-all duration-700 delay-300 font-bold ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          ← SWIPE TO EXPLORE →
        </p>
      </div>
    </section>
  )
}
