import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { OrnamentDivider } from '../components/OrnamentDivider';
import { ArrowUpRight } from 'lucide-react';

export const FeaturedMenuSection: React.FC = () => {
  const bigFeature = {
    title: 'Signature Molecular Mixology',
    subtitle: 'Infused spirits, liquid nitrogen pearls, aromatic smoke & botanical essences crafted tableside.',
    category: 'Cocktails',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85',
  };

  const squareCards = [
    {
      title: 'Rare Single Malts & Spirits',
      subtitle: 'Aged highland scotch, artisanal vodkas & Caribbean rums',
      category: 'Spirits',
      image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Awadhi Charred Tapas',
      subtitle: 'Royal Lucknow spices, truffle paneer & smoked seekh kebabs',
      category: 'Bites',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Artisan Smoked Cocktails',
      subtitle: 'Bourbon infused with flamed orange & applewood smoke',
      category: 'Cocktails',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=85',
    },
    {
      title: 'Gourmet Molecular Bites',
      subtitle: 'Crisp botanical spheres, parmesan truffle fries & modern fusion',
      category: 'Bites',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=85',
    },
  ];

  return (
    <section className="w-full max-w-[1440px] mx-auto px-[4vw] py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-gold text-xs uppercase tracking-[0.36em] font-medium">
          Our Menu
        </p>
        <OrnamentDivider />
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold mb-3 text-ink">
          We serve only the best
        </h2>
        <p className="text-soft text-sm sm:text-base max-w-[620px] mx-auto mb-14 leading-relaxed">
          From experimental molecular cocktails to vintage single malts and rich Awadhi bar bites,
          every creation is crafted with artisanal precision on Lucknow’s favorite rooftop.
        </p>
      </motion.div>

      {/* 5-Image Showcase Layout: 1 Big Image on Left + 4 Square Box Images on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-left">
        {/* Left Side: 1 Big Prominent Showcase Image (5 cols) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <Link
            to={`/menu?category=${bigFeature.category}`}
            className="group relative w-full h-[480px] lg:h-full min-h-[460px] bg-panel border border-line rounded-sm overflow-hidden flex flex-col justify-between p-8 shadow-2xl transition-all duration-500 hover:border-gold outline-none focus:outline-none"
          >
            {/* Background Image with Zoom on Hover */}
            <img
              src={bigFeature.image}
              alt={bigFeature.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-108"
              loading="lazy"
            />
            {/* Dark Gradient Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-[#0a0a0c]/30 group-hover:via-[#0a0a0c]/50 transition-colors" />

            {/* Pattern Accent at Top */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="pat-accent" />
              <span className="bg-gold/90 text-[#17120a] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-sm flex items-center gap-1 shadow">
                Featured <ArrowUpRight size={13} />
              </span>
            </div>

            {/* Details at Bottom */}
            <div className="relative z-10">
              <span className="text-gold text-xs uppercase tracking-[0.25em] font-semibold block mb-2">
                {bigFeature.category}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-ink mb-3 group-hover:text-gold transition-colors leading-tight">
                {bigFeature.title}
              </h3>
              <p className="text-[#e2ded5] text-xs sm:text-sm leading-relaxed mb-5 max-w-[420px]">
                {bigFeature.subtitle}
              </p>
              <span className="inline-flex items-center gap-2 text-gold uppercase tracking-[0.2em] text-xs font-semibold pb-1 border-b border-gold/40 group-hover:border-gold transition-colors">
                Explore Menu <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Right Side: 4 Square Box Images in a 2x2 Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {squareCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/menu?category=${card.category}`}
                className="group relative block aspect-square w-full bg-panel border border-line rounded-sm overflow-hidden p-6 shadow-xl transition-all duration-400 hover:border-gold hover:scale-[1.02] outline-none focus:outline-none"
              >
                {/* Background Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/95 via-[#0a0a0c]/55 to-transparent group-hover:via-[#0a0a0c]/40 transition-colors" />

                {/* Card Content positioned at bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex flex-col justify-end">
                  <span className="text-gold text-[11px] uppercase tracking-[0.22em] font-semibold mb-1">
                    {card.category}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-ink mb-1.5 group-hover:text-gold transition-colors leading-snug">
                    {card.title}
                  </h4>
                  <p className="text-soft text-xs leading-relaxed line-clamp-2 mb-3">
                    {card.subtitle}
                  </p>
                  <span className="text-gold text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    View <ArrowUpRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
