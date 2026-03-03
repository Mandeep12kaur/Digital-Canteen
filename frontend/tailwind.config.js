/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6366f1",
                secondary: "#ec4899",
                accent: "#8b5cf6",
                background: "#0f172a",
                "text-muted": "#94a3b8",
                success: "#10b981",
                warning: "#f59e0b",
                danger: "#ef4444",
            }
        },
    },
    plugins: [],
}
