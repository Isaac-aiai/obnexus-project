"use client"

import Hero from "./_components/Hero"

export default function HomePageContent() {
  return (
    <div className="h-screen flex flex-col bg-black gradient-dark text-white overflow-hidden">
      <Hero />

      <footer className="shrink-0 py-3 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 bg-slate-950/80">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} OBNexus · Built by Lingxin Wang
          </p>
        </div>
      </footer>
    </div>
  )
}
