import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Experience, Education } from '../../../data/profileData';
import { TimelineEvent } from './types';
import { mergeAndSortEvents } from './utils';
import { generateSmoothPath, calculatePathPoints, getPointAtPercentage, getRotationAtPercentage, Point } from './pathUtils';
import TimelineCharacter from './TimelineCharacter';
import TimelineNode from './TimelineNode';

interface TimelineProps {
  experiences: Experience[];
  education: Education[];
}

export const Timeline: React.FC<TimelineProps> = ({ experiences, education }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [events] = useState<TimelineEvent[]>(() => mergeAndSortEvents(experiences, education));
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [characterPosition, setCharacterPosition] = useState<Point>({ x: 0, y: 0 });
  const [characterRotation, setCharacterRotation] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [pathString, setPathString] = useState('');
  const [eventPositions, setEventPositions] = useState<Point[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Set initial selected event
    if (events.length > 0 && !selectedEvent) {
      setSelectedEvent(events[0]);
    }
  }, [events, selectedEvent]);

  // Calculate path and positions when container size changes
  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !events.length) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      const points = calculatePathPoints(width, height, events.length);
      const path = generateSmoothPath(points);
      
      setPathString(path);
      setEventPositions(points);
      
      // Set initial character position
      if (pathRef.current && !isInitialized) {
        const initialPoint = getPointAtPercentage(pathRef.current, 0);
        if (initialPoint) {
          setCharacterPosition(initialPoint);
          setCharacterRotation(getRotationAtPercentage(pathRef.current, 0));
          setIsInitialized(true);
        }
      }
    };

    // Initial delay to ensure DOM is ready
    const timer = setTimeout(updatePath, 100);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updatePath);
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      resizeObserver.disconnect();
    };
  }, [events.length, isInitialized]);

  // Handle event selection
  const handleEventSelect = (event: TimelineEvent, index: number) => {
    if (!pathRef.current || events.length === 0) return;
    
    setSelectedEvent(event);
    setIsMoving(true);

    const targetPercent = index / (events.length - 1);
    const targetPoint = getPointAtPercentage(pathRef.current, targetPercent);
    const targetRotation = getRotationAtPercentage(pathRef.current, targetPercent);

    if (targetPoint) {
      setCharacterPosition(targetPoint);
      setCharacterRotation(targetRotation);
    }

    // Reset moving state after animation
    setTimeout(() => setIsMoving(false), 1000);
  };

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[500px] relative bg-gradient-to-b from-background/50 to-background/30 rounded-lg overflow-hidden"
    >
      {/* Background particles */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={false}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/10"
            animate={{
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ],
              y: [
                Math.random() * 600,
                Math.random() * 600
              ],
              scale: [0.5, 1, 0.5],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>

      {/* Timeline SVG */}
      <svg className="w-full h-full absolute inset-0">
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(79, 70, 229)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Path */}
        <motion.path
          ref={pathRef}
          d={pathString}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          className="drop-shadow-md"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />

        {/* Event nodes */}
        {events.map((event, index) => (
          eventPositions[index] && (
            <TimelineNode
              key={event.id}
              event={event}
              x={eventPositions[index].x}
              y={eventPositions[index].y}
              isSelected={selectedEvent?.id === event.id}
              onClick={() => handleEventSelect(event, index)}
            />
          )
        ))}

        {/* Animated character */}
        <TimelineCharacter
          x={characterPosition.x}
          y={characterPosition.y}
          rotation={characterRotation}
          isMoving={isMoving}
        />
      </svg>

      {/* Event details */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-md w-full border border-primary/20"
          >
            <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
            <p className="text-muted-foreground">{selectedEvent.subtitle}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {`${selectedEvent.startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${
                selectedEvent.endDate ? selectedEvent.endDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Present'
              }`}
            </p>
            {selectedEvent.location && (
              <p className="text-sm text-muted-foreground mt-1">
                📍 {selectedEvent.location}
              </p>
            )}
            {selectedEvent.bullets && selectedEvent.bullets.length > 0 && (
              <ul className="mt-4 space-y-2">
                {selectedEvent.bullets.map((bullet, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <span className="mr-2">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
