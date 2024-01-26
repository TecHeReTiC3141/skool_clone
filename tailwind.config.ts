import type {Config} from 'tailwindcss'

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
                    customDark: {
                        "primary": "#009bff",
                        "secondary": "#6366f1",
                        "accent": "#ececec",
                        "neutral": "#374151",
                        "base-100": "#1f2937",
                        "info": "#00c2fe",
                        "success": "#00b057",
                        "warning": "#ea580c",
                        "error": "#be123c",
                    },
                    customLight: {
                        "primary": "#67e8f9",
                        "secondary": "#facc15",
                        "accent": "#070001",
                        "neutral": "#f4f4f4",
                        "base-100": "#ececec",
                        "info": "#67e8f9",
                        "success": "#4ade80",
                        "warning": "#ea580c",
                        "error": "#f43f5e",
                    },

                },
            ],
        },
    },
    plugins: [require("daisyui")],
}
export default config
