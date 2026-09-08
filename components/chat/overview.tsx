"use client";

import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import suggestedActionsData from "@/data/suggested-actions.json";

// Curated starting points for the empty chat state. The full list is still
// reachable by just typing a question.
const PRIMARY_ACTIONS = suggestedActionsData.slice(0, 6);

export const Overview = ({
  append,
}: {
  append: (message: any) => Promise<string | null | undefined>;
}) => {
  return (
    <motion.div
      key="overview"
      className="mx-auto w-full max-w-3xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="glass-card border-cyan-500/50 p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-cyan-500/60 bg-gradient-to-br from-cyan-600/20 to-purple-600/20 shadow-lg shadow-cyan-500/40">
            <HeartPulse className="h-6 w-6 text-cyan-300" />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-xl text-white sm:text-2xl">
              Hi! I&apos;m <span className="text-cyan-400">OBNexus</span>
            </h2>
            <p className="text-sm text-slate-400">
              Your OB/GYN scheduling assistant — ask me directly or pick a starting point.
            </p>
          </div>
        </div>

        {/* Divider ties the two halves into one panel */}
        <div className="my-4 h-px bg-slate-800" />

        {/* Suggestions */}
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_ACTIONS.map((action, index) => (
            <motion.button
              key={action.title}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index + 0.15 }}
              onClick={() =>
                append({ role: "user", content: action.action })
              }
              className="group flex h-full flex-col items-start gap-1 rounded-lg border border-cyan-500/25 bg-slate-900 px-3.5 py-3 text-left transition-all hover:border-cyan-500/60 hover:bg-slate-800"
            >
              <span className="font-display text-sm text-slate-100">
                {action.title}
              </span>
              <span className="text-xs leading-snug text-slate-400 transition-colors group-hover:text-slate-300">
                {action.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
