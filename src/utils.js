/**
 * URL 正規化工具
 * 將 Google Sheets 連結轉換為 CSV 匯出連結（僅支援公開發佈的試算表）
 */
export function normalizeGoogleSheetURL(url) {
  if (!url) return url;
  
  // 檢查是否為 Google Sheets URL
  const sheetsPattern = /docs\.google\.com\/spreadsheets/;
  if (!sheetsPattern.test(url)) {
    return url;
  }

  // 如果已經是 CSV 格式，直接返回
  if (url.includes('output=csv')) {
    return url;
  }

  // 提取公開發佈的 spreadsheet ID（格式：/e/2PACX-...）
  const matchPublic = url.match(/\/e\/([a-zA-Z0-9-_]+)/);
  
  if (!matchPublic) {
    // 無法識別格式，返回原始 URL
    return url;
  }
  
  const spreadsheetId = matchPublic[1];
  
  // 提取 gid (如果有)
  let gid = '';
  const gidMatch = url.match(/[#&]gid=([0-9]+)/);
  if (gidMatch) {
    gid = `&gid=${gidMatch[1]}`;
  }

  // 構建公開發佈的 CSV 匯出 URL
  return `https://docs.google.com/spreadsheets/d/e/${spreadsheetId}/pub?output=csv${gid}`;
}

/**
 * 驗證 URL 格式
 */
export function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * 正規化資料列
 * 將解析後的 CSV 資料轉換為統一格式
 */
export function normalizeRows(rows) {
  if (!rows || rows.length === 0) {
    return [];
  }

  // 過濾掉空行
  const filteredRows = rows.filter(row => {
    if (Array.isArray(row)) {
      return row.some(cell => cell && cell.trim());
    }
    return row && Object.values(row).some(val => val && String(val).trim());
  });

  // 如果第一行看起來是標題，跳過它
  let startIndex = 0;
  if (filteredRows.length > 0) {
    const firstRow = filteredRows[0];
    const firstCell = Array.isArray(firstRow) ? firstRow[0] : firstRow[Object.keys(firstRow)[0]];
    if (firstCell && (
      String(firstCell).toLowerCase().includes('中文') ||
      String(firstCell).toLowerCase().includes('chinese') ||
      String(firstCell).toLowerCase().includes('zh')
    )) {
      startIndex = 1;
    }
  }

  // 轉換為統一格式
  return filteredRows.slice(startIndex).map((row, index) => {
    let displayZh, termEn, notes;

    if (Array.isArray(row)) {
      // 陣列格式
      [displayZh, termEn, notes] = row;
    } else {
      // 物件格式
      const keys = Object.keys(row);
      displayZh = row[keys[0]];
      termEn = row[keys[1]];
      notes = row[keys[2]];
    }

    return {
      id: index + 1,
      display_zh: String(displayZh || '').trim(),
      term_en: String(termEn || '').trim(),
      notes: String(notes || '').trim()
    };
  }).filter(row => row.display_zh || row.term_en); // 過濾完全空白的行
}

/**
 * 複製文字到剪貼簿
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 降級方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  } catch (err) {
    console.error('複製失敗:', err);
    return false;
  }
}

/**
 * 從 localStorage 讀取最近使用的資料來源
 */
export function getRecentSources() {
  try {
    const sources = localStorage.getItem('recentSources');
    return sources ? JSON.parse(sources) : [];
  } catch (err) {
    console.error('讀取最近來源失敗:', err);
    return [];
  }
}

/**
 * 儲存最近使用的資料來源到 localStorage
 */
export function saveRecentSource(url) {
  try {
    let sources = getRecentSources();
    
    // 移除重複的 URL
    sources = sources.filter(s => s.url !== url);
    
    // 添加到開頭
    sources.unshift({
      url,
      timestamp: Date.now(),
      label: extractLabelFromURL(url)
    });
    
    // 只保留最近 5 筆
    sources = sources.slice(0, 5);
    
    localStorage.setItem('recentSources', JSON.stringify(sources));
  } catch (err) {
    console.error('儲存最近來源失敗:', err);
  }
}

/**
 * 從 URL 提取標籤
 */
function extractLabelFromURL(url) {
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname.includes('google.com')) {
      return 'Google Sheets';
    }
    return urlObj.hostname;
  } catch (err) {
    return 'CSV 來源';
  }
}

/**
 * 格式化日期時間
 */
export function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now - date;
  
  // 小於 1 分鐘
  if (diff < 60000) {
    return '剛才';
  }
  
  // 小於 1 小時
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `${minutes} 分鐘前`;
  }
  
  // 小於 1 天
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} 小時前`;
  }
  
  // 超過 1 天，顯示日期
  return date.toLocaleDateString('zh-TW');
}

/**
 * 根據複製模式生成複製文字
 */
export function generateCopyText(row, copyMode) {
  switch (copyMode) {
    case 'zh':
      return row.display_zh;
    case 'en':
      return row.term_en;
    case 'both':
      return `${row.display_zh}（${row.term_en}）`;
    default:
      return row.display_zh;
  }
}

/**
 * 防抖函數
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
