import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TeamData {
  teamName: string;
  members: string[];
}

interface RegistrationPageProps {
  onNavigate: (page: string) => void;
  teamData: TeamData;
  setTeamData: (data: TeamData) => void;
  setRegistrationComplete: (complete: boolean) => void;
}

const RegistrationPage = ({ onNavigate, teamData, setTeamData, setRegistrationComplete }: RegistrationPageProps) => {
  const [numMembers, setNumMembers] = useState(4);
  const [formData, setFormData] = useState({
    teamName: teamData.teamName || "",
    teamLeaderEmail: "",
    members: Array(numMembers).fill("").map((_, i) => ({
      name: teamData.members[i] || "",
      regNumber: "",
    })),
  });
  const [statusMessage, setStatusMessage] = useState("INFO NOT SUBMITTED");
  const [statusColor, setStatusColor] = useState("text-red-400");

  const handleMemberCountChange = (count: number) => {
    setNumMembers(count);
    const newMembers = Array(count).fill("").map((_, i) => ({
      name: formData.members[i]?.name || "",
      regNumber: formData.members[i]?.regNumber || "",
    }));
    setFormData({ ...formData, members: newMembers });
  };

  const validateForm = () => {
    if (!formData.teamName.trim()) return false;
    if (!formData.teamLeaderEmail.trim() || !formData.teamLeaderEmail.includes("@")) return false;
    
    for (const member of formData.members) {
      if (!member.name.trim() || !member.regNumber.trim()) return false;
    }
    
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setStatusMessage("INFO SUBMITTED");
      setStatusColor("text-green-400");
      
      // Update team data
      setTeamData({
        teamName: formData.teamName,
        members: formData.members.map(m => m.name),
      });
      
      setRegistrationComplete(true);
      
      setTimeout(() => {
        onNavigate("home");
      }, 1500);
    } else {
      setStatusMessage("PLEASE FILL ALL FIELDS CORRECTLY");
      setStatusColor("text-red-400");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
      <motion.div
        className="space-card rounded-2xl p-8 max-w-4xl w-full border-2 border-primary/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <motion.h1
          className="text-4xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MISSION REGISTRATION
        </motion.h1>

        {/* Number of Members Selector */}
        <motion.div
          className="flex justify-end mb-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col items-end space-y-2">
            <Label className="text-primary font-space text-xs">NUMBER OF CREW MEMBERS</Label>
            <select
              value={numMembers}
              onChange={(e) => handleMemberCountChange(parseInt(e.target.value))}
              className="bg-space-deep border border-primary/30 rounded-lg px-4 py-2 text-primary font-space text-sm focus:ring-2 focus:ring-primary/50 outline-none"
            >
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </motion.div>

        {/* Form Fields */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Team Name */}
          <div>
            <Input
              type="text"
              placeholder="TEAM NAME"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Team Leader Email */}
          <div>
            <Input
              type="email"
              placeholder="TEAM LEADER EMAIL ID"
              value={formData.teamLeaderEmail}
              onChange={(e) => setFormData({ ...formData, teamLeaderEmail: e.target.value })}
              className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Member Fields with AnimatePresence for smooth transitions */}
          <AnimatePresence mode="popLayout">
            {formData.members.map((member, index) => (
              <motion.div
                key={`member-${index}`}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ 
                  opacity: 0, 
                  y: -20, 
                  scale: 0.95,
                  transition: { duration: 0.3, ease: "easeInOut" }
                }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.8 + index * 0.1,
                  ease: "easeOut"
                }}
                layout
              >
                <Input
                  type="text"
                  placeholder={`CREW MEMBER ${index + 1} NAME`}
                  value={member.name}
                  onChange={(e) => {
                    const newMembers = [...formData.members];
                    newMembers[index].name = e.target.value;
                    setFormData({ ...formData, members: newMembers });
                  }}
                  className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
                />
                <Input
                  type="text"
                  placeholder="REGISTRATION NUMBER"
                  value={member.regNumber}
                  onChange={(e) => {
                    const newMembers = [...formData.members];
                    newMembers[index].regNumber = e.target.value;
                    setFormData({ ...formData, members: newMembers });
                  }}
                  className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Submit Section */}
        <motion.div
          className="flex justify-center items-center space-x-6 mt-8 p-4 bg-space-deep/50 rounded-lg border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className={`font-space text-sm ${statusColor}`}>
            {statusMessage}
          </span>
          <Button
            className="space-button px-8 py-3 font-space tracking-wider"
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
          <Button
            className="space-button px-8 py-3 font-space tracking-wider"
            onClick={() => onNavigate("home")}
          >
            BACK
          </Button>
        </motion.div>

        {/* Decorative Elements */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-secondary/30 rounded-full"
            style={{
              left: `${5 + i * 25}%`,
              bottom: `${5 + Math.random() * 10}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default RegistrationPage;