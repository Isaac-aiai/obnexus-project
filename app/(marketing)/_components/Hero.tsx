"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, HeartPulse } from "lucide-react"

const TAGS = [
  "Strands Agents SDK",
  "AWS Bedrock",
  "PostgreSQL",
  "Next.js 15",
  "Read-only DB · validated writes",
]

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden px-4 pb-4 pt-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        {/* Icon + Title */}
        <div
          className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-cyan-500/60 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 shadow-lg shadow-cyan-500/40">
            <HeartPulse className="h-6 w-6 text-cyan-300" />
          </div>

          <h1 className="mb-2 font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            OB<span className="text-cyan-400">Nexus</span>
          </h1>

          <p className="mb-3 font-display text-base font-semibold text-slate-300 sm:text-lg lg:text-xl">
            AI-Powered OB/GYN Operation Assistant
          </p>

          <div className="mb-4 h-1 w-20 rounded bg-gradient-to-r from-cyan-500 to-blue-600" />
        </div>

        {/* Description */}
        <div
          className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="mb-4 text-sm font-medium leading-relaxed text-slate-300 sm:text-base lg:text-lg">
            An AI assistant designed for OB/GYN nurses. Query real-time ward status, predict patient length-of-stay, coordinate room assignments, receive high-risk alerts, and place orders — all through natural conversation.
          </p>

          {/* Highlight chips */}
          <div className="mb-5 flex flex-wrap gap-2">
            {TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-700/80 bg-slate-900/70 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Link
            href="/chat"
            className="group flex items-center justify-between gap-4 rounded-xl border-2 border-slate-800 bg-slate-900 p-4 transition-all duration-200 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                Talk to OBNexus
              </h3>
              <p className="text-sm font-medium text-slate-400">
                Experience the AI scheduling assistant in action
              </p>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-cyan-500/60 bg-cyan-500/20 shadow-lg shadow-cyan-500/30 transition-colors group-hover:bg-cyan-500">
              <ArrowRight className="h-5 w-5 text-cyan-300 transition-all group-hover:translate-x-1 group-hover:text-white" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
