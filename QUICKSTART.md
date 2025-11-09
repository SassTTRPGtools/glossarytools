# 快速啟動指南

## 🚀 立即開始

### 1️⃣ 安裝依賴

在專案根目錄執行：

```bash
npm install
```

### 2️⃣ 啟動開發伺服器

```bash
npm run dev
```

瀏覽器會自動開啟 `http://localhost:5173`

### 3️⃣ 測試功能

使用範例檔案測試：

1. 點擊「上傳本地 CSV 檔案」
2. 選擇 `examples/sample.csv`
3. 在搜尋框輸入關鍵字（例如：「酒館」或「Tavern」）
4. 點擊複製按鈕測試複製功能

### 4️⃣ 建置生產版本

```bash
npm run build
```

建置完成後，檔案會輸出至 `docs` 資料夾。

## 📊 使用 Google Sheets

### 設定 Google Sheets 為資料來源

1. 在 Google Sheets 建立表格，格式如下：

   | 中文 | 英文 | 備註 |
   |------|------|------|
   | 詞彙1 | Term1 | 說明1 |
   | 詞彙2 | Term2 | 說明2 |

2. 點擊「檔案」→「共用」→「發佈至網路」
3. 選擇「整份文件」和「逗號分隔值 (.csv)」
4. 點擊「發佈」並複製連結
5. 將連結貼至詞彙對照工具

### Google Sheets 連結格式

✅ 支援的格式：
- `https://docs.google.com/spreadsheets/d/{ID}/edit...`
- `https://docs.google.com/spreadsheets/d/{ID}/export?format=csv`

系統會自動將編輯連結轉換為 CSV 匯出連結。

## 🎨 自訂設定

### 修改網站標題

編輯 `index.html`：

```html
<title>你的網站標題</title>
```

### 修改主題色彩

編輯 `tailwind.config.js` 中的 `primary` 色彩：

```javascript
colors: {
  primary: {
    500: '#0ea5e9', // 主要顏色
    600: '#0284c7', // 深色
    700: '#0369a1', // 更深色
  }
}
```

### 調整每頁顯示筆數

編輯 `src/App.vue` 中的 `itemsPerPage`：

```javascript
const itemsPerPage = ref(50) // 改為你想要的數字
```

## 🚢 部署至 GitHub Pages

### 方法一：自動部署（推薦）

1. 將專案推送至 GitHub
2. 在 repo 設定中啟用 GitHub Actions
3. 推送程式碼後會自動建置並部署

### 方法二：手動部署

1. 執行建置：
   ```bash
   npm run build
   ```

2. 確認 `docs` 資料夾已產生

3. 推送至 GitHub：
   ```bash
   git add .
   git commit -m "Build for deployment"
   git push
   ```

4. 在 GitHub repo 設定：
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main → /docs
   - 點擊 Save

### 設定自訂網域（選用）

在 `public` 資料夾建立 `CNAME` 檔案：

```
yourdomain.com
```

## 🔧 故障排除

### 無法載入 Google Sheets

**問題**：顯示「載入失敗」錯誤

**解決方法**：
1. 確認表格已「發佈至網路」
2. 確認使用的是完整 URL
3. 檢查表格權限設定為「知道連結的任何人」

### CSV 資料格式錯誤

**問題**：資料未正確顯示

**解決方法**：
1. 確認 CSV 檔案為 UTF-8 編碼
2. 確認有三欄：中文、英文、備註
3. 確認沒有多餘的空行

### 複製功能無法使用

**問題**：點擊複製按鈕沒有反應

**解決方法**：
1. 確認瀏覽器支援 Clipboard API
2. 確認網站使用 HTTPS（或 localhost）
3. 檢查瀏覽器的剪貼簿權限設定

### 搜尋結果不準確

**問題**：找不到預期的結果

**解決方法**：
1. 嘗試不同的關鍵字
2. 搜尋引擎使用模糊比對，threshold 為 0.3
3. 可在 `src/App.vue` 的 `initFuse()` 調整 `threshold` 值（0-1，越小越嚴格）

## 📞 技術支援

如遇到其他問題，請檢查：

1. 瀏覽器控制台是否有錯誤訊息
2. Node.js 版本是否為 18 或以上
3. 所有依賴套件是否正確安裝

## 🎯 進階功能

### 新增第四欄資料

編輯 `src/utils.js` 的 `normalizeRows()` 函數：

```javascript
return {
  id: index + 1,
  display_zh: String(displayZh || '').trim(),
  term_en: String(termEn || '').trim(),
  notes: String(notes || '').trim(),
  custom_field: String(row[3] || '').trim() // 新增第四欄
};
```

### 匯出搜尋結果

可在 `src/App.vue` 新增匯出功能按鈕。

---

**祝您使用愉快！** 🎉
