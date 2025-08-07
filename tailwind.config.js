// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': '#F8F5F2', // Um branco mais quente, "creme"
        'text-primary': '#2C2C2C', // Um preto mais suave
        'text-secondary': '#6B6B6B', // Um cinza para textos secundários
        'accent': '#E76F51', // Um tom "terracota" para destaque
        'accent-hover': '#F4A261', // Um tom mais claro para hover
      }
    },
  },
  plugins: [],
}