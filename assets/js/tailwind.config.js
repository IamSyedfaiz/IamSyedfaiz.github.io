module.exports = {
  content: ["./../../*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#DC2626",
        secondary: "#ffd615",
        tertiary: "#FAFBFE",
        myWhite: "#ffffff",
        myGray: "#111827",
        myPurple: "#057A50",
        myDarkColor: "#080808",
      },
      backgroundImage: {
        "hero-pattern": "url('yourPath')",
      },
      fontFamily: {
        pano: ['"pano"', "sans-serif"],
        MaisonNeueExtended: ['"MaisonNeueExtended-Bold"', "sans-serif"],
        MaisonBlack: ['"MaisonNeueExtended-black"', "sans-serif"],
        MaisonBold: ['"Maison-Bold"', "sans-serif"],
        Nunito: ['"Nunito"', "sans-serif"],
        avenir: ['"Avenir-Book"', "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
