/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#3C65F5',
        'brand-muted': '#6F8BFE',
        'brand-accent': '#FF7B72',
        'surface': '#0C0E16',
        'surface-alt': '#161A24',
        'text-primary': '#F7F7FF',
        'text-secondary': '#A6B0CF',
        'success': '#4CC38A',
        'warning': '#F5A524',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1.5rem',
      },
      boxShadow: {
        card: '0 12px 30px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
}
