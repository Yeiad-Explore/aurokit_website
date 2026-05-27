import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          base: "#030405",
          elevated: "#07090A",
          panel: "#0B0D0E",
          deep: "#050607",
        },
        text: {
          primary: "#F4F6F4",
          secondary: "#A8B0AA",
          muted: "#6E7670",
          faint: "#3E4540",
        },
        glow: {
          mist: "#DDEBE1",
          sage: "#AAB8AA",
          cyan: "#D8EFEA",
          lime: "#DCE7BA",
          coral: "#F07367",
          gold: "#D9C16E",
          violet: "#C7B6E6",
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.055em',
        tighter: '-0.045em',
        tight: '-0.025em',
      },
      borderRadius: {
        '4xl': '28px',
      },
      transitionTimingFunction: {
        'out-soft': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'drift-slow': 'drift 22s ease-in-out infinite',
        'drift-fast': 'drift 14s ease-in-out infinite reverse',
        'shimmer': 'shimmer 8s linear infinite',
        'rise': 'rise 900ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-down': {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'scaleY(1)', opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
