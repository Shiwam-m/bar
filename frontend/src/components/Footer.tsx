import React from 'react';
import { Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-[#09090b] text-soft text-sm border-t border-line py-12 px-[5vw]">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
        <div>
          <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
            <img
              src="/assets/logo.png"
              alt="BohoBar"
              className="h-10 w-10 rounded-full object-cover border border-gold/40"
            />
            <h4 className="font-serif text-2xl font-bold text-ink tracking-wide">
              BohoBar
            </h4>
          </div>
          <p className="text-xs text-soft leading-relaxed">
            Lucknow’s premier rooftop destination featuring world-class molecular mixology,
            gourmet dining, and breathtaking city skyline views.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold text-ink mb-3">Visit Us</h4>
          <p className="text-xs text-soft flex items-center justify-center md:justify-start gap-1.5 mb-1.5">
            <MapPin size={14} className="text-gold shrink-0" />
            7th Floor, Riverside Mall, Gomti Nagar, Lucknow
          </p>
          <p className="text-xs text-soft flex items-center justify-center md:justify-start gap-1.5 mb-1.5">
            <Phone size={14} className="text-gold shrink-0" />
            +91 78000 00000
          </p>
          <p className="text-xs text-soft flex items-center justify-center md:justify-start gap-1.5">
            <Mail size={14} className="text-gold shrink-0" />
            reservations@bohobar.com
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg font-bold text-ink mb-3">Connect</h4>
          <div className="flex gap-4 justify-center md:justify-start mb-3">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-ink transition-colors flex items-center gap-1.5 text-xs"
            >
              <Instagram size={16} /> Instagram
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-ink transition-colors flex items-center gap-1.5 text-xs"
            >
              <Facebook size={16} /> Facebook
            </a>
          </div>
          <p className="text-xs text-soft">
            Operating Hours: 12:00 PM – 2:00 AM Daily
          </p>
        </div>
      </div>

      <div className="border-t border-line/60 pt-6 text-center text-xs text-soft/80 flex flex-col sm:flex-row justify-between items-center gap-2 max-w-[1100px] mx-auto">
        <p>© {new Date().getFullYear()} BohoBar, Lucknow. All rights reserved.</p>
        <p className="text-gold/90 font-medium">Please drink responsibly.</p>
      </div>
    </footer>
  );
};
