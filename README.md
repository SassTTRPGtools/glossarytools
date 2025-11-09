# 詞彙對照工具 | Glossary Tools

## 🎯 專案簡介

單頁式（SPA）前端網站，支援載入公開的 Google Sheets（CSV 格式）或一般 CSV 檔案，提供即時搜尋、查看與複製詞彙對照資料。

## ✨ 主要功能

- 📊 載入 Google Sheets 或 CSV 檔案
- 🔍 即時模糊搜尋
- 📋 多種複製模式（中文 / 英文 / 中文（英文））
- 📱 響應式設計，支援手機與桌機
- 🚀 無需後端，可直接部署於 GitHub Pages

## 🛠️ 技術架構

- **前端框架**: Vue 3
- **解析工具**: PapaParse
- **搜尋引擎**: Fuse.js
- **樣式框架**: TailwindCSS
- **建置工具**: Vite
- **部署環境**: GitHub Pages

## 📦 安裝與執行

### 安裝依賴

```bash
npm install
```

### 開發模式

```bash
npm run dev
```

### 建置生產版本

```bash
npm run build
```

建置完成後，檔案會輸出至 `docs` 資料夾。

### 預覽生產版本

```bash
npm run preview
```

## 📄 資料格式

CSV 檔案必須包含三欄（UTF-8 編碼）：

| 中文 | 英文 | 備註 |
|------|------|------|
| 破封酒館 | Broken Seal Tavern | 官方地名 |
| 拉瓦 | Rava | 機械與創造之女神 |

## 🚀 部署至 GitHub Pages

1. 確認 `vite.config.js` 中的 `base` 路徑設定正確
2. 執行 `npm run build` 建置專案
3. 將 `docs` 資料夾推送至 GitHub
4. 在 GitHub repo 設定中啟用 GitHub Pages，選擇 `main` 分支的 `/docs` 資料夾

## 📝 使用說明

1. 開啟網站
2. 貼上 Google Sheets 或 CSV 網址
3. 點擊「載入資料」
4. 輸入關鍵字搜尋
5. 點擊「複製」按鈕複製詞條

## 📋 授權

MIT License
