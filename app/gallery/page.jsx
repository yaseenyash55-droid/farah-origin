import React from 'react';
import Gallery from '../../components/Gallery';

const GalleryPage = () => {
  return (
    <main className="bg-background text-foreground min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-lg text-muted-foreground">
            Explore a curated collection of our finest handcrafted crochet and henna creations. Each piece tells a story of passion and artistry.
          </p>
        </div>
      </div>
      <Gallery showTitle={false} />
    </main>
  );
};

export default GalleryPage;
