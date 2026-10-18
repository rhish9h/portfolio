import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <motion.button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/25 hover:bg-secondary hover:text-foreground"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <motion.div
        className="flex items-center justify-center"
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          rotate: isDark ? 90 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Sun className="h-4 w-4" />
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          rotate: isDark ? 0 : -90,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <Moon className="h-4 w-4" />
      </motion.div>
    </motion.button>
  );
}
