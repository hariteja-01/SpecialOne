import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface FlirtyQuizProps {
  onComplete: (score: number) => void;
}

const FlirtyQuiz = ({ onComplete }: FlirtyQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions: QuizQuestion[] = [
    {
      question: "Where did we first meet?",
      options: ["SDMA", "In your dreams", "Park", "Previous Life"],
      correct: 0
    },
    {
      question: "What's Hari's favorite thing about Mansi?",
      options: ["Her magical eyes ✨", "Her laugh that heals everything", "Her hugs — better than therapy", "Literally everything"],
      correct: 3
    },
    {
      question: "How much do you love Hari?",
      options: ["To the moon and never back 🌙", "As much as he loves pizza 🍕", "More than yesterday, less than tomorrow", "Infinitely, endlessly, stupidly"],
      correct: 3
    },
    {
      question: "What would be the perfect date with Hari?",
      options: ["Candlelit dinner under the stars 🌌", "Movie night in cuddles and chaos 🍿", "Paris but only if he packs", "Honestly, every moment is perfect"],
      correct: 3
    },
    {
      question: "What makes us the best couple?",
      options: ["We complete each other's memes", "We make storms feel like sunsets", "Our love is louder than doubts", "We argue over food — then share it anyway"],
      correct: 2
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    let newScore = score;
    if (answerIndex === questions[currentQuestion].correct) {
      newScore += 1;
      setScore(newScore);
    }
    
    setShowFeedback(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setShowScore(true);
        setTimeout(() => {
          onComplete(newScore);
        }, 3000);
      }
    }, 2000);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showScore) {
    return (
      <section className="min-h-screen romantic-bg relative flex items-center justify-center">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={200}
          recycle={false}
        />
        
        <motion.div 
          className="text-center z-10 px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
            <motion.h2 
              className="font-dancing text-5xl md:text-6xl text-deep-purple mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Perfect Score! 🎉
            </motion.h2>
            <motion.div 
              className="text-8xl mb-6"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {score}/5
            </motion.div>
            <p className="font-sans text-xl text-deep-purple mb-8">
              You know our love story by heart! 💕
            </p>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎁✨💖✨🎁
            </motion.div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen romantic-bg relative">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-dancing text-5xl md:text-7xl text-deep-purple mb-4">
            Flirty Quiz Time 💘
          </h1>
          <div className="bg-white/80 rounded-full px-6 py-2 inline-block">
            <span className="font-sans text-deep-purple font-semibold">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
        </motion.div>
        
        {/* Progress Bar */}
        <motion.div 
          className="bg-white/50 rounded-full h-4 mb-8 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="bg-gradient-to-r from-rose-gold to-blush h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          {!showFeedback ? (
            <motion.div 
              key={currentQuestion}
              className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-dancing text-3xl md:text-4xl text-deep-purple mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className={`quiz-option w-full p-6 bg-gradient-to-r from-lavender to-cream rounded-2xl text-left font-sans text-lg text-deep-purple border-2 border-transparent hover:border-rose-gold transition-all duration-300 ${
                      selectedAnswer === index ? 'selected' : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    whileHover={{ scale: selectedAnswer === null ? 1.02 : 1, y: selectedAnswer === null ? -2 : 0 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="font-bold text-rose-gold mr-4">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
              >
                <div className="text-6xl mb-4">
                  {selectedAnswer === questions[currentQuestion].correct ? "💖" : "💕"}
                </div>
                <p className="font-dancing text-3xl text-rose-gold">
                  {selectedAnswer === questions[currentQuestion].correct 
                    ? "Correct! You know us so well!" 
                    : "Aww, that's sweet too! 💕"}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FlirtyQuiz;
