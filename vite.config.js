import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base path за GitHub Pages: https://<user>.github.io/BarberShop/
// Ако репото се преименува, промени стойността тук.
export default defineConfig({
  base: '/BarberShop/',
  plugins: [react(), tailwindcss()],
})
