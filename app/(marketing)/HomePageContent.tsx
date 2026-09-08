"use client"

import Hero from "./_components/Hero"

export default function HomePageContent() {
  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-black gradient-dark text-white">
      <Hero />

      <footer className="shrink-0 border-t border-slate-800/80 bg-slate-950/80 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-xs font-medium text-slate-500">
            &copy; {new Date().getFullYear()} OBNexus · Built by Lingxin Wang
          </p>
        </div>
      </footer>
    </div>
  )
}
