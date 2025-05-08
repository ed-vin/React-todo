// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/React-todo-gamification/',  // 👈 viktigt!
  plugins: [react()]
})
