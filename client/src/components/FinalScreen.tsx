import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

interface FinalScreenProps {
  score: number;
  onReplay: () => void;
  onNext?: () => void;
}

const FinalScreen = ({ score, onReplay }: FinalScreenProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const sitWithMusic = () => {
    // Just keep the music playing and show a peaceful state
    setShowConfetti(false);
  };

  const exitWebsite = () => {
    // Show goodbye message and close tab
    const goodbye = window.confirm("You are leaving this website, not my love! 💕\n\nAre you sure you want to close this magical experience?");
    if (goodbye) {
      // Try to close the tab/window
      window.close();
      // If that doesn't work (modern browsers often prevent this), show message
      setTimeout(() => {
        alert("You can close this tab manually. Remember, you're never leaving my heart! ❤️");
      }, 100);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fireworkVariants = {
    hidden: { scale: 0, rotate: 0 },
    visible: {
      scale: [0, 1.5, 1],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center romantic-bg relative">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          numberOfPieces={300}
          recycle={true}
          colors={['#E8B4CB', '#FFB6C1', '#8B5A8B', '#E6E6FA', '#FFD700']}
        />
      )}

      {/* Fireworks Animation */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            style={{
              left: `${20 + (i % 4) * 20}%`,
              top: `${20 + Math.floor(i / 4) * 60}%`,
            }}
            variants={fireworkVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: i * 0.5 }}
          >
            🎆
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="text-center z-10 px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="font-dancing text-6xl md:text-8xl text-deep-purple mb-8"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Thank You! 🎉
          </motion.h1>
        </motion.div>
        
        <motion.div 
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
          variants={itemVariants}
        >
          <motion.div 
            className="text-8xl mb-8"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💖
          </motion.div>
          
          <motion.p 
            className="font-sans text-2xl md:text-3xl text-deep-purple mb-6"
            variants={itemVariants}
          >
            Thanks for sharing this moment with me, Mansi
          </motion.p>
          
          <motion.p 
            className="font-dancing text-3xl md:text-4xl text-rose-gold mb-8"
            variants={itemVariants}
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            I love you more every day.
          </motion.p>
          
          <motion.p 
            className="font-sans text-xl text-deep-purple mb-12"
            variants={itemVariants}
          >
            – Hari
          </motion.p>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <motion.button 
              className="bg-gradient-to-r from-rose-gold to-blush text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={onReplay}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              💕 Repeat My Love Again
            </motion.button>
            
            <motion.button 
              className="bg-gradient-to-r from-lavender to-deep-purple text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={exitWebsite}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              🚪 Exit (Leave Website)
            </motion.button>
          </motion.div>
          {/* Next button for final choice */}
          {onNext && (
            <motion.div className="mt-8" variants={itemVariants}>
              <motion.button
                className="bg-gradient-to-r from-rose-gold to-lavender text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={onNext}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                👉 Next: Make Your Choice
              </motion.button>
            </motion.div>
          )}
          
          <motion.div 
            className="mt-4"
            variants={itemVariants}
          >
            <motion.button 
              className="bg-gradient-to-r from-cream to-lavender text-deep-purple px-6 py-3 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300"
              onClick={sitWithMusic}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              🎵 Just sit with the music...
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="mt-8 p-6 bg-gradient-to-br from-cream to-lavender rounded-2xl"
            variants={itemVariants}
            animate={{ 
              boxShadow: [
                "0 5px 15px rgba(232, 180, 203, 0.2)",
                "0 10px 25px rgba(232, 180, 203, 0.4)",
                "0 5px 15px rgba(232, 180, 203, 0.2)"
              ]
            }}
            transition={{ 
              boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <p className="font-dancing text-2xl text-deep-purple">
              This moment will live forever in my heart 💕
            </p>
          </motion.div>

          {/* Quiz Score Display */}
          <motion.div 
            className="mt-6 text-center"
            variants={itemVariants}
          >
            <p className="font-sans text-lg text-deep-purple">
              Quiz Score: <span className="font-bold text-rose-gold">{score}/5</span> 
              {score === 5 && " - Perfect! 🌟"}
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalScreen;
