"use client";
import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const collectionItems = [
  {
    id: 'prod_001',
    title: 'Crochet Art',
    description: 'Handmade dolls, flowers, keychains, bouquets and unique gifts crafted with love.',
    image: '/crochet.jpg',
    price: 45.00,
    href: '/gallery?category=crochet',
  },
  {
    id: 'prod_002',
    title: 'Henna Designs',
    description: 'Exquisite bridal, engagement, and festive mehendi designs for every special occasion.',
    image: '/mehendi.jpg',
    price: 80.00,
    href: '/gallery?category=henna',
  },
  {
    id: 'prod_003',
    title: 'Flower Bouquets',
    description: 'Beautiful and everlasting crochet flower bouquets that make the perfect gift.',
    image: '/bouquet.jpg',
    price: 65.00,
    href: '/gallery?category=crochet',
  },
  {
    id: 'prod_004',
    title: 'Custom Apparel',
    description: 'Personalized crochet clothing, accessories, and unique wearable art tailored to your style.',
    image: '/custom apparel.jpg',
    price: 120.00,
    href: '/gallery?category=apparel',
  },
  {
    id: 'prod_005',
    title: 'Amigurumi',
    description: 'Adorable, hand-stitched crochet plushies and figurines, perfect for gifts or collectibles.',
    image: '/amigurumi.jpg',
    price: 35.00,
    href: '/gallery?category=amigurumi',
  },
  {
    id: 'prod_006',
    title: 'Home Decor',
    description: 'Handmade crochet items like blankets, cushions, and wall art to beautify your living space.',
    image: '/home decor.jpg',
    price: 75.00,
    href: '/gallery?category=homedecor',
  },
];

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const Collections = () => {
  const { addToCart } = useCart();
  const [items, setItems] = useState(collectionItems);

  useEffect(() => {
    const fetchLiveProducts = async () => {
      const { data, error } = await supabase.from('products').select('*').eq('type', 'collection').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setItems(data);
      }
    };
    fetchLiveProducts();
  }, []);

  const handleAddToCart = (e, item) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    e.stopPropagation(); // Stop event from bubbling up to the Link
    const itemToAdd = {
      id: item.id,
      name: item.title,
      price: item.price,
      image: item.image,
    };
    addToCart(itemToAdd);
    // Optional: Add a visual confirmation, like a toast notification
    alert(`${item.title} added to cart!`);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item) => {
        const isSoldOut = item.stock <= 0 || item.status === 'sold_out';
        const isLowStock = !isSoldOut && item.stock > 0 && item.stock < 3;

        return (
          <Link href={`/gallery?category=${item.category}`} key={item.id} className="group">
            <div className={`bg-card rounded-xl shadow-lg overflow-hidden h-full flex flex-col transform transition-transform duration-300 ${isSoldOut ? 'opacity-75' : 'group-hover:scale-105'}`}>
              <div className="relative">
                <img
                  src={item.image}
                  className="w-full h-72 object-cover"
                  alt={item.title}
                />
                
                {/* Sold Out Overlay */}
                {isSoldOut && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white font-bold tracking-widest uppercase px-6 py-2 rounded-lg transform -rotate-12 border-2 border-white shadow-xl">
                      Sold Out
                    </span>
                  </div>
                )}

                {/* Low Stock Badge */}
                {isLowStock && (
                  <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    Only {item.stock} left!
                  </div>
                )}

                <button
                  onClick={(e) => {
                    if (isSoldOut) {
                      e.preventDefault();
                      e.stopPropagation();
                      return;
                    }
                    handleAddToCart(e, item);
                  }}
                  disabled={isSoldOut}
                  className={`absolute top-4 right-4 p-3 rounded-full transition-all backdrop-blur-sm ${
                    isSoldOut 
                      ? 'bg-gray-400/80 text-white cursor-not-allowed hidden' 
                      : 'bg-primary/80 text-primary-foreground hover:bg-primary'
                  }`}
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground flex-grow">
                  {item.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xl font-bold text-primary">₹{Number(item.price).toFixed(2)}</p>
                  <div className="text-primary font-semibold group-hover:underline">
                    View More &rarr;
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Collections;
