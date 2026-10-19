import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // IMPORTANT — set this to match your GitHub repo name exactly, with
  // slashes on both ends, e.g. '/rupalijat-portfolio/'. GitHub Pages
  // serves a project site from https://<user>.github.io/<repo-name>/, not
  // from the domain root, so Vite needs the right sub-path when it builds
  // asset URLs — otherwise index.html references /assets/... which 404s
  // and the page loads blank (this bit an earlier portfolio build).
  base: '/rupalijat-portfolio/',
  build: {
    outDir: 'docs',
  },
})
