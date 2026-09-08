"use client"

import Hero from "./_components/Hero"

export default function HomePageContent() {
  return (
    <div className="min-h-screen bg-black gradient-dark text-white">
      <div className="relative">
        <Hero />

        <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t-2 border-slate-800 bg-slate-950 shadow-2xl">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-sm text-slate-400 font-medium">
              &copy; {new Date().getFullYear()} obnexus. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
