module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'sans-serif'], // Set Nunito as the default sans-serif font
      },
      colors:
      {
        beige:
        {
          100: '#EAE7DD',
          200: '#d4cbaf'
        },
        brownie:
        {
          100:'#99775C',
          200:'#BFA489'

        }
      }
    },
  },
  plugins: [],
};
