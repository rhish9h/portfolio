import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineProps, TimelineEvent } from './types';
import { mergeAndSortEvents, calculatePosition } from './utils';
import { FaGraduationCap, FaBriefcase, FaCar } from 'react-icons/fa';

const Timeline: React.FC<TimelineProps> = ({ experiences, education }) => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isHorizontal = containerDimensions.width >= 768; // Switch to vertical on mobile

  useEffect(() => {
    const sortedEvents = mergeAndSortEvents(experiences, education);
    setEvents(sortedEvents);
    setSelectedEvent(sortedEvents[0]);
  }, [experiences, education]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getEventIcon = (type: 'education' | 'experience') => {
    return type === 'education' ? (
      <FaGraduationCap className="w-6 h-6" />
    ) : (
      <FaBriefcase className="w-6 h-6" />
    );
  };

  const getCharacterPosition = (event: TimelineEvent) => {
    const index = events.findIndex(e => e.id === event.id);
    return calculatePosition(
      index,
      events.length,
      containerDimensions.width,
      containerDimensions.height,
      isHorizontal
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[600px] bg-background/50 rounded-lg p-8"
    >
      {/* Timeline Track */}
      <div 
        className={`absolute ${
          isHorizontal ? 'w-[90%] h-1 top-1/2' : 'w-1 h-[90%] left-1/2'
        } bg-primary/30 rounded-full transform ${
          isHorizontal ? '-translate-y-1/2 left-[5%]' : '-translate-x-1/2 top-[5%]'
        }`}
      />

      {/* Events */}
      {events.map((event, index) => {
        const position = calculatePosition(
          index,
          events.length,
          containerDimensions.width,
          containerDimensions.height,
          isHorizontal
        );

        return (
          <motion.div
            key={event.id}
            className="absolute"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <button
              onClick={() => setSelectedEvent(event)}
              className={`relative p-3 rounded-full bg-background border-2 ${
                selectedEvent?.id === event.id
                  ? 'border-primary scale-110'
                  : 'border-primary/50 hover:border-primary hover:scale-105'
              } transition-all duration-300`}
            >
              {getEventIcon(event.type)}
            </button>
          </motion.div>
        );
      })}

      {/* Animated Character */}
      {selectedEvent && (
        <motion.div
          className="absolute"
          initial={false}
          animate={getCharacterPosition(selectedEvent)}
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
          }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <FaCar className="w-8 h-8 text-primary animate-bounce" />
        </motion.div>
      )}

      {/* Event Details */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <motion.div
            key={selectedEvent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute bottom-8 left-8 right-8 bg-background/80 backdrop-blur p-6 rounded-lg border border-primary/20"
          >
            <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
            <p className="text-muted-foreground">{selectedEvent.subtitle}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {`${selectedEvent.startDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - ${
                selectedEvent.endDate ? selectedEvent.endDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Present'
              }`}
            </p>
            {selectedEvent.location && (
              <p className="text-sm text-muted-foreground mt-1">{selectedEvent.location}</p>
            )}
            {selectedEvent.bullets && (
              <ul className="mt-4 space-y-2">
                {selectedEvent.bullets.map((bullet, index) => (
                  <li key={index} className="text-sm">
                    • {bullet}
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

export default Timeline;
