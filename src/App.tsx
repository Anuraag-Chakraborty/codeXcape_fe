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
import JeopardyGame from "./components/JeopardyGame";
import ScotlandYardGame from "./components/ScotlandYardGame";
import ResultsScreen from "./components/ResultsScreen";

const queryClient = new QueryClient();

interface TeamData {
  teamName: string;
  members: string[];
}

const App = () => {
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
    setTotalMozCoins(prev => prev + points);
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
      case "levels":
        return <LevelPage onNavigate={handleNavigate} teamData={teamData} />;
      case "jeopardy":
        return (
          <JeopardyGame
            onNavigate={handleNavigate}
            onGameComplete={handleGameComplete}
          />
        );
      case "scotland-yard":
        return (
          <ScotlandYardGame
            onNavigate={handleNavigate}
            onGameComplete={handleGameComplete}
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
        
        {/* Main Application */}
        <>
          {/* Starfield Background */}
          <StarfieldBackground />
          
          {/* Current Page Content */}
          <div className="relative z-10">
            {renderCurrentPage()}
          </div>
        </>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
