# Universal File Repair Tool - iOS

iOS version of the Universal File Repair Tool. Repairs corrupted DOCX, XLSX, PPTX, ZIP, and PDF files using advanced structure recovery algorithms.

## Architecture

The app uses a WKWebView to run the same HTML/JS repair engine as the web version, with a native Swift bridge layer for:

- **File picking** via `UIDocumentPickerViewController`
- **Saving** repaired files via the iOS document export picker
- **Sharing** repaired files via `UIActivityViewController`
- **Opening files** from other apps via `CFBundleDocumentTypes`

## Building

### Requirements
- Xcode 15.0+
- iOS 15.0+ deployment target

### Steps
1. Open `FileRepairTool.xcodeproj` in Xcode
2. Select your development team under Signing & Capabilities
3. Build and run on a device or simulator

## Project Structure

```
ios/
├── FileRepairTool.xcodeproj/
│   └── project.pbxproj
└── FileRepairTool/
    ├── AppDelegate.swift          # App lifecycle
    ├── SceneDelegate.swift        # Scene lifecycle + file open handling
    ├── ViewController.swift       # WKWebView + native bridge
    ├── file_repair_tool.html      # Core repair engine (HTML/JS)
    ├── Info.plist                 # App config + document types
    ├── LaunchScreen.storyboard    # Launch screen
    └── Assets.xcassets/           # App icon + colors
```

## Features

- Repairs corrupted Office documents (DOCX, XLSX, PPTX)
- Repairs corrupted ZIP archives
- Repairs corrupted PDF files
- Opens corrupted files from other apps (Files, Mail, etc.)
- Save or share repaired files
- Dark theme UI
