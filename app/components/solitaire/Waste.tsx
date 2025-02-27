import React from 'react';
import type { Pile } from './Card';
import Card from './Card';

interface WasteProps {
  waste: Pile;
  isSelected: boolean;
  isDragging: boolean;
  onCardClick: () => void;
  onCardDragStart: (e: React.MouseEvent) => void;
}

const Waste: React.FC<WasteProps> = ({ 
  waste,
  isSelected,
  isDragging,
  onCardClick,
  onCardDragStart
}) => {
  return (
    <div 
      className="w-24 h-36 bg-gradient-to-tr from-purple-800 to-purple-600 rounded-none border-4 border-black flex items-center justify-center transform rotate-1"
      data-pile="waste"
      data-index={waste.length - 1}
    >
      {waste.length > 0 ? (
        <div 
          className={`card-container bg-black w-20 h-32 border-4 ${
            isSelected ? "border-green-400" : "border-white"
          } flex items-center justify-center cursor-grab active:cursor-grabbing transform hover:translate-y-[-5px] transition-transform duration-200 ${
            isDragging ? "opacity-30" : ""
          }`}
          onMouseDown={onCardDragStart}
          onClick={onCardClick}
        >
          <Card card={waste[waste.length - 1]} />
        </div>
      ) : (
        <div className="text-white font-bold transform -rotate-12">EMPTY</div>
      )}
    </div>
  );
};

export default Waste; 