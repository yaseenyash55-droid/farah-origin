import React from 'react';

const OrderNowPage = () => {
  return (
    <main className="bg-background text-foreground min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">Place Your Custom Order</h1>
          <p className="text-center text-lg text-muted-foreground mb-12">
            Let us craft something unique for you. Fill out the form below to begin your custom order inquiry.
          </p>

          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">Full Name</label>
                <input type="text" id="fullName" placeholder="Your Name" className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email Address</label>
                <input type="email" id="email" placeholder="your.email@example.com" className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number (Optional)</label>
              <input type="tel" id="phone" placeholder="+1 (555) 123-4567" className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors" />
            </div>

            <div className="space-y-2">
              <label htmlFor="product" className="text-sm font-medium">I'm interested in...</label>
              <select id="product" className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors">
                <option>Select a category</option>
                <option>Custom Crochet Piece</option>
                <option>Henna / Mehendi Art</option>
                <option>Crochet Bouquet</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Tell us about your vision</label>
              <textarea id="message" rows="6" placeholder="Describe the design, colors, and any specific details you have in mind." className="w-full bg-input border border-border rounded-md px-4 py-3 text-base focus:ring-primary focus:border-primary transition-colors"></textarea>
            </div>

            <div className="text-center">
              <button type="submit" className="bg-primary text-primary-foreground px-10 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all text-lg transform hover:scale-105">
                Send Inquiry
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default OrderNowPage;