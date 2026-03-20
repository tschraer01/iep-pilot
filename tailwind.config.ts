import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          DEFAULT: '#1E6B4F',
          50: '#F0F7F4',
          100: '#D9EFE8',
          200: '#B8E0D5',
          300: '#8CCCC0',
          400: '#5FB0A1',
          500: '#1E6B4F',
          600: '#1A5C44',
          700: '#164D39',
          800: '#123E2E',
          900: '#0E2F23',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
