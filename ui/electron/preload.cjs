const { contextBridge, ipcRenderer } = require('electron')
const os = require('os')

contextBridge.exposeInMainWorld('testAPI', {
  greet: () => 'Hi from preload!',
  files: () => os.homedir(),
})

contextBridge.exposeInMainWorld('mainAPI', {
  selectCsvFile: () => ipcRenderer.invoke('select-csv-file'),
  openFolderDialog: () => ipcRenderer.invoke('select-folder'),
  showFolder: (path) => ipcRenderer.send('show-folder', path),
  createBadge: (q, src, out) => ipcRenderer.invoke('create-badge', q, src, out),
})
