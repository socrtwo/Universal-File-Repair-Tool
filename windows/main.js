const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let pendingFilePath = null;

// Handle file passed as command-line argument (file association open)
const filePath = process.argv.find(arg =>
    /\.(docx|xlsx|pptx|zip|pdf|jpe?g|png|mp3)$/i.test(arg)
);
if (filePath) pendingFilePath = path.resolve(filePath);

// Single instance lock
const gotLock = app.requestSingleInstanceLock();
if (!gotLock) {
    app.quit();
} else {
    app.on('second-instance', (event, argv) => {
        const file = argv.find(arg =>
            /\.(docx|xlsx|pptx|zip|pdf|jpe?g|png|mp3)$/i.test(arg)
        );
        if (file && mainWindow) {
            loadFileIntoApp(path.resolve(file));
        }
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1100,
        height: 800,
        minWidth: 600,
        minHeight: 500,
        backgroundColor: '#121212',
        title: 'File Repair Tool',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
        show: false
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('file_repair_tool.html');

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        if (pendingFilePath) {
            // Small delay to ensure the page JS is ready
            setTimeout(() => loadFileIntoApp(pendingFilePath), 500);
            pendingFilePath = null;
        }
    });

    mainWindow.on('closed', () => { mainWindow = null; });
}

function loadFileIntoApp(filePath) {
    if (!mainWindow || !fs.existsSync(filePath)) return;
    try {
        const data = fs.readFileSync(filePath);
        const base64 = data.toString('base64');
        const fileName = path.basename(filePath);
        mainWindow.webContents.executeJavaScript(
            `loadFileFromWindows('${fileName.replace(/'/g, "\\'")}', '${base64}');`
        );
    } catch (err) {
        console.error('Failed to load file:', err);
    }
}

// IPC Handlers

ipcMain.handle('pick-file', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        title: 'Select a file to repair',
        filters: [
            { name: 'Supported Files', extensions: ['docx', 'xlsx', 'pptx', 'zip', 'pdf', 'jpg', 'jpeg', 'png', 'mp3'] },
            { name: 'Office Documents', extensions: ['docx', 'xlsx', 'pptx'] },
            { name: 'Archives', extensions: ['zip'] },
            { name: 'PDF Files', extensions: ['pdf'] },
            { name: 'Images', extensions: ['jpg', 'jpeg', 'png'] },
            { name: 'Audio', extensions: ['mp3'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']
    });
    if (result.canceled || result.filePaths.length === 0) return null;
    const fp = result.filePaths[0];
    const data = fs.readFileSync(fp);
    return { fileName: path.basename(fp), data: data.toString('base64') };
});

ipcMain.handle('save-file', async (event, { fileName, data }) => {
    const ext = path.extname(fileName).slice(1).toLowerCase();
    const result = await dialog.showSaveDialog(mainWindow, {
        title: 'Save repaired file',
        defaultPath: fileName,
        filters: [
            { name: `${ext.toUpperCase()} File`, extensions: [ext] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });
    if (result.canceled || !result.filePath) return false;
    fs.writeFileSync(result.filePath, Buffer.from(data, 'base64'));
    return true;
});

ipcMain.handle('show-toast', async (event, message) => {
    // Use the native notification or just log
    if (mainWindow) {
        mainWindow.webContents.executeJavaScript(
            `console.log('[Native] ${message.replace(/'/g, "\\'")}');`
        );
    }
});

// Handle open-file event on macOS (also works for protocol handlers)
app.on('open-file', (event, path) => {
    event.preventDefault();
    if (mainWindow) {
        loadFileIntoApp(path);
    } else {
        pendingFilePath = path;
    }
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
