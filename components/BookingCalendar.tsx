
import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Clock, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { sendContactMessage } from '../utils/sendContactMessage';

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '02:00 PM', '04:30 PM'];

interface BookingCalendarProps {
  /** Called after a booking request is successfully sent. */
  onBooked?: () => void;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ onBooked }) => {
  // How many days forward the visible 5-day window starts (0 = starting
  // tomorrow). The Prev/Next buttons shift this by a week at a time.
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDateIdx, setSelectedDateIdx] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [contact, setContact] = useState({ name: '', email: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const dates = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + weekOffset * 7 + i + 1);
      return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        fullDate: d,
        // Sundays treated as unavailable — swap for real availability data
        // (e.g. pulled from a calendar API) whenever this stops being a
        // static mock.
        available: d.getDay() !== 0,
      };
    });
  }, [weekOffset]);

  const selectedDate = selectedDateIdx !== null ? dates[selectedDateIdx] : null;

  const canSubmit = selectedDate && selectedTime && contact.name.trim() && contact.email.trim();

  const handlePrevWeek = () => setWeekOffset((w) => Math.max(0, w - 1));
  const handleNextWeek = () => setWeekOffset((w) => w + 1);

  const handleSelectDate = (idx: number) => {
    setSelectedDateIdx(idx);
    setSelectedTime(null);
    setStatus('idle');
  };

  const handleSubmit = async () => {
    if (!canSubmit || !selectedDate || !selectedTime) return;
    setStatus('sending');
    const dateLabel = selectedDate.fullDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    const result = await sendContactMessage({
      name: contact.name,
      email: contact.email,
      message: `Requested a discovery call for ${dateLabel} at ${selectedTime} (UTC+6).`,
      subject: `New call booking request — ${dateLabel}`,
    });
    if (result.ok) {
      setStatus('success');
      onBooked?.();
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            <Calendar className="text-rose-500" size={24} />
            Schedule a Call
          </h2>
          <p className="text-neutral-400 text-sm mt-1">Book a 30-minute discovery chat.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevWeek}
            disabled={weekOffset === 0}
            aria-label="Previous week"
            className="p-2 border border-neutral-700 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={handleNextWeek}
            aria-label="Next week"
            className="p-2 border border-neutral-700 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-5 gap-2 md:gap-4 mb-8">
        {dates.map((d, i) => (
          <button
            key={i}
            type="button"
            disabled={!d.available}
            onClick={() => handleSelectDate(i)}
            className={`flex flex-col items-center justify-center py-4 rounded-xl border transition-all duration-300 ${
              !d.available
                ? 'opacity-30 border-neutral-800 cursor-not-allowed bg-neutral-900'
                : selectedDateIdx === i
                ? 'border-rose-500 bg-rose-500/10 text-white shadow-[0_0_15px_rgba(244,63,94,0.2)]'
                : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:border-neutral-600 hover:bg-neutral-900'
            }`}
          >
            <span className="text-[10px] text-neutral-500 mb-0.5">{d.month}</span>
            <span className="text-xs font-bold uppercase mb-1">{d.day}</span>
            <span className="text-xl font-black">{d.date}</span>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDateIdx !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-neutral-800 pt-6"
        >
          <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <Clock size={14} className="text-rose-500" />
            Available Times (UTC+6)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {TIME_SLOTS.map((time) => (
              <button
                type="button"
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-4 border rounded-lg text-sm text-center transition-colors focus:ring-1 focus:ring-rose-500 ${
                  selectedTime === time
                    ? 'border-rose-500 bg-rose-500/10 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-rose-500 hover:text-white'
                }`}
              >
                {time}
              </button>
            ))}
          </div>

          {selectedTime && status !== 'success' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  aria-label="Your name"
                  placeholder="Your name"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
                />
                <input
                  type="email"
                  aria-label="Your email"
                  placeholder="Your email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500 transition-all"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || status === 'sending'}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'idle' && (
                  <>
                    Request This Slot <Send size={16} />
                  </>
                )}
                {status === 'sending' && (
                  <>
                    <Sparkles className="animate-spin" size={16} /> Sending Request...
                  </>
                )}
                {status === 'error' && <>Couldn't send — try again</>}
              </button>
              {status === 'error' && (
                <p className="text-xs text-rose-400 text-center">
                  Something went wrong. You can also email {contact.email ? 'me' : 'directly'} instead.
                </p>
              )}
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3"
            >
              <CheckCircle2 size={18} />
              <span className="text-sm font-medium">
                Request sent — I'll confirm by email shortly.
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default BookingCalendar;
