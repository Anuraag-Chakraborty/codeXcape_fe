import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        'space': ['Press Start 2P', 'monospace'],
        'press-start': ['Press Start 2P', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          glow: "hsl(var(--secondary-glow))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          glow: "hsl(var(--card-glow))",
        },
        space: {
          deep: "hsl(var(--background-deep))",
          nebula: "hsl(var(--background-nebula))",
          cyan: "hsl(var(--glow-cyan))",
          gold: "hsl(var(--glow-gold))",
          purple: "hsl(var(--glow-purple))",
        },
      },
      animation: {
        'twinkle': 'twinkle 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'burn-disintegrate': 'burn-disintegrate 1.5s ease-out forwards',
        'drizzleFall': 'drizzleFall 1s linear forwards',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        twinkle: {
          '0%': { opacity: '0.8' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.8' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(0, 255, 238, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 255, 238, 0.3), 0 0 50px rgba(0, 255, 238, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 255, 238, 0.3)' },
        },
        'burn-disintegrate': {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.1)' },
          '100%': { opacity: '0', transform: 'scale(0.8) rotate(5deg)' },
        },
        'drizzleFall': {
          from: { transform: 'translateY(-10px)', opacity: '1' },
          to: { transform: 'translateY(100vh)', opacity: '0' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} as Config;