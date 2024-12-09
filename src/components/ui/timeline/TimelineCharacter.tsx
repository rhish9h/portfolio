import React from 'react';
import { motion } from 'framer-motion';

interface TimelineCharacterProps {
  x: number;
  y: number;
  rotation: number;
  isMoving: boolean;
}

const TimelineCharacter: React.FC<TimelineCharacterProps> = ({ x, y, rotation, isMoving }) => {
  return (
    <motion.g
      initial={false}
      animate={{
        x,
        y,
        rotate: rotation,
        scale: isMoving ? 1 : [1, 1.1, 1],
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        scale: {
          duration: 2,
          repeat: Infinity,
        }
      }}
    >
      {/* Rocket body */}
      <motion.path
        d="M10,0 L20,30 L0,30 Z"
        fill="#4F46E5"
        stroke="#312E81"
        strokeWidth="2"
      />
      
      {/* Rocket window */}
      <circle
        cx="10"
        cy="15"
        r="5"
        fill="#E5E7EB"
      />
      
      {/* Rocket fins */}
      <path
        d="M0,30 L-5,40 L0,35 Z M20,30 L25,40 L20,35 Z"
        fill="#312E81"
      />
      
      {/* Rocket flames (only show when moving) */}
      {isMoving && (
        <motion.g
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
          }}
        >
          <path
            d="M5,30 L10,45 L15,30"
            fill="#F59E0B"
            opacity="0.8"
          />
          <path
            d="M7,30 L10,40 L13,30"
            fill="#EF4444"
            opacity="0.8"
          />
        </motion.g>
      )}
    </motion.g>
  );
};

export default TimelineCharacter;
