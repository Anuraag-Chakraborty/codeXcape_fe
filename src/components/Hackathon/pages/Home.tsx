import { motion } from "framer-motion";
import { Button } from "@/components/Hackathon/components/ui/button";
import { useEffect, useState } from "react";
import "../index.css";

interface Props {
  onNavigate?: (page: string) => void;
}

const Home = ({ onNavigate }: Props) => {
  const [ideaLocked, setIdeaLocked] = useState(false);
  const [finalLocked, setFinalLocked] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("teamId") || "default";
    setIdeaLocked(localStorage.getItem(`ideaSubmitted:${t}`) === "true");
    setFinalLocked(localStorage.getItem(`finalSubmitted:${t}`) === "true");
  }, []);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
      {/* Animated Title */}
      <motion.div
        className="relative mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative z-10 flex items-center justify-center font-space text-6xl md:text-8xl font-bold">
          <motion.span
            className="text-transparent bg-gradient-to-r from-primary to-primary-glow bg-clip-text glow-text"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            HACK
          </motion.span>
          <motion.span
            className="text-transparent bg-gradient-to-r from-secondary to-secondary-glow bg-clip-text glow-text ml-4"
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              delay: 1.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            PORTAL
          </motion.span>
        </div>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2 }}
      >
        <p className="text-xl text-muted-foreground font-space">
          Submit your innovative projects to the future
        </p>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        className="flex flex-col gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <div className="flex items-center gap-3">
          <Button
            variant="cyber"
            className="px-12 py-6 text-lg font-space tracking-wider rounded-xl disabled:opacity-60"
            disabled={ideaLocked}
            onClick={() => onNavigate?.("hack-initial")}
          >
            INITIAL SUBMISSION
          </Button>
          {ideaLocked && (
            <span className="text-green-400 font-space text-sm">
              ✓ Submitted
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="cyber"
            className="px-12 py-6 text-lg font-space tracking-wider rounded-xl disabled:opacity-60"
            disabled={finalLocked}
            onClick={() => onNavigate?.("hack-final")}
          >
            FINAL SUBMISSION
          </Button>
          {finalLocked && (
            <span className="text-green-400 font-space text-sm">
              ✓ Submitted
            </span>
          )}
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full opacity-30 float-particle"
          style={{
            left: `${10 + i * 10}%`,
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

      {/* Secondary particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`secondary-${i}`}
          className="absolute w-1 h-1 bg-secondary rounded-full opacity-40 float-particle"
          style={{
            right: `${5 + i * 15}%`,
            top: `${30 + Math.random() * 40}%`,
          }}
          animate={{
            x: [-15, 15, -15],
            y: [-10, 10, -10],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Home;
