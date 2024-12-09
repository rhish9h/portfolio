import React from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent } from './types';
import { GraduationCap, Briefcase } from 'lucide-react';

interface TimelineNodeProps {
  event: TimelineEvent;
  x: number;
  y: number;
  isSelected: boolean;
  onClick: () => void;
}

const TimelineNode: React.FC<TimelineNodeProps> = ({
  event,
  x,
  y,
  isSelected,
  onClick,
}) => {
  const isEducation = event.type === 'education';
  const Icon = isEducation ? GraduationCap : Briefcase;

  return (
    <motion.g
      className="cursor-pointer"
      onClick={onClick}
      initial={false}
      animate={{
        scale: isSelected ? 1.1 : 1,
      }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Background circle */}
      <circle
        cx={x}
        cy={y}
        r={24}
        className={`${
          isEducation
            ? 'fill-blue-500/10 stroke-blue-500/50'
            : 'fill-purple-500/10 stroke-purple-500/50'
        } stroke-2`}
      />

      {/* Icon background */}
      <circle
        cx={x}
        cy={y}
        r={16}
        className={`${
          isEducation ? 'fill-blue-500/20' : 'fill-purple-500/20'
        }`}
      />

      {/* Icon */}
      <g transform={`translate(${x - 8}, ${y - 8})`}>
        <Icon
          size={16}
          className={`${
            isEducation ? 'text-blue-500' : 'text-purple-500'
          }`}
        />
      </g>

      {/* Selection indicator */}
      {isSelected && (
        <circle
          cx={x}
          cy={y}
          r={28}
          className={`${
            isEducation
              ? 'stroke-blue-500'
              : 'stroke-purple-500'
          } fill-none stroke-2 animate-pulse`}
        />
      )}

      {/* Decorative elements */}
      <g>
        {[...Array(4)].map((_, i) => (
          <motion.circle
            key={i}
            cx={x + Math.cos((i * Math.PI) / 2) * 32}
            cy={y + Math.sin((i * Math.PI) / 2) * 32}
            r={2}
            className={`${
              isEducation ? 'fill-blue-500/30' : 'fill-purple-500/30'
            }`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </g>
    </motion.g>
  );
};

export default TimelineNode;
