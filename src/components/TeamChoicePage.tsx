import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface TeamChoicePageProps {
  onNavigate: (page: string) => void;
}

const TeamChoicePage = ({ onNavigate }: TeamChoicePageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
      <motion.div
        className="space-card rounded-2xl p-8 max-w-md w-full border-2 border-primary/30 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text text-center mb-12">
          Team Options
        </h1>

        <Button
          className="w-full mb-6 px-8 py-4 text-lg font-space tracking-wider bg-primary hover:bg-primary-glow text-white rounded-xl shadow-lg"
          onClick={() => onNavigate("registration")}
        >
          Create Team
        </Button>

        <Button
          className="w-full px-8 py-4 text-lg font-space tracking-wider bg-secondary hover:bg-secondary-glow text-white rounded-xl shadow-lg"
          onClick={() => onNavigate("jointeam")} // Placeholder page for join team
        >
          Join Team
        </Button>
      </motion.div>
    </div>
  );
};

export default TeamChoicePage;
