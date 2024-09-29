import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

const noOfPages = 8;
const inputs = {};

for (let i = 1; i <= noOfPages; i++) {
  inputs[`project${i}`] = `./${i.toString().padStart(2, '0')}/index.html`;
}


export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Main entry point
        ...inputs
      },
    },
  },
  plugins: [glsl()]
});