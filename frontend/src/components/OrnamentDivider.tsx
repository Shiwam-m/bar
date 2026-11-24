import React from 'react';

export const OrnamentDivider: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      className={`block mx-auto my-4 w-[120px] h-[12px] text-gold stroke-current fill-none ${className}`}
      viewBox="0 0 120 12"
      aria-hidden="true"
    >
      <circle cx="4" cy="6" r="2.5" fill="currentColor" />
      <path d="M8 6h30M82 6h30M44 6l5-5 5 5-5 5zM54 6l5-5 5 5-5 5zM64 6l5-5 5 5-5 5z" strokeWidth="1.2" />
    </svg>
  );
};
