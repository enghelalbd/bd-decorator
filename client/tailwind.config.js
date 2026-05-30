/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            fontFamily: {
                display: ['"Playfair Display"', 'serif'],
            },
        },
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                styledecor: {
                    primary: '#b8860b',
                    'primary-content': '#ffffff',
                    secondary: '#2c3e50',
                    accent: '#e8b86d',
                    neutral: '#1f2937',
                    'base-100': '#fffaf3',
                    'base-200': '#f4ece0',
                    'base-300': '#e6d8c2',
                    info: '#3abff8',
                    success: '#22c55e',
                    warning: '#f59e0b',
                    error: '#ef4444',
                },
            },
            'dark',
        ],
    },
};
