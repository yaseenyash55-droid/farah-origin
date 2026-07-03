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
    description: 'One-of-a-kind crochet tops, bags, and accessories designed to match your style.',
    image: '/crochet.jpg', // Placeholder, to be replaced
    href: '/gallery?category=crochet',
  },
  {
    title: 'Amigurumi',
    description: 'Adorable and cuddly crochet toys, perfect for children and the young at heart.',
    image: '/crochet.jpg', // Placeholder
    href: '/gallery?category=crochet',
  },
  {
    title: 'Home Decor',
    description: 'Unique crochet pieces to add a touch of handmade warmth to your living space.',
    image: '/crochet.jpg', // Placeholder
    href: '/gallery?category=crochet',
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
