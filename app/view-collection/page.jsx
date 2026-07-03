import React from 'react';
import Collections from '../../components/Collections';

const ViewCollectionPage = () => {
  return (
    <main className="bg-background text-foreground min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Discover Our Collections</h1>
          <p className="text-lg text-muted-foreground">
            From intricate henna to cozy crochet, each collection is a testament to our dedication to handmade excellence. Browse our categories to find your next treasure.
          </p>
        </div>
        <Collections />
      </div>
    </main>
  );
};

export default ViewCollectionPage;
