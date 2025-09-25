import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignupPageProps {
  onNavigate: (page: string) => void;
  setSignupComplete: (complete: boolean) => void;
}

const SignupPage = ({ onNavigate, setSignupComplete }: SignupPageProps) => {
  const [formData, setFormData] = useState({
    username: "",
    vitEmailId: "",
    password: "",
    confirmPassword: "",
  });
  const [statusMessage, setStatusMessage] = useState("NOT REGISTERED");
  const [statusColor, setStatusColor] = useState("text-red-400");

  const validateForm = () => {
    if (!formData.username.trim()) return false;
    if (!formData.vitEmailId.trim() || !formData.vitEmailId.includes("@vitstudent.ac.in")) return false;
    if (!formData.password.trim()) return false;
    if (formData.password !== formData.confirmPassword) return false;
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setStatusMessage("REGISTERED SUCCESSFULLY");
      setStatusColor("text-green-400");

      setSignupComplete(true);

      setTimeout(() => {
        onNavigate("login"); // Navigate to login after signup
      }, 1000);
    } else {
      setStatusMessage("PLEASE FILL ALL FIELDS CORRECTLY AND MATCH PASSWORDS");
      setStatusColor("text-red-400");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 p-4">
      <motion.div
        className="space-card rounded-2xl p-8 max-w-lg w-full border-2 border-primary/30"
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
          MEMBER SIGNUP
        </motion.h1>

        {/* Username Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="USERNAME"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* VIT Email ID Input */}
        <div className="mb-6">
          <Input
            type="email"
            placeholder="VIT EMAIL ID"
            value={formData.vitEmailId}
            onChange={(e) => setFormData({ ...formData, vitEmailId: e.target.value })}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <Input
            type="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6">
          <Input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Submit Section */}
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
            onClick={handleSubmit}
          >
            SIGN UP
          </Button>
          <Button
            className="space-button px-8 py-3 font-space tracking-wider"
            onClick={() => onNavigate("login")}
          >
            BACK TO LOGIN
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};


export default SignupPage;
