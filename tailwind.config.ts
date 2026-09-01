import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--paper)',
        paper2: 'var(--paper-2)',
        muted: 'var(--muted)',
        faint: 'var(--faint)',
        line: 'var(--line)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-text)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wide: '1440px',
      },
    },
  },
  plugins: [],
}

export default config
