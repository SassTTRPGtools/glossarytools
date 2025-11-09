# 🚀 快速部署指南

## 📦 準備完成

✅ Git 倉庫已初始化
✅ 程式碼已提交
✅ 生產版本已建置（`docs` 資料夾）

## 🔗 下一步：推送至 GitHub

### 1. 在 GitHub 上建立新的 Repository

1. 前往 https://github.com/new
2. Repository name: `glossarytools`（或您喜歡的名稱）
3. 選擇 Public（公開）
4. **不要**勾選任何初始化選項（README, .gitignore, license）
5. 點擊 "Create repository"

### 2. 連結並推送至 GitHub

複製 GitHub 提供的指令，或使用以下指令（替換 `YOUR_USERNAME`）：

```bash
# 設定遠端倉庫（替換成你的 GitHub 使用者名稱）
git remote add origin https://github.com/YOUR_USERNAME/glossarytools.git

# 推送程式碼
git branch -M main
git push -u origin main
```

### 3. 啟用 GitHub Pages

1. 前往 Repository 的 Settings → Pages
2. Source 選擇：**Deploy from a branch**
3. Branch 選擇：**main** → **/docs**
4. 點擊 **Save**
5. 等待約 1-2 分鐘，頁面會顯示部署完成

### 4. 訪問您的網站

部署完成後，網址會是：
```
https://YOUR_USERNAME.github.io/glossarytools/
```

## ⚙️ 重要設定檢查

### vite.config.js 的 base 路徑

確認 `base` 設定與您的 repository 名稱一致：

```javascript
export default defineConfig({
  base: '/glossarytools/', // 必須與 repo 名稱相同
  build: {
    outDir: 'docs'
  }
})
```

**如果 repo 名稱不是 `glossarytools`**，請：

1. 修改 `vite.config.js` 的 `base` 路徑
2. 重新建置：`npm run build`
3. 提交變更：
   ```bash
   git add .
   git commit -m "更新 base 路徑"
   git push
   ```

## 🔄 日後更新流程

當您修改程式碼後：

```bash
# 1. 重新建置
npm run build

# 2. 提交變更
git add .
git commit -m "描述您的變更"
git push

# 3. 等待 GitHub Pages 自動更新（約 1-2 分鐘）
```

## 🐛 常見問題

### Q: 網站顯示 404

**A:** 檢查以下項目：
1. GitHub Pages 是否設定為 `/docs` 資料夾
2. `vite.config.js` 的 `base` 是否與 repo 名稱一致
3. 等待幾分鐘讓 GitHub 完成部署

### Q: CSS 樣式沒有載入

**A:** 
1. 確認 `base` 路徑設定正確
2. 清除瀏覽器快取（Ctrl + Shift + R）
3. 檢查瀏覽器控制台是否有錯誤訊息

### Q: 無法載入 Google Sheets

**A:**
1. 確認 Google Sheets 已「發佈至網路」
2. 確認連結格式正確（包含 `/e/2PACX-...`）
3. 檢查瀏覽器控制台的錯誤訊息

## 📋 快速命令參考

```bash
# 開發模式
npm run dev

# 建置生產版本
npm run build

# 預覽建置結果
npm run preview

# Git 基本操作
git status              # 查看變更狀態
git add .               # 添加所有變更
git commit -m "訊息"    # 提交變更
git push                # 推送到 GitHub
```

## 🎉 完成！

您的詞彙對照工具已準備就緒，可以開始使用了！

---

**需要協助？** 請檢查 `QUICKSTART.md` 和 `DEPLOYMENT_CHECKLIST.md` 獲得更詳細的說明。
