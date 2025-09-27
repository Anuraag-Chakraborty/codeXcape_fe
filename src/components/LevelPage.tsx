import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface TeamData {
  teamName: string;
  members: string[];
}

interface Level {
  id: number;
  name: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

interface LevelPageProps {
  onNavigate: (page: string) => void;
  teamData: TeamData;
}

const LevelPage = ({ onNavigate, teamData }: LevelPageProps) => {
  const [levels, setLevels] = useState<Level[]>([
    {
      id: 1,
      name: "JEOPARDY",
      description: "Test your knowledge across the galaxy",
      isUnlocked: true,
      isCompleted: false,
    },
    {
      id: 2,
      name: "SCOTLAND YARD",
      description: "Hunt down Mr. X through space",
      isUnlocked: false,
      isCompleted: false,
    },
    {
      id: 3,
      name: "HACK PORTAL",
      description: "Submit idea and final project",
      isUnlocked: false,
      isCompleted: false,
    },
  ]);

  const [burningLevel, setBurningLevel] = useState<number | null>(null);

  // On mount, if level 1 was completed earlier, reflect it and unlock level 2 and 3
  useEffect(() => {
    const TEAM_ID = localStorage.getItem("teamId") || "default";
    const completed =
      localStorage.getItem(`level1Completed:${TEAM_ID}`) === "true";
    if (completed) {
      setLevels((prev) =>
        prev.map((l) => {
          if (l.id === 1) return { ...l, isCompleted: true };
          if (l.id === 2) return { ...l, isUnlocked: true };
          if (l.id === 3) return { ...l, isUnlocked: true };
          return l;
        })
      );
    }
  }, []);

  const lock = (levelId) => {
    // lock the tapped level card until returning from that level
    setLevels((levels) =>
      levels.map((level) =>
        level.id === levelId ? { ...level, isUnlocked: false } : level
      )
    );
  };

  const handleLevelClick = (levelId: number) => {
    const level = levels.find(l => l.id === levelId);
    if (!level?.isUnlocked) return;

    if (levelId === 1) {
      onNavigate("jeopardy");
    } else if (levelId === 2) {
      
      onNavigate("scotland-yard");
      lock(levelId);
    } else if (levelId === 3) {
      onNavigate("hack-home");
      lock(levelId);
    } else {
      // future levels placeholder
      alert(`Level ${levelId} coming soon!`);
    }
  };

  const unlockNextLevel = (completedLevelId: number) => {
    setBurningLevel(completedLevelId);
    
    setTimeout(() => {
      setLevels(prevLevels => 
        prevLevels.map(level => {
          if (level.id === completedLevelId) {
            return { ...level, isCompleted: true };
          }
          if (level.id === completedLevelId + 1) {
            return { ...level, isUnlocked: true };
          }
          return level;
        })
      );
      setBurningLevel(null);
    }, 1500);
  };

  // Simulate level completion for demo
  const simulateCompletion = (levelId: number) => {
    unlockNextLevel(levelId);
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Team Info Panel */}
      <motion.div
        className="absolute top-6 left-6 rounded-xl p-6 max-w-xs backdrop-blur-md bg-black/30 border border-primary/20 hover:border-primary/50 hover:shadow-cosmic transition-all duration-300"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        whileHover={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          boxShadow: '0 0 30px rgba(0, 255, 238, 0.3)'
        }}
      >
        <h3 className="text-primary font-space font-bold text-lg mb-2 text-center">
          {teamData.teamName || "SPACE CREW"}
        </h3>
        {typeof window !== "undefined" && localStorage.getItem("teamCode") && (
          <div className="text-xs text-secondary font-space mb-4 text-center border-b border-primary/30 pb-2">
            Team Code:{" "}
            <span className="font-semibold">
              {localStorage.getItem("teamCode")}
            </span>
          </div>
        )}
        <div className="space-y-2">
          {(teamData.members || []).filter(member => 
            member && member.trim() && !member.includes("PLAYER") && !member.includes("NAME")
          ).map((member, index) => (
            <p key={index} className="text-secondary font-space text-sm">
              {member}
            </p>
          ))}
          {(!teamData.members || teamData.members.filter(m => m && m.trim() && !m.includes("PLAYER")).length === 0) && (
            <p className="text-muted-foreground font-space text-sm italic">
              No crew members specified
            </p>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl w-full">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              className={`cosmic-portal p-8 cursor-pointer relative overflow-hidden ${
                !level.isUnlocked ? 'opacity-50 cursor-not-allowed' : ''
              } ${
                burningLevel === level.id ? 'animate-burn-disintegrate' : ''
              }`}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{
                opacity:
                  burningLevel === level.id
                    ? [1, 0.5, 0]
                    : level.isUnlocked
                    ? 1
                    : 0.5,
                scale: burningLevel === level.id ? [1, 1.1, 0.8] : 1,
                y: 0,
              }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              onClick={() => handleLevelClick(level.id)}
              whileHover={level.isUnlocked ? { 
                scale: 1.05, 
                y: -10,
                boxShadow: "0 20px 40px rgba(139, 69, 19, 0.3)"
              } : {}}
            >
              {/* Portal Energy Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 animate-pulse-glow" />
              
              {/* Level Content */}
              <div className="relative z-10 text-center">
                {/* Level Number */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-space font-bold text-background"
                  animate={level.isUnlocked ? { rotate: [0, 360] } : {}}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  {level.id}
                </motion.div>

                {/* Level Name */}
                <h2 className="text-2xl font-space font-bold text-foreground mb-3 glow-text">
                  {level.name}
                </h2>

                {/* Level Description */}
                <p className="text-muted-foreground font-space text-sm mb-6">
                  {level.description}
                </p>

                {/* Status Indicator */}
                <div className="flex justify-center">
                  {level.isCompleted ? (
                    <div className="text-green-400 font-space text-xs">
                      ✓ COMPLETED
                    </div>
                  ) : level.isUnlocked ? (
                    <div className="text-primary font-space text-xs animate-pulse">
                      → AVAILABLE
                    </div>
                  ) : (
                    <div className="text-muted-foreground font-space text-xs">
                      🔒 LOCKED
                    </div>
                  )}
                </div>
              </div>

              {/* Particle Effects for Unlocked Levels */}
              {level.isUnlocked && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Demo Completion Buttons (for testing) */}
      <motion.div
        className="absolute bottom-6 right-6 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        {/* <div className="text-xs text-muted-foreground font-space mb-2">Demo Controls:</div>
        {levels.filter(l => l.isUnlocked && !l.isCompleted).map(level => (
          <Button
            key={level.id}
            className="space-button text-xs px-3 py-1"
            onClick={() => simulateCompletion(level.id)}
          >
            Complete Level {level.id}
          </Button>
        ))} */}
        
      </motion.div>

      {/* Floating objects and extra cosmic elements removed */}
    </div>
  );
};

export default LevelPage;

function useEffect(arg0: () => void, arg1: undefined[]) {
  throw new Error("Function not implemented.");
}
