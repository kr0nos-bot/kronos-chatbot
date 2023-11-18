/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    // darkMode: 'class',
    theme: {
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: '#000',
            gray: {
                0: '#1C1C1E',
                10: '#AEAEB2',
                100: '#3A3A3C',
                200: '#626262'
            },
            white: '#fff',
            gold: '#FFD600',
            green: '#00D108'
        },
        container: {
            center: true,
            padding: '1rem'
        },
        screens: {
            xs: '450px',
            sm: '575px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1400px'
        }
    },
    daisyui: {
        themes: ['black']
    },
    plugins: [require('daisyui')]
}
