import { useState, useEffect, useRef, useCallback } from "react";
import type { Card, Pile, Suit, Rank } from "../components/solitaire/Card";
import { isOppositeColor, getRankValue } from "../components/solitaire/Card";

// Game state interface
export interface GameState {
  stock: Card[];
  waste: Card[];
  foundations: Record<Suit, Pile>;
  tableaus: Card[][];
  selectedCard: { pile: string; index: number } | null;
  draggingCard: { pile: string; index: number } | null;
}

// Create a deck of cards
const createDeck = () => {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
  const ranks: Rank[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck: Card[] = [];

  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({
        id: `${rank}-${suit}`,
        suit,
        rank,
        color: (suit === "hearts" || suit === "diamonds") ? "red" : "black",
        faceUp: false
      });
    }
  }

  return deck;
};

// Shuffle the deck using Fisher-Yates algorithm
const shuffleDeck = (deck: Card[]) => {
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

// Initialize the game
const initializeGame = (): GameState => {
  const deck = shuffleDeck(createDeck());
  const tableaus: Card[][] = Array(7).fill(0).map(() => []);
  let stockPile = [...deck];

  // Deal cards to tableaus
  for (let i = 0; i < 7; i++) {
    for (let j = i; j < 7; j++) {
      const card = stockPile.pop();
      if (card) {
        if (j === i) {
          card.faceUp = true;
        }
        tableaus[j].push(card);
      }
    }
  }

  return {
    stock: stockPile,
    waste: [],
    foundations: {
      hearts: [],
      diamonds: [],
      clubs: [],
      spades: []
    },
    tableaus,
    selectedCard: null,
    draggingCard: null
  };
};

// Punk quotes to display
const punkQuotes = [
  "CARD THE SYSTEM!",
  "SOLITAIRE IS NOT DEAD!",
  "DIY OR DIE!",
  "NO KINGS, NO MASTERS!",
  "SHUFFLE AND DESTROY!",
  "BREAK THE RULES!",
  "ROYAL FLUSH THE SYSTEM!",
  "ACE OF REBELLION!",
  "CARDS AGAINST THE MACHINE!",
  "DEAL WITH IT!"
];

// Sound effects
let cardMoveSound: HTMLAudioElement;
let invalidMoveSound: HTMLAudioElement;
let victorySound: HTMLAudioElement;

if (typeof window !== "undefined") {
  cardMoveSound = new Audio("/sounds/card-move.mp3");
  invalidMoveSound = new Audio("/sounds/invalid-move.mp3");
  victorySound = new Audio("/sounds/victory.mp3");
}

export function useSolitaireGame() {
  const [gameState, setGameState] = useState<GameState>(initializeGame);
  const [message, setMessage] = useState("");
  const [punkQuote, setPunkQuote] = useState(punkQuotes[Math.floor(Math.random() * punkQuotes.length)]);
  const [dragOffset, setDragOffset] = useState<{ x: number, y: number } | null>(null);
  const [dragPosition, setDragPosition] = useState<{ x: number, y: number } | null>(null);
  const ghostCardRef = useRef<HTMLDivElement>(null);
  const [lastMoveValid, setLastMoveValid] = useState<boolean>(true);

  // Update punk quote every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!message) {
        setPunkQuote(punkQuotes[Math.floor(Math.random() * punkQuotes.length)]);
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [message]);

  // Clear message after delay
  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  // Check for win condition
  useEffect(() => {
    const foundations = gameState.foundations;
    const isGameWon = 
      foundations.hearts.length === 13 && 
      foundations.diamonds.length === 13 && 
      foundations.clubs.length === 13 && 
      foundations.spades.length === 13;
    
    if (isGameWon) {
      setMessage("YOU SMASHED THE SYSTEM!");
      if (typeof window !== "undefined") {
        victorySound.play();
      }
    }
  }, [gameState.foundations]);

  // Draw card from stock to waste
  const drawCard = () => {
    setGameState(prev => {
      if (prev.stock.length === 0) {
        // If stock is empty, recycle waste pile
        if (prev.waste.length === 0) {
          setMessage("NO MORE CARDS TO DRAW!");
          return prev;
        }
        
        const newStock = [...prev.waste].reverse().map(card => ({ ...card, faceUp: false }));
        setMessage("RECYCLED THE WASTE PILE!");
        
        return {
          ...prev,
          stock: newStock,
          waste: []
        };
      }
      
      // Draw a card from stock to waste
      const newStock = [...prev.stock];
      const card = newStock.pop();
      
      if (card) {
        card.faceUp = true;
        if (typeof window !== "undefined") {
          cardMoveSound.play();
        }
        
        return {
          ...prev,
          stock: newStock,
          waste: [...prev.waste, card]
        };
      }
      
      return prev;
    });
  };
  
  // Reset the game
  const resetGame = () => {
    setGameState(initializeGame());
    setMessage("NEW REBELLION STARTED!");
    setPunkQuote(punkQuotes[Math.floor(Math.random() * punkQuotes.length)]);
  };

  // Handle card click (selection or move)
  const handleCardClick = (pile: string, index: number) => {
    // If a card is already selected, try to move it
    if (gameState.selectedCard) {
      const { pile: fromPile, index: fromIndex } = gameState.selectedCard;
      
      // Handle moving from selected card to target
      handleMove(fromPile, fromIndex, pile, index);
    } else {
      // Otherwise select this card
      setGameState(prev => ({
        ...prev,
        selectedCard: { pile, index }
      }));
    }
  };

  // Get card from a pile
  const getCard = (pile: string, index: number): [Card | null, Card | null] => {
    const [pileType, ...pileInfo] = pile.split("-");
    
    // Get card from waste pile
    if (pileType === "waste") {
      if (gameState.waste.length > 0 && index === gameState.waste.length - 1) {
        return [gameState.waste[index], null];
      }
    }
    // Get card from foundation pile
    else if (pileType === "foundation") {
      const suit = pileInfo[0] as Suit;
      const foundation = gameState.foundations[suit];
      
      if (foundation.length > 0 && index === foundation.length - 1) {
        return [foundation[index], null];
      }
    }
    // Get card from tableau pile
    else if (pileType === "tableau") {
      const tableauIndex = parseInt(pileInfo[0], 10);
      const tableau = gameState.tableaus[tableauIndex];
      
      if (index >= 0 && index < tableau.length) {
        // If it's not the top card of the tableau, we need to check the next card too
        const nextCard = index < tableau.length - 1 ? tableau[index + 1] : null;
        return [tableau[index], nextCard];
      }
    }
    
    return [null, null];
  };

  // Check if a move is valid
  const isValidMove = (fromPile: string, fromIndex: number, toPile: string, toIndex: number): boolean => {
    const [fromCard] = getCard(fromPile, fromIndex);
    if (!fromCard || !fromCard.faceUp) return false;
    
    const [toPileType, ...toPileInfo] = toPile.split("-");
    
    // Moving to foundation
    if (toPileType === "foundation") {
      const suit = toPileInfo[0] as Suit;
      const foundation = gameState.foundations[suit];
      
      // Card must match the foundation suit
      if (fromCard.suit !== suit) return false;
      
      // If foundation is empty, only Ace can be placed
      if (foundation.length === 0) {
        return fromCard.rank === "A";
      }
      
      // Card must be one rank higher than the top foundation card
      const topCard = foundation[foundation.length - 1];
      return getRankValue(fromCard.rank) === getRankValue(topCard.rank) + 1;
    }
    
    // Moving to tableau
    if (toPileType === "tableau") {
      const tableauIndex = parseInt(toPileInfo[0], 10);
      const tableau = gameState.tableaus[tableauIndex];
      
      // If tableau is empty, only Kings can be placed
      if (tableau.length === 0) {
        return fromCard.rank === "K";
      }
      
      // Card must be placed on the top card
      if (toIndex !== tableau.length - 1) return false;
      
      const targetCard = tableau[toIndex];
      
      // Card must be one rank lower and opposite color
      return (
        getRankValue(fromCard.rank) === getRankValue(targetCard.rank) - 1 &&
        fromCard.color !== targetCard.color
      );
    }
    
    return false;
  };

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent, pile: string, index: number) => {
    const [card] = getCard(pile, index);
    if (!card || !card.faceUp) return;
    
    // Set dragging state
    setGameState(prev => ({
      ...prev,
      selectedCard: null, // Clear any selected card
      draggingCard: { pile, index }
    }));
    
    // Calculate offset from mouse to card
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Set initial drag position
    setDragPosition({
      x: e.clientX,
      y: e.clientY
    });
    
    // Add event listeners for drag movement and end
    const handleDragMove = (e: MouseEvent) => {
      setDragPosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const handleDragEnd = (e: MouseEvent) => {
      // Find drop target
      const elements = document.elementsFromPoint(e.clientX, e.clientY);
      let dropTarget: HTMLElement | null = null;
      
      for (const element of elements) {
        if (element instanceof HTMLElement && element.dataset.pile) {
          dropTarget = element;
          break;
        }
      }
      
      if (dropTarget && dropTarget.dataset.pile) {
        const targetPile = dropTarget.dataset.pile;
        const targetIndex = parseInt(dropTarget.dataset.index || "-1", 10);
        
        // Try to move the card
        handleMove(pile, index, targetPile, targetIndex);
      }
      
      // Clear dragging state
      setGameState(prev => ({
        ...prev,
        draggingCard: null
      }));
      
      setDragOffset(null);
      setDragPosition(null);
      
      // Remove event listeners
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
    
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };

  // Get the cards currently being dragged (for display)
  const getDraggingCards = () => {
    if (!gameState.draggingCard) return [];
    
    const { pile, index } = gameState.draggingCard;
    const [pileType, ...pileInfo] = pile.split("-");
    
    // Get cards from waste
    if (pileType === "waste") {
      return gameState.waste.length > 0 ? [gameState.waste[gameState.waste.length - 1]] : [];
    }
    // Get cards from foundation
    else if (pileType === "foundation") {
      const suit = pileInfo[0] as Suit;
      const foundation = gameState.foundations[suit];
      return foundation.length > 0 ? [foundation[foundation.length - 1]] : [];
    }
    // Get cards from tableau
    else if (pileType === "tableau") {
      const tableauIndex = parseInt(pileInfo[0], 10);
      const tableau = gameState.tableaus[tableauIndex];
      
      if (index >= 0 && index < tableau.length && tableau[index].faceUp) {
        // Return all face-up cards from index to end
        return tableau.slice(index);
      }
    }
    
    return [];
  };

  // Handle moving cards between piles
  const handleMove = (fromPile: string, fromIndex: number, toPile: string, toIndex: number) => {
    // Ignore if source and destination are the same
    if (fromPile === toPile) {
      setGameState(prev => ({ ...prev, selectedCard: null }));
      return;
    }
    
    // If target is a tableau but toIndex is -1 (no specific card),
    // we need to adjust to the top card
    if (toPile.startsWith("tableau-") && toIndex === -1) {
      const tableauIndex = parseInt(toPile.split("-")[1], 10);
      const tableau = gameState.tableaus[tableauIndex];
      toIndex = tableau.length - 1 >= 0 ? tableau.length - 1 : -1;
    }
    
    // Check if the move is valid
    const isValid = isValidMove(fromPile, fromIndex, toPile, toIndex);
    
    if (isValid) {
      // Move is valid, update game state
      setGameState(prev => {
        const newState = { ...prev, selectedCard: null };
        const [fromPileType, ...fromPileInfo] = fromPile.split("-");
        const [toPileType, ...toPileInfo] = toPile.split("-");
        
        // Get cards to move
        let cardsToMove: Card[] = [];
        
        // Remove cards from source pile
        if (fromPileType === "waste") {
          if (newState.waste.length > 0) {
            cardsToMove = [newState.waste.pop()!];
          }
        }
        else if (fromPileType === "foundation") {
          const suit = fromPileInfo[0] as Suit;
          if (newState.foundations[suit].length > 0) {
            cardsToMove = [newState.foundations[suit].pop()!];
          }
        }
        else if (fromPileType === "tableau") {
          const tableauIndex = parseInt(fromPileInfo[0], 10);
          const tableau = newState.tableaus[tableauIndex];
          
          if (fromIndex >= 0 && fromIndex < tableau.length) {
            // Remove cards from index to end
            cardsToMove = tableau.splice(fromIndex);
            
            // Flip the new top card if needed
            if (tableau.length > 0 && !tableau[tableau.length - 1].faceUp) {
              tableau[tableau.length - 1].faceUp = true;
            }
          }
        }
        
        // Add cards to destination pile
        if (toPileType === "foundation") {
          const suit = toPileInfo[0] as Suit;
          newState.foundations[suit].push(...cardsToMove);
        }
        else if (toPileType === "tableau") {
          const tableauIndex = parseInt(toPileInfo[0], 10);
          newState.tableaus[tableauIndex].push(...cardsToMove);
        }
        
        // Play sound effect
        if (typeof window !== "undefined") {
          cardMoveSound.play();
        }
        
        setLastMoveValid(true);
        return newState;
      });
    } else {
      // Invalid move, show message and play sound
      setMessage("INVALID MOVE, PUNK!");
      if (typeof window !== "undefined") {
        invalidMoveSound.play();
      }
      
      // Update state to show invalid move
      setLastMoveValid(false);
      
      // Reset after animation
      setTimeout(() => {
        setLastMoveValid(true);
        setGameState(prev => ({ ...prev, selectedCard: null }));
      }, 1000);
    }
  };

  return {
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
  };
} 