import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface IntroPreloaderProps {
  onComplete?: () => void;
}

export const IntroPreloader: React.FC<IntroPreloaderProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Exactly at 5.0 seconds: initiate the ultra-smooth curtain slide-up
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 5000);

    // After the fluid exit transition completes (6.2s total): unmount cleanly
    const doneTimer = setTimeout(() => {
      setIsDone(true);
      if (onComplete) onComplete();
    }, 6200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="intro-screen"
          initial={{ y: 0 }}
          animate={{ y: isExiting ? '-100%' : '0%' }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1], // Smooth luxury expo cubic-bezier curve
          }}
          className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center select-none overflow-hidden transform-gpu"
        >
          {/* Central Content Container with subtle exit drift */}
          <motion.div
            animate={{
              y: isExiting ? -50 : 0,
              opacity: isExiting ? 0 : 1,
            }}
            transition={{
              duration: 0.85,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="relative z-10 flex flex-col items-center text-center px-6 transform-gpu"
          >
            {/* Overflow-hidden mask for the upward text glide */}
            <div className="overflow-hidden pb-4 mb-2 flex flex-col items-center">
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 1.4,
                  delay: 0.8,
                  ease: [0.22, 1, 0.36, 1], // Silky smooth deceleration
                }}
                className="flex flex-col items-center transform-gpu"
              >
                {/* Circular BohoBar Logo with gentle scale & fade */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    delay: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="mb-4"
                >
                  <img
                    src="/assets/logo.png"
                    alt="BohoBar"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-gold/60"
                  />
                </motion.div>

                {/* BohoBar Brand Typography */}
                <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-[0.1em] text-ink leading-tight">
                  BohoBar
                </h1>

                {/* Subtitle with graceful letter-spacing drift */}
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.0,
                    delay: 1.35,
                    ease: 'easeOut',
                  }}
                  className="text-gold text-[11px] sm:text-xs uppercase tracking-[0.38em] font-medium mt-2"
                >
                  Lucknow • Rooftop Air Bar
                </motion.p>
              </motion.div>
            </div>

            {/* The Animated Line: Uses hardware-accelerated scaleX for zero-stutter 60fps rendering */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0, y: 70 }}
              animate={{ scaleX: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1.3,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1], // Smooth rising spring ease
              }}
              className="w-[260px] sm:w-[320px] origin-center h-[2px] bg-gradient-to-r from-transparent via-[#c8a45a] to-transparent mt-2 transform-gpu"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
