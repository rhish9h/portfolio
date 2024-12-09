import React from 'react';
import { motion } from 'framer-motion';
import Timeline from '../ui/timeline/Timeline';
import { profileData } from '../../data/profileData';

export const TimelineSection: React.FC = () => {
  return (
    <motion.section
      id="timeline"
      className="w-full py-20 bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
        <Timeline
          experiences={profileData.experiences}
          education={profileData.education}
        />
      </div>
    </motion.section>
  );
};

export default TimelineSection;
