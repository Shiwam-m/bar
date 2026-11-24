import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  totalImages: number;
  currentImage?: GalleryItem;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  currentIndex,
  totalImages,
  currentImage,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#080809]/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-6"
        >
          {/* Main Media Box with smooth zoom in */}
          <motion.div
            key={`media-${currentIndex}`}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.8, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-[min(90vw,880px)] h-[min(72vh,740px)] flex items-center justify-center bg-panel border border-line overflow-hidden rounded-sm relative shadow-2xl"
          >
            {currentImage?.type === 'video' && currentImage.videoUrl ? (
              <video
                src={currentImage.videoUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : currentImage?.url ? (
              <img
                src={currentImage.url}
                alt={currentImage.title}
                className="w-full h-full object-cover select-none"
              />
            ) : (
              <span className="text-soft text-sm">Media item {currentIndex + 1}</span>
            )}

            {/* Media Title Badge at bottom */}
            {currentImage?.title && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex justify-between items-end pointer-events-none">
                <span className="text-sm font-medium text-ink tracking-wide drop-shadow">
                  {currentImage.title}
                </span>
                {currentImage.type === 'video' && currentImage.duration && (
                  <span className="text-[11px] bg-gold/90 text-[#17120a] font-bold px-2 py-0.5 rounded-sm">
                    {currentImage.duration}
                  </span>
                )}
              </div>
            )}
          </motion.div>

          {/* Navigation Controls Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-4 mt-5 text-soft text-sm"
          >
            <button
              onClick={onPrev}
              className="border border-line hover:border-gold hover:text-gold text-ink px-4 py-2 rounded-sm text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            <span className="text-xs tracking-widest text-gold font-mono px-2">
              {currentIndex + 1} / {totalImages}
            </span>
            <button
              onClick={onNext}
              className="border border-line hover:border-gold hover:text-gold text-ink px-4 py-2 rounded-sm text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              Next <ChevronRight size={16} />
            </button>
            <button
              onClick={onClose}
              className="bg-gold text-[#17120a] hover:bg-gold-light px-4 py-2 rounded-sm text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 font-medium ml-2"
            >
              <X size={16} /> Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
