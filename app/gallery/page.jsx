"use client";

import React from 'react';
import Gallery from '../../components/Gallery';
import BackButton from '../../components/BackButton';
import { motion } from 'framer-motion';

const GalleryPage = () => {
  return (
    <main className="bg-background/50 text-foreground min-h-screen pt-20 relative">
      <BackButton />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Explore a curated collection of our finest handcrafted crochet and henna creations. Each piece tells a story of passion and artistry.
          </p>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Gallery showTitle={false} />
      </motion.div>
    </main>
  );
};

export default GalleryPage;
