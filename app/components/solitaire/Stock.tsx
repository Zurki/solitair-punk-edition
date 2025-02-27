import React from 'react';
import type { Pile } from './Card';

interface StockProps {
  stock: Pile;
  onDrawCard: () => void;
}

const Stock: React.FC<StockProps> = ({ stock, onDrawCard }) => {
  return (
    <div 
      className="w-24 h-36 bg-gradient-to-tr from-purple-800 to-purple-600 rounded-none border-4 border-black flex items-center justify-center cursor-pointer transform hover:translate-y-[-5px] transition-transform duration-200"
      onClick={onDrawCard}
      data-pile="stock"
    >
      {stock.length > 0 ? (
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 w-20 h-32 rounded-none flex items-center justify-center text-white font-bold border-4 border-black">
          {stock.length}
        </div>
      ) : (
        <div className="text-white font-bold transform -rotate-12">EMPTY</div>
      )}
    </div>
  );
};

export default Stock; 