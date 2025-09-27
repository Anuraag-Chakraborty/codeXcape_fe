import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "@/components/Hackathon/components/ui/button";
import { CyberInput } from "@/components/Hackathon/components/ui/cyber-input";
import { createDrizzleEffect } from "@/components/Hackathon/components/DrizzleEffect";
import "../index.css";
import axios from "axios";
// Accept optional navigation from main App; fallback to window.history
interface Props {
  onNavigate?: (page: string) => void;
}
import { ArrowLeft, Github, FileText, Figma } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FinalSubmissionData {
  githubLink: string;
  finalPptLink: string;
  figmaLink: string;
}

const FinalSubmission = ({ onNavigate }: Props) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FinalSubmissionData>({
    githubLink: "",
    finalPptLink: "",
    figmaLink: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const teamIdLS =
    typeof window !== "undefined"
      ? localStorage.getItem("teamId") || "default"
      : "default";
  const submittedKey = `finalSubmitted:${teamIdLS}`;
  const [isSubmitted, setIsSubmitted] = useState(
    typeof window !== "undefined" &&
      localStorage.getItem(submittedKey) === "true"
  );

  useEffect(() => {
    const t = localStorage.getItem("teamId") || "default";
    const key = `finalSubmitted:${t}`;
    setIsSubmitted(localStorage.getItem(key) === "true");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      !formData.githubLink.trim() ||
      !formData.finalPptLink.trim() ||
      !formData.figmaLink.trim()
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
        githubLink: formData.githubLink,
        finalPptLink: formData.finalPptLink,
        figmaLink: formData.figmaLink,
      };
      const response = await axios.post(
        `${import.meta.env.VITE_BE_URL}/hackathon/player/finalSubmission`,
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
          title: "Final Submission Complete!",
          description:
            "Your project has been successfully submitted for evaluation.",
        });
        // lock further submissions for this team
        const t = teamId || "default";
        localStorage.setItem(`finalSubmitted:${t}`, "true");
        setIsSubmitted(true);
      }

      createDrizzleEffect();

      // Reset form
      setFormData({
        githubLink: "",
        finalPptLink: "",
        figmaLink: "",
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
        <h1 className="font-space text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text glow-text mb-4">
          FINAL SUBMISSION
        </h1>
        <p className="text-muted-foreground text-lg font-space">
          Submit your completed project deliverables
        </p>
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
            Final submission already completed for your team. Editing is locked.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* GitHub Link */}
          <div className="space-y-2">
            <label className="text-primary font-space font-semibold text-lg flex items-center gap-2">
              <Github className="w-5 h-5" />
              GitHub Repository *
            </label>
            <CyberInput
              name="githubLink"
              value={formData.githubLink}
              onChange={handleInputChange}
              placeholder="https://github.com/username/repository"
              type="url"
              disabled={isSubmitted}
              required
            />
            <p className="text-xs text-muted-foreground font-space">
              Link to your complete project source code
            </p>
          </div>

          {/* Final PPT Link */}
          <div className="space-y-2">
            <label className="text-primary font-space font-semibold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Final Presentation *
            </label>
            <CyberInput
              name="finalPptLink"
              value={formData.finalPptLink}
              onChange={handleInputChange}
              placeholder="https://drive.google.com/... or https://slides.com/..."
              type="url"
              disabled={isSubmitted}
              required
            />
            <p className="text-xs text-muted-foreground font-space">
              Updated presentation with final results and demo
            </p>
          </div>

          {/* Figma Link */}
          <div className="space-y-2">
            <label className="text-primary font-space font-semibold text-lg flex items-center gap-2">
              <Figma className="w-5 h-5" />
              Design Mockups *
            </label>
            <CyberInput
              name="figmaLink"
              value={formData.figmaLink}
              onChange={handleInputChange}
              placeholder="https://figma.com/... or other design tool link"
              type="url"
              disabled={isSubmitted}
              required
            />
            <p className="text-xs text-muted-foreground font-space">
              UI/UX designs, wireframes, or prototypes
            </p>
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
                ? "FINALIZING..."
                : "SUBMIT FINAL PROJECT"}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* Success Message Area */}
      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-sm text-muted-foreground font-space max-w-lg">
          Once submitted, your project will be reviewed by our panel of judges.
          Results will be announced during the closing ceremony.
        </p>
      </motion.div>

      {/* Floating Particles - Different pattern for final submission */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-secondary rounded-full opacity-25"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.25, 0.7, 0.25],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FinalSubmission;
