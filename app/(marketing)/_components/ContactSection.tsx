"use client"

import { Mail } from "lucide-react"
import { FaLinkedin } from "react-icons/fa"

export default function ContactSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t-2 border-slate-800 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="font-display text-5xl sm:text-6xl text-white mb-8 font-bold">
          LET'S CONNECT
        </h2>

        <p className="text-lg text-slate-400 mb-12 max-w-xl font-medium">
          Ready to collaborate or discuss opportunities? Reach out and let's build something great together.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:sanhe@johndoe.me"
            className="neon-button-accent flex items-center justify-center gap-3 px-8 py-3 rounded-lg font-bold"
          >
            <Mail size={20} />
            SEND EMAIL
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="neon-button flex items-center justify-center gap-3 px-8 py-3 rounded-lg font-bold"
          >
            <FaLinkedin size={20} />
            LINKEDIN
          </a>
        </div>
      </div>
    </section>
  )
}
