const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron/main')
const path = require('node:path')
const { execFile } = require('child_process')
const { promisify } = require('node:util')
const execFilePromise = promisify(execFile)
const fs = require('node:fs/promises')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: false,
      preload: path.join(app.getAppPath(), 'electron', 'preload.cjs')
    }
  })

  if (app.isPackaged) {
    win.loadFile(path.join(app.getAppPath(), '.output', 'public', 'index.html'))
  } else {
    win.loadURL('http://localhost:3000')
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  ipcMain.handle('get-download-path', () => {
    return app.getPath('downloads')
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('select-csv-file', async () => {
  const result = await dialog.showOpenDialog({
    title: 'csv ファイルを選択してください',
    properties: ['openFile'],
    filters: [
      { name: 'csv', extensions: ['csv'] }
    ],
  })

  if (result.canceled) {
    return undefined
  } else {
    return result.filePaths[0]
  }
})

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  })

  if (result.canceled) {
    return undefined
  } else {
    return result.filePaths[0]
  }
})

ipcMain.on('show-folder', (event, path) => {
  shell.showItemInFolder(path)
})

ipcMain.handle('create-badge', async (event, question, personNamesSrc, outputDir, participantEmails) => {
  try {
    const binaryPath = path.join(app.getAppPath(), 'bin', 'hybadge-maker')
    const args = [ question, personNamesSrc, path.join(outputDir, 'badge.pdf'), ...participantEmails]

    const { stdout, stderr } = await execFilePromise(binaryPath, args)

    if (stderr) {
      console.warn('Python stderr:', stderr)
    }
    return stdout.trim()
  } catch (err) {
    console.error('Execute error:', err)
    return
  }
})

ipcMain.handle('read-csv-file', async (_event, filePath) => {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error('Could not read csv file:', error);
    throw error;
  }
});
