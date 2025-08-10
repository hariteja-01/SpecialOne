import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoveMessageProps {
  onNext: () => void;
}

const LoveMessage = ({ onNext }: LoveMessageProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const messageSteps = [
    "Mansi,",
    "You're the spark in my soul,",
    "the calm in my chaos,",
    "the reason I look forward to every tomorrow.",
    "Every heartbeat spells your name,",
    "and I wouldn't want it any other way.",
    "Happy Birthday, my love.",
    "Forever yours,",
    "Hari ❤️"
  ];

  useEffect(() => {
    if (currentStep < messageSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, currentStep === 0 ? 2000 : 3000);
      return () => clearTimeout(timer);
    } else {
      setShowHearts(true);
    }
  }, [currentStep, messageSteps.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.5
      }
    }
  };

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      width: 0,
      borderRight: "2px solid var(--rose-gold)"
    },
    visible: { 
      opacity: 1, 
      width: "auto",
      borderRight: "2px solid var(--rose-gold)",
      transition: { 
        duration: 2,
        ease: "easeInOut"
      }
    },
    complete: {
      borderRight: "none",
      transition: { delay: 0.5 }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center romantic-bg relative">
      {/* Animated Hearts Background */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {showHearts && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: [0, 1, 0],
              rotate: 360,
              y: [0, -50, -100]
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 5
            }}
          >
            {['💕', '💖', '💗', '💝', '💞'][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="text-center z-10 px-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="font-dancing text-6xl md:text-8xl text-deep-purple mb-8"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          A Message from My Heart 💌
        </motion.h1>
        
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div 
            className="font-sans text-lg md:text-xl text-deep-purple leading-relaxed mb-8 text-left max-w-2xl mx-auto min-h-[400px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {messageSteps.slice(0, currentStep + 1).map((line, index) => (
                <motion.div
                  key={index}
                  className={`mb-6 overflow-hidden whitespace-nowrap ${
                    index === 0 ? 'font-bold' : ''
                  } ${
                    index === messageSteps.length - 2 ? 'mt-8' : ''
                  } ${
                    index === messageSteps.length - 1 ? 'font-dancing text-2xl text-rose-gold text-center' : ''
                  }`}
                  variants={lineVariants}
                  initial="hidden"
                  animate={index === currentStep ? "visible" : "complete"}
                  style={{
                    whiteSpace: index === messageSteps.length - 1 ? 'normal' : 'nowrap'
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <AnimatePresence>
            {showHearts && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.div 
                  className="text-6xl mb-6"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💕
                </motion.div>
                <motion.p 
                  className="font-dancing text-3xl text-rose-gold mb-8"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  I love you more than words can say
                </motion.p>
                
                <motion.button 
                  className="bg-gradient-to-r from-rose-gold to-blush text-white px-10 py-4 rounded-full font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={onNext}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    boxShadow: [
                      "0 10px 25px rgba(232, 180, 203, 0.3)",
                      "0 15px 35px rgba(232, 180, 203, 0.5)",
                      "0 10px 25px rgba(232, 180, 203, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  🎇 One More Surprise!
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LoveMessage;
