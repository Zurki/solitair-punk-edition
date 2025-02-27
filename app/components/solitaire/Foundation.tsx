import React from 'react';
import type { Pile, Suit } from './Card';
import Card, { getSuitSymbol } from './Card';

interface FoundationProps {
  foundations: Record<Suit, Pile>;
  selectedPile: string | null;
  draggingPile: string | null;
  onCardClick: (suit: Suit, index: number) => void;
  onCardDragStart: (e: React.MouseEvent, suit: Suit, index: number) => void;
}

const Foundation: React.FC<FoundationProps> = ({
  foundations,
  selectedPile,
  draggingPile,
  onCardClick,
  onCardDragStart
}) => {
  return (
    <div className="col-span-4 flex space-x-4">
      {(["hearts", "diamonds", "clubs", "spades"] as Suit[]).map((suit, index) => (
        <div 
          key={suit}
          className={`w-24 h-36 bg-gradient-to-tr from-purple-800 to-purple-600 rounded-none border-4 border-black flex items-center justify-center transform ${index % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
          data-pile={`foundation-${suit}`}
          data-index={foundations[suit].length - 1}
        >
          {foundations[suit].length > 0 ? (
            <div 
              className={`card-container bg-black w-20 h-32 ${
                selectedPile === `foundation-${suit}` ? "border-green-400" : "border-white"
              } border-4 flex items-center justify-center cursor-grab active:cursor-grabbing transform hover:translate-y-[-5px] transition-transform duration-200 ${
                draggingPile === `foundation-${suit}` ? "opacity-30" : ""
              }`}
              onMouseDown={(e) => onCardDragStart(e, suit, foundations[suit].length - 1)}
              onClick={() => onCardClick(suit, foundations[suit].length - 1)}
            >
              <Card card={foundations[suit][foundations[suit].length - 1]} />
            </div>
          ) : (
            <div className="text-white font-bold text-2xl">{getSuitSymbol(suit)}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Foundation; 