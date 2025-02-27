import React, { useState, useEffect } from 'react';
import { useSolitaireGame } from '../../hooks/useSolitaireGame';
import GameBoard from './GameBoard';

const PunkSolitaire: React.FC = () => {
  const {
    gameState,
    message,
    punkQuote,
    dragPosition,
    dragOffset,
    getDraggingCards,
    drawCard,
    handleCardClick,
    handleDragStart,
    resetGame,
    lastMoveValid
  } = useSolitaireGame();

  // Track invalid move state with animation timing
  const [showInvalidMove, setShowInvalidMove] = useState(false);

  // Handle invalid move animation
  useEffect(() => {
    if (!lastMoveValid) {
      setShowInvalidMove(true);
      const timer = setTimeout(() => {
        setShowInvalidMove(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastMoveValid]);

  // Show start screen initially
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Add body styles for fullscreen
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.body.style.width = '100vw';
    document.body.style.height = '100vh';
    
    const html = document.documentElement;
    html.style.margin = '0';
    html.style.padding = '0';
    html.style.overflow = 'hidden';
    html.style.width = '100vw';
    html.style.height = '100vh';
    
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.style.height = '';
      html.style.margin = '';
      html.style.padding = '';
      html.style.overflow = '';
      html.style.width = '';
      html.style.height = '';
    };
  }, []);

  if (showStartScreen) {
    return (
      <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-full max-w-lg p-6 relative">
          {/* Punk decorative elements */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-600 rotate-12 opacity-30 rounded-lg"></div>
          <div className="absolute top-40 -right-10 w-40 h-40 bg-green-400 -rotate-12 opacity-30 rounded-lg"></div>
          
          {/* Title */}
          <h1 className="font-['Sedgwick_Ave_Display'] text-7xl text-center font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-green-400 transform -rotate-1 relative mb-10">
            PUNK SOLITAIRE
            <span className="absolute -top-4 -right-4 text-xs bg-black px-2 py-1 text-pink-500 transform rotate-12 opacity-80">EST. NEVER</span>
          </h1>
          
          {/* Anarchy symbol */}
          <div className="absolute top-1/4 right-10 text-8xl text-pink-600 opacity-40 transform rotate-12">Ⓐ</div>
          
          {/* Description */}
          <div className="bg-black p-4 border-4 border-pink-500 text-white mb-10 transform rotate-1">
            <p className="font-bold mb-3 text-xl">RULES OF DISORDER:</p>
            <ul className="list-disc pl-5 space-y-2 text-green-400 font-mono">
              <li>Stack cards in descending order (K to A)</li>
              <li>Alternate colors (red/black)</li>
              <li>Build foundations by suit in ascending order (A to K)</li>
              <li>Break all other rules - this is PUNK SOLITAIRE!</li>
            </ul>
          </div>
          
          {/* Start button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowStartScreen(false)}
              className="bg-pink-600 text-white px-10 py-4 font-bold text-2xl tracking-widest transform rotate-1 hover:rotate-0 transition-transform duration-200 border-4 border-black hover:bg-green-400 hover:text-black relative"
            >
              <span className="relative z-10">START REBELLION</span>
            </button>
          </div>
          
          {/* Decorative tape */}
          <div className="absolute -bottom-6 left-1/4 right-1/4 h-3 bg-yellow-400 opacity-40"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 w-screen h-screen bg-gray-900 overflow-hidden">
      {/* Background static noise */}
      <div 
        className="absolute inset-0 w-full h-full opacity-15"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 250 250\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      ></div>
      
      <GameBoard
        gameState={gameState}
        message={message}
        punkQuote={punkQuote}
        dragPosition={dragPosition}
        dragOffset={dragOffset}
        getDraggingCards={getDraggingCards}
        onDrawCard={drawCard}
        onCardClick={handleCardClick}
        onCardDragStart={handleDragStart}
        onResetGame={resetGame}
        invalidMove={showInvalidMove}
      />
    </div>
  );
};

export default PunkSolitaire; 