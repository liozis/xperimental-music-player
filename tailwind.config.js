/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg:        'var(--color-bg)',
        surface:   'var(--color-surface)',
        border:    'var(--color-border)',
        accent:    'var(--color-accent)',
        accent2:   'var(--color-accent2)',
        textPrimary:   'var(--color-text-primary)',
        textSecondary: 'var(--color-text-secondary)',
        bodyBg:        'var(--color-body-bg)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body:    'var(--font-body)',
        mono:    'var(--font-mono)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
        btn:  'var(--radius-btn)',
      },
    },
  },
  plugins: [],
}
