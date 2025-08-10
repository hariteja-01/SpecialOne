import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Gift {
  emoji: string;
  title: string;
  description: string;
}

interface GiftBoxRevealProps {
  onNext: () => void;
}

const GiftBoxReveal = ({ onNext }: GiftBoxRevealProps) => {
  const [giftRevealed, setGiftRevealed] = useState<Gift | null>(null);
  const [hasTriedAnother, setHasTriedAnother] = useState(false);

  const gifts: Gift[] = [
    { 
      emoji: "💍", 
      title: "A promise of forever", 
      description: "This isn't just a gift, it's a promise that our love will last through every sunrise and sunset." 
    },
    { 
      emoji: "💋", 
      title: "Unlimited kisses", 
      description: "Every kiss is a reminder that you're the most precious part of my life." 
    },
    { 
      emoji: "🧸", 
      title: "One cuddle per second forever", 
      description: "In your arms is where I find my peace, my home, my everything." 
    },
    { 
      emoji: "🎶", 
      title: "A playlist of our love", 
      description: "Every song tells our story, every beat matches my heart when I'm with you." 
    },
    { 
      emoji: "🪄", 
      title: "A date you'll never forget (just wait)", 
      description: "I'm planning something magical that will show you just how much you mean to me." 
    }
  ];

  const openGiftBox = () => {
    if (giftRevealed) return;
    
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];
    setGiftRevealed(randomGift);
  };

  const tryAnotherGift = () => {
    if (hasTriedAnother) return;
    
    const availableGifts = gifts.filter(gift => gift.title !== giftRevealed?.title);
    const randomGift = availableGifts[Math.floor(Math.random() * availableGifts.length)];
    setGiftRevealed(randomGift);
    setHasTriedAnother(true);
  };

  return (
    <section className="min-h-screen flex items-center justify-center romantic-bg relative">
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
          Your Gift Awaits! 🎁
        </motion.h1>
        
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {!giftRevealed ? (
              <motion.div 
                className="mb-8"
                key="giftbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="gift-box mx-auto w-64 h-64 bg-gradient-to-br from-romantic-gold to-rose-gold rounded-3xl shadow-2xl flex items-center justify-center text-8xl cursor-pointer relative overflow-hidden"
                  onClick={openGiftBox}
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 2,
                    boxShadow: "0 20px 40px rgba(232, 180, 203, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ 
                    y: [0, -10, 0],
                    boxShadow: [
                      "0 10px 25px rgba(232, 180, 203, 0.3)",
                      "0 15px 35px rgba(232, 180, 203, 0.5)",
                      "0 10px 25px rgba(232, 180, 203, 0.3)"
                    ]
                  }}
                  transition={{ 
                    y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🎁
                  </motion.div>
                  
                  {/* Sparkles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute text-2xl"
                      style={{
                        top: `${20 + (i % 3) * 30}%`,
                        left: `${10 + (i % 2) * 80}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
                
                <motion.p 
                  className="font-sans text-xl text-deep-purple mb-6"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Click the gift box to reveal your surprise! ✨
                </motion.p>
              </motion.div>
            ) : (
              <motion.div 
                key="reveal"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-rose-gold to-blush rounded-2xl p-8 mb-6"
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div 
                    className="text-6xl mb-4"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: 3 }}
                  >
                    {giftRevealed.emoji}
                  </motion.div>
                  <h3 className="font-dancing text-3xl md:text-4xl text-white mb-4">
                    {giftRevealed.title}
                  </h3>
                  <p className="font-sans text-white/90">
                    {giftRevealed.description}
                  </p>
                </motion.div>
                
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  {!hasTriedAnother && (
                    <motion.button 
                      className="bg-gradient-to-r from-lavender to-deep-purple text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={tryAnotherGift}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      ✨ Try Another Gift
                    </motion.button>
                  )}
                  <br />
                  <motion.button 
                    className="bg-gradient-to-r from-deep-purple to-rose-gold text-white px-10 py-4 rounded-full font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={onNext}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      boxShadow: [
                        "0 10px 25px rgba(139, 90, 139, 0.3)",
                        "0 15px 35px rgba(139, 90, 139, 0.5)",
                        "0 10px 25px rgba(139, 90, 139, 0.3)"
                      ]
                    }}
                    transition={{
                      boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    💌 Continue to Love Message
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default GiftBoxReveal;
