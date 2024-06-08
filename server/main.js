import { app, BrowserWindow } from 'electron';
import dotenv from 'dotenv';

dotenv.config();

//建立應用程式視窗
function createWindow() {
    // 應用程式視窗設定
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL(process.env.URL);
}

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