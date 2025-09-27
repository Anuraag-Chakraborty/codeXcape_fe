// Central list of problem statements for randomized assignment
export const PROBLEM_STATEMENTS: string[] = [
  // Education
  "Design a platform that recommends learning resources (videos, quizzes, articles) tailored to the user’s skill level.",
  "Develop a quiz generator that automatically creates questions from uploaded textbooks or lecture notes.",
  "Design an interactive coding platform that suggests improvements and provides hints while students code.",
  "Develop a text-to-speech and speech-to-text learning platform for visually or hearing-impaired students.",
  "Create a career path recommender that suggests courses, certifications, and skills based on student interests.",
  // Health
  "Build a telehealth platform that allows patients to upload symptoms, vitals, and images for preliminary AI-assisted diagnosis before consulting a doctor.",
  "Build a chronic disease management platform that provides reminders, monitors progress, and predicts flare-ups.",
  "Develop a hospital resource prediction tool to forecast ICU bed or oxygen supply requirements during high-demand periods.",
  "Build a computer vision app that identifies plant diseases from leaf images and suggests treatment methods.",
  "Create a fitness tracking app that monitors goals and progress, using simple metrics without complex devices.",
  // Finance
  "Develop a predictive model for stock price movements using historical and real-time data.",
  "Create a loan default prediction system using ML to identify high-risk customers early.",
  "Develop an AI assistant that analyzes spending patterns and sends personalized alerts for overspending or unusual activity.",
  "Create a borrowing and lending workflow system that clearly tracks and guides all steps in the process.",
  "Build a visual investment comparison tool to help beginners evaluate simple investment options.",
  // Supply Chain
  "AI-powered route optimization system for delivery vehicles to reduce travel time and fuel consumption.",
  "AI-powered warehouse robot coordination system to optimize item picking and packing.",
  "Demand forecasting model using ML to predict product demand for retailers/manufacturers.",
  "Multi-modal transport optimization platform combining trucks, rail, air, and sea transport.",
  "Predictive demand-supply matching system to avoid overproduction and reduce inventory costs.",
  "Build a coordination tool for small courier services to schedule, track, and communicate efficiently.",
  // Public Sector
  "Build a system that coordinates fire, police, and medical services during city-wide emergencies using real-time data.",
  "Develop a digital platform to simplify business permits, licenses, and approvals while reducing bureaucracy.",
  "Build an AI-powered solution for route optimization of garbage collection, recycling, and waste disposal.",
  "Create a platform that predicts disaster-prone areas (floods, earthquakes) and suggests preventive measures for local authorities.",
  "Create a municipal data visualization platform to simplify and communicate local statistics effectively.",
  // Liberal Arts
  "Build a platform that helps writers generate story ideas, plots, or dialogue using AI while maintaining a unique creative voice.",
  "Develop an AI tool that composes music or remixes tracks based on user preferences and mood.",
  "Develop a tool that creates comic strips or cartoons based on user-submitted text or ideas.",
  "Develop a motivation and feedback system for creative exercises with points and peer reviews."
];

// Deterministic assignment per team, stored locally.
export function getOrAssignProblem(teamId: string | null): string | null {
  const id = teamId || "default";
  const key = `problemStatement:${id}`;
  const existing = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  if (existing) return existing;
  if (typeof window === 'undefined') return null;

  // Randomly assign from the full list
  const i = Math.floor(Math.random() * PROBLEM_STATEMENTS.length);
  const chosen = PROBLEM_STATEMENTS[i];
  localStorage.setItem(key, chosen);
  return chosen;
}

export function getAssignedProblem(teamId: string | null): string | null {
  const id = teamId || "default";
  const key = `problemStatement:${id}`;
  return typeof window !== 'undefined' ? localStorage.getItem(key) : null;
}