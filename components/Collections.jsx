import React from 'react';
import Link from 'next/link';

const collectionItems = [
  {
    title: 'Crochet Art',
    description: 'Handmade dolls, flowers, keychains, bouquets and unique gifts crafted with love.',
    image: '/crochet.jpg',
    href: '/gallery?category=crochet',
  },
  {
    title: 'Henna Designs',
    description: 'Exquisite bridal, engagement, and festive mehendi designs for every special occasion.',
    image: '/mehendi.jpg',
    href: '/gallery?category=henna',
  },
  {
    title: 'Flower Bouquets',
    description: 'Beautiful and everlasting crochet flower bouquets that make the perfect gift.',
    image: '/bouquet.jpg',
    href: '/gallery?category=crochet',
  },
  {
    title: 'Custom Apparel',
    description: 'Personalized crochet clothing, accessories, and unique wearable art tailored to your style.',
    image: '/custom apparel.jpg',
    href: '/gallery?category=apparel',
  },
  {
    title: 'Amigurumi',
    description: 'Adorable, hand-stitched crochet plushies and figurines, perfect for gifts or collectibles.',
    image: '/amigurumi.jpg',
    href: '/gallery?category=amigurumi',
  },
  {
    title: 'Home Decor',
    description: 'Handmade crochet items like blankets, cushions, and wall art to beautify your living space.',
    image: '/home decor.jpg',
    href: '/gallery?category=homedecor',
  },
];

const Collections = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {collectionItems.map((item, index) => (
        <Link href={item.href} key={index} className="group">
          <div className="bg-card rounded-xl shadow-lg overflow-hidden h-full transform transition-transform duration-300 group-hover:scale-105">
            <img
              src={item.image}
              className="w-full h-72 object-cover"
              alt={item.title}
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-card-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
              <div className="mt-4 text-primary font-semibold group-hover:underline">
                View More &rarr;
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Collections;
