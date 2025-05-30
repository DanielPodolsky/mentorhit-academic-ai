import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
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
			colors: {
				// HIT Official Color Palette
				hit: {
					dark: '#032F32',      // For chat bubbles
					secondary: '#007377',  // Sidebar titles/interface
					primary: '#0097A7',    // Main headlines/titles
					light: '#E8F7F8',     // Background
					'light-hover': '#D1F2F4', // Hover states
					'primary-hover': '#007B87', // Primary hover
					'secondary-hover': '#005F62', // Secondary hover
				},

				// Shadcn/ui color system mapped to HIT colors
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},

				// Sidebar colors
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},

				// Chat-specific colors
				chat: {
					primary: "hsl(var(--chat-primary))",
					"primary-foreground": "hsl(var(--chat-primary-foreground))",
				},
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
				// HIT-specific animations
				"hit-fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"hit-slide-in": {
					"0%": { opacity: "0", transform: "translateX(-20px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				"hit-pulse": {
					"0%, 100%": { transform: "scale(1)" },
					"50%": { transform: "scale(1.05)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"hit-fade-in": "hit-fade-in 0.5s ease-out",
				"hit-slide-in": "hit-slide-in 0.3s ease-out",
				"hit-pulse": "hit-pulse 2s ease-in-out infinite",
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
			},
			backgroundImage: {
				'hit-gradient': 'linear-gradient(135deg, #E8F7F8 0%, #B8E6E8 50%, #7DD3DA 100%)',
				'hit-gradient-dark': 'linear-gradient(135deg, #032F32 0%, #007377 50%, #0097A7 100%)',
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config