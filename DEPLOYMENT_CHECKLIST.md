# 🚀 部署檢查清單

在部署至 GitHub Pages 之前，請完成以下檢查項目。

## ✅ 本地測試

- [ ] **安裝依賴**
  ```bash
  npm install
  ```

- [ ] **啟動開發伺服器**
  ```bash
  npm run dev
  ```
  確認可以在 `http://localhost:5173` 正常訪問

- [ ] **測試資料載入**
  - [ ] 上傳 `examples/sample.csv` 測試
  - [ ] 測試 Google Sheets URL（如果有）
  - [ ] 確認資料正確顯示

- [ ] **測試搜尋功能**
  - [ ] 輸入中文關鍵字
  - [ ] 輸入英文關鍵字
  - [ ] 確認搜尋結果正確

- [ ] **測試複製功能**
  - [ ] 測試「中文」模式
  - [ ] 測試「英文」模式
  - [ ] 測試「中文（英文）」模式
  - [ ] 確認複製成功提示

- [ ] **測試響應式設計**
  - [ ] 調整瀏覽器視窗大小
  - [ ] 檢查手機模式顯示
  - [ ] 確認表格可正常捲動

- [ ] **測試其他功能**
  - [ ] 最近使用記錄
  - [ ] 分頁功能
  - [ ] 清除搜尋按鈕
  - [ ] 檔案上傳

## 🔧 設定檢查

- [ ] **修改 `vite.config.js`**
  ```javascript
  base: '/your-repo-name/', // 改為你的 GitHub repo 名稱
  ```
  
  ⚠️ **重要**: 如果 repo 名稱是 `glossarytools`，則設為 `/glossarytools/`

- [ ] **檢查 `package.json`**
  - [ ] 確認專案名稱正確
  - [ ] 確認版本號碼
  - [ ] 確認描述內容

- [ ] **檢查 `.gitignore`**
  - [ ] 確認 `node_modules` 已被忽略
  - [ ] 確認 `dist` 已被忽略

## 📦 建置測試

- [ ] **執行建置**
  ```bash
  npm run build
  ```

- [ ] **檢查輸出**
  - [ ] 確認 `docs` 資料夾已產生
  - [ ] 確認 `docs/index.html` 存在
  - [ ] 確認 `docs/assets` 資料夾存在

- [ ] **預覽建置結果**
  ```bash
  npm run preview
  ```
  確認可以在 `http://localhost:4173` 正常訪問

## 🌐 GitHub 設定

- [ ] **建立 GitHub Repository**
  - [ ] Repo 名稱應與 `vite.config.js` 的 `base` 一致
  - [ ] 可以是 Public 或 Private

- [ ] **推送程式碼**
  ```bash
  git init
  git add .
  git commit -m "Initial commit"
  git branch -M main
  git remote add origin https://github.com/username/repo-name.git
  git push -u origin main
  ```

- [ ] **啟用 GitHub Pages**
  1. 前往 Settings → Pages
  2. Source: Deploy from a branch
  3. Branch: `main` → `/docs`
  4. 點擊 Save

- [ ] **等待部署完成**
  - 通常需要 1-2 分鐘
  - 在 Actions 頁面可查看進度

- [ ] **測試線上版本**
  - 訪問 `https://username.github.io/repo-name/`
  - 測試所有功能是否正常

## 🎯 進階設定（選用）

- [ ] **設定自訂網域**
  1. 在 `public` 資料夾建立 `CNAME` 檔案
  2. 內容為你的網域名稱
  3. 在 DNS 設定 CNAME 記錄

- [ ] **啟用 GitHub Actions 自動部署**
  - [ ] 確認 `.github/workflows/deploy.yml` 存在
  - [ ] 在 GitHub Settings → Actions 確認已啟用
  - [ ] 推送程式碼後會自動建置部署

- [ ] **設定環境變數**（如果需要）
  - 在 GitHub Settings → Secrets 設定

## 📊 效能優化（選用）

- [ ] **圖片優化**
  - [ ] 壓縮 `public/vite.svg`
  - [ ] 使用 WebP 格式

- [ ] **程式碼分割**
  - 已由 Vite 自動處理

- [ ] **快取設定**
  - GitHub Pages 預設已啟用快取

## 🔒 安全檢查

- [ ] **檢查敏感資訊**
  - [ ] 確認沒有 API 金鑰
  - [ ] 確認沒有密碼或憑證
  - [ ] 檢查 `.gitignore` 是否正確

- [ ] **HTTPS**
  - GitHub Pages 預設使用 HTTPS

## 📝 文件更新

- [ ] **更新 README.md**
  - [ ] 添加線上 Demo 連結
  - [ ] 更新部署說明

- [ ] **準備範例資料**
  - [ ] 提供公開的 Google Sheets 範例連結
  - [ ] 更新 `examples/sample.csv`

## 🎉 部署完成

- [ ] **測試線上版本所有功能**
- [ ] **分享連結給其他人測試**
- [ ] **收集使用者回饋**
- [ ] **準備宣傳材料**

## 🐛 常見問題

### 問題：頁面顯示 404

**解決方法**：
- 檢查 `vite.config.js` 的 `base` 路徑是否正確
- 確認 GitHub Pages 設定為 `/docs` 資料夾
- 等待幾分鐘讓 GitHub Pages 更新

### 問題：CSS 樣式沒有載入

**解決方法**：
- 清除瀏覽器快取
- 檢查瀏覽器控制台的錯誤訊息
- 確認 `base` 路徑設定正確

### 問題：功能在線上版本無法使用

**解決方法**：
- 檢查瀏覽器控制台的錯誤訊息
- 確認使用 HTTPS 訪問
- 測試是否為瀏覽器相容性問題

---

## 📞 需要協助？

如果遇到問題，請檢查：

1. 瀏覽器控制台錯誤訊息
2. GitHub Actions 建置日誌
3. GitHub Pages 設定狀態

**祝部署順利！** 🚀
