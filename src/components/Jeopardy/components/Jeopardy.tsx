import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added for navigation
import "./Jeopardy.css";

const API_BASE = import.meta.env.VITE_BE_URL;
const axiosInstance = axios.create({
  baseURL: API_BASE,
});

const categories = [
  { id: "2bcbf4eb-7211-47d8-b46e-5a0ce0273da5", name: "FinTech Frontier" },
  { id: "91505992-b5fd-4541-bfa0-02ecf2415bb6", name: "Language Lab" },
  { id: "b15b5d75-18d7-4c12-a6fe-729b117764fc", name: "What's That Tech?" },
  { id: "c8035958-0082-4948-a587-bb53212a36c3", name: "Brain Benders" },
  { id: "e6a60e63-08ef-4d5e-9b55-9eeb5e6f0794", name: "Expand It!!" },
];

const difficultyMap = {
  200: "Very Easy",
  400: "Easy",
  600: "Medium",
  800: "Hard",
  1000: "Very Hard",
};

export default function Jeopardy({ onComplete }: { onComplete?: () => void }) {
  const navigate = useNavigate(); // initialize navigate

  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // categoryId-difficulty
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your correct countdown target time here
  const targetTime = new Date("2025-09-27T21:16:00");

  useEffect(() => {
    const timerId = setInterval(() => {
      const now = new Date();
      const diff = targetTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timerId); 
        navigate("levels"); 
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [targetTime, navigate]);

  const fetchAttemptedQuestions = async () => {
    try {
      const USER_ID = localStorage.getItem("userId");
      const TEAM_ID = localStorage.getItem("teamId");
      const JWT_TOKEN = localStorage.getItem("authToken");
      const res = await axiosInstance.post(
        "/jeopardy/player/get-attempted",
        { teamId: TEAM_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      );
      if (res.data?.attempted) setAnsweredQuestions(res.data.attempted);
    } catch (err) {
      console.error("Failed to fetch attempted questions:", err);
    }
  };

  const fetchTeamPoints = async () => {
    try {
      const USER_ID = localStorage.getItem("userId");
      const TEAM_ID = localStorage.getItem("teamId");
      const JWT_TOKEN = localStorage.getItem("authToken");
      const res = await axiosInstance.post(
        "/jeopardy/player/teampoints",
        { teamId: TEAM_ID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      );
      setScore(res.data?.team?.teamPoints ?? 0);
    } catch (err) {
      console.error("Failed to fetch team points:", err);
    }
  };

  useEffect(() => {
    fetchTeamPoints();
    fetchAttemptedQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    if (submitted) return;
    setSelectedOption(option);
  };

  const handleQuestionClick = async (questionId, categoryId, difficulty) => {
    if (answeredQuestions.includes(questionId) || loading) return;

    try {
      setLoading(true);
      const USER_ID = localStorage.getItem("userId");
      const TEAM_ID = localStorage.getItem("teamId");
      const JWT_TOKEN = localStorage.getItem("authToken");
      const response = await axiosInstance.post(
        "/jeopardy/player/choose-question",
        { userId: USER_ID, teamId: TEAM_ID, categoryId, difficulty },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      );

      setAnsweredQuestions((prev) => [...prev, questionId]);

      const backendQuestionId = response.data.question.id;
      setCurrentQuestion({
        frontendId: questionId,
        id: backendQuestionId,
        value: response.data.question.points || 0,
        displayValue: response.data.question.points || 0,
        question: response.data.question.questionText,
        options: response.data.question.options,
      });

      setSelectedOption(null);
      setFeedback(null);
      setSubmitted(false);
      setModalVisible(true);
    } catch (err) {
      console.error("Choose question error:", err);
      alert(`Failed to choose question: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    if (!selectedOption || !currentQuestion?.id || loading) return;

    try {
      setLoading(true);
      const USER_ID = localStorage.getItem("userId");
      const TEAM_ID = localStorage.getItem("teamId");
      const JWT_TOKEN = localStorage.getItem("authToken");
      const res = await axiosInstance.post(
        "/jeopardy/player/submit-answer",
        {
          userId: USER_ID,
          teamId: TEAM_ID,
          questionId: currentQuestion.id,
          selectedOption,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT_TOKEN}`,
          },
        }
      );

      setFeedback(res.data.correct ? "correct" : "incorrect");
      setSubmitted(true);
      fetchTeamPoints();
    } catch (err) {
      console.error("Submit answer error:", err);
      alert(`Failed to submit answer: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    setModalVisible(false);
    setCurrentQuestion(null);
    setSelectedOption(null);
    setFeedback(null);
    setSubmitted(false);
  };

  const renderGameBoard = () => {
    const values = [200, 400, 600, 800, 1000];

    return (
      <>
        {categories.map((cat) => (
          <div key={`header-${cat.id}`} className="category-header">
            {cat.name}
          </div>
        ))}

        {values.map((val) =>
          categories.map((cat) => {
            const difficulty = difficultyMap[val];
            const questionId = `${cat.id}-${difficulty}`;
            const isAnswered = answeredQuestions.includes(questionId);

            return (
              <div
                key={questionId}
                className={`value-cell ${isAnswered ? "answered" : ""}`}
                onClick={() =>
                  !isAnswered && handleQuestionClick(questionId, cat.id, difficulty)
                }
                role="button"
                aria-disabled={isAnswered}
                tabIndex={isAnswered ? -1 : 0}
                onKeyDown={(e) => {
                  if (!isAnswered && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleQuestionClick(questionId, cat.id, difficulty);
                  }
                }}
              >
                ${val}
              </div>
            );
          })
        )}
      </>
    );
  };

  const valuesList = [200, 400, 600, 800, 1000];
  const expectedIds = categories.flatMap((cat) =>
    valuesList.map((v) => `${cat.id}-${difficultyMap[v]}`)
  );
  const normalizedAnswered = (answeredQuestions || [])
    .map((x) => {
      if (typeof x === "string") return x;
      if (x && typeof x === "object") {
        const cat = x.categoryId || x.category?.id || x.categoryID;
        const diff = x.difficulty || x.level || x.difficultyLabel;
        if (cat && diff) return `${cat}-${diff}`;
      }
      return null;
    })
    .filter(Boolean);
  const allAnswered = expectedIds.every((id) => normalizedAnswered.includes(id));

  return (
    <>
      {/* Timer below logout button (fixed top right) */}
      <div
        className="fixed top-14 right-4 z-20 font-space rounded-md px-3 py-1 text-primary bg-black/70 border-2 border-white/50 backdrop-blur-sm shadow-lg shadow-primary/30"
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          userSelect: "none",
          minWidth: "130px",
          textAlign: "center",
          boxShadow:
            "0 0 8px rgb(126 63 242 / 0.7), 0 0 12px rgb(176 132 255 / 0.5)",
        }}
      >
        {`${timeLeft.hours.toString().padStart(2, "0")} : ${timeLeft.minutes
          .toString()
          .padStart(2, "0")} : ${timeLeft.seconds.toString().padStart(2, "0")}`}
      </div>

      <div className="score-badge">Score: {score}</div>
      <div className="game-board">{renderGameBoard()}</div>

      {allAnswered && !modalVisible && (
        <div className="completion-controls" style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            className="space-button px-6 py-2"
            onClick={() => {
              const TEAM_ID = localStorage.getItem("teamId") || "default";
              localStorage.setItem(`level1Completed:${TEAM_ID}`, "true");
              onComplete?.();
            }}
          >
            Complete Level 1
          </button>
        </div>
      )}

      {modalVisible && currentQuestion && (
        <div className="modal">
          <div className="modal-content">
            <div className="question-value">
              {currentQuestion.displayValue || currentQuestion.value}
            </div>
            <div
              className={
                feedback === "correct"
                  ? "correct"
                  : feedback === "incorrect"
                  ? "incorrect"
                  : ""
              }
            >
              {feedback === "correct"
                ? "Correct!"
                : feedback === "incorrect"
                ? "Incorrect!"
                : currentQuestion.question}
            </div>

            {!feedback && (
              <>
                <div className="options-container">
                  {Object.entries(currentQuestion.options).map(([key, value], i) => (
                    <label key={i} className="option-item">
                      <input
                        type="radio"
                        name="answerOption"
                        value={key}
                        checked={selectedOption === key}
                        onChange={() => handleOptionSelect(key)}
                        disabled={submitted || loading}
                      />
                      <span>
                        {key}: {String(value)}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedOption || submitted || loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button onClick={handleContinue} disabled={loading}>
                  Skip / Continue
                </button>
              </>
            )}

            {feedback && (
              <button onClick={handleContinue} disabled={loading}>
                Continue
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
