import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Drizzle effect function
const createDrizzleEffect = () => {
  const drizzleContainer = document.createElement('div');
  drizzleContainer.style.position = 'fixed';
  drizzleContainer.style.top = '0';
  drizzleContainer.style.left = '0';
  drizzleContainer.style.width = '100%';
  drizzleContainer.style.height = '100%';
  drizzleContainer.style.pointerEvents = 'none';
  drizzleContainer.style.zIndex = '1000';
  document.body.appendChild(drizzleContainer);

  for (let i = 0; i < 20; i++) {
    const drop = document.createElement('div');
    drop.style.position = 'absolute';
    drop.style.width = '2px';
    drop.style.height = '10px';
    drop.style.background = 'linear-gradient(to bottom, hsl(180 100% 50%), transparent)';
    drop.style.left = Math.random() * 100 + '%';
    drop.style.top = '-10px';
    drop.style.animation = `drizzleFall 1s linear forwards`;
    drop.style.animationDelay = Math.random() * 0.5 + 's';
    drizzleContainer.appendChild(drop);
  }

  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes drizzleFall {
      from { transform: translateY(-10px); opacity: 1; }
      to { transform: translateY(100vh); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    document.body.removeChild(drizzleContainer);
    document.head.removeChild(style);
  }, 2000);
};

interface TeamData {
  teamName: string;
  members: string[];
}

interface HomePageProps {
  onNavigate: (page: string) => void;
  teamData: TeamData;
  setTeamData: (data: TeamData) => void;
  isRegistrationComplete: boolean;
}

const HomePage = ({ onNavigate, teamData, setTeamData, isRegistrationComplete }: HomePageProps) => {
  const [editableTeamName, setEditableTeamName] = useState(teamData.teamName || "TEAM NAME");
  const [editableMembers, setEditableMembers] = useState(
    teamData.members.length > 0 ? teamData.members : ["PLAYER 1 NAME", "PLAYER 2 NAME", "PLAYER 3 NAME", "PLAYER 4 NAME"]
  );

  const handleTeamNameChange = (value: string) => {
    setEditableTeamName(value);
    setTeamData({
      ...teamData,
      teamName: value,
    });
  };

  const handleMemberChange = (index: number, value: string) => {
    const newMembers = [...editableMembers];
    newMembers[index] = value;
    setEditableMembers(newMembers);
    setTeamData({
      ...teamData,
      members: newMembers,
    });
  };

  const handleLetsBegin = () => {
    if (editableTeamName === "TEAM NAME" || !editableTeamName.trim()) {
      alert("Please enter a team name first!");
      return;
    }

    const validMembers = editableMembers.filter(
      (name) => name.trim() && !name.includes("PLAYER") && !name.includes("NAME")
    );

    if (validMembers.length === 0) {
      alert("Please enter at least one player name!");
      return;
    }

    onNavigate("levels");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
      {/* Animated Title */}
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* CodeXcape Title */}
        <div className="relative z-10 flex items-center justify-center font-space text-6xl md:text-8xl font-bold">
          <motion.span
            className="text-transparent bg-gradient-to-r from-primary to-primary-glow bg-clip-text glow-text"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ 
              duration: 1.5, 
              delay: 1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          >
            CODE
          </motion.span>
          <motion.span
            className="text-transparent bg-gradient-to-r from-[#0a1e6a] to-[#0a1e6a] bg-clip-text glow-text"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            X
          </motion.span>
          <motion.span
            className="text-transparent bg-gradient-to-r from-[#7e3ff2] to-[#b084ff] bg-clip-text glow-text"
            initial={{ x: 220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            CAPE
          </motion.span>
        </div>
      </motion.div>

      {/* Navigation Buttons - Made them conditionally visible based on registration status */}
      {!isRegistrationComplete && (
        <motion.div
          className="flex gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Button
            className="px-8 py-4 text-lg font-space tracking-wider bg-black/70 border-2 border-white/50 rounded-xl text-primary hover:bg-primary hover:text-black hover:border-black transition-all duration-300 shadow-lg shadow-primary/30 backdrop-blur-sm"
            onClick={() => onNavigate("registration")}
          >
            START
          </Button>
          <Button
            className="px-8 py-4 text-lg font-space tracking-wider bg-black/70 border-2 border-white/50 rounded-xl text-primary hover:bg-primary hover:text-black hover:border-black transition-all duration-300 shadow-lg shadow-primary/30 backdrop-blur-sm"
            onClick={() => onNavigate("instructions")}
          >
            HOW TO PLAY
          </Button>
        </motion.div>
      )}

      {/* Team Registration Box */}
      <motion.div
        className="team-info-panel rounded-xl p-8 backdrop-blur-md text-center max-w-md w-full mx-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        {/* Team Name */}
        <div className="relative mb-6">
          <motion.div
            className="text-primary text-2xl font-bold text-center cursor-pointer hover:text-primary-glow transition-colors duration-300"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'text';
              input.value = editableTeamName === "TEAM NAME" ? "" : editableTeamName;
              input.className = 'invisible absolute inset-0';
              input.style.fontSize = '24px';
              input.style.textAlign = 'center';
              input.style.background = 'transparent';
              input.style.border = 'none';
              input.style.outline = 'none';
              input.style.color = 'hsl(var(--primary))';
              input.style.fontFamily = 'inherit';
              document.body.appendChild(input);
              input.focus();
              
              const cleanup = () => {
                document.body.removeChild(input);
              };
              
              input.onblur = () => {
                const value = input.value.trim();
                if (value) {
                  handleTeamNameChange(value);
                  // Drizzle effect
                  createDrizzleEffect();
                } else {
                  setEditableTeamName("TEAM NAME");
                }
                cleanup();
              };
              
              input.onkeypress = (e) => {
                if (e.key === 'Enter') {
                  input.blur();
                }
              };
            }}
          >
            {editableTeamName || "TEAM NAME"}
          </motion.div>
        </div>

        {/* Team Members */}
        <div className="space-y-4 mb-8">
          {editableMembers.map((member, index) => (
            <motion.div
              key={index}
              className="text-secondary text-lg text-center cursor-pointer hover:text-secondary-glow transition-colors duration-300"
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = member.includes("PLAYER") && member.includes("NAME") ? "" : member;
                input.className = 'invisible absolute inset-0';
                input.style.fontSize = '18px';
                input.style.textAlign = 'center';
                input.style.background = 'transparent';
                input.style.border = 'none';
                input.style.outline = 'none';
                input.style.color = 'hsl(var(--secondary))';
                input.style.fontFamily = 'inherit';
                document.body.appendChild(input);
                input.focus();
                
                const cleanup = () => {
                  document.body.removeChild(input);
                };
                
                input.onblur = () => {
                  const value = input.value.trim();
                  if (value) {
                    handleMemberChange(index, value);
                    createDrizzleEffect();
                  } else {
                    const defaultName = `PLAYER ${index + 1} NAME`;
                    handleMemberChange(index, defaultName);
                  }
                  cleanup();
                };
                
                input.onkeypress = (e) => {
                  if (e.key === 'Enter') {
                    input.blur();
                  }
                };
              }}
            >
              {member || `PLAYER ${index + 1} NAME`}
            </motion.div>
          ))}
        </div>

        {/* Let's Begin Button - match Start/How To Play styling */}
        <Button
          className={`w-full px-8 py-4 text-lg font-space tracking-wider bg-black/70 border-2 border-white/50 rounded-xl text-primary hover:bg-primary hover:text-black hover:border-black transition-all duration-300 shadow-lg shadow-primary/30 backdrop-blur-sm ${
            isRegistrationComplete ? '' : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={isRegistrationComplete ? handleLetsBegin : undefined}
          disabled={!isRegistrationComplete}
        >
          LET&apos;S BEGIN
        </Button>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full opacity-30"
          style={{
            left: `${10 + i * 20}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default HomePage;