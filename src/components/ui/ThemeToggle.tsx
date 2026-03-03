import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50 p-2 ring-1 ring-border transition-all hover:bg-zinc-300/50 dark:hover:bg-zinc-700/50 focus:outline-none focus:ring-2 focus:ring-ring"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      {/* Sun Icon Container */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center text-zinc-800 dark:text-zinc-200"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 45 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Sun className="h-5 w-5" strokeWidth={2.5} />
      </motion.div>

      {/* Moon Icon Container */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center text-zinc-800 dark:text-zinc-200"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -45,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Moon className="h-5 w-5" strokeWidth={2.5} />
      </motion.div>
    </motion.button>
  );
}
