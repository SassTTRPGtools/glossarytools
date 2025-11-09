# GitHub Pages 設定指南

## ✅ 已完成的設定

### 1. `.gitignore` 設定
- ✅ `docs/` 資料夾已加入 `.gitignore`
- ✅ 不再提交建置產物到 Git

### 2. GitHub Actions 工作流程
- ✅ 檔案：`.github/workflows/deploy.yml`
- ✅ 自動建置：每次推送到 `main` 分支時觸發
- ✅ 自動部署：建置完成後自動部署到 GitHub Pages

## 🔧 需要在 GitHub 上進行的設定

### 重要：設定 GitHub Pages Source

1. 到 GitHub 儲存庫頁面
2. 點擊 **Settings**（設定）
3. 在左側選單找到 **Pages**
4. 在 **Build and deployment** 區塊：
   - **Source** 選擇：**GitHub Actions** ⚠️ 這是關鍵！
   - 不要選擇 "Deploy from a branch"

### 設定示意圖

```
Settings → Pages → Build and deployment

Source: [GitHub Actions] ← 選這個！
        [ ] Deploy from a branch (不要選這個)
```

## 📋 正確的部署流程

### 現在的流程（正確）✅

```bash
# 1. 開發和測試
npm run dev

# 2. 提交程式碼（不需要建置）
git add src/
git commit -m "feat: 新功能"
git push

# 3. GitHub Actions 自動執行：
#    - 安裝相依套件
#    - 執行 npm run build
#    - 部署到 GitHub Pages
```

### 之前的流程（錯誤）❌

```bash
# 1. 手動建置
npm run build  # ← 不需要！

# 2. 提交建置產物
git add docs/  # ← 不需要！
git commit -m "build: 更新建置"
git push

# 3. GitHub Pages 從 docs/ 資料夾部署
```

## 🎯 使用說明

### 日常開發

1. **修改程式碼**
   ```bash
   # 編輯 src/ 中的檔案
   npm run dev  # 本地測試
   ```

2. **提交變更**
   ```bash
   git add .
   git commit -m "描述你的變更"
   git push origin main
   ```

3. **自動部署**
   - GitHub Actions 會自動建置
   - 到 **Actions** 標籤查看進度
   - 完成後自動部署到 GitHub Pages

### 監控部署

1. 推送後到 GitHub 儲存庫
2. 點擊 **Actions** 標籤
3. 查看最新的 "Deploy to GitHub Pages" 工作流程
4. 等待綠色勾勾 ✅

### 部署 URL

```
https://sassttprpgtools.github.io/glossarytools/
```

## ⚠️ 常見問題

### Q: 推送後沒有自動部署？

**檢查項目：**
1. GitHub Pages Source 是否設定為 "GitHub Actions"？
2. Actions 標籤中是否有錯誤？
3. 是否推送到 `main` 分支？

### Q: 部署成功但頁面空白？

**解決方案：**
1. 檢查 `vite.config.js` 中的 `base` 設定
2. 應該是：`base: '/glossarytools/'`
3. 清除瀏覽器快取（Ctrl+Shift+R）

### Q: 可以手動觸發部署嗎？

**可以！**
1. 到 GitHub 儲存庫的 **Actions** 標籤
2. 選擇 "Deploy to GitHub Pages"
3. 點擊 **Run workflow**
4. 選擇 `main` 分支
5. 點擊綠色的 **Run workflow** 按鈕

## 📝 版本記錄

- **2025-01-09**: 移除 docs/ 從 Git 追蹤，改用 GitHub Actions 自動建置
- **之前**: 手動建置並提交 docs/ 資料夾（已棄用）

## 🔗 相關連結

- [GitHub Actions 工作流程檔案](.github/workflows/deploy.yml)
- [詳細部署指南](DEPLOY_GUIDE.md)
- [專案 README](README.md)
