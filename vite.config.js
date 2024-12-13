// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: './', // Ersetze durch den Namen deines Repositories
  plugins: [react()],
});