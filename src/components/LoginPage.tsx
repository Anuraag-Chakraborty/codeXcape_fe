import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import secureLocalStorage from "react-secure-storage";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  setLoginComplete: (complete: boolean) => void;
}

const LoginPage = ({ onNavigate, setLoginComplete }: LoginPageProps) => {
  const [formData, setFormData] = useState({
    vitEmailId: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState("NOT LOGGED IN");
  const [statusColor, setStatusColor] = useState("text-red-400");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/;

  const validateForm = () => {
    console.log("Validating form:", formData);
    if (!formData.vitEmailId.trim() || !emailRegex.test(formData.vitEmailId)) {
      console.log("Email validation failed");
      return false;
    }
    if (!formData.password.trim()) {
      console.log("Password empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setStatusMessage("PLEASE ENTER VALID VIT EMAIL ID AND PASSWORD");
      setStatusColor("text-red-400");
      return;
    }
    setLoading(true);
    console.log("Submitting login for:", formData.vitEmailId);

    try {
      const API_URL = import.meta.env.VITE_BE_URL || "https://gravitas-backend-25.onrender.com";
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: formData.vitEmailId,
        password: formData.password,
      });

      console.log("Login response:", response.data);

      if (response.data.accessToken) {
        localStorage.setItem("authToken", response.data.accessToken);
        setStatusMessage("LOGGED IN");
        setStatusColor("text-green-400");
        setLoginComplete(true);

        console.log("Login success, navigate to home");

        setTimeout(() => {
          onNavigate("registration");
        }, 1000);
      } else if (response.data.error) {
        console.log("Backend error:", response.data.error);
        setStatusMessage(response.data.error);
        setStatusColor("text-red-400");
      } else {
        console.log("Unexpected login failure:", response.data);
        setStatusMessage("Login failed. Try again.");
        setStatusColor("text-red-400");
      }
    } catch (err: any) {
      console.error("Login failed catch block:", err);
      setStatusMessage("Login failed. Please check your credentials.");
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
        {/* Title */}
        <motion.h1
          className="text-4xl font-space font-bold text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          MEMBER LOGIN
        </motion.h1>

        {/* VIT Email ID Input */}
        <div className="mb-6">
          <Input
            type="email"
            placeholder="VIT EMAIL ID"
            value={formData.vitEmailId}
            onChange={(e) => {
              console.log("Email changed:", e.target.value);
              setFormData({ ...formData, vitEmailId: e.target.value });
            }}
            className="bg-space-deep border border-primary/30 text-primary font-space placeholder:text-primary/40 focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <Input
            type="password"
            placeholder="PASSWORD"
            value={formData.password}
            onChange={(e) => {
              console.log("Password changed");
              setFormData({ ...formData, password: e.target.value });
            }}
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
            disabled={loading}
          >
            {loading ? "Logging In..." : "LOGIN"}
          </Button>
          <Button
            className="space-button px-8 py-3 font-space tracking-wider"
            onClick={() => onNavigate("home")}
            disabled={loading}
          >
            BACK
          </Button>
        </motion.div>

        <div className="text-center mt-4 text-primary font-space text-sm">
          Didn't register yet?{' '}
          <button
            className="text-primary-glow underline cursor-pointer font-semibold"
            onClick={() => onNavigate("signup")}
          >
            Sign up
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
