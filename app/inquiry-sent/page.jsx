"use client";
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MailCheck } from 'lucide-react';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { motion } from 'framer-motion';

const InquiryDetails = () => {
  const searchParams = useSearchParams();

  const inquiryDetails = {
    fullName: searchParams.get('fullName') || 'N/A',
    email: searchParams.get('email') || 'N/A',
    phone: searchParams.get('phone') || 'N/A',
    interest: searchParams.get('interest') || 'N/A',
    message: searchParams.get('message') || 'No message provided.',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-card p-8 md:p-12 rounded-lg border border-border shadow-lg"
    >
      
      <div className="text-center mb-10">
        <MailCheck size={60} className="text-green-500 mx-auto mb-4" />
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Inquiry Sent!</h1>
        <p className="mt-4 text-muted-foreground">Thank you for reaching out. We have received your inquiry and will get back to you within 2-3 business days. A copy of your submission is shown below.</p>
      </div>

      <div className="border-t border-border pt-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6">Your Inquiry Details</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-semibold">{inquiryDetails.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold">{inquiryDetails.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-semibold">{inquiryDetails.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interested In</p>
              <p className="font-semibold">{inquiryDetails.interest}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Message</p>
            <div className="mt-2 p-4 bg-muted/50 rounded-md border border-border text-foreground/80 whitespace-pre-wrap">
              {inquiryDetails.message}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/" className="bg-primary text-primary-foreground px-10 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all text-lg">
          Back to Home
        </Link>
      </div>

    </motion.div>
  );
};

const InquirySentPage = () => {
  return (
    <main className="bg-background/50 text-foreground min-h-screen pt-20 relative">
      <BackButton />
      <div className="container mx-auto px-4 py-16">
        <Suspense fallback={<div>Loading...</div>}>
          <InquiryDetails />
        </Suspense>
      </div>
    </main>
  );
};

export default InquirySentPage;
