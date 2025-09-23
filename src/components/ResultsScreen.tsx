import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import mozCoinIcon from "@/assets/mozcoin-fox-icon.png";

interface TeamData {
  teamName: string;
  members: string[];
}

interface ResultsScreenProps {
  onNavigate: (page: string) => void;
  teamData: TeamData;
  totalMozCoins: number;
}

const ResultsScreen = ({ onNavigate, teamData, totalMozCoins }: ResultsScreenProps) => {
  const motivationalMessages = [
    "Outstanding performance, space cadets!",
    "Your stellar teamwork has paid off!",
    "The galaxy acknowledges your achievements!",
    "Mission accomplished with cosmic excellence!",
    "Your dedication shines brighter than stars!"
  ];

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  const achievements = [
    { 
      title: "Space Explorer", 
      description: "Completed multiple cosmic missions",
      earned: totalMozCoins > 0 
    },
    { 
      title: "Knowledge Master", 
      description: "Demonstrated superior space intelligence",
      earned: totalMozCoins >= 500 
    },
    { 
      title: "Team Coordinator", 
      description: "Excellent collaboration and communication",
      earned: teamData.members.length >= 3 
    },
    { 
      title: "MozCoin Collector", 
      description: "Accumulated substantial space currency",
      earned: totalMozCoins >= 300 
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
      <motion.div
        className="space-card rounded-2xl p-12 max-w-4xl w-full text-center border-2 border-primary/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <motion.h1
          className="text-5xl md:text-6xl font-space font-bold text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          MISSION COMPLETE
        </motion.h1>

        {/* Team Name */}
        <motion.h2
          className="text-2xl font-space font-bold text-primary mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {teamData.teamName || "SPACE CREW"}
        </motion.h2>

        {/* Motivational Message */}
        <motion.p
          className="text-xl font-space text-muted-foreground mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {randomMessage}
        </motion.p>

        {/* MozCoins Display */}
        <motion.div
          className="bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl p-8 mb-12 border-2 border-secondary/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div className="flex items-center justify-center space-x-6 mb-4">
            <motion.img
              src={mozCoinIcon}
              alt="MozCoin"
              className="w-20 h-20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div>
              <div className="text-6xl font-space font-bold text-secondary">
                {totalMozCoins}
              </div>
              <div className="text-xl font-space text-secondary/80">
                MOZCOINS EARNED
              </div>
            </div>
          </div>
          
          <motion.p
            className="text-lg font-space text-muted-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Your space currency has been securely stored in the cosmic vault!
          </motion.p>
        </motion.div>

        {/* Team Members */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <h3 className="text-2xl font-space font-bold text-primary mb-6">
            SPACE CREW ROSTER
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamData.members
              .filter(member => member && member.trim() && !member.includes("PLAYER") && !member.includes("NAME"))
              .map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.7 + index * 0.1 }}
                >
                  <div className="text-lg font-space font-bold text-foreground">
                    {member}
                  </div>
                  <div className="text-sm font-space text-muted-foreground">
                    Space Explorer
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <h3 className="text-2xl font-space font-bold text-primary mb-6">
            ACHIEVEMENTS UNLOCKED
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className={`rounded-lg p-4 border-2 ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-green-500/20 to-green-400/20 border-green-400/50' 
                    : 'bg-gradient-to-br from-gray-500/10 to-gray-400/10 border-gray-400/30 opacity-50'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: achievement.earned ? 1 : 0.5, x: 0 }}
                transition={{ duration: 0.6, delay: 2.2 + index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-2xl ${achievement.earned ? '' : 'grayscale'}`}>
                    {achievement.earned ? '🏆' : '🔒'}
                  </div>
                  <div className="text-left">
                    <div className="font-space font-bold text-foreground">
                      {achievement.title}
                    </div>
                    <div className="text-sm font-space text-muted-foreground">
                      {achievement.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <Button
            className="space-button px-8 py-4 text-lg font-space tracking-wider"
            onClick={() => onNavigate('levels')}
          >
            CONTINUE EXPLORATION
          </Button>
          <Button
            className="space-button px-8 py-4 text-lg font-space tracking-wider"
            onClick={() => onNavigate('home')}
          >
            RETURN TO BASE
          </Button>
        </motion.div>

        {/* Floating MozCoin Effects */}
        {[...Array(6)].map((_, i) => (
          <motion.img
            key={i}
            src={mozCoinIcon}
            alt="MozCoin"
            className="absolute w-8 h-8 opacity-20"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ResultsScreen;