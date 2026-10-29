import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
// "./" keeps asset links relative so the build works from a GitHub Pages sub-path (https://<user>.github.io/<repo>/)
export default defineConfig({ base: "./", plugins: [react()], server: { cors: true } })
