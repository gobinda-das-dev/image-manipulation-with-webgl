import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Main entry point
        project1: '01/index.html', // Route for 01 project
        project2: '02/index.html', // Route for 02 project
        project3: '03/index.html', // Route for 03 project
      },
    },
  },
  plugins: [glsl()]
});