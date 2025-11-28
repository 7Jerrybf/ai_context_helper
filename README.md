# AI Context Helper

**AI Context Helper** is a premium, modern Chrome Extension that allows you to instantly get AI-powered insights and explanations for any text you select on the web.

Built with a focus on **design aesthetics** and **user experience**, it features a beautiful "Bubble" interface, gradient themes, and smooth animations.

## ✨ Features

-   **👆 Select & Ask**: Simply select any text on a webpage and click the "Ask AI" floating button.
-   **🎨 Premium UI**:
    -   **Bubble Design**: A modern, rounded interface that floats elegantly over content.
    -   **Gradient Themes**: Stunning Indigo-Purple-Pink gradients for a polished look.
    -   **Animations**: Smooth fade-ins, hover effects, and loading states.
-   **📝 Markdown Support**: Full rendering of bold text, lists, code blocks, and more in the AI response.
-   **🤖 Model Agnostic**: Works with any OpenAI-compatible API.
    -   **Google Gemini** (Recommended for free tier)
    -   **OpenAI** (GPT-3.5/4)
    -   **Local LLMs** (Ollama, LocalAI)
-   **⚡ Fast & Lightweight**: Built with Vite and React for optimal performance.

## 🛠️ Tech Stack

-   **Framework**: [React 19](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
-   **Platform**: Chrome Extension (Manifest V3)

## 🚀 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ai-context-helper.git
    cd ai-context-helper
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Build the extension**
    ```bash
    npm run build
    ```
    This will generate a `dist` folder containing the compiled extension.

4.  **Load into Chrome**
    -   Open Chrome and navigate to `chrome://extensions/`.
    -   Enable **Developer mode** (top right toggle).
    -   Click **Load unpacked**.
    -   Select the `dist` folder from your project directory.

## ⚙️ Configuration

Upon installation, the **Settings Page** will automatically open. You can also access it by clicking the extension icon and selecting "Options".

### Recommended Setup (Google Gemini)

Google provides a free tier for their Gemini API which is OpenAI-compatible.

1.  **Get API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) to get your key.
2.  **Provider**: Select `OpenAI Compatible`.
3.  **Base URL**:
    ```
    https://generativelanguage.googleapis.com/v1beta/openai/
    ```
4.  **API Key**: Paste your Google API Key.
5.  **Model Name**:
    ```
    gemini-1.5-flash
    ```
    *(Or `gemini-1.5-pro` / `gemini-2.0-flash` depending on availability)*

### Setup for OpenAI

1.  **Base URL**: Leave blank or use `https://api.openai.com/v1`
2.  **API Key**: Your OpenAI API Key.
3.  **Model Name**: `gpt-3.5-turbo` or `gpt-4`.

## 💻 Development

To make changes and test them:

1.  Run the build command in watch mode (optional, or just rebuild manually):
    ```bash
    npm run build
    ```
    *Note: Since this is a browser extension, hot module replacement (HMR) is limited. It's often easier to rebuild and reload the extension in Chrome.*

2.  **Reloading in Chrome**:
    -   Go to `chrome://extensions/`.
    -   Find "AI Context Helper".
    -   Click the **Refresh** (circular arrow) icon.
    -   Refresh the web page you are testing on.

## 📄 License

MIT License
