import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getOrAssignProblem } from "../lib/problemStatements";
import { Button } from "@/components/Hackathon/components/ui/button";
import { CyberInput } from "@/components/Hackathon/components/ui/cyber-input";
import { CyberTextarea } from "@/components/Hackathon/components/ui/cyber-textarea";
import { createDrizzleEffect } from "@/components/Hackathon/components/DrizzleEffect";
import "../index.css";
// Accept optional navigation from main App; fallback to window.history
interface Props {
  onNavigate?: (page: string) => void;
}
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface InitialSubmissionData {
  title: string;
  description: string;
  pptLink: string;
  teamId: string;
  userId: string;
}

const InitialSubmission = ({ onNavigate }: Props) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<InitialSubmissionData>({
    title: "",
    description: "",
    pptLink: "",
    teamId: "",
    userId: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const teamIdLS =
    typeof window !== "undefined"
      ? localStorage.getItem("teamId") || "default"
      : "default";
  const submittedKey = `ideaSubmitted:${teamIdLS}`;
  const [isSubmitted, setIsSubmitted] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem(submittedKey) === "true"
  );
  const [problem, setProblem] = useState<string | null>(null);

  useEffect(() => {
    // Re-evaluate on mount in case of team switch
    const t = localStorage.getItem("teamId") || "default";
    const key = `ideaSubmitted:${t}`;
    setIsSubmitted(localStorage.getItem(key) === "true");
    setProblem(getOrAssignProblem(t));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Trigger drizzle effect on input
    if (value) {
      createDrizzleEffect();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.pptLink.trim()
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simple POST request using teamId, userId from localStorage
      const token = localStorage.getItem("authToken");
      const teamId = localStorage.getItem("teamId");
      const userId = localStorage.getItem("userId");
      const payload = {
        teamId,
        userId,
        title: formData.title,
        description: formData.description,
        pptLink: formData.pptLink,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/hackathon/player/ideaSubmission`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Submission Successful!",
          description: "Your initial submission has been recorded.",
        });
        // lock further submissions for this team
        const t = teamId || "default";
        localStorage.setItem(`ideaSubmitted:${t}`, "true");
        setIsSubmitted(true);
      }

      createDrizzleEffect();

      // Reset form
      setFormData({
        title: "",
        description: "",
        pptLink: "",
        userId: "",
        teamId: "",
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <motion.div
        className="absolute top-8 left-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          className="cyber-button p-3"
          onClick={() =>
            onNavigate ? onNavigate("levels") : window.history.back()
          }
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="font-space text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text glow-text mb-4">
          INITIAL SUBMISSION
        </h1>
        <p className="text-muted-foreground text-lg font-space">
          Submit your project concept and presentation
        </p>
        {problem && (
          <div className="mt-4 mx-auto max-w-3xl p-4 border border-primary/30 rounded-lg bg-black/30 text-primary text-sm font-space">
            <span className="font-semibold">Assigned Problem:</span> {problem}
          </div>
        )}
      </motion.div>

      {/* Form */}
      <motion.div
        className="team-info-panel rounded-xl p-8 w-full max-w-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {isSubmitted && (
          <div className="mb-6 p-4 rounded-md border border-green-500/40 bg-green-500/10 text-green-400 font-space text-sm">
            Initial submission already completed for your team. Editing is
            locked.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Title */}
          <div className="space-y-2">
            <label className="text-primary font-space font-semibold text-lg">
              Project Title *
            </label>
            <CyberInput
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter your project title"
              disabled={isSubmitted}
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-primary font-space font-semibold text-lg">
              Project Description *
            </label>
            <CyberTextarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your project concept, goals, and approach..."
              rows={6}
              disabled={isSubmitted}
              required
            />
          </div>

          {/* PPT Link */}
          <div className="space-y-2">
            <label className="text-primary font-space font-semibold text-lg">
              Presentation Link *
            </label>
            <CyberInput
              name="pptLink"
              value={formData.pptLink}
              onChange={handleInputChange}
              placeholder="https://drive.google.com/... or https://slides.com/..."
              type="url"
              disabled={isSubmitted}
              required
            />
          </div>

          {/* Submit Button */}
          <motion.div
            className="pt-6"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              variant="cyber"
              className="w-full py-4 text-lg font-space tracking-wider"
              disabled={isSubmitting || isSubmitted}
            >
              {isSubmitted
                ? "ALREADY SUBMITTED"
                : isSubmitting
                ? "SUBMITTING..."
                : "SUBMIT PROJECT"}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary rounded-full opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default InitialSubmission;
