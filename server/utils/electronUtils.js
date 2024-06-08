import { dialog, ipcMain } from 'electron';

ipcMain.handle('select-directory', async () => {
    //打開目錄
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    //用戶關閉目錄
    if (result.canceled) {
        return null;
    } else {
        //返回選擇的目錄
        return result.filePaths[0];
    }
});
