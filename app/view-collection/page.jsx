"use client";

import React from 'react';
import Collections from '../../components/Collections';
import BackButton from '../../components/BackButton';
import { motion } from 'framer-motion';

const ViewCollectionPage = () => {
  return (
    <main className="bg-background/50 text-foreground min-h-screen pt-20 relative">
      <BackButton />
      <div className="container mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Discover Our Collections</h1>
          <p className="text-lg text-muted-foreground">
            From intricate henna to cozy crochet, each collection is a testament to our dedication to handmade excellence. Browse our categories to find your next treasure.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Collections />
        </motion.div>
      </div>
    </main>
  );
};

export default ViewCollectionPage;
