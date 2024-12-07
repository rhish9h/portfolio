import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './DropdownMenu';

// Primary navigation items shown directly in the navbar
const primaryNavItems = [
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

// Secondary navigation items shown in the dropdown menu
const secondaryNavItems = [
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Awards', href: '#awards' },
  { label: 'Publications', href: '#publications' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-bold text-primary transition-colors hover:text-primary/90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            RH
          </motion.a>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden items-center space-x-6 md:flex"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Primary Nav Items */}
            {primaryNavItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {item.label}
              </motion.a>
            ))}

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none">
                <span>Menu</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {secondaryNavItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <a
                      href={item.href}
                      className="flex w-full cursor-pointer items-center"
                    >
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-primary md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              className="fixed inset-x-0 top-[64px] z-50 h-[calc(100vh-64px)] bg-background/95 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex h-full flex-col overflow-y-auto">
                <div className="container mx-auto space-y-1 px-6 py-8">
                  {/* Primary Items */}
                  {primaryNavItems.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}

                  {/* Separator */}
                  <div className="my-4 h-px bg-border" />

                  {/* Secondary Items */}
                  {secondaryNavItems.map((item) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.label}
                    </motion.a>
                  ))}

                  {/* Theme Toggle in Mobile Menu */}
                  <div className="px-3 py-4">
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
