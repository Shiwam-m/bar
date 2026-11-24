import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbox } from '../components/Lightbox';
import { Play, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';
import { GalleryItem } from '../types';

export const GalleryPage: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');

  // Curated media collection with both high-res Photos and Videos for BohoBar
  const galleryItems: GalleryItem[] = [
    // Videos Section
    {
      id: 1,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      videoUrl: '/assets/hero-video.mp4',
      title: 'BohoBar Rooftop Skyline & Evening Atmosphere',
      duration: '0:30',
    },
    {
      id: 2,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
      videoUrl: '/assets/hero-video.mp4',
      title: 'Tableside Molecular Cocktail Creation',
      duration: '0:45',
    },
    {
      id: 3,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
      videoUrl: '/assets/hero-video.mp4',
      title: 'Saturday Night DJ & Dance Floor Vibe',
      duration: '0:35',
    },
    {
      id: 4,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80',
      videoUrl: '/assets/hero-video.mp4',
      title: 'Friday Live Acoustic Performance',
      duration: '0:40',
    },

    // Photos Section
    {
      id: 5,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80',
      title: 'Artisan Smoked Botanical Cocktail',
    },
    {
      id: 6,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
      title: 'Luxury Rooftop Lounge Dining',
    },
    {
      id: 7,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=80',
      title: 'Bar Counter & Mixology Station',
    },
    {
      id: 8,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80',
      title: 'Smoked Bourbon Whiskey',
    },
    {
      id: 9,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
      title: 'Gourmet Tapas & Small Plates',
    },
    {
      id: 10,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=900&q=80',
      title: 'Truffle Spiced Paneer Tikka',
    },
    {
      id: 11,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80',
      title: 'Nightlife Vibe & Music',
    },
    {
      id: 12,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=900&q=80',
      title: 'Single Malt Whisky Collection',
    },
    {
      id: 13,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=80',
      title: 'Liquid Nitrogen Cocktail Creation',
    },
    {
      id: 14,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80',
      title: 'Live Acoustic Performance',
    },
    {
      id: 15,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=900&q=80',
      title: 'Skyline View from 7th Floor',
    },
    {
      id: 16,
      type: 'photo',
      url: 'https://images.unsplash.com/photo-1508253578933-20b529302151?auto=format&fit=crop&w=900&q=80',
      title: 'Outdoor Terrace Seating',
    },
  ];

  // Filtered media list
  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="min-h-screen pt-[105px] pb-24 px-[4vw] max-w-[1440px] mx-auto">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-8">
        <div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ink mb-2">
            Gallery
          </h1>
        </div>

        {/* Smooth Filter Tabs: All / Photos / Videos */}
        <div className="flex items-center gap-2 bg-panel/80 p-1 rounded-sm border border-line">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-all duration-300 ${
              filter === 'all'
                ? 'bg-gold text-[#17120a] font-semibold shadow-sm'
                : 'text-soft hover:text-ink'
            }`}
          >
            All Moments
          </button>
          <button
            onClick={() => setFilter('photo')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-all duration-300 flex items-center gap-1.5 ${
              filter === 'photo'
                ? 'bg-gold text-[#17120a] font-semibold shadow-sm'
                : 'text-soft hover:text-ink'
            }`}
          >
            <ImageIcon size={13} /> Photos
          </button>
          <button
            onClick={() => setFilter('video')}
            className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-sm transition-all duration-300 flex items-center gap-1.5 ${
              filter === 'video'
                ? 'bg-gold text-[#17120a] font-semibold shadow-sm'
                : 'text-soft hover:text-ink'
            }`}
          >
            <VideoIcon size={13} /> Videos
          </button>
        </div>
      </div>

      {/* 4-column responsive grid with buttery smooth hardware-accelerated animations */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 perspective-container"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.button
              layout
              key={item.id}
              onClick={() => setActiveItemIndex(index)}
              aria-label={`Open ${item.type}: ${item.title}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
              className="group relative aspect-[4/5] bg-panel border border-line rounded-sm overflow-hidden text-left cursor-pointer transition-all duration-300 hover:border-gold hover:scale-[1.025] hover:z-20 transform-gpu"
            >
              {/* Thumbnail Image */}
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Video Play Badge Overlay for Video Items */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-black/60 border border-gold/70 text-gold flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-gold group-hover:text-[#17120a] transition-all duration-300">
                    <Play size={18} fill="currentColor" className="ml-0.5" />
                  </div>
                </div>
              )}

              {/* Top Type Tag */}
              {item.type === 'video' && (
                <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm border border-gold/40 text-gold text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm flex items-center gap-1">
                  <VideoIcon size={11} /> {item.duration || 'Video'}
                </div>
              )}

              {/* Gradient Bottom Title Banner */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-xs sm:text-sm text-ink font-medium tracking-wide drop-shadow line-clamp-2">
                  {item.title}
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox Modal for both Photos & Videos */}
      <Lightbox
        isOpen={activeItemIndex !== null}
        currentIndex={activeItemIndex ?? 0}
        totalImages={filteredItems.length}
        currentImage={activeItemIndex !== null ? filteredItems[activeItemIndex] : undefined}
        onClose={() => setActiveItemIndex(null)}
        onNext={() =>
          setActiveItemIndex((prev) =>
            prev !== null ? (prev + 1) % filteredItems.length : 0
          )
        }
        onPrev={() =>
          setActiveItemIndex((prev) =>
            prev !== null
              ? (prev - 1 + filteredItems.length) % filteredItems.length
              : 0
          )
        }
      />
    </div>
  );
};
