import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { FeaturedMenuSection } from '../sections/FeaturedMenuSection';
import { ReviewsSection } from '../sections/ReviewsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <HeroSection />
      <FeaturedMenuSection />
      <ReviewsSection />
    </div>
  );
};
