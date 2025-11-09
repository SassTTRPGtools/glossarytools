// 測試 URL 正規化函數
function normalizeGoogleSheetURL(url) {
  if (!url) return url;
  
  const sheetsPattern = /docs\.google\.com\/spreadsheets/;
  if (!sheetsPattern.test(url)) {
    return url;
  }

  if (url.includes('output=csv') || url.includes('format=csv')) {
    return url;
  }

  const matchPrivate = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  const matchPublic = url.match(/\/e\/([a-zA-Z0-9-_]+)/);
  
  let spreadsheetId = null;
  let urlType = 'private';
  
  if (matchPrivate) {
    spreadsheetId = matchPrivate[1];
    urlType = 'private';
  } else if (matchPublic) {
    spreadsheetId = matchPublic[1];
    urlType = 'public';
  } else {
    return url;
  }
  
  let gid = '';
  const gidMatch = url.match(/[#&]gid=([0-9]+)/);
  if (gidMatch) {
    gid = `&gid=${gidMatch[1]}`;
  }

  if (urlType === 'public') {
    return `https://docs.google.com/spreadsheets/d/e/${spreadsheetId}/pub?output=csv${gid}`;
  } else {
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv${gid}`;
  }
}

// 測試用例
const testUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxiJuHqGviRQG3N5mPb6w-yKngH4_kHdo4rbh-JMuuPGFO8HMu935GKOSfAgdxXKrXRJCXCaRzLoEH/pub?output=csv';

console.log('輸入 URL:');
console.log(testUrl);
console.log('\n處理後的 URL:');
console.log(normalizeGoogleSheetURL(testUrl));
console.log('\n測試其他格式:');
console.log('已是 CSV:', normalizeGoogleSheetURL('https://docs.google.com/spreadsheets/d/e/123/pub?output=csv'));
console.log('編輯連結:', normalizeGoogleSheetURL('https://docs.google.com/spreadsheets/d/abc123/edit'));
