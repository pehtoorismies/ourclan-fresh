import type { Config } from 'tailwindcss'

export default {
  content: [
    '{routes,islands,components}/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: '"Playfair Display"',
      },
    },
  },
  darkMode: 'class',
} satisfies Config
