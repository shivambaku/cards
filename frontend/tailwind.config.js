/** @type {import('tailwindcss').Config} */

export function generateRotationDegrees(maxCards) {
  const rotations = [];
  for (let totalCards = 1; totalCards <= maxCards; totalCards++) {
    for (let cardPosition = 0; cardPosition < totalCards; cardPosition++) {
      const delta = 130 / (totalCards - 1);
      rotations.push(`'rotate-[${Math.floor((cardPosition - (totalCards - 1) / 2) * delta)}deg]`);
    }
  }
  return rotations;
}

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        spacing: 'margin, padding',
      },

    },
  },
  plugins: [],
  options: {
    safelist: [],
  },
};
