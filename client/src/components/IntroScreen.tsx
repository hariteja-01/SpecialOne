import { motion } from 'framer-motion';

interface IntroScreenProps {
  onNext: () => void;
}

const IntroScreen = ({ onNext }: IntroScreenProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
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
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  const floatVariants = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center rose-bg relative">
      {/* Rose Animation Background */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center opacity-30"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <div className="w-96 h-96 bg-gradient-to-br from-transparent to-white/20 rounded-full animate-pulse-slow relative">
          {/* Petals */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-24 bg-gradient-to-t from-rose-gold to-pink-300 rounded-full"
              style={{
                top: '40%',
                left: '40%',
                transformOrigin: '50% 100%',
                transform: `rotate(${i * 45}deg)`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
            />
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        className="text-center z-10 px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="font-dancing text-7xl md:text-9xl text-white mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Happy Birthday
          </motion.h1>
          <motion.h2 
            className="font-dancing text-6xl md:text-8xl text-romantic-gold mb-8"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Mansi 🎉
          </motion.h2>
        </motion.div>
        
        <motion.div 
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl"
          variants={itemVariants}
        >
          <motion.p 
            className="font-sans text-2xl md:text-3xl text-deep-purple mb-8"
            variants={itemVariants}
          >
            From Hari with all my love 💕
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div 
              className="text-center"
              variants={floatVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="text-6xl mb-4">🌹</div>
              <p className="font-sans text-deep-purple">For your beauty</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
            >
              <div className="text-6xl mb-4">💖</div>
              <p className="font-sans text-deep-purple">For your heart</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              variants={floatVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 2 }}
            >
              <div className="text-6xl mb-4">✨</div>
              <p className="font-sans text-deep-purple">For your magic</p>
            </motion.div>
          </div>
          
          <motion.button 
            className="bg-gradient-to-r from-deep-purple to-rose-gold text-white px-10 py-4 rounded-full font-semibold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
            onClick={onNext}
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
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
          >
            💝 Begin Your Surprise
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IntroScreen;
