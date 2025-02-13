// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  base: '/TRAtoKML_Web/', // Genaue Schreibweise des Repo-Namens!
  plugins: [react()],
});
