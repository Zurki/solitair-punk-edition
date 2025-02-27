import React from 'react';

// Card types
export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
export type Card = {
  id: string;
  suit: Suit;
  rank: Rank;
  color: "red" | "black";
  faceUp: boolean;
};

export type Pile = Card[];

interface CardProps {
  card: Card;
  onClick?: () => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  isDragging?: boolean;
}

// Helper function to get suit symbol
export function getSuitSymbol(suit: Suit): string {
  const symbols: Record<Suit, string> = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠"
  };
  return symbols[suit];
}

// Helper functions for card logic
export const isRed = (suit: Suit): boolean => suit === "hearts" || suit === "diamonds";

export const isOppositeColor = (suit1: Suit, suit2: Suit): boolean => {
  return isRed(suit1) !== isRed(suit2);
};

export const getRankValue = (rank: Rank): number => {
  const values: Record<Rank, number> = {
    "A": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7,
    "8": 8, "9": 9, "10": 10, "J": 11, "Q": 12, "K": 13
  };
  return values[rank];
};

// Component to display a card
const Card: React.FC<CardProps> = ({ card, onClick, onMouseDown, isSelected, isDragging }) => {
  const suitSymbols: Record<Suit, string> = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠"
  };

  const cardIsRed = isRed(card.suit);
  
  // Add random rotation for punk effect
  const randomRotation = Math.random() * 6 - 3;
  
  return (
    <div 
      className={`w-full h-full flex flex-col items-center justify-center pt-1 relative ${isDragging ? "opacity-30" : ""}`}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {/* Distressed background effect */}
      <div className="absolute inset-0 bg-black opacity-10 mix-blend-overlay" 
           style={{
             clipPath: "polygon(0% 0%, 100% 0%, 95% 15%, 85% 5%, 70% 20%, 60% 10%, 50% 30%, 40% 15%, 30% 25%, 20% 5%, 10% 15%, 0% 5%)"
           }}></div>
      
      <div className={`text-3xl font-bold ${cardIsRed ? "text-pink-500" : "text-green-400"} transform -rotate-3 tracking-tighter mb-0`}
           style={{ textShadow: "1px 1px 0 #000" }}>
        {card.rank}
      </div>
      
      <div className={`text-4xl ${cardIsRed ? "text-pink-500" : "text-green-400"} transform rotate-3`}
           style={{ 
             textShadow: "1px 1px 0 #000",
             transform: `rotate(${randomRotation}deg)` 
           }}>
        {suitSymbols[card.suit]}
      </div>
      
      {/* Punk decorative elements on cards */}
      {card.suit === "hearts" && (
        <div className="absolute bottom-1 right-1 text-xs text-pink-400 opacity-70">REBEL</div>
      )}
      {card.suit === "diamonds" && (
        <div className="absolute bottom-1 right-1 text-xs text-pink-400 opacity-70">PUNK</div>
      )}
      {card.suit === "clubs" && (
        <div className="absolute bottom-1 right-1 text-xs text-green-400 opacity-70">CHAOS</div>
      )}
      {card.suit === "spades" && (
        <div className="absolute bottom-1 right-1 text-xs text-green-400 opacity-70">ANARCHY</div>
      )}
      
      {/* Card corner decoration */}
      <div className="absolute top-1 left-1 w-3 h-3 border border-gray-500 transform rotate-45 opacity-50"></div>
    </div>
  );
};

export default Card; 