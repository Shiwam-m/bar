import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuItem } from '../types';
import { fetchGroupedMenu } from '../services/api';
import { Sparkles } from 'lucide-react';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuData, setMenuData] = useState<Record<string, MenuItem[]>>({});
  const [activeCategory, setActiveCategory] = useState<string>('Cocktails');
  const [loading, setLoading] = useState(true);

  // Fallback initial data in case backend is offline
  const fallbackMenu: Record<string, MenuItem[]> = {
    Cocktails: [
      {
        id: 1,
        category: 'Cocktails',
        name: 'Signature Molecule',
        description: 'House botanical gin, citrus essence, aromatic mist & rosemary smoke',
        price: 650,
        image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80',
        is_special: true,
      },
      {
        id: 2,
        category: 'Cocktails',
        name: 'Smoked Old Fashioned',
        description: 'Single barrel bourbon, Angostura bitters, flamed orange peel, hickory wood smoke',
        price: 700,
        image_url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80',
        is_special: true,
      },
      {
        id: 3,
        category: 'Cocktails',
        name: 'Liquid Nitrogen Mojito',
        description: 'Cuban white rum, fresh garden mint, Persian lime, frozen nitrogen pearls',
        price: 550,
        image_url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=400&q=80',
        is_special: false,
      },
      {
        id: 4,
        category: 'Cocktails',
        name: 'Classic Whisky Sour',
        description: 'Blended Scotch whisky, organic lemon juice, aromatic bitters, silky egg foam',
        price: 600,
        image_url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=400&q=80',
        is_special: false,
      },
    ],
    Spirits: [
      {
        id: 5,
        category: 'Spirits',
        name: 'Single Malt Highland 12Y',
        description: 'Neat or over hand-carved ice sphere, 30 ml pour',
        price: 750,
        image_url: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=400&q=80',
        is_special: true,
      },
      {
        id: 6,
        category: 'Spirits',
        name: 'Grey Goose Vodka',
        description: 'Ultra-premium French wheat vodka, neat or with artisan tonic, 30 ml',
        price: 500,
        image_url: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=400&q=80',
        is_special: false,
      },
      {
        id: 7,
        category: 'Spirits',
        name: 'Diplomático Aged Rum',
        description: 'Venezuelan dark rum aged 12 years in oak barrels, 30 ml',
        price: 550,
        image_url: 'https://images.unsplash.com/photo-1614313511387-1436a4480ebb?auto=format&fit=crop&w=400&q=80',
        is_special: false,
      },
    ],
    Bites: [
      {
        id: 8,
        category: 'Bites',
        name: 'Truffle Paneer Tikka',
        description: 'Cottage cheese marinated in Kashmiri spices, charred with truffle drizzle',
        price: 450,
        image_url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=400&q=80',
        is_special: true,
      },
      {
        id: 9,
        category: 'Bites',
        name: 'Awadhi Chicken Seekh',
        description: 'Minced country chicken infused with royal spices, served with mint emulsion',
        price: 520,
        image_url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80',
        is_special: true,
      },
      {
        id: 10,
        category: 'Bites',
        name: 'Golgappa Molecular Shots',
        description: 'Crisp semolina spheres served with five molecular spiced botanical waters',
        price: 380,
        image_url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80',
        is_special: true,
      },
      {
        id: 11,
        category: 'Bites',
        name: 'Parmesan Truffle Fries',
        description: 'Double-cooked potatoes tossed in aged parmesan, herbs and garlic aioli',
        price: 320,
        image_url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
        is_special: false,
      },
    ],
  };

  useEffect(() => {
    const catQuery = searchParams.get('category');
    if (catQuery) {
      setActiveCategory(catQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchGroupedMenu()
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setMenuData(data);
          const categories = Object.keys(data);
          const catQuery = searchParams.get('category');
          if (catQuery && categories.includes(catQuery)) {
            setActiveCategory(catQuery);
          } else if (categories.length > 0 && !categories.includes(activeCategory)) {
            setActiveCategory(categories[0]);
          }
        } else {
          setMenuData(fallbackMenu);
        }
      })
      .catch((err) => {
        console.warn('Backend unavailable, using fallback menu data', err);
        setMenuData(fallbackMenu);
      })
      .finally(() => setLoading(false));
  }, []);

  const categories = Object.keys(menuData).length > 0 ? Object.keys(menuData) : Object.keys(fallbackMenu);
  const items = (menuData[activeCategory] || fallbackMenu[activeCategory] || []);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setSearchParams({ category: cat });
  };

  return (
    <div className="min-h-screen pt-[105px] pb-24 px-[4vw] max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ink mb-2">
          Menu
        </h1>
        <p className="text-soft text-sm sm:text-base">
          Curated spirits, artisanal molecular cocktails, and gourmet tapas made fresh daily.
        </p>
      </motion.div>

      {/* Category Tabs */}
      <div className="flex gap-4 sm:gap-8 flex-wrap border-b border-line pb-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`font-medium text-base sm:text-lg tracking-wide pb-2 border-b-2 transition-all ${
              activeCategory === cat
                ? 'text-ink border-gold font-semibold'
                : 'text-soft border-transparent hover:text-ink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2-Column Menu Items with 3D Tilt Hover Effect across wide viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-14 gap-y-7 perspective-container">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-5 py-4 border-b border-line group transition-all duration-300 hover:border-gold/60 origin-left hover:-rotate-y-6 hover:translate-x-2"
          >
            {/* Thumbnail */}
            <div className="w-[96px] h-[96px] shrink-0 rounded-sm overflow-hidden bg-panel border border-line group-hover:border-gold transition-colors relative shadow-md">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-soft font-mono">
                  BohoBar
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-ink group-hover:text-gold transition-colors truncate">
                  {item.name}
                </h3>
                <span className="text-gold font-semibold text-lg sm:text-xl shrink-0">
                  ₹{item.price}
                </span>
              </div>
              <p className="text-soft text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                {item.description}
              </p>
              {item.is_special && (
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-gold font-medium mt-1.5">
                  <Sparkles size={12} /> Chef's Signature
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
