# Universal File Repair Tool - Android App

An Android application that repairs corrupted Office documents (DOCX, XLSX, PPTX), ZIP archives, and PDF files.

## Features

- **Office Document Repair**: Recovers corrupted Word, Excel, and PowerPoint files
- **ZIP Archive Recovery**: Rebuilds damaged ZIP files with fault-tolerant decompression
- **PDF Reconstruction**: Repairs PDF structure and extracts text content
- **Share Integration**: Receive files from other apps and share repaired files
- **Dark Theme**: Modern dark UI matching the web version

## Supported Formats

| Format | Extension | Description |
|--------|-----------|-------------|
| Word   | .docx     | Microsoft Word documents |
| Excel  | .xlsx     | Microsoft Excel spreadsheets |
| PowerPoint | .pptx | Microsoft PowerPoint presentations |
| ZIP    | .zip      | ZIP archive files |
| PDF    | .pdf      | PDF documents |

## Building the APK

### Prerequisites

- Android Studio Arctic Fox (2020.3.1) or later
- JDK 8 or later
- Android SDK with Build Tools 34

### Build Steps

1. Open the project in Android Studio
2. Sync Gradle files
3. Build > Build Bundle(s) / APK(s) > Build APK(s)

Or from command line:

```bash
# Debug APK
./gradlew assembleDebug

# Release APK (requires signing configuration)
./gradlew assembleRelease
```

### Output Location

- Debug APK: `app/build/outputs/apk/debug/app-debug.apk`
- Release APK: `app/build/outputs/apk/release/app-release.apk`

## Installation

### From APK

1. Enable "Install from Unknown Sources" in Android Settings
2. Download or transfer the APK to your device
3. Tap the APK file to install

### From GitHub Releases

Download the latest APK from the [Releases](https://github.com/socrtwo/Universal-File-Repair-Tool/releases) page.

## Usage

1. Launch the app
2. Tap "Choose File" or use the system file picker
3. Select a corrupted file
4. Tap "Run Repair"
5. Wait for the repair process to complete
6. Tap "Save" to save the repaired file or "Share" to share it

## Repair Strategies

### Office Documents (DOCX/XLSX/PPTX)
- ZIP structure scanning and recovery
- Fault-tolerant DEFLATE decompression
- XML healing and tag balancing
- Structure reconstruction with templates

### ZIP Archives
- Local file header scanning
- Multi-offset decompression attempts
- Automatic archive rebuilding

### PDF Files
- Object detection and extraction
- Stream recovery
- Text fragment extraction
- Structure reconstruction with valid xref table

## Technical Details

The app uses a WebView to run the JavaScript-based repair engine, with native Android bridges for:
- File selection via Storage Access Framework
- File saving with user-chosen location
- Sharing via Android Intent system

## Minimum Requirements

- Android 7.0 (API 24) or later
- ~50MB storage space

## License

MIT License - See [LICENSE](../LICENSE) for details

## Credits

Created by socrtwo

Powered by:
- [JSZip](https://stuk.github.io/jszip/) - ZIP file handling
- Custom Immortal Inflater - Fault-tolerant DEFLATE decoder
