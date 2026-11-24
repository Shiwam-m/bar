import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrnamentDivider } from '../components/OrnamentDivider';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { ReviewItem } from '../types';

export const ReviewsSection: React.FC = () => {
  const reviews: ReviewItem[] = [
    {
      id: 1,
      author: 'Rohit Verma',
      text: 'The rooftop view of Gomti Nagar from Riverside Mall is unmatched. Loved the molecular cocktails and the live acoustic performance on Friday night! Unbelievable vibe.',
      rating: 5,
      source: 'Google Reviews',
      created_at: '',
    },
    {
      id: 2,
      author: 'Priyanka Sharma',
      text: 'BohoBar is our top weekend destination in Lucknow. Great music, polite staff, and the Truffle Paneer Tikka was sensational. Hands down the finest cocktail experience in town.',
      rating: 5,
      source: 'Google Reviews',
      created_at: '',
    },
    {
      id: 3,
      author: 'Ananya Srivastava',
      text: 'Incredible atmosphere with the 3D molecular theme and outdoor breeze. Liquid Nitrogen cocktails are must-try. Definitely booking early next time for Saturday DJ night!',
      rating: 5,
      source: 'Google Reviews',
      created_at: '',
    },
    {
      id: 4,
      author: 'Kabir Mehrotra',
      text: 'Visited with colleagues after work. The Single Malt selection and handcrafted Smoked Old Fashioned were world class. The service is prompt and very attentive.',
      rating: 5,
      source: 'Google Reviews',
      created_at: '',
    },
    {
      id: 5,
      author: 'Dr. Shalini Gupta',
      text: 'Celebrated our anniversary at BohoBar rooftop. The team arranged an exquisite corner table with skyline view and custom celebratory drinks. Truly memorable evening!',
      rating: 5,
      source: 'Google Reviews',
      created_at: '',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  return (
    <section className="w-full max-w-[1440px] mx-auto px-[4vw] py-24 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-gold text-xs uppercase tracking-[0.36em] font-medium">
          Guest Testimonials
        </p>
        <OrnamentDivider />
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 text-ink">
          What our guests say
        </h2>
        <p className="text-soft text-sm sm:text-base max-w-[540px] mx-auto mb-12">
          Swipe or scroll through our 3D reviews reel to read stories from our guests.
        </p>
      </motion.div>

      {/* 3D Reels Scrollable Carousel Container */}
      <div className="relative max-w-[1100px] mx-auto py-8">
        {/* Navigation Arrows */}
        <button
          onClick={prevReview}
          aria-label="Previous Review"
          className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-panel/90 border border-line hover:border-gold text-ink hover:text-gold p-3 rounded-full transition-all duration-300 shadow-xl backdrop-blur-md"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextReview}
          aria-label="Next Review"
          className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-panel/90 border border-line hover:border-gold text-ink hover:text-gold p-3 rounded-full transition-all duration-300 shadow-xl backdrop-blur-md"
        >
          <ChevronRight size={22} />
        </button>

        {/* 3D Reels Reel Viewport */}
        <div className="relative h-[340px] sm:h-[300px] flex items-center justify-center perspective-container">
          {reviews.map((rev, index) => {
            // Calculate relative offset from currentIndex
            let offset = index - currentIndex;
            if (offset < -Math.floor(reviews.length / 2)) {
              offset += reviews.length;
            } else if (offset > Math.floor(reviews.length / 2)) {
              offset -= reviews.length;
            }

            const isActive = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={rev.id}
                onClick={() => setCurrentIndex(index)}
                initial={false}
                animate={{
                  x: `${offset * 105}%`,
                  scale: isActive ? 1 : 0.85,
                  rotateY: offset * -18,
                  zIndex: isActive ? 20 : 10 - Math.abs(offset),
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{ duration: 0.55, ease: [0.25, 0.8, 0.25, 1] }}
                className={`absolute w-[85%] sm:w-[540px] p-7 sm:p-9 bg-panel rounded-sm border cursor-pointer select-none transition-shadow ${
                  isActive
                    ? 'border-gold shadow-[0_20px_50px_rgba(200,164,90,0.18)]'
                    : 'border-line hover:border-gold/50'
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="flex justify-between items-start mb-4">
                  {/* Gold Stars */}
                  <div className="flex items-center gap-1 text-gold">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} size={16} fill="#c8a45a" stroke="#c8a45a" />
                    ))}
                  </div>
                  <Quote size={24} className="text-gold/40 shrink-0" />
                </div>

                <p className="text-ink/90 text-sm sm:text-base leading-relaxed italic mb-6 text-left line-clamp-4">
                  "{rev.text}"
                </p>

                <div className="border-t border-line/60 pt-4 flex justify-between items-center text-xs text-left">
                  <div>
                    <span className="font-bold text-ink block text-sm tracking-wide">
                      {rev.author}
                    </span>
                    <span className="text-soft text-[11px]">Verified Guest</span>
                  </div>
                  <span className="text-gold font-medium bg-gold/10 px-2.5 py-1 rounded-sm border border-gold/30">
                    {rev.source}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reel Indicators & Counter */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <span className="text-xs font-mono text-gold tracking-widest mr-2">
            0{currentIndex + 1} / 0{reviews.length}
          </span>
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? 'w-8 bg-gold'
                  : 'w-2 bg-line hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Molecule+Air+Bar+Lucknow"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-transparent hover:bg-gold text-ink hover:text-[#17120a] border border-gold uppercase tracking-[0.2em] text-xs font-semibold px-8 py-3.5 transition-all duration-300 rounded-sm shadow-md"
        >
          Review us on Google
        </a>
      </div>
    </section>
  );
};
