<template>
  <div id="app" class="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
    <!-- 標題區 -->
    <header class="max-w-7xl mx-auto mb-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">
          📚 詞彙對照工具
        </h1>
        <p class="text-gray-600">
          支援公開 Google Sheets 與 CSV 檔案的即時搜尋
        </p>
      </div>
    </header>

    <main class="max-w-7xl mx-auto space-y-6">
      <!-- 資料來源輸入區 -->
      <section class="card fade-in">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          📊 資料來源
        </h2>
        
        <div class="space-y-4">
          <!-- URL 輸入 -->
          <div>
            <label for="dataUrl" class="block text-sm font-medium text-gray-700 mb-2">
              公開的 Google Sheets CSV 網址
            </label>
            <div class="flex gap-2">
              <input
                id="dataUrl"
                v-model="dataUrl"
                type="text"
                placeholder="https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv"
                class="input-field flex-1"
                @keyup.enter="loadDataFromURL"
              />
              <button
                @click="loadDataFromURL"
                :disabled="loading || !dataUrl"
                class="btn-primary whitespace-nowrap"
              >
                {{ loading ? '載入中...' : '載入資料' }}
              </button>
            </div>
          </div>

          <!-- 最近使用 -->
          <div v-if="recentSources.length > 0" class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-medium text-gray-700">最近使用</span>
              <button
                @click="openEditModal()"
                class="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
                title="編輯來源名稱"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>編輯</span>
              </button>
            </div>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="source in recentSources"
                :key="source.url"
                @click="loadFromRecent(source.url)"
                class="text-xs bg-gray-100 hover:bg-blue-50 hover:text-blue-700 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-blue-200"
                :title="source.url"
              >
                {{ source.label }} · {{ formatDateTime(source.timestamp) }}
              </button>
            </div>
          </div>

          <!-- 檔案上傳 -->
          <div class="border-t pt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              或上傳本地 CSV 檔案
            </label>
            <input
              type="file"
              accept=".csv"
              @change="handleFileUpload"
              class="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-primary-50 file:text-primary-700
                hover:file:bg-primary-100
                cursor-pointer"
            />
          </div>
        </div>
      </section>

      <!-- 搜尋與操作區 -->
      <section v-if="data.length > 0" class="card fade-in">
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            🔍 搜尋與篩選
          </h2>
          
          <div class="flex gap-2 text-sm text-gray-600">
            <span>共 {{ data.length }} 筆</span>
            <span v-if="searchQuery">· 顯示 {{ filteredData.length }} 筆</span>
          </div>
        </div>

        <!-- 搜尋框 -->
        <div class="mb-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="輸入關鍵字搜尋（中文或英文）..."
            class="input-field"
          />
        </div>

        <!-- 複製模式選擇 -->
        <div class="flex flex-wrap gap-4 items-center">
          <label class="text-sm font-medium text-gray-700">
            複製模式：
          </label>
          <div class="flex gap-2">
            <button
              @click="copyMode = 'zh'"
              :class="['btn-sm', copyMode === 'zh' ? 'btn-primary' : 'btn-secondary']"
            >
              中文
            </button>
            <button
              @click="copyMode = 'en'"
              :class="['btn-sm', copyMode === 'en' ? 'btn-primary' : 'btn-secondary']"
            >
              英文
            </button>
            <button
              @click="copyMode = 'both'"
              :class="['btn-sm', copyMode === 'both' ? 'btn-primary' : 'btn-secondary']"
            >
              中文（英文）
            </button>
          </div>

          <button
            v-if="searchQuery"
            @click="clearSearch"
            class="btn-secondary btn-sm ml-auto"
          >
            清除搜尋
          </button>
        </div>
      </section>

      <!-- 結果顯示區 -->
      <section v-if="data.length > 0" class="card fade-in">
        <div class="overflow-x-auto">
          <table class="glossary-table compact">
            <thead>
              <tr>
                <th>中文</th>
                <th>英文</th>
                <th>備註</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(row, index) in displayedData" 
                :key="row.id"
                @click="copyRow(row)"
                class="cursor-pointer hover:bg-primary-50 active:bg-primary-100 transition-colors"
                :title="`點擊複製: ${generateCopyText(row, copyMode)}`"
              >
                <td class="font-medium">{{ row.display_zh }}</td>
                <td class="text-gray-700">{{ row.term_en }}</td>
                <td class="text-gray-600 text-xs">{{ row.notes }}</td>
              </tr>
              <tr v-if="filteredData.length === 0">
                <td colspan="4" class="text-center py-8 text-gray-500">
                  找不到符合的結果
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分頁控制 -->
        <div v-if="totalPages > 1" class="mt-4 flex justify-center items-center gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="btn-secondary btn-sm"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            上一頁
          </button>
          
          <span class="text-sm text-gray-600 px-4">
            第 {{ currentPage }} / {{ totalPages }} 頁
          </span>
          
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="btn-secondary btn-sm"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
          >
            下一頁
          </button>
        </div>
      </section>

      <!-- 狀態提示區 -->
      <section v-if="statusMessage" class="card fade-in" :class="statusClass">
        <div class="flex items-center gap-2">
          <span class="text-lg">{{ statusIcon }}</span>
          <p class="flex-1">{{ statusMessage }}</p>
        </div>
      </section>

      <!-- 載入中 -->
      <section v-if="loading" class="card fade-in text-center py-8">
        <div class="loading-spinner mx-auto mb-4"></div>
        <p class="text-gray-600">正在載入資料...</p>
      </section>

      <!-- 使用說明 -->
      <section v-if="data.length === 0 && !loading" class="card fade-in bg-blue-50 border-blue-200">
        <h3 class="text-lg font-semibold text-blue-900 mb-3">
          📖 使用說明
        </h3>
        <ol class="space-y-2 text-sm text-blue-800">
          <li>1️⃣ 在 Google Sheets 將試算表「發佈至網路」（檔案 → 共用 → 發佈至網路 → CSV）</li>
          <li>2️⃣ 複製產生的公開連結並貼上</li>
          <li>3️⃣ 點擊「載入資料」按鈕</li>
          <li>4️⃣ 使用搜尋框輸入關鍵字</li>
          <li>5️⃣ 選擇複製模式（中文/英文/中英文）</li>
          <li>6️⃣ 點擊表格任一列即可複製詞條</li>
        </ol>
        <div class="mt-4 p-3 bg-white rounded border border-blue-200">
          <p class="text-xs text-blue-700 font-medium mb-2">📊 資料格式要求：</p>
          <p class="text-xs text-blue-600 mb-3">CSV 檔案需包含三欄：中文 | 英文 | 備註</p>
          <div class="flex items-center gap-2 mb-3">
            <a 
              href="examples/sample.csv" 
              download="glossary-sample.csv"
              class="inline-flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors"
            >
              <span>📥</span>
              <span>下載範例檔案</span>
            </a>
            <span class="text-xs text-blue-600">（包含 20 筆範例資料）</span>
          </div>
          <p class="text-xs text-blue-700 font-medium mb-1">⚠️ 重要：</p>
          <p class="text-xs text-blue-600">僅支援公開發佈的 Google Sheets（私人連結無法使用）</p>
        </div>
      </section>
    </main>

    <!-- 複製成功彈出提示 -->
    <transition name="toast">
      <div 
        v-if="showCopyToast" 
        class="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 
               bg-gradient-to-r from-green-500 to-emerald-600 
               text-white px-6 py-4 rounded-xl shadow-2xl 
               flex items-center gap-3 animate-bounce-in"
      >
        <div class="text-2xl">✅</div>
        <div>
          <div class="font-bold text-sm">複製成功！</div>
          <div class="text-xs opacity-90">{{ copiedText }}</div>
        </div>
      </div>
    </transition>

    <!-- 名稱編輯 Modal -->
    <transition name="modal">
      <div 
        v-if="showNameModal" 
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeNameModal"
      >
        <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <!-- Modal Header -->
          <div class="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900">
              編輯最近使用的來源
            </h3>
            <button
              @click="closeNameModal"
              class="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>

          <!-- Modal Body -->
          <div class="px-6 py-4">
            <div class="space-y-3">
              <div
                v-for="(source, index) in recentSources"
                :key="source.url"
                class="border rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div class="space-y-2">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">
                      來源名稱
                    </label>
                    <input
                      v-model="source.label"
                      type="text"
                      class="input-field text-sm"
                      placeholder="輸入來源名稱..."
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">
                      資料來源 URL
                    </label>
                    <input
                      :value="source.url"
                      type="text"
                      class="input-field text-xs bg-gray-50 font-mono"
                      readonly
                    />
                  </div>
                  <div class="flex items-center justify-between text-xs text-gray-500 pt-1">
                    <span>上次使用：{{ formatDateTime(source.timestamp) }}</span>
                    <button
                      @click="deleteRecentSource(index)"
                      class="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>刪除</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="sticky bottom-0 bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t">
            <button
              @click="closeNameModal"
              class="btn-secondary"
            >
              取消
            </button>
            <button
              @click="saveEditedSources"
              class="btn-primary"
            >
              儲存變更
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 頁尾 -->
    <footer class="max-w-7xl mx-auto mt-12 text-center text-sm text-gray-500">
      <p>Glossary Tools © 2025 · 無需後端，安全保護隱私</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import Papa from 'papaparse'
import Fuse from 'fuse.js'
import {
  normalizeGoogleSheetURL,
  isValidURL,
  normalizeRows,
  copyToClipboard,
  getRecentSources,
  saveRecentSource,
  formatDateTime,
  generateCopyText,
  debounce
} from './utils.js'

// 狀態管理
const dataUrl = ref('')
const data = ref([])
const searchQuery = ref('')
const copyMode = ref('zh') // 'zh', 'en', 'both'
const loading = ref(false)
const statusMessage = ref('')
const statusType = ref('info') // 'info', 'success', 'error'
const recentSources = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(50)
const showCopyToast = ref(false)
const copiedText = ref('')
const showNameModal = ref(false)

// Fuse.js 搜尋實例
let fuseInstance = null

// 初始化
onMounted(() => {
  recentSources.value = getRecentSources()
})

// 計算屬性
const filteredData = computed(() => {
  if (!searchQuery.value || !data.value.length) {
    return data.value
  }

  if (!fuseInstance) {
    initFuse()
  }

  const results = fuseInstance.search(searchQuery.value)
  return results.map(result => result.item)
})

const totalPages = computed(() => {
  return Math.ceil(filteredData.value.length / itemsPerPage.value)
})

const displayedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredData.value.slice(start, end)
})

const statusClass = computed(() => {
  const baseClass = 'border-l-4 '
  switch (statusType.value) {
    case 'success':
      return baseClass + 'border-green-500 bg-green-50'
    case 'error':
      return baseClass + 'border-red-500 bg-red-50'
    default:
      return baseClass + 'border-blue-500 bg-blue-50'
  }
})

const statusIcon = computed(() => {
  switch (statusType.value) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    default:
      return 'ℹ️'
  }
})

// 監聽搜尋變化，重置頁碼
watch(searchQuery, () => {
  currentPage.value = 1
})

// 初始化 Fuse.js 搜尋
function initFuse() {
  const options = {
    keys: ['display_zh', 'term_en', 'notes'],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 1
  }
  fuseInstance = new Fuse(data.value, options)
}

// 從 URL 載入資料
async function loadDataFromURL() {
  if (!dataUrl.value) {
    showStatus('請輸入資料來源網址', 'error')
    return
  }

  if (!isValidURL(dataUrl.value)) {
    showStatus('無效的網址格式', 'error')
    return
  }

  loading.value = true
  statusMessage.value = ''

  try {
    // 正規化 Google Sheets URL
    const normalizedUrl = normalizeGoogleSheetURL(dataUrl.value)
    
    console.log('載入 URL:', normalizedUrl)
    
    // 載入資料（fetch 會自動跟隨重定向）
    const response = await fetch(normalizedUrl, {
      method: 'GET',
      redirect: 'follow' // 明確指定跟隨重定向
    })
    
    console.log('Response status:', response.status)
    console.log('Response OK:', response.ok)
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const csvText = await response.text()
    
    console.log('CSV 長度:', csvText.length)
    console.log('CSV 前 100 字元:', csvText.substring(0, 100))
    
    // 檢查是否為 HTML 錯誤頁面
    if (csvText.trim().startsWith('<!DOCTYPE') || csvText.trim().startsWith('<html')) {
      throw new Error('收到的不是 CSV 格式，可能是權限問題或連結無效')
    }
    
    // 解析 CSV
    Papa.parse(csvText, {
      complete: (results) => {
        console.log('解析結果:', results)
        processCSVData(results.data)
        
        // 檢查是否已存在於最近使用中
        const existingSource = recentSources.value.find(s => s.url === dataUrl.value)
        
        if (existingSource) {
          // 如果已存在，保留原有名稱並更新時間戳
          saveRecentSource(dataUrl.value, existingSource.label)
        } else {
          // 如果是新來源，自動提取名稱
          const displayName = extractDisplayName(results.data)
          saveRecentSource(dataUrl.value, displayName)
        }
        
        recentSources.value = getRecentSources()
      },
      error: (error) => {
        console.error('Papa Parse 錯誤:', error)
        showStatus(`解析失敗: ${error.message}`, 'error')
        loading.value = false
      }
    })
  } catch (error) {
    console.error('載入錯誤:', error)
    showStatus(`載入失敗: ${error.message}`, 'error')
    loading.value = false
  }
}

// 從最近使用載入
function loadFromRecent(url) {
  dataUrl.value = url
  loadDataFromURL()
}

// 處理檔案上傳
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (!file) return

  if (!file.name.endsWith('.csv')) {
    showStatus('請選擇 CSV 檔案', 'error')
    return
  }

  loading.value = true
  statusMessage.value = ''

  Papa.parse(file, {
    complete: (results) => {
      processCSVData(results.data)
      dataUrl.value = `本地檔案: ${file.name}`
    },
    error: (error) => {
      showStatus(`解析失敗: ${error.message}`, 'error')
      loading.value = false
    },
    encoding: 'UTF-8'
  })
}

// 處理 CSV 資料
function processCSVData(rawData) {
  try {
    const normalized = normalizeRows(rawData)
    
    if (normalized.length === 0) {
      showStatus('未找到有效資料', 'error')
      loading.value = false
      return
    }

    data.value = normalized
    searchQuery.value = ''
    currentPage.value = 1
    
    // 重新初始化搜尋
    initFuse()
    
    showStatus(`成功載入 ${normalized.length} 筆資料`, 'success')
    loading.value = false
  } catch (error) {
    showStatus(`處理資料時發生錯誤: ${error.message}`, 'error')
    loading.value = false
  }
}

// 複製單列資料
async function copyRow(row) {
  const text = generateCopyText(row, copyMode.value)
  const success = await copyToClipboard(text)
  
  if (success) {
    copiedText.value = text
    showCopyToast.value = true
    
    // 3 秒後自動隱藏
    setTimeout(() => {
      showCopyToast.value = false
    }, 3000)
  } else {
    showStatus('複製失敗，請手動複製', 'error')
  }
}

// 清除搜尋
function clearSearch() {
  searchQuery.value = ''
}

// 從 CSV 資料中提取顯示名稱
function extractDisplayName(rawData) {
  if (!rawData || rawData.length === 0) {
    return 'Google Sheets'
  }
  
  // 嘗試從第一列找到有效的中文詞彙
  for (let row of rawData.slice(0, 10)) { // 檢查前 10 列
    if (row && row.length > 0) {
      const firstCol = String(row[0]).trim()
      // 檢查是否包含中文字符且長度合理
      if (firstCol && /[\u4e00-\u9fa5]/.test(firstCol) && firstCol.length > 1 && firstCol.length < 30) {
        return `${firstCol}...` // 使用第一個中文詞彙加省略號
      }
    }
  }
  
  return 'Google Sheets'
}

// 開啟編輯 Modal
function openEditModal() {
  showNameModal.value = true
}

// 關閉 Modal
function closeNameModal() {
  showNameModal.value = false
}

// 儲存編輯後的來源
function saveEditedSources() {
  // 直接更新 localStorage
  localStorage.setItem('recentSources', JSON.stringify(recentSources.value))
  closeNameModal()
  showStatus('已更新來源名稱', 'success', 3000)
}

// 刪除最近來源
function deleteRecentSource(index) {
  if (confirm('確定要刪除這個來源嗎？')) {
    recentSources.value.splice(index, 1)
    localStorage.setItem('recentSources', JSON.stringify(recentSources.value))
    
    if (recentSources.value.length === 0) {
      closeNameModal()
    }
  }
}

// 顯示狀態訊息
function showStatus(message, type = 'info', duration = 5000) {
  statusMessage.value = message
  statusType.value = type
  
  if (duration > 0) {
    setTimeout(() => {
      statusMessage.value = ''
    }, duration)
  }
}
</script>
