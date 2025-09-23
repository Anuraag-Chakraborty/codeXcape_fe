import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface InstructionsPageProps {
  onNavigate: (page: string) => void;
}

const InstructionsPage = ({ onNavigate }: InstructionsPageProps) => {
  const instructions = [
    "Each team will face multiple cosmic challenges across different game levels.",
    "Level 1: Jeopardy - Test your knowledge across various categories in space-themed trivia.",
    "Level 2: Scotland Yard - Work together to track down the mysterious Mr. X across the galaxy.",
    "Level 3: Additional challenges await brave space explorers.",
    "Earn MozCoins for successful missions and outstanding teamwork.",
    "Coordinate with your teammates - communication is key to space survival!",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <motion.div
        className="space-card rounded-2xl p-12 max-w-4xl mx-4 border-2 border-primary/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MISSION BRIEFING
        </motion.h1>

        {/* Instructions List */}
        <motion.div
          className="space-y-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {instructions.map((instruction, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-to-r from-background/50 to-transparent border border-primary/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              {/* Step Number */}
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center text-background font-bold text-sm">
                {index + 1}
              </div>
              
              {/* Instruction Text */}
              <p className="text-foreground font-space text-sm md:text-base leading-relaxed">
                {instruction}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            className="space-button px-12 py-4 text-lg font-space tracking-wider"
            onClick={() => onNavigate("home")}
          >
            BACK TO MISSION CONTROL
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 border-2 border-primary/30 rounded-full animate-pulse-glow" />
        <div className="absolute -bottom-6 -right-6 w-8 h-8 border-2 border-secondary/30 rounded-full animate-pulse-glow" />
        
        {/* Floating Icons */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-primary/20 rounded-full"
            style={{
              right: `${10 + i * 15}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default InstructionsPage;