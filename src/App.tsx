import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import components
import StarfieldBackground from "./components/StarfieldBackground";
import HomePage from "./components/HomePage";
import InstructionsPage from "./components/InstructionsPage";
import RegistrationPage from "./components/RegistrationPage";
import LevelPage from "./components/LevelPage";
import Jeopardy from "./components/Jeopardy/Jeopardy";
import ScotlandYardGame from "./components/ScotlandYardGame";
import ResultsScreen from "./components/ResultsScreen";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUp";
import TeamChoicePage from "./components/TeamChoicePage";
import JoinTeam from "./components/JoinTeam";

const queryClient = new QueryClient();

interface TeamData {
  teamName: string;
  members: string[];
}

const App = () => {
  const API_URL = import.meta.env.VITE_BE_URL;
  const userId = localStorage.getItem("authToken");
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [teamData, setTeamData] = useState<TeamData>({
    teamName: "",
    members: [],
  });
  const [isRegistrationComplete, setRegistrationComplete] = useState(false);
  const [totalMozCoins, setTotalMozCoins] = useState(0);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleGameComplete = (points: number) => {
    setTotalMozCoins((prev) => prev + points);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setRegistrationComplete(true);
    }
    const storedTeamName = localStorage.getItem("teamName");
    const storedTeamCode = localStorage.getItem("teamCode");
    if (storedTeamName) {
      setTeamData((prev) => ({ ...prev, teamName: storedTeamName }));
    }
    // Optionally use team code later for fetching full team data if needed
    if (storedTeamCode) {
      // no-op for now
    }
  }, []);

  const handleLogout = () => {
    setTeamData({ teamName: "", members: [] });
    localStorage.removeItem("authToken");
    setRegistrationComplete(false);
    setUserLoggedIn(false); // just in case
    localStorage.clear();
    console.log(JSON.stringify({ localStorage }, null, 2));
    handleNavigate("home"); // or "login"
    window.location.reload();
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            teamData={teamData}
            setTeamData={setTeamData}
            isRegistrationComplete={isRegistrationComplete}
          />
        );
      case "instructions":
        return <InstructionsPage onNavigate={handleNavigate} />;
      case "registration":
        return (
          <RegistrationPage
            onNavigate={handleNavigate}
            teamData={teamData}
            setTeamData={setTeamData}
            setRegistrationComplete={setRegistrationComplete}
          />
        );
      case "teamChoice":
        return <TeamChoicePage onNavigate={handleNavigate} />;
      case "jointeam":
        return (
          <JoinTeam onNavigate={handleNavigate} setTeamData={setTeamData} />
        );
      case "levels":
        return <LevelPage onNavigate={handleNavigate} teamData={teamData} />;
      case "jeopardy":
        return (
          <Jeopardy/>
        );
      case "scotland-yard":
        return (
          <ScotlandYardGame
            onNavigate={handleNavigate}
            onGameComplete={handleGameComplete}
          />
        );
      case "login":
        return (
          <LoginPage
            onNavigate={handleNavigate}
            setLoginComplete={(complete) => {
              if (complete) {
                setRegistrationComplete(true);
                handleNavigate("teamChoice");
              }
            }}
          />
        );
      case "signup":
        return (
          <SignupPage
            onNavigate={handleNavigate}
            setSignupComplete={(complete) => {
              if (complete) {
                handleNavigate("login");
              }
            }}
          />
        );
      case "results":
        return (
          <ResultsScreen
            onNavigate={handleNavigate}
            teamData={teamData}
            totalMozCoins={totalMozCoins}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            teamData={teamData}
            setTeamData={setTeamData}
            isRegistrationComplete={isRegistrationComplete}
          />
        );
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <>
          {/* Starfield Background */}
          <StarfieldBackground />

          {/* Logout Button shown on all pages if logged in */}
          {isRegistrationComplete && (
            <button
              onClick={handleLogout}
              className="fixed top-4 right-4 px-4 py-2 bg-primary text-black rounded-md font-semibold hover:bg-primary-glow transition z-50"
            >
              Logout
            </button>
          )}

          <div className="relative z-10">{renderCurrentPage()}</div>
        </>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
