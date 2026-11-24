import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Phone, User, FileText, Send, CheckCircle2, AlertCircle, MapPin, ExternalLink } from 'lucide-react';
import { createReservation } from '../services/api';

export const ReservationPage: React.FC = () => {
  const WHATSAPP_NUMBER = '917800000000';
  const EMAIL_ADDRESS = 'reservations@bohobar.com';

  const timeSlots = [
    '12:00', '13:00', '14:00', '15:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'
  ];

  const todayStr = new Date().toISOString().slice(0, 10);

  const [formData, setFormData] = useState({
    date: todayStr,
    time: '20:00',
    guests: 2,
    phone: '',
    name: '',
    notes: '',
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'submitting' | 'success' | 'error';
    message?: string;
    waLink?: string;
    mailLink?: string;
  }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim()) {
      setStatus({
        type: 'error',
        message: 'Please provide your full name and phone number to confirm your table.',
      });
      return;
    }

    setStatus({ type: 'submitting' });

    const bookingText = `Table booking request at BohoBar\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}${
      formData.notes ? `\nNotes: ${formData.notes}` : ''
    }`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(bookingText)}`;
    const mailUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      'Table booking request - BohoBar'
    )}&body=${encodeURIComponent(bookingText)}`;

    try {
      // Persist to FastAPI backend
      await createReservation({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        date: formData.date,
        time: formData.time,
        guests: Number(formData.guests),
        notes: formData.notes.trim() || undefined,
      });

      setStatus({
        type: 'success',
        message: 'Your table reservation request has been registered in our system! You can also send it directly via WhatsApp or Email:',
        waLink: waUrl,
        mailLink: mailUrl,
      });
    } catch (err: any) {
      console.warn('Backend reservation notice:', err);
      // Graceful fallback: Still allow WhatsApp & Email dispatch
      setStatus({
        type: 'success',
        message: 'Ready to send! Tap below to send your reservation request directly to our team:',
        waLink: waUrl,
        mailLink: mailUrl,
      });
    }
  };

  return (
    <div className="min-h-screen pt-[105px] pb-24 px-[4vw] max-w-[960px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-gold text-xs uppercase tracking-[0.36em] font-medium mb-1">
          BohoBar • Rooftop Reservations
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ink mb-2">
          Book a Table
        </h1>
        <p className="text-soft text-sm sm:text-base max-w-[580px] mx-auto flex items-center justify-center gap-1.5 flex-wrap">
          <span>7th Floor, Riverside Mall, Gomti Nagar, Lucknow</span>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Molecule+Air+Bar+Lucknow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:text-ink inline-flex items-center gap-1 text-xs border-b border-gold/40"
          >
            <MapPin size={12} /> Map <ExternalLink size={10} />
          </a>
        </p>
      </motion.div>

      {/* Streamlined Table Booking Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="bg-panel border border-line p-8 sm:p-12 rounded-sm shadow-2xl relative"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-ink mb-2">
                <Calendar size={13} className="text-gold" /> Date
              </label>
              <input
                type="date"
                min={todayStr}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="w-full bg-bg text-ink border border-line p-3.5 text-sm rounded-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-ink mb-2">
                <Clock size={13} className="text-gold" /> Time Slot
              </label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-bg text-ink border border-line p-3.5 text-sm rounded-sm focus:outline-none focus:border-gold"
              >
                {timeSlots.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-ink mb-2">
                <Users size={13} className="text-gold" /> Number of Guests
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                className="w-full bg-bg text-ink border border-line p-3.5 text-sm rounded-sm focus:outline-none focus:border-gold"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((g) => (
                  <option key={g} value={g}>
                    {g} {g === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-ink mb-2">
                <Phone size={13} className="text-gold" /> Contact Phone
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="w-full bg-bg text-ink border border-line p-3.5 text-sm rounded-sm focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-ink mb-2">
              <User size={13} className="text-gold" /> Full Name
            </label>
            <input
              type="text"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full bg-bg text-ink border border-line p-3.5 text-sm rounded-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-ink mb-2">
              <FileText size={13} className="text-gold" /> Special Requests / Notes (optional)
            </label>
            <textarea
              rows={3}
              placeholder="Rooftop corner view, birthday celebration, dietary preferences..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full bg-bg text-ink border border-line p-3.5 text-sm rounded-sm focus:outline-none focus:border-gold resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status.type === 'submitting'}
            className="w-full bg-gold hover:bg-gold-light text-[#17120a] font-semibold uppercase tracking-[0.2em] text-xs py-4 px-6 rounded-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2 shadow-lg"
          >
            <Send size={15} />
            {status.type === 'submitting' ? 'Registering Booking...' : 'Request Table Booking'}
          </button>
        </form>

        {/* Status Message & Action Buttons */}
        {status.type !== 'idle' && (
          <div className="mt-8 pt-6 border-t border-line">
            {status.type === 'error' && (
              <div className="flex items-center gap-2 text-rose-400 text-xs">
                <AlertCircle size={16} />
                <span>{status.message}</span>
              </div>
            )}

            {status.type === 'success' && (
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-gold text-xs sm:text-sm leading-relaxed">
                  <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                  <span>{status.message}</span>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  {status.waLink && (
                    <a
                      href={status.waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-6 py-3 rounded-sm font-medium flex items-center gap-2 transition-colors shadow-md"
                    >
                      Send on WhatsApp
                    </a>
                  )}
                  {status.mailLink && (
                    <a
                      href={status.mailLink}
                      className="border border-line hover:border-gold text-ink hover:text-gold text-xs px-6 py-3 rounded-sm font-medium flex items-center gap-2 transition-colors"
                    >
                      Send by Email
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
