import React from "react";

interface FinalChoiceScreenProps {
  onChoose: (choice: "want" | "breakup") => void;
}

const FinalChoiceScreen: React.FC<FinalChoiceScreenProps> = ({ onChoose }) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-gold to-lavender">
      <h1 className="font-dancing text-5xl md:text-7xl text-deep-purple mb-8 text-center">
        So... what do you really want?
      </h1>
      <p className="font-sans text-xl md:text-2xl text-gray-700 mb-12 text-center">
        Choose honestly:
      </p>
      <div className="flex flex-col md:flex-row gap-8">
        <button
          className="bg-gradient-to-r from-rose-gold to-blush text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulseGlow"
          onClick={() => onChoose("want")}
        >
          You want me 💖
        </button>
        <button
          className="bg-gradient-to-r from-gray-400 to-gray-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={() => onChoose("breakup")}
        >
          You wanna break up with me? 💔
        </button>
      </div>
    </section>
  );
};

export default FinalChoiceScreen;
