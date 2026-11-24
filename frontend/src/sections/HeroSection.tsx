import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video } from 'lucide-react';
import { OrnamentDivider } from '../components/OrnamentDivider';

export const HeroSection: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState<string>('/assets/hero-video.mp4');
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      if (videoRef.current) {
        videoRef.current.src = url;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-[5vw] pt-[150px] pb-[90px] overflow-hidden bg-[radial-gradient(900px_500px_at_70%_30%,#2a2418,#0f1012)]">
      {/* Background Demo Video with Smooth Autoplay Loop */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-screen scale-105 pointer-events-none transition-opacity duration-1000"
      />

      {/* Background ambient lighting overlay from original design */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/70 via-[#0a0a0c]/55 to-[#0a0a0c]/90 pointer-events-none z-[1]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative z-[2] max-w-[820px] mx-auto"
      >
        <p className="text-gold text-xs uppercase tracking-[0.36em] font-medium mb-1">
          BohoBar • Lucknow
        </p>

        <OrnamentDivider />

        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.05] mb-4 text-ink">
          Good drinks, good company
        </h1>

        <p className="text-[#e6e1d6] text-base sm:text-lg mb-8 max-w-[620px] mx-auto font-light leading-relaxed">
          Elevate your evening on Lucknow’s most celebrated rooftop. Savor precision molecular mixology,
          panoramic skyline views, and vibrant nightlife at Riverside Mall.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/menu"
            className="inline-block bg-transparent hover:bg-gold text-ink hover:text-[#17120a] border border-gold uppercase tracking-[0.2em] text-xs font-semibold px-8 py-4 transition-all duration-300 rounded-sm"
          >
            View our menu
          </Link>
          <Link
            to="/book"
            className="inline-block bg-gold hover:bg-transparent text-[#17120a] hover:text-gold border border-gold uppercase tracking-[0.2em] text-xs font-semibold px-8 py-4 transition-all duration-300 rounded-sm"
          >
            Reserve a table
          </Link>
        </div>
      </motion.div>

      {/* Video Preview Picker toggle from original website */}
      <div className="absolute left-[5vw] bottom-6 z-[3]">
        <label
          htmlFor="vpick"
          className="text-soft hover:text-gold text-xs cursor-pointer border-b border-line hover:border-gold pb-0.5 transition-colors flex items-center gap-1.5"
        >
          <Video size={13} className="text-gold" /> Preview with your video
        </label>
        <input
          id="vpick"
          type="file"
          accept="video/*"
          className="hidden"
          onChange={handleVideoPick}
        />
      </div>
    </section>
  );
};
