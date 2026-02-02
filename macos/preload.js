const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    pickFile: () => ipcRenderer.invoke('pick-file'),
    saveFile: (fileName, data) => ipcRenderer.invoke('save-file', { fileName, data }),
    showToast: (message) => ipcRenderer.invoke('show-toast', message),
    isElectron: true
});
