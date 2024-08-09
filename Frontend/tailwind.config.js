/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primaryColor:"#8a2be2",
        textColor:"#4E545F",
        headingColor:"#181A1E",
        backgroundImage: {
          'custom-gradient': 'linear-gradient(#D8B7FF, #19016B)',
        },
      },
      boxShadow:{
        'custom-blueviolet': '3px 3px blueviolet',
        'custom-shadow' : '60px -16px rgb(159, 136, 187)'
      }
    },
  },
  plugins: [],
}

