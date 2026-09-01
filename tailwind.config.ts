import type { Config } from "tailwindcss";
import { colors, radii } from "./lib/theme";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        creme: colors.creme,
        encre: colors.encre,
        mandarine: colors.mandarine,
        basilic: colors.basilic,
        sable: colors.sable,
      },
      borderRadius: {
        card: radii.card,
        banner: radii.banner,
        footer: radii.footer,
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"],
        logo: ["var(--font-logo)", "serif"],
      },
      screens: {
        xs: "375px",
      },
    },
  },
  plugins: [],
};

export default config;
