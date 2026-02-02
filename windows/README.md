# Universal File Repair Tool - Windows

Windows desktop version of the Universal File Repair Tool, built with Electron. Repairs corrupted DOCX, XLSX, PPTX, ZIP, PDF, JPG, PNG, and MP3 files.

## Architecture

The app uses Electron to wrap the v5 HTML/JS repair engine with native Windows integration:

- **Native file dialogs** for Open and Save via Electron's `dialog` API
- **File associations** - registers as handler for supported file types
- **Single instance** - opening a second file routes to the existing window
- **Command-line support** - pass a file path as argument to open it directly

## Quick Start (Development)

```bash
cd windows
npm install
npm start
```

## Building Distributable

```bash
# Installer + portable EXE
npm run build

# Just portable EXE
npm run build:portable

# Just NSIS installer
npm run build:nsis
```

Output goes to `windows/dist/`.

## Project Structure

```
windows/
├── package.json              # Electron + electron-builder config
├── main.js                   # Main process: window, IPC, file dialogs
├── preload.js                # Context bridge (electronAPI)
├── file_repair_tool.html     # v5 repair engine + Electron bridge
└── README.md
```

## Supported Formats

| Format | Extensions |
|--------|-----------|
| Office | DOCX, XLSX, PPTX |
| Archives | ZIP |
| Documents | PDF |
| Images | JPG/JPEG, PNG |
| Audio | MP3 |
