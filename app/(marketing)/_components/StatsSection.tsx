"use client"

import Link from "next/link"
import { achievementStats } from "@/data/achievement-stats"

export default function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-slate-800 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="font-display text-5xl sm:text-6xl text-white mb-12 font-bold">
          ACHIEVEMENTS
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {achievementStats.map((stat, index) => {
            const IconComponent = stat.icon
            const isClickable = stat.href && stat.href.trim() !== ""

            const cardContent = (
              <div className="text-center py-12">
                {/* Big Number */}
                <div className="font-display text-6xl sm:text-7xl lg:text-8xl text-white mb-2 font-bold">
                  {stat.number}
                </div>
                {/* Description */}
                <div className="font-display text-xl sm:text-2xl text-slate-400 uppercase tracking-wider font-semibold">
                  {stat.description}
                </div>
              </div>
            )

            if (isClickable) {
              return (
                <Link
                  key={index}
                  href={stat.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-0 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all cursor-pointer group"
                >
                  <div className="text-center py-12">
                    <div className="font-display text-6xl sm:text-7xl lg:text-8xl text-cyan-400 group-hover:text-cyan-500 transition-colors mb-2 font-bold">
                      {stat.number}
                    </div>
                    <div className="font-display text-xl sm:text-2xl text-slate-400 group-hover:text-slate-300 uppercase tracking-wider transition-colors font-semibold">
                      {stat.description}
                    </div>
                  </div>
                </Link>
              )
            }

            return (
              <div
                key={index}
                className="glass-card p-0"
              >
                {cardContent}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
