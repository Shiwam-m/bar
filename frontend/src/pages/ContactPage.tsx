import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { createReservation } from '../services/api';

export const ContactPage: React.FC = () => {
  const WHATSAPP_NUMBER = '917800000000';
  const EMAIL_ADDRESS = 'reservations@moleculeairbar.com';

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
        message: 'Please provide your name and contact phone number.',
      });
      return;
    }

    setStatus({ type: 'submitting' });

    const bookingText = `Table booking request\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}${
      formData.notes ? `\nNotes: ${formData.notes}` : ''
    }`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(bookingText)}`;
    const mailUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
      'Table booking request'
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
        message: 'Your reservation request has been registered in our system! You can also send it directly via WhatsApp or Email:',
        waLink: waUrl,
        mailLink: mailUrl,
      });
    } catch (err: any) {
      console.warn('Backend reservation notice:', err);
      // Graceful fallback: Still allow WhatsApp & Email dispatch
      setStatus({
        type: 'success',
        message: 'Ready to send! Tap below to confirm your request directly with our reservations team:',
        waLink: waUrl,
        mailLink: mailUrl,
      });
    }
  };

  return (
    <div className="min-h-screen pt-[140px] pb-24 px-[5vw] max-w-[1100px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-ink mb-2">
          Contact & Bookings
        </h1>
        <p className="text-soft text-sm sm:text-base">
          Reserve your rooftop table or reach out to our team at Riverside Mall, Gomti Nagar.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Info Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-panel border border-line p-6 rounded-sm shadow-md">
            <h3 className="font-serif text-2xl font-bold text-ink mb-4">
              Contact Us
            </h3>
            <div className="space-y-4 text-xs sm:text-sm text-soft">
              <div>
                <b className="text-ink block mb-0.5">Address</b>
                <span className="flex items-start gap-1.5">
                  <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
                  7th Floor, Riverside Mall, Vipin Khand, Gomti Nagar, Lucknow, UP – 226010
                </span>
              </div>
              <div>
                <b className="text-ink block mb-0.5">Hours</b>
                <span className="flex items-center gap-1.5">
                  <Clock size={15} className="text-gold shrink-0" />
                  Every day, 12:00 PM to 2:00 AM
                </span>
              </div>
              <div>
                <b className="text-ink block mb-0.5">Phone</b>
                <a href="tel:+917800000000" className="flex items-center gap-1.5 text-gold hover:text-ink transition-colors">
                  <Phone size={15} className="text-gold shrink-0" />
                  +91 78000 00000
                </a>
              </div>
              <div>
                <b className="text-ink block mb-0.5">Email</b>
                <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-1.5 text-gold hover:text-ink transition-colors">
                  <Mail size={15} className="text-gold shrink-0" />
                  {EMAIL_ADDRESS}
                </a>
              </div>
            </div>
          </div>

          {/* Location Box with stylized grid map and Google Maps CTA */}
          <div className="bg-panel border border-line p-6 rounded-sm shadow-md">
            <h3 className="font-serif text-2xl font-bold text-ink mb-3">
              Location
            </h3>
            <div className="relative h-36 my-3 border border-line rounded-sm bg-[#0f1012] bg-[linear-gradient(rgba(241,237,228,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(241,237,228,0.08)_1px,transparent_1px)] bg-[size:30px_30px] flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-gold opacity-40"></span>
                <MapPin size={32} className="text-gold relative z-10" />
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Molecule+Air+Bar+Lucknow"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center block bg-transparent hover:bg-gold text-ink hover:text-[#17120a] border border-gold px-4 py-2.5 text-xs uppercase tracking-wider font-semibold rounded-sm transition-all"
            >
              Open in Google Maps
            </a>
          </div>
        </div>

        {/* Booking Form (7 cols) */}
        <div id="book" className="lg:col-span-7 bg-panel border border-line p-6 sm:p-8 rounded-sm shadow-xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ink mb-1">
            Book a Table
          </h3>
          <p className="text-soft text-xs mb-6">
            Reservations are highly recommended on Friday and Saturday evenings.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Date
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full bg-bg text-ink border border-line p-2.5 text-sm rounded-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-bg text-ink border border-line p-2.5 text-sm rounded-sm focus:outline-none focus:border-gold"
                >
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Number of Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full bg-bg text-ink border border-line p-2.5 text-sm rounded-sm focus:outline-none focus:border-gold"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((g) => (
                    <option key={g} value={g}>
                      {g} {g === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-ink mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full bg-bg text-ink border border-line p-2.5 text-sm rounded-sm focus:outline-none focus:border-gold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full bg-bg text-ink border border-line p-2.5 text-sm rounded-sm focus:outline-none focus:border-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink mb-1">
                Special Requests / Notes (optional)
              </label>
              <textarea
                rows={2}
                placeholder="Rooftop corner view, birthday celebration, dietary preferences..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full bg-bg text-ink border border-line p-2.5 text-sm rounded-sm focus:outline-none focus:border-gold resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status.type === 'submitting'}
              className="w-full bg-gold hover:bg-gold-light text-[#17120a] font-semibold uppercase tracking-[0.18em] text-xs py-3.5 px-6 rounded-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2"
            >
              <Send size={14} />
              {status.type === 'submitting' ? 'Registering Booking...' : 'Request Booking'}
            </button>
          </form>

          {/* Status Message & Action Buttons */}
          {status.type !== 'idle' && (
            <div className="mt-6 pt-4 border-t border-line">
              {status.type === 'error' && (
                <div className="flex items-center gap-2 text-rose-400 text-xs">
                  <AlertCircle size={16} />
                  <span>{status.message}</span>
                </div>
              )}

              {status.type === 'success' && (
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-gold text-xs leading-relaxed">
                    <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                    <span>{status.message}</span>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    {status.waLink && (
                      <a
                        href={status.waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs px-4 py-2 rounded-sm font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare size={14} /> Send on WhatsApp
                      </a>
                    )}
                    {status.mailLink && (
                      <a
                        href={status.mailLink}
                        className="border border-line hover:border-gold text-ink hover:text-gold text-xs px-4 py-2 rounded-sm font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Mail size={14} /> Send by Email
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
