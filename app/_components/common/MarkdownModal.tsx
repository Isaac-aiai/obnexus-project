"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import MarkdownRenderer from "@/components/ui/markdown-renderer"
import { MarkdownModalProps } from "@/types"

export default function MarkdownModal({
  isOpen,
  onClose,
  title,
  description,
  content,
  icon: Icon,
}: MarkdownModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative glass-card rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800">
          <div className="flex items-start gap-4">
            {Icon && (
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center border-2 border-cyan-500/60">
                  <Icon size={24} className="text-cyan-300 font-bold" />
                </div>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {title}
              </h2>
              {description && (
                <p className="text-slate-400 font-medium">
                  {description}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-300 hover:text-cyan-400 transition-colors duration-200 p-2 hover:bg-slate-800 rounded-lg font-bold cursor-pointer"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[60vh] p-6 bg-slate-950">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  )
}
