import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownScreen from "./components/CountdownScreen";
import IntroScreen from "./components/IntroScreen";
import FlirtyQuiz from "./components/FlirtyQuiz";
import GiftBoxReveal from "./components/GiftBoxReveal";
import LoveMessage from "./components/LoveMessage";
import FinalScreen from "./components/FinalScreen";
import HeartCursor from "./components/HeartCursor";
import FloatingHearts from "./components/FloatingHearts";
import RomanticMusic from "./components/RomanticMusic";

export type ScreenType = "countdown" | "intro" | "quiz" | "giftbox" | "lovemessage" | "final";

function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("countdown");
  const [quizScore, setQuizScore] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    // Start music on user interaction to comply with browser autoplay policies
    const startMusic = () => {
      setMusicPlaying(true);
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
    };

    document.addEventListener('click', startMusic);
    document.addEventListener('keydown', startMusic);

    return () => {
      document.removeEventListener('click', startMusic);
      document.removeEventListener('keydown', startMusic);
    };
  }, []);

  const goToNextScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const resetExperience = () => {
    setCurrentScreen("countdown");
    setQuizScore(0);
  };

  const screenVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <div className="min-h-screen">
      <HeartCursor />
      <FloatingHearts />
      <RomanticMusic isPlaying={musicPlaying} volume={0.4} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          variants={screenVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {currentScreen === "countdown" && (
            <CountdownScreen onComplete={() => goToNextScreen("intro")} />
          )}
          {currentScreen === "intro" && (
            <IntroScreen onNext={() => goToNextScreen("quiz")} />
          )}
          {currentScreen === "quiz" && (
            <FlirtyQuiz 
              onComplete={(score: number) => {
                setQuizScore(score);
                goToNextScreen("giftbox");
              }} 
            />
          )}
          {currentScreen === "giftbox" && (
            <GiftBoxReveal onNext={() => goToNextScreen("lovemessage")} />
          )}
          {currentScreen === "lovemessage" && (
            <LoveMessage onNext={() => goToNextScreen("final")} />
          )}
          {currentScreen === "final" && (
            <FinalScreen 
              score={quizScore}
              onReplay={resetExperience}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Background Music Control */}
      <div className="fixed bottom-4 right-4 z-50">
        <button 
          onClick={() => setMusicPlaying(!musicPlaying)}
          className="bg-rose-gold/80 backdrop-blur-sm text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          {musicPlaying ? "🔊" : "🔇"}
        </button>
      </div>
    </div>
  );
}

export default App;
