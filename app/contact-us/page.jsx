"use client";
import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { motion } from 'framer-motion';

const ContactUsPage = () => {
  return (
    <main className="bg-background/50 text-foreground min-h-screen pt-20 relative">
      <BackButton />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-lg text-muted-foreground">
            We would love to hear from you! Whether you have a question, a custom order inquiry, or just want to say hello, feel free to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Email</h3>
                  <a href="mailto:hello@farahorigin.com" className="text-muted-foreground hover:text-primary transition">hello@farahorigin.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">WhatsApp</h3>
                  <a href="https://wa.me/+919344665042" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition">+91 9344665042</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Studio Location</h3>
                  <p className="text-muted-foreground">Mettupalayam,coimbatore,Tamilnadu,India</p>
                  <p className="text-muted-foreground"> India (By Appointment Only)</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Business Hours</h3>
                <ul className="text-muted-foreground space-y-2">
                    <li>Monday - Friday: 10:00 AM - 7:00 PM</li>
                    <li>Saturday: 11:00 AM - 5:00 PM</li>
                    <li>Sunday: Closed</li>
                </ul>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
            <form className="space-y-6 bg-card p-8 rounded-xl border border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                  <input type="text" id="firstName" placeholder="Your First Name" className="w-full bg-input border-border rounded-md px-4 py-3 focus:ring-primary focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                  <input type="text" id="lastName" placeholder="Your Last Name" className="w-full bg-input border-border rounded-md px-4 py-3 focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="contactEmail" className="text-sm font-medium">Email</label>
                <input type="email" id="contactEmail" placeholder="your.email@example.com" className="w-full bg-input border-border rounded-md px-4 py-3 focus:ring-primary focus:border-primary" />
              </div>
              <div className="space-y-2">
                <label htmlFor="contactMessage" className="text-sm font-medium">Message</label>
                <textarea id="contactMessage" rows="5" placeholder="How can we help you?" className="w-full bg-input border-border rounded-md px-4 py-3 focus:ring-primary focus:border-primary"></textarea>
              </div>
              <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold hover:bg-primary/90 transition-all">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default ContactUsPage;
