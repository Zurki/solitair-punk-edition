import React from 'react';
import type { Pile } from './Card';
import Card from './Card';

interface TableauProps {
  tableaus: Pile[];
  selectedPile: string | null;
  draggingPile: string | null;
  onCardClick: (tableauIndex: number, cardIndex: number) => void;
  onCardDragStart: (e: React.MouseEvent, tableauIndex: number, cardIndex: number) => void;
}

const Tableau: React.FC<TableauProps> = ({
  tableaus,
  selectedPile,
  draggingPile,
  onCardClick,
  onCardDragStart
}) => {
  return (
    <div className="col-span-7 grid grid-cols-7 gap-4 relative z-10">
      {tableaus.map((tableau, tableauIndex) => (
        <div 
          key={tableauIndex} 
          className="min-h-48 relative"
          data-pile={`tableau-${tableauIndex}`}
          data-index={tableau.length}
        >
          {tableau.length > 0 ? (
            tableau.map((card, cardIndex) => (
              <div 
                key={card.id}
                data-pile={`tableau-${tableauIndex}`}
                data-index={cardIndex}
                className={`card-container absolute w-24 rounded-none ${
                  card.faceUp ? "cursor-grab active:cursor-grabbing bg-black" : "bg-gradient-to-r from-pink-600 to-purple-600" 
                } ${
                  selectedPile === `tableau-${tableauIndex}` && 
                  parseInt(selectedPile.split('-')[1]) === cardIndex ? "border-green-400" : "border-white"
                } border-4 transform hover:translate-x-1 hover:translate-y-[-2px] transition-transform duration-200 ${
                  draggingPile === `tableau-${tableauIndex}` && 
                  parseInt(draggingPile.split('-')[1]) <= cardIndex ? "opacity-30" : ""
                }`}
                style={{ 
                  top: `${cardIndex * 20}px`,
                  transform: `rotate(${Math.sin(tableauIndex + cardIndex) * 2}deg)`
                }}
                onClick={() => card.faceUp && onCardClick(tableauIndex, cardIndex)}
                onMouseDown={(e) => card.faceUp && onCardDragStart(e, tableauIndex, cardIndex)}
              >
                <div className="h-36 flex items-center justify-center">
                  {card.faceUp ? <Card card={card} /> : null}
                </div>
              </div>
            ))
          ) : (
            <div 
              className="w-24 h-36 bg-gradient-to-tr from-purple-800 to-purple-600 rounded-none border-4 border-black flex items-center justify-center transform -rotate-2"
              data-pile={`tableau-${tableauIndex}`}
              data-index="0"
            >
              <div className="text-white font-bold transform -rotate-12">EMPTY</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tableau; 