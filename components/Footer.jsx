import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const pages = [
    { name: 'Home', href: '/' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Collections', href: '/view-collection' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Order Now', href: '/order-now' },
    { name: 'Cart', href: '/cart' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const socialLinks = [
    { icon: <Instagram size={24} />, href: '#' },
    { icon: <Facebook size={24} />, href: '#' },
    { icon: <Twitter size={24} />, href: '#' },
    { icon: <Youtube size={24} />, href: '#' },
  ];

  return (
    <footer className="bg-card text-card-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold tracking-widest uppercase text-primary">
              Farah Origin
            </Link>
            <p className="text-muted-foreground mt-4 max-w-sm">
              Handmade crochet gifts, elegant mehendi, and premium handcrafted creations made with love for every special occasion.
            </p>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {pages.map(page => (
                  <li key={page.name}>
                    <Link href={page.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/contact-us" className="text-muted-foreground hover:text-primary">Contact</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQ</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a key={index} href={social.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Farah Origin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
