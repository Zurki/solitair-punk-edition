import React from 'react';
import type { GameState } from '../../hooks/useSolitaireGame';
import Stock from './Stock';
import Waste from './Waste';
import Foundation from './Foundation';
import Tableau from './Tableau';
import GameControls from './GameControls';
import type { Suit } from './Card';
import Card from './Card';

interface GameBoardProps {
  gameState: GameState;
  message: string;
  punkQuote: string;
  dragPosition: { x: number, y: number } | null;
  dragOffset: { x: number, y: number } | null;
  getDraggingCards: () => any[];
  onDrawCard: () => void;
  onCardClick: (pile: string, index: number) => void;
  onCardDragStart: (e: React.MouseEvent, pile: string, index: number) => void;
  onResetGame: () => void;
  invalidMove: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  message,
  punkQuote,
  dragPosition,
  dragOffset,
  getDraggingCards,
  onDrawCard,
  onCardClick,
  onCardDragStart,
  onResetGame,
  invalidMove
}) => {
  // Handle foundation card click
  const handleFoundationCardClick = (suit: Suit, index: number) => {
    onCardClick(`foundation-${suit}`, index);
  };

  // Handle foundation card drag
  const handleFoundationDragStart = (e: React.MouseEvent, suit: Suit, index: number) => {
    onCardDragStart(e, `foundation-${suit}`, index);
  };

  // Handle tableau card click
  const handleTableauCardClick = (tableauIndex: number, cardIndex: number) => {
    onCardClick(`tableau-${tableauIndex}`, cardIndex);
  };

  // Handle tableau card drag
  const handleTableauDragStart = (e: React.MouseEvent, tableauIndex: number, cardIndex: number) => {
    onCardDragStart(e, `tableau-${tableauIndex}`, cardIndex);
  };

  return (
    <div className={`w-full h-full relative overflow-hidden ${invalidMove ? 'invalid-move-flash' : ''}`}>
      {/* Punk decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-600 rotate-12 opacity-30 rounded-lg"></div>
      <div className="absolute top-20 -right-10 w-40 h-40 bg-green-400 -rotate-12 opacity-30 rounded-lg"></div>
      <div className="absolute bottom-20 -left-10 w-40 h-40 bg-purple-500 rotate-45 opacity-30 rounded-lg"></div>
      
      {/* Anarchy symbol */}
      <div className="absolute top-10 right-10 text-6xl text-pink-600 opacity-40 transform rotate-12">Ⓐ</div>
      <div className="absolute bottom-10 left-10 text-6xl text-green-400 opacity-40 transform -rotate-12">Ⓐ</div>
      
      {/* Safety pin decoration */}
      <div className="absolute top-20 left-20 w-16 h-4 border-2 border-gray-300 rounded-full opacity-40 transform rotate-45"></div>
      <div className="absolute bottom-20 right-20 w-16 h-4 border-2 border-gray-300 rounded-full opacity-40 transform -rotate-45"></div>
      
      {/* Checkerboard pattern */}
      <div className="absolute inset-0 bg-[repeating-conic-gradient(#000_0deg_90deg,#222_90deg_180deg,#000_180deg_270deg,#222_270deg_360deg)] bg-[length:40px_40px] opacity-30 mix-blend-overlay"></div>
      
      {/* Punk splatters */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-pink-500 rounded-full filter blur-xl opacity-20"></div>
      <div className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-green-400 rounded-full filter blur-xl opacity-20"></div>
      <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-purple-400 rounded-full filter blur-xl opacity-20"></div>
      
      {/* Invalid move banner */}
      {invalidMove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-pink-600 text-white px-8 py-4 transform rotate-3 border-4 border-black text-3xl font-bold tracking-wider animate-pulse">
            INVALID MOVE!
          </div>
        </div>
      )}
      
      <div className="relative w-full h-full flex flex-col p-4">
        <GameControls 
          message={message}
          punkQuote={punkQuote}
          onResetGame={onResetGame}
        />
        
        <div className="flex-grow grid grid-cols-7 gap-2 sm:gap-3 md:gap-5 mt-2 mb-4">
          {/* Stock and Waste piles */}
          <div className="col-span-2 flex space-x-2 sm:space-x-4">
            <Stock stock={gameState.stock} onDrawCard={onDrawCard} />
            
            <Waste 
              waste={gameState.waste} 
              isSelected={gameState.selectedCard?.pile === "waste"}
              isDragging={gameState.draggingCard?.pile === "waste"}
              onCardClick={() => onCardClick("waste", gameState.waste.length - 1)}
              onCardDragStart={(e) => onCardDragStart(e, "waste", gameState.waste.length - 1)}
            />
          </div>
          
          {/* Foundation piles */}
          <Foundation 
            foundations={gameState.foundations}
            selectedPile={gameState.selectedCard?.pile || null}
            draggingPile={gameState.draggingCard?.pile || null}
            onCardClick={handleFoundationCardClick}
            onCardDragStart={handleFoundationDragStart}
          />
          
          {/* Tableau piles */}
          <Tableau 
            tableaus={gameState.tableaus}
            selectedPile={gameState.selectedCard?.pile || null}
            draggingPile={gameState.draggingCard?.pile || null}
            onCardClick={handleTableauCardClick}
            onCardDragStart={handleTableauDragStart}
          />
        </div>
        
        {/* Dragging Instructions */}
        <div className="absolute bottom-0 right-0 bg-black p-2 text-pink-500 text-xs transform rotate-3 border-t-2 border-l-2 border-green-400">
          DRAG CARDS TO BREAK THE SYSTEM!
        </div>
      </div>
      
      {/* Ghost card for dragging */}
      {gameState.draggingCard && dragPosition && dragOffset && (
        <div 
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${dragPosition.x - dragOffset.x}px`,
            top: `${dragPosition.y - dragOffset.y}px`,
            width: '96px', // Same as card width (w-24)
            height: '144px', // Same as card height (h-36)
          }}
        >
          {getDraggingCards().map((card, idx) => (
            <div 
              key={card.id}
              className="absolute bg-black rounded-none border-4 border-green-400"
              style={{ 
                width: '96px',
                height: '144px',
                top: `${idx * 10}px`, 
                left: `${idx * 3}px`,
                boxShadow: '0 0 15px rgba(77, 255, 136, 0.5)'
              }}
            >
              <div className="w-full h-full">
                <Card card={card} />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* CSS for animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes invalidMoveFlash {
          0%, 100% { background-color: transparent; }
          50% { background-color: rgba(219, 39, 119, 0.3); }
        }
        
        .invalid-move-flash {
          animation: invalidMoveFlash 0.5s ease-in-out;
        }
        
        .card-container {
          will-change: transform;
        }
      `}} />
    </div>
  );
};

export default GameBoard; 