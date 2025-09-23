import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ScotlandYardGameProps {
  onNavigate: (page: string) => void;
  onGameComplete: (points: number) => void;
}

const ScotlandYardGame = ({ onNavigate, onGameComplete }: ScotlandYardGameProps) => {
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [mrXLocation, setMrXLocation] = useState('Hidden');

  const locations = [
    'Nebula Station', 'Asteroid Belt', 'Mars Colony', 'Jupiter Outpost',
    'Saturn Rings', 'Titan Base', 'Europa Station', 'Ganymede Port'
  ];

  const startGame = () => {
    setGamePhase('playing');
    setScore(0);
    setRound(1);
    setMrXLocation(locations[Math.floor(Math.random() * locations.length)]);
  };

  const makeMove = (location: string) => {
    if (location === mrXLocation) {
      setScore(prev => prev + 300);
      setGamePhase('complete');
    } else {
      setScore(prev => Math.max(0, prev - 50));
      setRound(prev => prev + 1);
      setMrXLocation(locations[Math.floor(Math.random() * locations.length)]);
      
      if (round >= 5) {
        setGamePhase('complete');
      }
    }
  };

  const completeGame = () => {
    onGameComplete(score);
    onNavigate('results');
  };

  if (gamePhase === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <motion.div
          className="space-card rounded-2xl p-12 max-w-4xl mx-4 text-center border-2 border-primary/30"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-6xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SCOTLAND YARD: SPACE
          </motion.h1>

          <motion.div
            className="space-y-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl font-space text-foreground">
              Hunt down the elusive Mr. X across the galaxy!
            </p>
            <p className="text-lg font-space text-muted-foreground">
              Work as a team to track Mr. X through various space stations and colonies.
            </p>
            
            {/* Game Rules */}
            <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl p-6 border border-accent/30 mt-8">
              <h3 className="text-xl font-space font-bold text-accent mb-4">MISSION BRIEFING</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-space text-left">
                <div>• Mr. X is hiding in one of 8 locations</div>
                <div>• You have 5 rounds to find him</div>
                <div>• Correct guess: +300 MozCoins</div>
                <div>• Wrong guess: -50 MozCoins</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <Button
              className="space-button px-12 py-4 text-xl font-space tracking-wider"
              onClick={startGame}
            >
              BEGIN HUNT
            </Button>
            <Button
              className="space-button px-8 py-4 text-lg font-space tracking-wider"
              onClick={() => onNavigate('levels')}
            >
              ABORT MISSION
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (gamePhase === 'playing') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative z-10 p-4">
        {/* HUD */}
        <motion.div
          className="fixed top-6 left-0 right-0 flex justify-between items-center px-6 z-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="space-card px-6 py-3 rounded-full">
            <span className="text-secondary font-space font-bold">
              SCORE: {score} MOZCOINS
            </span>
          </div>
          <div className="space-card px-6 py-3 rounded-full">
            <span className="text-accent font-space font-bold">
              ROUND: {round}/5
            </span>
          </div>
        </motion.div>

        {/* Game Board */}
        <motion.div
          className="space-card rounded-2xl p-8 max-w-6xl w-full mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-space font-bold text-center text-primary mb-2">
            TRACKING MR. X
          </h2>
          <p className="text-center text-muted-foreground font-space mb-8">
            Choose a location to search for the fugitive
          </p>

          {/* Location Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {locations.map((location, index) => (
              <motion.button
                key={location}
                className="cosmic-portal p-6 text-center cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => makeMove(location)}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-lg font-space font-bold text-foreground mb-2">
                  {location}
                </div>
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-background font-bold">
                  {index + 1}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Mr. X Status */}
          <motion.div
            className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30 text-center"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <h3 className="text-xl font-space font-bold text-red-400 mb-2">
              MR. X STATUS: FUGITIVE
            </h3>
            <p className="text-muted-foreground font-space">
              Last known transmission: "You'll never catch me, detectives!"
            </p>
          </motion.div>
        </motion.div>

        {/* Scanning Effect */}
        <motion.div
          className="fixed inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent transform skew-y-12" />
        </motion.div>
      </div>
    );
  }

  // Game Complete
  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <motion.div
        className="space-card rounded-2xl p-12 max-w-2xl mx-4 text-center border-2 border-primary/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className={`text-5xl font-space font-bold mb-8 ${
            score > 0 ? 'text-green-400' : 'text-red-400'
          }`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {score > 0 ? 'MR. X CAPTURED!' : 'MR. X ESCAPED!'}
        </motion.h1>

        <motion.div
          className="text-6xl font-space font-bold text-secondary mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {Math.max(0, score)} MOZCOINS
        </motion.div>

        <motion.p
          className="text-lg font-space text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {score > 0 
            ? "Excellent detective work! The galaxy is safe once again." 
            : "Mr. X has escaped this time, but the hunt continues..."}
        </motion.p>

        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Button
            className="space-button px-8 py-4 text-lg font-space tracking-wider"
            onClick={completeGame}
          >
            VIEW RESULTS
          </Button>
          <Button
            className="space-button px-8 py-4 text-lg font-space tracking-wider"
            onClick={() => onNavigate('levels')}
          >
            CONTINUE MISSION
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ScotlandYardGame;