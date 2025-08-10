import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountdownScreenProps {
  onComplete: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownScreen = ({ onComplete }: CountdownScreenProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Target: August 12, 2025 at 12:00 AM IST (Midnight)
    const targetDate = new Date("2025-08-12T00:00:00+05:30");

    const updateCountdown = () => {
      // Get current time in IST
      const now = new Date();
      const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
      const utc = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
      const istTime = new Date(utc + istOffset);
      
      const diff = targetDate.getTime() - istTime.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsComplete(true);
        setTimeout(onComplete, 2000);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center romantic-bg relative">
      <motion.div 
        className="text-center z-10 px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="font-dancing text-6xl md:text-8xl text-deep-purple mb-8 animate-pulse-slow">
            {isComplete ? "It's Time! 🎉" : "Counting Down..."}
          </h1>
          <p className="font-sans text-xl md:text-2xl text-gray-700 mb-12">
            {isComplete ? "Mansi's Special Day Has Arrived! ✨" : "Until Mansi's Special Day ✨"}
          </p>
        </motion.div>
        
        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <motion.div 
                className="bg-gradient-to-br from-rose-gold to-blush rounded-2xl p-6 shadow-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
              </motion.div>
              <p className="font-sans text-deep-purple font-semibold text-lg">Days</p>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="bg-gradient-to-br from-blush to-lavender rounded-2xl p-6 shadow-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
              </motion.div>
              <p className="font-sans text-deep-purple font-semibold text-lg">Hours</p>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="bg-gradient-to-br from-lavender to-deep-purple rounded-2xl p-6 shadow-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
              </motion.div>
              <p className="font-sans text-deep-purple font-semibold text-lg">Minutes</p>
            </div>
            
            <div className="text-center">
              <motion.div 
                className="bg-gradient-to-br from-deep-purple to-rose-gold rounded-2xl p-6 shadow-lg mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl md:text-6xl font-bold text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
              </motion.div>
              <p className="font-sans text-deep-purple font-semibold text-lg">Seconds</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="font-dancing text-2xl md:text-3xl text-deep-purple">
              August 12, 2025 at Midnight 🌙
            </p>
            <p className="font-sans text-gray-600 mt-2">IST</p>
          </div>
        </motion.div>
        
        {isComplete && (
          <motion.button 
            className="mt-8 bg-gradient-to-r from-rose-gold to-blush text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulseGlow"
            onClick={onComplete}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            🎉 It's Time! Start the Magic
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};

export default CountdownScreen;
