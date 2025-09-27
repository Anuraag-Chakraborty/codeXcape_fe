import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

interface TeamData {
  teamName: string;
  members: string[];
}

interface JoinTeamProps {
  onNavigate: (page: string) => void;
  setTeamData?: (data: TeamData) => void;
}

const JoinTeam = ({ onNavigate, setTeamData }: JoinTeamProps) => {
  const [teamCode, setTeamCode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusColor, setStatusColor] = useState("text-red-400");

  const handleJoin = async () => {
    if (!teamCode.trim()) {
      setStatusMessage("PLEASE ENTER TEAM CODE");
      setStatusColor("text-red-400");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.warn("No JWT token found. Cannot join team.");
        setStatusMessage("LOGIN REQUIRED TO JOIN TEAM");
        setStatusColor("text-red-400");
        return;
      }

      console.log("Token being sent:", token);

      // Send POST request with Authorization header
      const res = await axios.post(
        `${import.meta.env.VITE_BE_URL}/teams/join`,
        { code: teamCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Join Response:", res.data);

      if (res.data.team) {
        localStorage.setItem("teamCode", res.data.team.code);
        localStorage.setItem("teamName", res.data.team.name);
        // Update global team state if setter provided
        setTeamData?.({
          teamName: res.data.team.name,
          members: res.data.team.members || [],
        });

        setStatusMessage("Successfully joined team: " + res.data.team.name);
        setStatusColor("text-green-400");

        setTimeout(() => {
          onNavigate("home");
        }, 1000);
      } else {
        setStatusMessage(res.data.message || "Failed to join team");
        setStatusColor("text-red-400");
      }
    } catch (err) {
      console.error("Join error:", err);
      setStatusMessage("Error joining team. Try again later.");
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
            onClick={() => onNavigate("teamChoice")}
          >
            BACK
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default JoinTeam;
