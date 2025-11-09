# 📋 專案檔案清單

## 專案結構

```
glossarytools/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 自動部署設定
├── examples/
│   ├── README.md               # 範例說明
│   └── sample.csv              # 範例資料檔案
├── public/
│   └── vite.svg                # 網站圖示
├── src/
│   ├── App.vue                 # Vue 3 主應用程式元件
│   ├── main.js                 # 應用程式入口
│   ├── style.css               # TailwindCSS 樣式
│   └── utils.js                # 工具函數模組
├── .gitignore                  # Git 忽略清單
├── index.html                  # HTML 入口頁面
├── package.json                # NPM 套件設定
├── postcss.config.js           # PostCSS 設定
├── QUICKSTART.md               # 快速啟動指南
├── README.md                   # 專案說明文件
├── tailwind.config.js          # TailwindCSS 設定
└── vite.config.js              # Vite 建置設定
```

## 核心檔案說明

### 📄 入口檔案

- **index.html**: HTML 模板，定義基本結構與 meta 標籤
- **src/main.js**: Vue 應用程式初始化

### 🎨 樣式檔案

- **src/style.css**: 包含 TailwindCSS 指令與自訂樣式
- **tailwind.config.js**: TailwindCSS 主題設定
- **postcss.config.js**: PostCSS 處理器設定

### ⚙️ 功能模組

- **src/App.vue**: 主要 UI 元件，包含：
  - 資料來源輸入區
  - 搜尋與操作區
  - 結果顯示區（含分頁）
  - 狀態提示區
  
- **src/utils.js**: 工具函數，包含：
  - `normalizeGoogleSheetURL()` - Google Sheets URL 轉換
  - `normalizeRows()` - CSV 資料正規化
  - `copyToClipboard()` - 剪貼簿操作
  - `saveRecentSource()` / `getRecentSources()` - localStorage 管理
  - `generateCopyText()` - 複製文字生成
  - `debounce()` - 防抖函數
  - `formatDateTime()` - 時間格式化

### 🔧 設定檔案

- **vite.config.js**: 
  - Vue 插件設定
  - GitHub Pages 路徑設定 (`base`)
  - 輸出目錄設定 (`docs`)

- **package.json**:
  - 專案資訊
  - 依賴套件清單
  - NPM 腳本命令

### 🚀 部署檔案

- **.github/workflows/deploy.yml**:
  - 自動建置與部署流程
  - 觸發條件：推送至 main 分支
  - 輸出至 GitHub Pages

### 📚 文件檔案

- **README.md**: 專案總覽與說明
- **QUICKSTART.md**: 詳細的快速啟動指南
- **examples/README.md**: 範例資料使用說明

### 📊 範例檔案

- **examples/sample.csv**: 20 筆範例詞彙資料

## 技術架構

### 前端框架
- **Vue 3** (^3.4.21) - 響應式 UI 框架
- **Vite** (^5.2.0) - 快速建置工具

### 核心套件
- **PapaParse** (^5.4.1) - CSV 解析工具
- **Fuse.js** (^7.0.0) - 模糊搜尋引擎

### 樣式框架
- **TailwindCSS** (^3.4.1) - 實用優先的 CSS 框架
- **PostCSS** (^8.4.38) - CSS 處理器
- **Autoprefixer** (^10.4.19) - CSS 自動前綴

## 功能檢查清單

### ✅ 已實作功能

- [x] Google Sheets URL 自動轉換
- [x] 一般 CSV 檔案支援
- [x] 本地檔案上傳
- [x] 即時模糊搜尋（Fuse.js）
- [x] 三種複製模式（中文 / 英文 / 中英文）
- [x] 分頁顯示（每頁 50 筆）
- [x] 最近使用記錄（localStorage）
- [x] 響應式設計（手機 / 桌機）
- [x] 載入狀態提示
- [x] 錯誤處理與訊息顯示
- [x] 鍵盤快捷鍵（Enter 載入）
- [x] 自動捲動條樣式
- [x] 動畫效果（淡入、hover）
- [x] GitHub Actions 自動部署
- [x] 完整文件與範例

### 🎯 完成條件驗證

- [x] 能成功載入公開 Google Sheets / CSV
- [x] 能搜尋並即時顯示結果
- [x] 能依複製模式將詞條複製到剪貼簿
- [x] UI 清晰、可於手機與桌機操作
- [x] 無後端依賴，可直接於 GitHub Pages 運作

## 下一步行動

### 1️⃣ 安裝依賴

```bash
npm install
```

### 2️⃣ 啟動開發伺服器

```bash
npm run dev
```

### 3️⃣ 測試所有功能

- 載入範例 CSV 檔案
- 測試搜尋功能
- 測試複製功能
- 測試響應式設計

### 4️⃣ 建置生產版本

```bash
npm run build
```

### 5️⃣ 部署至 GitHub Pages

詳見 `QUICKSTART.md` 的部署章節。

## 注意事項

⚠️ **重要設定**

1. **修改 `vite.config.js` 的 `base` 路徑**：
   ```javascript
   base: '/your-repo-name/'  // 改為你的 GitHub repo 名稱
   ```

2. **確認 GitHub Pages 設定**：
   - 使用 `/docs` 資料夾
   - 或設定 GitHub Actions 自動部署

3. **Google Sheets 權限**：
   - 必須「發佈至網路」
   - 不需要公開權限，只需發佈

## 授權資訊

MIT License - 可自由使用、修改與分發。

---

✨ **專案建立完成！** 所有檔案已就緒，可以開始使用了。
