"use client";

import type { UIMessage } from "ai";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { Markdown } from "./markdown";
import { cn } from "@/lib/utils";
import { CDN_ASSETS } from "@/lib/constants";

/**
 * Collapsible component for displaying reasoning/thinking content.
 * Shows a summary by default, expands to show full content on click.
 */
const ReasoningBlock = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate text for preview (first 100 chars)
  const previewText = text.length > 100 ? text.slice(0, 100) + "..." : text;

  return (
    <div className="glass-card bg-purple-950/20 border-purple-500/40 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3 py-2 flex items-center gap-2 text-left hover:bg-purple-900/30 transition-colors cursor-pointer"
      >
        <svg
          className={cn(
            "w-4 h-4 text-purple-400 transition-transform font-bold",
            isExpanded && "rotate-90"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-xs font-bold text-purple-300">
          Thinking
        </span>
        {!isExpanded && (
          <span className="text-xs text-purple-400 truncate flex-1">
            {previewText}
          </span>
        )}
      </button>
      {isExpanded && (
        <div className="px-3 py-2 border-t border-purple-700/40">
          <div className="text-xs text-purple-200 whitespace-pre-wrap">
            {text}
          </div>
        </div>
      )}
    </div>
  );
};

export const PreviewMessage = ({
  message,
  append,
}: {
  chatId: string;
  message: UIMessage;
  isLoading: boolean;
  append?: (message: any) => Promise<string | null | undefined>;
}) => {
  return (
    <motion.div
      className="w-full mx-auto max-w-3xl group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      data-role={message.role}
    >
      <div
        className={cn(
          "flex gap-3 w-full",
          message.role === "user" ? "justify-end" : "justify-start"
        )}
      >
        {/* AI Assistant Avatar - Left side */}
        {message.role === "assistant" && (
          <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 shrink-0 rounded-lg shadow-lg shadow-cyan-500/70">
            <span className="font-display text-xs text-black font-bold">AI</span>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col gap-2 max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl",
            message.role === "user"
              ? "bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/60"
              : "glass-card bg-slate-900 border-cyan-500/30"
          )}
        >
          {/* AI SDK v5: Use parts instead of content */}
          {message.parts && message.parts.length > 0 && (
            <div className="flex flex-col gap-4">
              {message.parts.map((part: any, index: number) => {
                // Render reasoning/thinking content
                if (part.type === 'reasoning' && part.text) {
                  return (
                    <ReasoningBlock key={index} text={part.text} />
                  );
                }
                // Render text content
                if (part.type === 'text' && part.text) {
                  return (
                    <div
                      key={index}
                      className={cn(
                        message.role === "assistant"
                          ? "text-slate-100"
                          : "text-white"
                      )}
                    >
                      <Markdown
                        variant="chat"
                        onQuestionClick={(question) => {
                          append?.({
                            role: 'user',
                            content: question,
                          });
                        }}
                      >
                        {part.text}
                      </Markdown>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>

        {/* User Avatar - Right side */}
        {message.role === "user" && (
          <div className="w-8 h-8 overflow-hidden border border-slate-600/40 shrink-0 rounded-lg shadow-md">
            <Image
              src={CDN_ASSETS.PROFILE_PHOTO}
              alt="User Profile"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export const ThinkingMessage = () => {
  const role = "assistant";

  return (
    <motion.div
      className="w-full mx-auto max-w-3xl group/message"
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div className="flex gap-3 w-full justify-start">
        <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-blue-600 shrink-0 rounded-lg shadow-lg shadow-cyan-500/70">
          <span className="font-display text-xs text-black font-bold">AI</span>
        </div>

        <div className="glass-card p-4 bg-slate-900 border-cyan-500/30 rounded-2xl">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="font-display text-sm font-bold">Thinking...</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
