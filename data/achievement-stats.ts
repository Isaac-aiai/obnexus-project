import { Database, ShieldCheck, Sparkles } from "lucide-react"
import { AchievementStat } from "@/types"

const REPO_URL = "https://github.com/Isaac-aiai/obnexus-project"

export const achievementStats: AchievementStat[] = [
  {
    number: "~70%",
    description: "LLM Token Reduction",
    color: "text-primary",
    borderColor: "border-primary",
    glowColor: "shadow-primary/20",
    icon: Sparkles,
    href: REPO_URL,
  },
  {
    number: "11",
    description: "Relational Tables Reasoned Over",
    color: "text-secondary",
    borderColor: "border-secondary",
    glowColor: "shadow-secondary/20",
    icon: Database,
    href: REPO_URL,
  },
  {
    number: "100%",
    description: "Mutations Through Validated Write Tools",
    color: "text-secondary",
    borderColor: "border-secondary",
    glowColor: "shadow-secondary/20",
    icon: ShieldCheck,
    href: REPO_URL,
  },
]
