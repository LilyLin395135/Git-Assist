import { app, BrowserWindow, ipcMain } from 'electron';
import dotenv from 'dotenv';
import path from 'path';
import customPrompt from 'custom-electron-prompt';
import './utils/electronUtils.js'

dotenv.config();
const appDirectory = process.cwd(); //當前工作資料夾

let mainWindow; // 在外部作用域定義 mainWindow

//建立應用程式視窗
function createWindow() {
  // 應用程式視窗設定
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,//允許在渲染進程中使用 Node.js
      contextIsolation: false,//允許渲染器訪問 Node.js 環境
    }
  });
  mainWindow.loadURL(process.env.URL);
}

// 設置自定義提示框
ipcMain.handle('show-prompt', async (event, options) => {
  const result = await customPrompt({
    title: 'Prompt',
    label: options.label,
    value: options.value,
    inputAttrs: {
      type: 'text'
    },
    type: 'input'
  }, mainWindow);
  return result;
});

app.whenReady().then(() => {
  createWindow();

  // 運用程式運行時，點擊工具列圖示時觸發（macOS）
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 關閉所有視窗時觸發，除 macOS 以外
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
