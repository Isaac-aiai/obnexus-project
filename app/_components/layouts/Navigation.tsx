"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { NavItem, NavigationProps } from "@/types"

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Chat", href: "/chat" },
]

export default function Navigation({ items = DEFAULT_NAV_ITEMS }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="font-display text-2xl font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer"
          >
            obnexus
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => {
              const active = isActive(item.href)
              const isChat = item.href === "/chat"

              if (isChat) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-display text-lg font-bold px-6 py-2 bg-gradient-to-br from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/70 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer rounded-lg"
                  >
                    CHAT
                  </Link>
                )
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    font-display text-lg font-bold uppercase tracking-wider transition-colors cursor-pointer
                    ${active
                      ? "text-cyan-400"
                      : "text-white hover:text-cyan-400"
                    }
                  `}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:text-cyan-400 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t-2 border-slate-800 bg-black">
            <div className="py-4 space-y-2">
              {items.map((item) => {
                const active = isActive(item.href)
                const isChat = item.href === "/chat"

                if (isChat) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block font-display text-xl font-bold py-3 px-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-black text-center shadow-lg shadow-cyan-500/70 cursor-pointer rounded-lg mx-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      CHAT
                    </Link>
                  )
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      block font-display text-xl font-bold py-3 px-4 uppercase tracking-wider transition-colors cursor-pointer
                      ${active
                        ? "text-cyan-400"
                        : "text-white hover:text-cyan-400"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
