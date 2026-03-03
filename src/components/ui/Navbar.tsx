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
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

// Secondary navigation items shown in the dropdown menu
const secondaryNavItems = [
  { label: 'Experience', id: 'experience' },
  { label: 'Education', id: 'education' },
  { label: 'Skills', id: 'skills' },
  { label: 'Certifications', id: 'certifications' },
  { label: 'Awards', id: 'awards' },
  { label: 'Publications', id: 'publications' },
];

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigate = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
    setIsOpen(false);
  };

  return (
    <nav className="w-full" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
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
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavigate(e, item.id)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                {item.label}
              </motion.a>
            ))}

            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-1 text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus:outline-none bg-transparent cursor-pointer">
                  <span>Menu</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-card border border-border">
                {secondaryNavItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.id} 
                    onClick={(e) => handleNavigate(e, item.id)}
                    className="flex w-full cursor-pointer items-center px-2 py-2 text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.label}
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
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                      onClick={(e) => handleNavigate(e, item.id)}
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
                      key={item.id}
                      href={`#${item.id}`}
                      className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
                      onClick={(e) => handleNavigate(e, item.id)}
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
