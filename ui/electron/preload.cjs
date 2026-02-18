const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('mainAPI', {
  selectCsvFile: () => ipcRenderer.invoke('select-csv-file'),
  openFolderDialog: () => ipcRenderer.invoke('select-folder'),
  getDownloadPath: () => ipcRenderer.invoke('get-download-path'),
  showFolder: (path) => ipcRenderer.send('show-folder', path),
  createBadge: (q, src, out, emails) => ipcRenderer.invoke('create-badge', q, src, out, emails),
  readCsvFile: (filePath) => ipcRenderer.invoke('read-csv-file', filePath),
})
