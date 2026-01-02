# Universal File Repair Tool

[![Build Android APK](https://github.com/socrtwo/Universal-File-Repair-Tool/actions/workflows/build-apk.yml/badge.svg)](https://github.com/socrtwo/Universal-File-Repair-Tool/actions/workflows/build-apk.yml)

A powerful file repair tool that recovers corrupted Office documents, ZIP archives, and PDF files using advanced structure recovery and fault-tolerant decompression.

## 📥 Download

| Platform | Download |
|----------|----------|
| **Android APK** | [Latest Release](https://github.com/socrtwo/Universal-File-Repair-Tool/releases/latest) |
| **Web Version** | Use `file_repair_tool_v3.html` directly in any browser |

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
  - Stream recovery
  - Text fragment extraction
  - Valid xref table generation

## 🗂️ Repository Structure

```
Universal-File-Repair-Tool/
├── file_repair_tool_v3.html    # Web version (standalone)
├── android/                     # Android app source
│   ├── app/
│   │   └── src/main/
│   │       ├── assets/         # HTML repair engine
│   │       ├── java/           # Android code
│   │       └── res/            # Resources
│   ├── build.gradle
│   └── README.md               # Android-specific docs
├── .github/
│   └── workflows/
│       └── build-apk.yml       # Automated APK builds
├── TERMUX_GUIDE.md             # Termux/CLI instructions
└── README.md                   # This file
```

## 🌐 Web Version

Simply open `file_repair_tool_v3.html` in any modern browser. No installation required.

### Usage:
1. Open the HTML file in Chrome, Firefox, Edge, or Safari
2. Click "Choose File" and select a corrupted file
3. Click "Run Repair"
4. Download the repaired file

## 📱 Android App

### Install from Release
1. Download the latest APK from [Releases](https://github.com/socrtwo/Universal-File-Repair-Tool/releases)
2. Enable "Install from Unknown Sources" if prompted
3. Install the APK

### Build from Source
```bash
cd android
./gradlew assembleDebug
# APK at: app/build/outputs/apk/debug/app-debug.apk
```

## 🔧 Supported Formats

| Format | Extension | Recovery Method |
|--------|-----------|-----------------|
| Word | .docx | ZIP + XML healing |
| Excel | .xlsx | ZIP + XML healing |
| PowerPoint | .pptx | ZIP + XML healing |
| ZIP Archive | .zip | Structure scan + rebuild |
| PDF | .pdf | Object extraction + rebuild |

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

### Managing with Termux
See [TERMUX_GUIDE.md](TERMUX_GUIDE.md) for instructions on:
- Setting up Termux for Git
- Cloning and pushing changes
- Creating releases from command line

### Creating a Release
```bash
# Tag a version (triggers automatic APK build)
git tag v3.0.1
git push origin v3.0.1
```

The GitHub Action will:
1. Build the APK
2. Create a GitHub Release
3. Attach the APK as a downloadable asset

### Manual Workflow Trigger
Go to Actions → Build Android APK → Run workflow

## 📄 License

MIT License - See [LICENSE](LICENSE) for details.

## 🙏 Credits

- [JSZip](https://stuk.github.io/jszip/) - ZIP file handling
- Custom Immortal Inflater - Fault-tolerant DEFLATE decoder

---

**Author:** socrtwo  
**Version:** 3.0
