import React, { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';

const App: React.FC = () => {
  const [text, setText] = useState('');
  const fullText = "Hi, I'm Eva, a virtual voice assistant.";

  useEffect(() => {
    let currentIndex = 0;

    // Initialize Speech Synthesis
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);

    // Typing effect
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Cleanup function
    return () => {
      clearInterval(typingInterval);
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center px-4">
        {/* Voice Assistant Icon */}
        <div className="mb-8 flex items-center justify-center">
          <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm">
            <Volume2 className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Speech Text Box */}
        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white min-h-[60px]">
            {text}
            <span className="animate-pulse">|</span>
          </h1>
        </div>

        {/* Get Started Button */}
        <button
          className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg 
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default App;
