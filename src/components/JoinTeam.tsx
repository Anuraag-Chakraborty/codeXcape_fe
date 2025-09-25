import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface JoinTeamProps {
  onNavigate: (page: string) => void;
}

const JoinTeam = ({ onNavigate }: JoinTeamProps) => {
  const [teamCode, setTeamCode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("text-red-400");

  const handleJoin = () => {
    if (teamCode.trim()) {
      // Placeholder: add validation/logic for joining team with the code
      setStatusMessage("Joining team with code: " + teamCode);
      setStatusColor("text-green-400");

      // Add further navigation or API calls here
    } else {
      setStatusMessage("Please enter a valid team code");
      setStatusColor("text-red-400");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
      <motion.div
        className="space-card rounded-2xl p-8 max-w-md w-full border-2 border-primary/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text text-center mb-8">
          Join Team
        </h1>

        <Input
          type="text"
          placeholder="TEAM CODE"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
          className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50 mb-6"
        />

        <motion.div
          className="flex justify-center items-center space-x-6 p-4 bg-space-deep/50 rounded-lg border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className={`font-space text-sm ${statusColor}`}>
            {statusMessage}
          </span>
          <Button
            className="space-button px-8 py-3 font-space tracking-wider"
            onClick={handleJoin}
          >
            JOIN TEAM
          </Button>
          <Button
            className="space-button px-8 py-3 font-space tracking-wider"
            onClick={() => onNavigate("team-choice")}
          >
            BACK
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JoinTeam;
