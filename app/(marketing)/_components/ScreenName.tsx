"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

export default function ScreenName() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth"
    })
  }

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 bg-black">
      {/* Giant Name - Centered */}
      <div
        className={`text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <h1 className="font-display text-[20vw] sm:text-[18vw] md:text-[15vw] leading-none text-white font-bold">
          OBNEXUS
        </h1>
        <h1 className="font-display text-[8vw] sm:text-[6vw] md:text-[5vw] leading-none text-slate-400 -mt-4 sm:-mt-8 font-semibold">
          <span className="text-cyan-400">AI SCHEDULING</span>
        </h1>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-1000 delay-500 cursor-pointer ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <span className="font-display text-sm tracking-widest text-slate-400 font-bold">
          SCROLL
        </span>
        <ChevronDown className="w-6 h-6 animate-bounce text-slate-400" />
      </button>
    </section>
  )
}
