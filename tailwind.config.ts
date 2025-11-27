/** @type {import('tailwindcss').Config} */
module.exports = {
  // Class-based dark mode pairs with the `.dark` selector set in your app.
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // No custom color mapping here — use CSS variables directly via arbitrary values:
  // Examples:
  //   text-[var(--brand-500)]
  //   bg-[var(--gray_blue-50)]
  //   border-[var(--gray_neutral-200)]
  //   ring-[var(--blue-500)]
  //   fill-[var(--pink-400)] stroke-[var(--orange_dark-700)]
  theme: {
    extend: {},
  },
  plugins: [],
};
