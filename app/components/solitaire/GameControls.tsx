import React from 'react';

interface GameControlsProps {
  message: string;
  punkQuote: string;
  onResetGame: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  message,
  punkQuote,
  onResetGame
}) => {
  return (
    <div>
      <h1 className="font-['Sedgwick_Ave_Display'] text-5xl font-bold mb-6 text-center tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-green-400 transform -rotate-1 [text-shadow:3px_3px_0_#000]">
        PUNK SOLITAIRE
      </h1>
      
      {message && (
        <div className="bg-yellow-400 p-4 mb-6 rounded-none transform -rotate-1 border-4 border-dashed border-black">
          <p className="text-black font-bold text-center text-xl tracking-tight">{message}</p>
        </div>
      )}
      
      {!message && punkQuote && (
        <div className="bg-black p-3 mb-6 transform rotate-1">
          <p className="text-pink-500 font-bold text-center text-xl tracking-tight">{punkQuote}</p>
        </div>
      )}
      
      <div className="flex justify-between mb-8">
        <button
          onClick={onResetGame}
          className="bg-pink-600 text-white px-6 py-3 font-bold tracking-widest transform -rotate-1 hover:rotate-0 transition-transform duration-200 border-4 border-black hover:bg-green-400 hover:text-black"
        >
          NEW REBELLION
        </button>
        
        {/* Punk slogan */}
        <div className="text-white font-bold transform rotate-2 self-center">
          <span className="bg-black px-2 py-1 inline-block">CARDS AGAINST THE SYSTEM!</span>
        </div>
      </div>
    </div>
  );
};

export default GameControls; 