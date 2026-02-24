import { motion } from "framer-motion";
import { HeartPulse } from "lucide-react";
import { METADATA } from "@/lib/constants";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ delay: 0.3 }}
    >
      <div className="glass-card border-cyan-500/50">
        <div className="py-12 px-8 flex flex-col items-center text-center">
          {/* AI Icon - Neon style */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-purple-600/20 border-2 border-cyan-500/60 shadow-lg shadow-cyan-500/40">
              <HeartPulse className="w-8 h-8 text-cyan-300 font-bold" />
            </div>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-white mb-2">
            Hi! I'm <span className="text-cyan-400">{METADATA.AI_ASSISTANT_NAME}</span>
          </h2>

          <p className="font-display text-lg text-slate-300 mb-4">
            Your OB/GYN Scheduling Assistant
          </p>

          <p className="text-slate-400 max-w-md leading-relaxed">
            I can help you check ward status, predict patient discharge times, coordinate room assignments, flag high-risk cases, and assist with placing orders. Just ask!
          </p>
        </div>
      </div>
    </motion.div>
  );
};
