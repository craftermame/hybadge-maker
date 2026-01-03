const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron/main')
const path = require('node:path')
const { execFile } = require('child_process')
const { promisify } = require('node:util')
const execFilePromise = promisify(execFile)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: false,
      preload: path.join(app.getAppPath(), 'electron', 'preload.cjs')
    }
  })

  win.loadURL('http://localhost:3000')
  // win.loadFile(path.join(app.getAppPath(), '.output', 'public', 'index.html'))
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
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

ipcMain.handle('create-badge', async (event, question, personNamesSrc, outputDir) => {
  try {
    const binaryPath = path.join(app.getAppPath(), 'bin', 'main')
    const args = [ question, personNamesSrc, path.join(outputDir, 'badge.pdf') ]

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
