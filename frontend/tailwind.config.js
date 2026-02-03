/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'molti-purple': '#8B5CF6',
                'molti-blue': '#3B82F6',
                'molti-green': '#10B981',
            },
        },
    },
    plugins: [],
}
