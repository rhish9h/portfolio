import { motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TypewriterEffectProps {
  words: string[];
  className?: string;
}

export function TypewriterEffect({ words, className = '' }: TypewriterEffectProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let isDeleting = false;
    let currentWord = words[currentWordIndex];

    const type = () => {
      if (!isDeleting) {
        if (currentIndex <= currentWord.length) {
          setCurrentText(currentWord.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(type, 100);
        } else {
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, 2000);
        }
      } else {
        if (currentIndex > 0) {
          setCurrentText(currentWord.slice(0, currentIndex));
          currentIndex--;
          timeout = setTimeout(type, 50);
        } else {
          isDeleting = false;
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          currentWord = words[(currentWordIndex + 1) % words.length];
          timeout = setTimeout(type, 500);
        }
      }
    };

    timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, [currentWordIndex, words]);

  return (
    <motion.span
      className={className}
      animate={controls}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >
      {currentText}
      <span className="animate-blink">|</span>
    </motion.span>
  );
}
