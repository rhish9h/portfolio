import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // Use classes that adjust background based on theme:
      // Default (light): bg-zinc-100/90 and hover:bg-zinc-200/90
      // Dark mode: bg-zinc-800/90 and hover:bg-zinc-700/90
      className="relative h-10 w-10 rounded-lg bg-zinc-100/90 p-2 ring-1 ring-zinc-900/5 transition-all hover:bg-zinc-200/90 dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:bg-zinc-700/90"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon Container */}
      <motion.div
        className="relative flex h-full w-full items-center justify-center"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 45 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Sun className="h-full w-full stroke-amber-500" strokeWidth={2.5} />
      </motion.div>

      {/* Moon Icon Container */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -45,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Moon className="h-full w-full fill-sky-100" strokeWidth={0} />
      </motion.div>
    </motion.button>
  );
}
