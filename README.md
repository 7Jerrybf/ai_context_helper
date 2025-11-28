# AI Context Helper

**AI Context Helper** 是一個瀏覽器擴充功能，讓您可以選取網頁上的文字，並透過 AI 獲得即時的解釋與上下文資訊。

## ✨ 功能特點

-   **選取即問**：選取網頁上的任意文字，點擊浮動按鈕即可詢問 AI。
-   **Markdown 支援**：AI 回覆支援粗體、列表、程式碼區塊等格式渲染。
-   **模型通用**：支援任何相容 OpenAI 介面的 API。
    -   **Google Gemini** (推薦使用免費方案)
    -   **OpenAI** (GPT-3.5/4)
    -   **本地 LLM** (Ollama, LocalAI)
-   **輕量快速**：基於 Vite 和 React 構建，效能優異。

## 🛠️ 技術棧

-   **框架**: [React 19](https://react.dev/)
-   **建置工具**: [Vite](https://vitejs.dev/)
-   **語言**: [TypeScript](https://www.typescriptlang.org/)
-   **樣式**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **平台**: Chrome Extension (Manifest V3)

## 🚀 安裝說明

1.  **Clone 專案**
    ```bash
    git clone https://github.com/yourusername/ai-context-helper.git
    cd ai-context-helper
    ```

2.  **安裝依賴**
    ```bash
    npm install
    ```

3.  **建置擴充功能**
    ```bash
    npm run build
    ```
    此指令會產生一個 `dist` 資料夾，包含編譯後的擴充功能檔案。

4.  **載入至 Chrome**
    -   開啟 Chrome 並前往 `chrome://extensions/`。
    -   開啟右上角的 **開發人員模式 (Developer mode)**。
    -   點擊 **載入未封裝項目 (Load unpacked)**。
    -   選擇專案目錄下的 `dist` 資料夾。

## ⚙️ 設定指南

安裝完成後，**設定頁面**會自動開啟。您也可以點擊擴充功能圖示並選擇「選項 (Options)」來進入。

### 推薦設定 (Google Gemini)

Google 提供免費且相容 OpenAI 介面的 Gemini API。

1.  **取得 API Key**: 前往 [Google AI Studio](https://aistudio.google.com/app/apikey) 申請。
2.  **Provider**: 選擇 `OpenAI Compatible`。
3.  **Base URL**:
    ```
    https://generativelanguage.googleapis.com/v1beta/openai/
    ```
4.  **API Key**: 貼上您的 Google API Key。
5.  **Model Name**:
    ```
    gemini-2.5-flash
    ```
  

### OpenAI 設定

1.  **Base URL**: 留空或使用 `https://api.openai.com/v1`
2.  **API Key**: 您的 OpenAI API Key。
3.  **Model Name**: `gpt-3.5-turbo` 或 `gpt-4`。

## 💻 開發指南

若要修改程式碼並測試：

1.  執行建置指令：
    ```bash
    npm run build
    ```

2.  **在 Chrome 中重新載入**:
    -   前往 `chrome://extensions/`。
    -   找到 "AI Context Helper"。
    -   點擊 **重新整理** (旋轉箭頭圖示)。
    -   重新整理您正在測試的網頁。

## 📄 授權

MIT License
