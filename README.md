# Universal File Repair Tool

[![Build All Platforms](https://github.com/socrtwo/Universal-File-Repair-Tool/actions/workflows/build-all-platforms.yml/badge.svg)](https://github.com/socrtwo/Universal-File-Repair-Tool/actions/workflows/build-all-platforms.yml)
[![Build Android APK](https://github.com/socrtwo/Universal-File-Repair-Tool/actions/workflows/build-apk.yml/badge.svg)](https://github.com/socrtwo/Universal-File-Repair-Tool/actions/workflows/build-apk.yml)

*Recover corrupted files — Office docs, PDFs, images, and audio — entirely on your device, across every platform.*

A powerful file repair tool that recovers corrupted Office documents, ZIP archives, PDF files, images, and audio using advanced structure recovery and fault-tolerant decompression. Available on **Windows, macOS, Linux, Android, iOS, and the web**.

## 📥 Downloads

| Platform | Download | Notes |
|----------|----------|-------|
| 🪟 **Windows** (installer) | [File.Repair.Tool.Setup.5.0.0.exe](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) | Click "More info" then "Run anyway" on SmartScreen |
| 🪟 **Windows** (portable) | [File.Repair.Tool.5.0.0.exe](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) | No installation required |
| 🍎 **macOS** (Apple Silicon) | [File.Repair.Tool-5.0.0-arm64.dmg](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) | Right-click → Open to bypass Gatekeeper |
| 🍎 **macOS** (Intel) | [File.Repair.Tool-5.0.0.dmg](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) | Right-click → Open to bypass Gatekeeper |
| 🐧 **Linux** (AppImage) | [File.Repair.Tool-5.0.0.AppImage](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) | `chmod +x` then run |
| 🐧 **Linux** (Debian/Ubuntu) | [file-repair-tool_5.0.0_amd64.deb](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) | Install with `sudo dpkg -i` |
| 🤖 **Android** | [FileRepairTool-Android.apk](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) | Enable "Install from unknown sources" |
| 📱 **iOS** (Simulator) | [FileRepairTool-iOS-Simulator.zip](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) | For simulator testing only (unsigned) |
| 🌐 **Web** | Open `file_repair_tool_v5.html` in any browser | No installation required |

> All desktop and mobile builds are **unsigned**. See platform-specific notes above for bypassing security prompts.

## ✨ Features

- **Office Document Repair** (DOCX, XLSX, PPTX)
  - ZIP structure scanning and recovery
  - Fault-tolerant DEFLATE decompression
  - XML healing and tag balancing
  - Template-based structure reconstruction

- **ZIP Archive Recovery**
  - Local file header scanning
  - Multi-offset decompression attempts
  - Automatic archive rebuilding

- **PDF Reconstruction**
  - Object detection and extraction
  - Stream recovery and text fragment extraction
  - Valid xref table generation

- **Image Repair** (JPG, PNG)
  - JPEG structure repair and embedded image extraction
  - PNG chunk validation and reconstruction

- **Audio Repair** (MP3)
  - MP3 frame detection and stream repair
  - Audio preview playback

- **LibreOffice Compatibility Tips**
  - Format-specific popup after Office repairs recommending LibreOffice Writer/Calc/Impress as an intermediary if Microsoft Office won't open the repaired file

## 🔧 Supported Formats

| Format | Extension | Recovery Method |
|--------|-----------|-----------------|
| Word | .docx | ZIP + XML healing |
| Excel | .xlsx | ZIP + XML healing |
| PowerPoint | .pptx | ZIP + XML healing |
| ZIP Archive | .zip | Structure scan + rebuild |
| PDF | .pdf | Object extraction + rebuild |
| JPEG | .jpg/.jpeg | Structure repair + embedded extraction |
| PNG | .png | Chunk validation + reconstruction |
| MP3 | .mp3 | Frame detection + stream repair |

## 🗂️ Repository Structure

```
Universal-File-Repair-Tool/
├── file_repair_tool_v5.html       # Web version (standalone, all 8 formats)
├── windows/                        # Windows Electron app
│   ├── main.js                    # Main process
│   ├── preload.js                 # Context bridge
│   ├── file_repair_tool.html      # Repair engine + Windows bridge
│   └── package.json               # Build config (NSIS + portable)
├── macos/                          # macOS Electron app
│   ├── main.js                    # Main process (native menu bar)
│   ├── preload.js                 # Context bridge
│   ├── file_repair_tool.html      # Repair engine + macOS bridge
│   ├── entitlements.mac.plist     # Hardened runtime entitlements
│   └── package.json               # Build config (DMG + ZIP)
├── linux/                          # Linux Electron app
│   ├── main.js                    # Main process
│   ├── preload.js                 # Context bridge
│   ├── file_repair_tool.html      # Repair engine + Electron bridge
│   └── package.json               # Build config (AppImage + deb)
├── android/                        # Android app (WebView)
│   └── app/src/main/
│       ├── assets/                # HTML repair engine (v3)
│       ├── java/                  # Android bridge code
│       └── res/                   # Resources
├── ios/                            # iOS app (WKWebView)
│   ├── FileRepairTool.xcodeproj/  # Xcode project
│   └── FileRepairTool/
│       ├── ViewController.swift   # WKWebView + native bridge
│       ├── file_repair_tool.html  # Repair engine + iOS bridge
│       └── Info.plist             # App config + document types
├── .github/workflows/
│   ├── build-all-platforms.yml    # Unified build + release
│   ├── build-apk.yml             # Android APK build
│   ├── build-windows.yml          # Windows build
│   ├── build-macos.yml            # macOS build
│   └── build-ios.yml              # iOS build
├── TERMUX_GUIDE.md                 # Termux/CLI instructions
└── README.md                       # This file
```

## 🌐 Web Version

Open `file_repair_tool_v5.html` in any modern browser. No installation required.

1. Open the HTML file in Chrome, Firefox, Edge, or Safari
2. Click "Choose File" and select a corrupted file
3. Click "Run Repair"
4. Download the repaired file

## 🖥️ Desktop Apps (Windows, macOS, Linux)

All desktop versions are built with Electron and provide native file dialogs, file associations, and platform-appropriate UI.

### Windows
- **Installer** (`Setup.exe`): Installs to Program Files with Start Menu and Desktop shortcuts
- **Portable** (`.exe`): Run from anywhere, no installation needed
- Supports file associations for all 8 formats

### macOS
- **DMG**: Available for both Apple Silicon (arm64) and Intel (x64)
- Native macOS menu bar with keyboard shortcuts (Cmd+O to open)
- Hidden title bar with traffic light buttons
- Dark mode support

### Linux
- **AppImage**: Universal format, works on most distributions (`chmod +x` to run)
- **Debian package** (`.deb`): For Ubuntu, Debian, and derivatives (`sudo dpkg -i`)
- Desktop integration with file associations

## 📱 Mobile Apps

### Android
1. Download the APK from [Releases](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest)
2. Enable "Install from Unknown Sources" if prompted
3. Install and open — select files using the system file picker

### iOS (Simulator Only)
The iOS build is unsigned and runs on the iOS Simulator only. A full device build requires an Apple Developer account ($99/year) for code signing.

## 🛠️ Technical Details

### Immortal Inflater
Custom fault-tolerant DEFLATE decoder that:
- Continues past corrupted blocks
- Tries multiple stream offsets
- Returns partial data rather than failing

### XML Healer
Repairs malformed XML by:
- Removing invalid control characters
- Balancing unclosed tags
- Escaping stray angle brackets
- Fixing quote mismatches

### PDF Rebuilder
Reconstructs PDFs by:
- Scanning for object markers (`n n obj`)
- Extracting stream data
- Building valid xref tables
- Creating proper trailer

## 📋 For Developers

### Build from Source

**Windows/macOS/Linux:**
```bash
cd windows  # or macos/ or linux/
npm install
npm run build
```

**Android:**
```bash
cd android
./gradlew assembleDebug
# APK at: app/build/outputs/apk/debug/app-debug.apk
```

**iOS:**
```bash
cd ios
xcodebuild build \
  -project FileRepairTool.xcodeproj \
  -scheme FileRepairTool \
  -sdk iphonesimulator \
  -configuration Release \
  CODE_SIGNING_ALLOWED=NO
```

### Build All Platforms via GitHub Actions
Go to **Actions** → **Build All Platforms** → **Run workflow**

This builds all platforms and creates a GitHub Release with all artifacts attached.

### Managing with Termux
See [TERMUX_GUIDE.md](TERMUX_GUIDE.md) for instructions on setting up Termux for Git, cloning, pushing changes, and creating releases from the command line.

## 🔒 Privacy Policy

See [PRIVACY_POLICY.md](PRIVACY_POLICY.md) — The app processes all files locally on your device. No data is collected, transmitted, or shared.

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 📊 Analytics

![Alt](https://repobeats.axiom.co/api/embed/fc4e5b2b9b9a8158f657a0a9963298e130effcb1.svg "Repobeats analytics image")

## 🙏 Credits

- [JSZip](https://stuk.github.io/jszip/) - ZIP file handling
- [Electron](https://www.electronjs.org/) - Desktop app framework
- Custom Immortal Inflater - Fault-tolerant DEFLATE decoder

---

**Author:** Paul D Pruitt (socrtwo)
**Version:** 5.0
