import React from 'react';
import { motion } from 'framer-motion';
import { Timeline } from '../ui/timeline/Timeline';
import { profileData } from '../../data/profileData';

export const TimelineSection: React.FC = () => {
  return (
    <motion.section
      id="timeline"
      className="w-full py-8 bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-2"
        >
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            My Journey
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
            Explore my professional journey and educational background through this interactive timeline.
            Click on any event to learn more about my experiences and achievements.
          </p>
        </motion.div>

        <Timeline
          experiences={profileData.experiences}
          education={profileData.education}
        />
      </div>
    </motion.section>
  );
};
