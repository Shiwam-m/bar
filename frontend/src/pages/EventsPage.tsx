import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { EventItem } from '../types';
import { fetchEvents } from '../services/api';

export const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fallbackEvents: EventItem[] = [
    {
      id: 1,
      title: 'Live Acoustic Nights',
      timing: 'Every Friday, 9:00 PM onwards',
      description: 'Unwind with soulful acoustic sets, panoramic Lucknow skyline views, and artisan cocktails on the open rooftop terrace.',
      image_url: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=800&q=80',
      is_active: true,
    },
    {
      id: 2,
      title: 'Golden Hour Sundowner',
      timing: 'Daily, 5:00 PM to 8:00 PM',
      description: 'Exclusive 1+1 offers on signature molecular cocktails while watching the golden sunset over Gomti Nagar.',
      image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      is_active: true,
    },
    {
      id: 3,
      title: 'Saturday Bollywood & Commercial DJ',
      timing: 'Saturday nights, 10:00 PM till late',
      description: 'High-energy rooftop clubbing experience with premier guest DJs, laser lighting, and celebratory bottle service.',
      image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=800&q=80',
      is_active: true,
    },
  ];

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        if (data && data.length > 0) setEvents(data);
        else setEvents(fallbackEvents);
      })
      .catch(() => setEvents(fallbackEvents))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-[105px] pb-24 px-[4vw] max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-10"
      >
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ink mb-2">
          Events & Offers
        </h1>
        <p className="text-soft text-sm sm:text-base max-w-[640px]">
          What is happening at BohoBar. Experience the pinnacle of rooftop nightlife in Lucknow.
          Book your table early for peak weekend nights.
        </p>
      </motion.div>

      {/* Events Grid with Gold Top Border across wide layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="bg-panel border border-line border-t-2 border-t-gold p-8 rounded-sm flex flex-col justify-between group hover:border-gold hover:-translate-y-1.5 transition-all duration-300 shadow-xl"
          >
            <div>
              <div className="flex items-center gap-1.5 text-gold text-xs font-medium uppercase tracking-wider mb-2">
                <Clock size={13} />
                <span>{event.timing}</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-3 group-hover:text-gold transition-colors">
                {event.title}
              </h3>
              <p className="text-soft text-sm leading-relaxed mb-6">
                {event.description}
              </p>
            </div>

            <div className="border-t border-line/40 pt-4 flex items-center justify-between">
              <Link
                to="/book"
                className="text-gold uppercase tracking-[0.16em] text-xs font-semibold hover:text-ink transition-colors pb-0.5 border-b border-gold/40 hover:border-gold"
              >
                Book a table
              </Link>
              <Sparkles size={16} className="text-gold/60" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
