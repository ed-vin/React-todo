// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/React-todo/',  // viktigt: måste matcha repo-namnet
  plugins: [react()],
})
