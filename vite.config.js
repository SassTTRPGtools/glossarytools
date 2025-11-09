import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/glossarytools/', // GitHub Pages 子路徑，根據實際 repo 名稱調整
  build: {
    outDir: 'docs' // 輸出至 docs 資料夾供 GitHub Pages 使用
  }
})
