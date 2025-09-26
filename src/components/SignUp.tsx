import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import secureLocalStorage from "react-secure-storage";

interface SignupPageProps {
  onNavigate: (page: string) => void;
  setSignupComplete: (complete: boolean) => void;
}

const SignupPage = ({ onNavigate, setSignupComplete }: SignupPageProps) => {
  const [formData, setFormData] = useState({
    username: "",
    vitEmailId: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("NOT REGISTERED");
  const [statusColor, setStatusColor] = useState("text-red-400");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/;

  const validateForm = () => {
    if (!formData.username.trim()) {
      setStatusMessage("Username is required");
      setStatusColor("text-red-400");
      return false;
    }
    if (!formData.vitEmailId.trim()) {
      setStatusMessage("Email is required");
      setStatusColor("text-red-400");
      return false;
    }
    if (!emailRegex.test(formData.vitEmailId)) {
      setStatusMessage("Invalid email. Must end with @vitstudent.ac.in");
      setStatusColor("text-red-400");
      return false;
    }
    if (!formData.password.trim()) {
      setStatusMessage("Password is required");
      setStatusColor("text-red-400");
      return false;
    }
    if (formData.password.length < 6) {
      setStatusMessage("Password must be at least 6 characters");
      setStatusColor("text-red-400");
      return false;
    }
    if (!confirmPassword) {
      setStatusMessage("Confirm Password is required");
      setStatusColor("text-red-400");
      return false;
    }
    if (formData.password !== confirmPassword) {
      setStatusMessage("Passwords do not match");
      setStatusColor("text-red-400");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const API_URL = import.meta.env.VITE_BE_URL || "https://gravitas-backend-25.onrender.com";
      const response = await axios.post(`${API_URL}/auth/signup`, {
        username: formData.username,
        email: formData.vitEmailId,
        password: formData.password,
      });

      if (response.status === 201) {
        setStatusMessage("REGISTERED SUCCESSFULLY");
        setStatusColor("text-green-400");

        setSignupComplete(true);
        setTimeout(() => {
          onNavigate("login");
        }, 1000);
      } else {
        setStatusMessage("Registration failed");
        setStatusColor("text-red-400");
      }
    } catch (error: any) {
      setStatusMessage(error.response?.data?.message || "Validation error or user already exists");
      setStatusColor("text-red-400");
    } finally {
      setLoading(false);
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
        <motion.h1
          className="text-4xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MEMBER SIGNUP
        </motion.h1>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="USERNAME"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="mb-6">
          <Input
            type="email"
            placeholder="VIT EMAIL ID"
            value={formData.vitEmailId}
            onChange={(e) => setFormData({ ...formData, vitEmailId: e.target.value.trim().toLowerCase() })}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="mb-6">
          <Input
            type="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="mb-6">
          <Input
            type="password"
            placeholder="CONFIRM PASSWORD"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

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
            disabled={loading}
          >
            {loading ? "Signing Up..." : "SIGN UP"}
          </Button>
          <Button
            className="space-button px-8 py-3 font-space tracking-wider"
            onClick={() => onNavigate("login")}
            disabled={loading}
          >
            BACK TO LOGIN
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
