"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Keep Link for other navigations if any, or can be removed if not used.

const OrderNowPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      // Redirect to the inquiry sent page upon success
      const query = new URLSearchParams(formData).toString();
      router.push(`/inquiry-sent?${query}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-background text-foreground min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">Place Your Custom Order</h1>
          <p className="text-center text-lg text-muted-foreground mb-12">
            Let us craft something unique for you. Fill out the form below to begin your custom order inquiry.
          </p>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your Name" required className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number (Optional)</label>
              <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 123-4567" className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors" />
            </div>

            <div className="space-y-2">
              <label htmlFor="interest" className="text-sm font-medium">I'm interested in...</label>
              <select id="interest" value={formData.interest} onChange={handleChange} required className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors">
                <option value="" disabled>Select a category</option>
                <option value="Custom Crochet Piece">Custom Crochet Piece</option>
                <option value="Henna / Mehendi Art">Henna / Mehendi Art</option>
                <option value="Crochet Bouquet">Crochet Bouquet</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Tell us about your vision</label>
              <textarea id="message" value={formData.message} onChange={handleChange} rows="6" placeholder="Describe the design, colors, and any specific details you have in mind." required className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors"></textarea>
            </div>

            {error && <p className="text-destructive text-center">{error}</p>}

            <div className="text-center">
              <button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground px-10 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all text-lg transform hover:scale-105 disabled:bg-muted disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default OrderNowPage;