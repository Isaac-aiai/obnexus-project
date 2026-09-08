"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, HeartPulse } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-slate-950">
      <div className="max-w-4xl mx-auto w-full">
        {/* Icon + Title */}
        <div
          className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
        >
          {/* Medical Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border-2 border-cyan-500/60 shadow-lg shadow-cyan-500/40">
              <HeartPulse className="w-8 h-8 text-cyan-300 font-bold" />
            </div>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-4 font-bold">
            OB<span className="text-cyan-400">Nexus</span>
          </h1>

          <p className="font-display text-xl sm:text-2xl text-slate-300 mb-6 font-semibold">
            AI-Powered OB/GYN Operation Assistant
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded mb-8" />
        </div>

        {/* Description */}
        <div
          className={`transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-lg sm:text-xl text-slate-300 mb-6 leading-relaxed font-medium">
            An AI assistant designed for OB/GYN nurses. Query real-time ward status, predict patient length-of-stay, coordinate room assignments, receive high-risk alerts, and place orders — all through natural conversation.
          </p>

          <div className="space-y-4 text-slate-400 mb-8">
            <p>
              <span className="font-bold text-white">Built with:</span>{" "}
              Strands Agents SDK + AWS Lambda + PostgreSQL + Next.js
            </p>
            <p>
              <span className="font-bold text-white">Architecture:</span>{" "}
              AI Agent has read-only database access. All write operations go through independent Lambda functions with business validation — the AI can see and speak, but actions are verified before execution.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Link
            href="/chat"
            className="group flex items-center justify-between w-full p-6 bg-slate-900 border-2 border-slate-800 rounded-xl hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200 cursor-pointer"
          >
            <div>
              <h3 className="font-display text-2xl sm:text-3xl text-white font-bold">
                Talk to obnexus
              </h3>
              <p className="text-slate-400 text-sm sm:text-base font-medium">
                Experience the AI scheduling assistant in action
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-500/60 group-hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/30">
              <ArrowRight className="w-6 h-6 text-cyan-300 group-hover:text-white group-hover:translate-x-1 transition-all font-bold" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
