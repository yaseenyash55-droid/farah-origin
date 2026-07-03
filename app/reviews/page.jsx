import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const ReviewsPage = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      title: 'Bridal Henna Client',
      quote: "Farah's henna artistry is absolutely breathtaking! The intricate details and rich stain color made my wedding day so special. She was professional, kind, and truly a master of her craft.",
      rating: 5,
      avatar: '/avatars/avatar-1.jpg',
    },
    {
      name: 'Aisha Khan',
      title: 'Crochet Top Owner',
      quote: "I'm in love with my custom crochet top! The quality is amazing, and it fits perfectly. I get compliments every time I wear it. The whole process was seamless.",
      rating: 5,
      avatar: '/avatars/avatar-2.jpg',
    },
    {
      name: 'Jessica Miller',
      title: 'Gift Recipient',
      quote: "Received a crochet bouquet as a birthday gift and was blown away. It's so unique and beautifully made. An everlasting bouquet that I'll cherish forever.",
      rating: 5,
      avatar: '/avatars/avatar-3.jpg',
    },
    {
        name: 'Emily Chen',
        title: 'Workshop Attendee',
        quote: "The beginner's crochet workshop was fantastic. Farah is a patient and encouraging teacher. I went from knowing nothing to creating my first granny square!",
        rating: 4.5,
        avatar: '/avatars/avatar-4.jpg',
    },
    {
        name: 'Fatima Al-Jamil',
        title: 'Custom Order',
        quote: "I ordered a custom amigurumi doll for my daughter, and it exceeded all my expectations. The attention to detail is incredible. It's her new favorite toy.",
        rating: 5,
        avatar: '/avatars/avatar-5.jpg',
    },
    {
        name: 'Chloe Wilson',
        title: 'Repeat Customer',
        quote: "I keep coming back for more! From henna for festivals to unique crochet gifts for friends, Farah Origin is my go-to for anything creative and handmade.",
        rating: 5,
        avatar: '/avatars/avatar-6.jpg',
    },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} size={20} fill="currentColor" />)}
        {halfStar && <StarHalf key="half" size={20} fill="currentColor" />}
        {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} size={20} className="text-gray-300" />)}
      </div>
    );
  };

  return (
    <main className="bg-background text-foreground min-h-screen pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Words of Appreciation</h1>
          <p className="text-lg text-muted-foreground">
            Hear from our wonderful clients who have experienced the magic of Farah Origin firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-8 flex flex-col">
              <div className="flex-grow mb-4">
                <p className="text-card-foreground italic">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center gap-4 mt-6">
                {/* <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover"/> */}
                <div>
                  <p className="font-semibold text-lg">{testimonial.name}</p>

                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
                <div className="ml-auto">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReviewsPage;