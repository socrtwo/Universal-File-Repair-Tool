# 🔧 Universal File Repair Tool v5.0

A powerful, browser-based file recovery tool that repairs corrupted documents, images, archives, and audio files using advanced structure analysis and fault-tolerant decompression.

**No installation required. No file uploads to servers. 100% client-side processing.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-5.0-green.svg)
![Browser](https://img.shields.io/badge/browser-Chrome%20%7C%20Firefox%20%7C%20Edge%20%7C%20Safari-orange.svg)

---

## ✨ Features

### 📄 Office Documents (DOCX, XLSX, PPTX)
- Scans corrupted ZIP structures for recoverable content
- Fault-tolerant DEFLATE decompression with multiple offset attempts
- XML healing: fixes unclosed tags, invalid characters, malformed attributes
- Rebuilds document structure with dummy assets when originals are damaged
- Recovers text content even from severely corrupted files

### 📕 PDF Documents
- Locates and extracts PDF objects from damaged files
- Rebuilds xref tables and trailers
- Extracts text from literal and hex strings
- Creates text-only recovery PDFs when structure is too damaged
- Works with partially downloaded or truncated PDFs

### 📦 ZIP Archives
- Scans for local file headers throughout corrupted data
- Recovers individual files even when central directory is damaged
- Handles both stored (uncompressed) and deflated entries
- Rebuilds clean archive with recovered contents

### 🖼️ JPEG Images
- Detects and repairs missing SOI/EOI markers
- Finds and extracts multiple embedded/concatenated JPEGs
- Locates image dimensions from SOF markers
- Handles partially downloaded images
- Live preview of repaired images

### 🎨 PNG Images
- Validates and repairs PNG signature
- Scans all chunks (IHDR, IDAT, IEND, etc.)
- Recalculates and fixes CRC32 checksums
- Adds missing IEND chunks
- Live preview of repaired images

### 🎵 MP3 Audio
- Detects ID3v2 and ID3v1 metadata tags
- Validates MP3 frame headers (sync, bitrate, sample rate)
- Supports MPEG1/2/2.5, Layers 1/2/3
- Extracts only valid frames, skipping corruption
- Reports audio stats (bitrate, sample rate, duration)
- Live audio preview after repair

---

## 🚀 Quick Start

1. **Download** `file_repair_tool_v5.html`
2. **Open** the file in any modern web browser
3. **Load** your corrupted file using the file picker
4. **Click** "Run Repair"
5. **Download** the repaired file

That's it! No installation, no server uploads, no dependencies.

---

## 🔬 How It Works

### ZIP-Based Formats (DOCX, XLSX, PPTX, ZIP)

```
┌─────────────────────────────────────────────────────────┐
│  1. SCAN: Search for PK\x03\x04 local file headers      │
│  2. EXTRACT: Read filename, compression method, data    │
│  3. DECOMPRESS: Use ImmortalInflate (fault-tolerant)    │
│  4. HEAL: Fix XML syntax errors and missing tags        │
│  5. REBUILD: Create new archive with recovered content  │
└─────────────────────────────────────────────────────────┘
```

The **ImmortalInflate** engine is a custom DEFLATE decoder that:
- Continues decompression after encountering errors
- Tries multiple byte offsets to find valid compressed streams
- Returns partial data rather than failing completely

### PDF Repair

```
┌─────────────────────────────────────────────────────────┐
│  1. FIND OBJECTS: Regex scan for "N N obj...endobj"     │
│  2. EXTRACT TEXT: Parse literal () and hex <> strings   │
│  3. REBUILD XREF: Calculate object offsets              │
│  4. WRITE TRAILER: Add catalog reference and EOF        │
└─────────────────────────────────────────────────────────┘
```

### Image Repair (JPEG/PNG)

```
JPEG:                              PNG:
┌──────────────────────┐          ┌──────────────────────┐
│ Find FF D8 (SOI)     │          │ Verify 89 PNG sig    │
│ Scan markers         │          │ Read chunks          │
│ Locate FF D9 (EOI)   │          │ Validate CRCs        │
│ Add missing markers  │          │ Fix bad checksums    │
│ Trim corruption      │          │ Add missing IEND     │
└──────────────────────┘          └──────────────────────┘
```

### MP3 Repair

```
┌─────────────────────────────────────────────────────────┐
│  1. DETECT ID3: Find ID3v2 header or ID3v1 footer       │
│  2. SCAN FRAMES: Look for FF Ex frame sync markers      │
│  3. VALIDATE: Check bitrate, sample rate, layer         │
│  4. CALCULATE: Determine frame size from header         │
│  5. EXTRACT: Copy only valid frames to output           │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 Supported Formats

| Format | Extensions | Detection Method |
|--------|------------|------------------|
| Word | `.docx` | ZIP + `word/` path |
| Excel | `.xlsx` | ZIP + `xl/` path |
| PowerPoint | `.pptx` | ZIP + `ppt/` path |
| PDF | `.pdf` | `%PDF` header |
| ZIP | `.zip` | `PK\x03\x04` signature |
| JPEG | `.jpg`, `.jpeg` | `FF D8 FF` signature |
| PNG | `.png` | `89 50 4E 47` signature |
| MP3 | `.mp3` | `ID3` or `FF Ex` frame sync |

---

## 💡 Tips for Best Results

### If Microsoft Office won't open the repaired file:
- Try **LibreOffice** (free) - often more tolerant of damaged files
- Try **Apache OpenOffice** (free)
- Upload to **Google Docs/Sheets/Slides**
- Try **WPS Office** (free)

### If Adobe Acrobat won't open the repaired PDF:
- Try **Foxit Reader** (free)
- Try **SumatraPDF** (free, Windows)
- Open directly in **Chrome, Firefox, or Edge**
- Use **Preview** on Mac

### General tips:
- Keep the original corrupted file as backup
- Try repairing multiple times if first attempt fails
- For severely damaged files, partial recovery is still valuable
- Check the repair log for details about what was recovered

---

## 🌐 Browser Compatibility

| Browser | Status |
|---------|--------|
| Chrome 80+ | ✅ Full Support |
| Firefox 75+ | ✅ Full Support |
| Edge 80+ | ✅ Full Support |
| Safari 14+ | ✅ Full Support |
| Opera 67+ | ✅ Full Support |

**Requirements:**
- JavaScript enabled
- File API support
- Blob/URL.createObjectURL support

---

## 🔒 Privacy & Security

- **100% Client-Side**: All processing happens in your browser
- **No Uploads**: Files never leave your computer
- **No Tracking**: No analytics, cookies, or external requests
- **No Dependencies**: Only uses JSZip (bundled via CDN)
- **Offline Capable**: Works without internet after initial load

---

## ⚠️ Limitations

- **Not magic**: Severely corrupted files may only yield partial recovery
- **No encryption**: Cannot repair password-protected files
- **Size limits**: Very large files (500MB+) may be slow or cause browser memory issues
- **Format conversion**: Does not convert between formats
- **Binary corruption**: Cannot recover overwritten binary data

---

## 🛠️ Technical Details

### Dependencies
- [JSZip 3.10.1](https://stuk.github.io/jszip/) - ZIP file creation/extraction

### Key Components

| Component | Purpose |
|-----------|---------|
| `ImmortalInflate` | Fault-tolerant DEFLATE decoder |
| `healXMLStrict` | XML syntax repair and tag balancing |
| `JPEGRepair` | JPEG marker analysis and repair |
| `PNGRepair` | PNG chunk validation and CRC repair |
| `PDFRepair` | PDF object extraction and xref rebuild |
| `MP3Repair` | MP3 frame validation and extraction |

### File Size
- Single HTML file: ~50KB
- No external assets required (except JSZip CDN)

---

## 📜 License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Areas for Improvement
- [ ] Add GIF repair support
- [ ] Add WAV/FLAC audio repair
- [ ] Add MP4/AVI video repair
- [ ] Add BMP/TIFF image repair
- [ ] Web Worker support for large files
- [ ] Drag-and-drop file loading
- [ ] Batch processing multiple files
- [ ] Progress indicators for large files

---

## 📞 Support

If you encounter issues:

1. Check the **repair log** for error messages
2. Try the file in **alternative applications** (LibreOffice, Foxit, VLC)
3. Open an **issue** with:
   - File type and approximate size
   - How the file became corrupted
   - Any error messages from the log
   - Browser and version

---

## 🙏 Acknowledgments

- [JSZip](https://stuk.github.io/jszip/) for ZIP handling
- [RFC 1951](https://tools.ietf.org/html/rfc1951) DEFLATE specification
- [PNG Specification](http://www.libpng.org/pub/png/spec/) 
- [JPEG Standard](https://www.w3.org/Graphics/JPEG/)
- [MP3 Frame Header](http://www.mp3-tech.org/programmer/frame_header.html)
- [PDF Reference](https://www.adobe.com/devnet/pdf/pdf_reference.html)

---

<p align="center">
  Made with ❤️ for data recovery
</p>

