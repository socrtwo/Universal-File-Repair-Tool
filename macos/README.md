# Universal File Repair Tool - macOS

macOS desktop version of the Universal File Repair Tool, built with Electron. Repairs corrupted DOCX, XLSX, PPTX, ZIP, PDF, JPG, PNG, and MP3 files.

## Architecture

The app uses Electron to wrap the v5 HTML/JS repair engine with native macOS integration:

- **Native menu bar** with File > Open (Cmd+O), standard Edit/View/Window menus
- **Hidden title bar** with inline traffic lights for a clean macOS look
- **open-file event** - handles Finder double-click and drag-to-Dock
- **File associations** for all supported file types
- **Dark mode support** via `darkModeSupport: true`
- **Universal binary** builds for both Apple Silicon (arm64) and Intel (x64)
- **Stays running** when all windows closed (standard macOS behavior)

## Quick Start (Development)

```bash
cd macos
npm install
npm start
```

## Building Distributable

```bash
# DMG + ZIP for both architectures
npm run build

# DMG only
npm run build:dmg

# Universal binary (fat binary for both arm64 + x64)
npm run build:universal
```

Output goes to `macos/dist/`.

## Project Structure

```
macos/
├── package.json              # Electron + electron-builder config (mac targets)
├── main.js                   # Main process: window, native menu, IPC, file dialogs
├── preload.js                # Context bridge (electronAPI)
├── file_repair_tool.html     # v5 repair engine + Electron bridge
├── entitlements.mac.plist    # macOS hardened runtime entitlements
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

## Code Signing

The build is configured with `hardenedRuntime: true` and entitlements for distribution. To sign for notarization, set these environment variables before building:

```bash
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your-password
export APPLE_ID=your@apple.id
export APPLE_APP_SPECIFIC_PASSWORD=xxxx-xxxx-xxxx-xxxx
export APPLE_TEAM_ID=XXXXXXXXXX
```

Without signing, the app will still build but users will need to right-click > Open to bypass Gatekeeper.
