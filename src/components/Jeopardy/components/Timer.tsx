// import React, { useState, useEffect } from 'react';

// export default function Timer({ onTimerEnd }) {
//   const [totalSeconds, setTotalSeconds] = useState(300);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     if (totalSeconds === 0) {
//       setMessage("Time's up! Starting the game...");
//       const timer = setTimeout(() => {
//         onTimerEnd?.();
//       }, 2000);
//       return () => clearTimeout(timer);
//     }

//     const interval = setInterval(() => {
//       setTotalSeconds(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [totalSeconds, onTimerEnd]);

//   const minutes = Math.floor(totalSeconds / 60);
//   const seconds = totalSeconds % 60;

//   return (
//     <div style={{
//       backgroundColor: '#050520',
//       color: '#00ffff',
//       // fontFamily: 'Arial, sans-serif',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       height: '100vh',
//       margin: 0
//     }}>
//       <div style={{
//         fontSize: 65,
//         fontWeight: 'bold',
//         textShadow: '2px 2px 4px rgba(0,255,255,0.7)',
//         userSelect: 'none'
//       }}>
//         {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
//       </div>
//       <div style={{
//         fontSize: 24,
//         marginTop: 20,
//         color: '#ff4444'
//       }}>
//         {message}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  onTimerEnd?: () => void;
}

const Timer = ({ onTimerEnd }: TimerProps) => {
  const [totalSeconds, setTotalSeconds] = useState(300); // 5 minutes
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (totalSeconds === 0) {
      setMessage("Time's up! Starting the game...");
      const timer = setTimeout(() => {
        onTimerEnd?.();
      }, 2000);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setTotalSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [totalSeconds, onTimerEnd]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Floating cosmic elements
  const CosmicElement = ({ 
    children, 
    className = "", 
    delay = 0, 
    duration = 6 
  }: { 
    children: React.ReactNode, 
    className?: string, 
    delay?: number, 
    duration?: number 
  }) => (
    <motion.div
      className={`absolute text-primary/30 ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.7, 0.3], 
        scale: [1, 1.2, 1],
        y: [-10, -30, -10],
        rotate: [0, 360]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-space">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Stars */}
        <CosmicElement className="top-20 left-20" delay={0}>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        </CosmicElement>
        <CosmicElement className="top-32 right-32" delay={1}>
          <div className="w-3 h-3 bg-secondary rounded-full animate-pulse"></div>
        </CosmicElement>
        <CosmicElement className="bottom-40 left-40" delay={2}>
          <div className="w-1 h-1 bg-neon-pink rounded-full animate-pulse"></div>
        </CosmicElement>
        <CosmicElement className="bottom-20 right-20" delay={3}>
          <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
        </CosmicElement>

        {/* Cosmic Rings */}
        <CosmicElement className="top-1/4 left-10" delay={0.5} duration={8}>
          <div className="w-16 h-16 border-2 border-primary/20 rounded-full"></div>
        </CosmicElement>
        <CosmicElement className="bottom-1/4 right-10" delay={2.5} duration={10}>
          <div className="w-20 h-20 border border-secondary/20 rounded-full"></div>
        </CosmicElement>

        {/* Floating Planets */}
        <CosmicElement className="top-1/3 right-1/4" delay={1.5} duration={12}>
          <div className="w-8 h-8 bg-gradient-to-br from-neon-purple to-accent rounded-full opacity-40"></div>
        </CosmicElement>
        <CosmicElement className="bottom-1/3 left-1/4" delay={3.5} duration={15}>
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-neon-cyan rounded-full opacity-30"></div>
        </CosmicElement>

        {/* Cosmic Particles */}
        {[...Array(12)].map((_, i) => (
          <CosmicElement 
            key={i}
            className={`${i % 4 === 0 ? 'top-10' : i % 4 === 1 ? 'top-1/2' : i % 4 === 2 ? 'bottom-20' : 'top-3/4'} ${
              i % 3 === 0 ? 'left-5' : i % 3 === 1 ? 'right-5' : 'left-1/2'
            }`}
            delay={i * 0.3}
            duration={4 + (i % 3)}
          >
            <div className="w-1 h-1 bg-primary rounded-full animate-pulse"></div>
          </CosmicElement>
        ))}
      </div>

      {/* Main Timer Card */}
      <motion.div
        className="space-card rounded-3xl p-12 max-w-2xl w-full mx-4 border-4 border-primary/30 cosmic-pulse relative z-10"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          type: "spring", 
          bounce: 0.3 
        }}
      >
        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-primary/50 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-primary/50 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-primary/50 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-primary/50 rounded-br-lg"></div>

        {/* Timer Title */}
        <motion.h1
          className="text-3xl font-space font-bold text-transparent bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 bg-clip-text text-center mb-8 tracking-wider neon-shadow"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          MISSION COUNTDOWN
        </motion.h1>

        {/* Main Timer Display */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="relative inline-block">
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-cosmic opacity-20 blur-xl scale-[1.5]"></div>
            
            {/* Timer digits */}
            <div className="relative bg-space-deep/80 border-4 border-primary/40 rounded-full w-80 h-80 flex items-center justify-center backdrop-blur-md">
              <motion.div
                className="font-space font-black text-6xl timer-glow text-transparent bg-gradient-cosmic bg-clip-text text-blue-400 neon-glow select-none"
                animate={{ 
                  textShadow: totalSeconds <= 10 ? [
                    "0 0 10px hsl(var(--destructive)), 0 0 20px hsl(var(--destructive))",
                    "0 0 20px hsl(var(--destructive)), 0 0 40px hsl(var(--destructive))"
                  ] : undefined
                }}
                transition={{ duration: 0.5, repeat: totalSeconds <= 10 ? Infinity : 0, repeatType: "reverse" }}
              >
                {minutes.toString().padStart(2, '0')}
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="mx-2"
                >
                  :
                </motion.span>
                {seconds.toString().padStart(2, '0')}
              </motion.div>
            </div>
          </div>
          
          {/* Progress Ring */}
          <div className="relative mt-8">
            <svg className="w-32 h-32 mx-auto transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                fill="transparent"
                stroke="hsl(var(--primary) / 0.2)"
                strokeWidth="4"
              />
              <motion.circle
                cx="64"
                cy="64"
                r="56"
                fill="transparent"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 1 }}
                animate={{ pathLength: totalSeconds / 300 }}
                transition={{ duration: 0.5 }}
                style={{
                  pathLength: totalSeconds / 300,
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--secondary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-space text-sm text-primary/60 font-bold">
                {Math.round((totalSeconds / 300) * 100)}%
              </span>
            </div>
          </div>
        </motion.div>

        {/* Status Message */}
        {message && (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-card p-6 border-2 border-destructive/50 bg-destructive/10">
              <motion.p
                className="font-space text-2xl font-bold text-destructive"
                animate={{ 
                  scale: [1, 1.05, 1],
                  textShadow: [
                    "0 0 10px hsl(var(--destructive))",
                    "0 0 20px hsl(var(--destructive))",
                    "0 0 10px hsl(var(--destructive))"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {message}
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Bottom decorative elements */}
        <div className="flex justify-center items-center mt-8 space-x-8">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary rounded-full"
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Timer;