import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    daisyui: {
      themes: [
        {
          light: {
            "primary": "#67e8f9",
            "secondary": "#facc15",
            "accent": "#047857",
            "neutral": "#292524",
            "base-100": "#f5f5f4",
            "info": "#67e8f9",
            "success": "#4ade80",
            "warning": "#ea580c",
            "error": "#f43f5e",
          },
          dark: {
            "primary": "#009bff",
            "secondary": "#6366f1",
            "accent": "#8b5cf6",
            "neutral": "#374151",
            "base-100": "#1f2937",
            "info": "#00c2fe",
            "success": "#00b057",
            "warning": "#ea580c",
            "error": "#be123c",
          },
        },
      ],
    },
  },
  plugins: [require("daisyui")],
}
export default config
