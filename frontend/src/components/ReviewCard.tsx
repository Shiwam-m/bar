import React from 'react';
import { Star } from 'lucide-react';
import { ReviewItem } from '../types';

interface ReviewCardProps {
  review: ReviewItem;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="bg-panel border border-line p-7 text-left rounded-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-gold flex flex-col justify-between group shadow-lg">
      <div>
        <div className="flex items-center gap-1 text-gold mb-3">
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} size={15} fill="#c8a45a" stroke="#c8a45a" />
          ))}
        </div>
        <p className="text-[#d8d3c8] text-sm leading-relaxed mb-4 italic">
          "{review.text}"
        </p>
      </div>
      <div className="border-t border-line/40 pt-3 flex justify-between items-center text-xs">
        <span className="font-medium text-ink tracking-wide">{review.author}</span>
        <span className="text-soft/70 text-[11px]">{review.source}</span>
      </div>
    </div>
  );
};
