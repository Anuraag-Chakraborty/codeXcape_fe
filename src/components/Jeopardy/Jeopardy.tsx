import React, { useState } from "react";
import Jeopardy from "./components/Jeopardy";
import Timer from "./components/Timer";
import "./Jeopardy.css";

function App({ onComplete }: { onComplete?: () => void }) {
  const [showTimer, setShowTimer] = useState(true);

  const handleTimerEnd = () => {
    setShowTimer(false);
  };

  return (
    <>
      {showTimer ? (
        <Timer onTimerEnd={handleTimerEnd} />
      ) : (
        <Jeopardy onComplete={onComplete} />
      )}
    </>
  );
}

export default App;
