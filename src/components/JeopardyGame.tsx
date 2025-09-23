import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface JeopardyGameProps {
  onNavigate: (page: string) => void;
  onGameComplete: (points: number) => void;
}

const JeopardyGame = ({ onNavigate, onGameComplete }: JeopardyGameProps) => {
  const [gamePhase, setGamePhase] = useState<'intro' | 'playing' | 'complete'>('intro');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30);

  // Simulate game timer
  useEffect(() => {
    if (gamePhase === 'playing' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (gamePhase === 'playing' && timeRemaining === 0) {
      setGamePhase('complete');
    }
  }, [gamePhase, timeRemaining]);

  const startGame = () => {
    setGamePhase('playing');
    setScore(0);
    setTimeRemaining(30);
  };

  const handleAnswer = (points: number) => {
    setScore(prev => prev + points);
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
            className="text-6xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            SPACE JEOPARDY
          </motion.h1>

          <motion.div
            className="space-y-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl font-space text-foreground">
              Welcome to the ultimate space knowledge challenge!
            </p>
            <p className="text-lg font-space text-muted-foreground">
              Answer questions across various cosmic categories to earn MozCoins.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                "Space Science",
                "Astronomy", 
                "Technology",
                "Exploration"
              ].map((category, index) => (
                <motion.div
                  key={category}
                  className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-4 border border-primary/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-primary font-space text-sm font-bold">
                    {category}
                  </div>
                </motion.div>
              ))}
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
              BEGIN MISSION
            </Button>
            <Button
              className="space-button px-8 py-4 text-lg font-space tracking-wider"
              onClick={() => onNavigate('levels')}
            >
              ABORT
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
            <span className="text-primary font-space font-bold">
              TIME: {timeRemaining}s
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
          <h2 className="text-3xl font-space font-bold text-center text-primary mb-8">
            JEOPARDY IN PROGRESS...
          </h2>

          {/* Simulated Question */}
          <motion.div
            className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-8 mb-8 border border-primary/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xl font-space text-center text-foreground mb-6">
              "This planet is known as the Red Planet and is the fourth from the Sun."
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { text: "What is Mars?", points: 500, correct: true },
                { text: "What is Venus?", points: 0, correct: false },
                { text: "What is Jupiter?", points: 0, correct: false },
                { text: "What is Saturn?", points: 0, correct: false },
              ].map((answer, index) => (
                <Button
                  key={index}
                  className={`space-button p-4 text-lg font-space ${
                    answer.correct ? 'hover:bg-green-600' : 'hover:bg-red-600'
                  }`}
                  onClick={() => handleAnswer(answer.points)}
                >
                  {answer.text}
                </Button>
              ))}
            </div>
          </motion.div>

          <div className="text-center">
            <Button
              className="space-button px-8 py-3 font-space"
              onClick={() => setGamePhase('complete')}
            >
              END MISSION
            </Button>
          </div>
        </motion.div>

        {/* Cosmic Effects */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary/40 rounded-full"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
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
          className="text-5xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          MISSION COMPLETE!
        </motion.h1>

        <motion.div
          className="text-6xl font-space font-bold text-secondary mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {score} MOZCOINS
        </motion.div>

        <motion.p
          className="text-lg font-space text-muted-foreground mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Excellent work, space explorer! Your knowledge has earned valuable MozCoins.
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

export default JeopardyGame;