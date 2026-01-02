# Managing This Repository with Termux

This guide explains how to use Termux on Android to manage the Universal File Repair Tool repository.

## Initial Termux Setup

### 1. Install Termux
Download Termux from [F-Droid](https://f-droid.org/packages/com.termux/) (recommended) or GitHub Releases.
> ⚠️ Do NOT use the Play Store version - it's outdated.

### 2. Update Termux packages
```bash
pkg update && pkg upgrade -y
```

### 3. Install Git and essential tools
```bash
pkg install git gh openssh -y
```

### 4. Configure Git identity
```bash
git config --global user.name "socrtwo"
git config --global user.email "your-email@example.com"
```

## GitHub Authentication

### Option A: GitHub CLI (Recommended)
```bash
# Login with GitHub CLI
gh auth login

# Follow prompts:
# - Select "GitHub.com"
# - Select "HTTPS"
# - Authenticate with browser or paste token
```

### Option B: Personal Access Token
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Save the token securely

```bash
# Store credentials (enter token as password when prompted)
git config --global credential.helper store
```

### Option C: SSH Key
```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@example.com"

# Display public key (add this to GitHub → Settings → SSH Keys)
cat ~/.ssh/id_ed25519.pub

# Test connection
ssh -T git@github.com
```

## Clone the Repository

### Using HTTPS (with gh or token):
```bash
cd ~
git clone https://github.com/socrtwo/Universal-File-Repair-Tool.git
cd Universal-File-Repair-Tool
```

### Using SSH:
```bash
cd ~
git clone git@github.com:socrtwo/Universal-File-Repair-Tool.git
cd Universal-File-Repair-Tool
```

## Adding the Android App to the Repository

### 1. Download and extract the Android project
```bash
cd ~/Universal-File-Repair-Tool

# If you have the ZIP file in Downloads:
cp /storage/emulated/0/Download/file-repair-android.zip .
unzip file-repair-android.zip
mv file-repair-android android
rm file-repair-android.zip
```

### 2. Add GitHub Actions workflow
```bash
mkdir -p .github/workflows

# Create the workflow file (copy content from build-apk.yml)
nano .github/workflows/build-apk.yml
```

### 3. Commit and push
```bash
git add android/
git add .github/
git status  # Review changes
git commit -m "Add Android app with GitHub Actions build"
git push origin main
```

## Creating a Release (Triggers APK Build)

### Using GitHub CLI:
```bash
# Create and push a version tag
git tag v3.0.0
git push origin v3.0.0

# Or create release directly with gh
gh release create v3.0.0 --title "v3.0.0 - Android App Release" --notes "Initial Android app release with file repair capabilities"
```

### Manual Release:
1. Go to https://github.com/socrtwo/Universal-File-Repair-Tool/releases
2. Click "Create a new release"
3. Create tag: `v3.0.0`
4. Add title and description
5. Publish release
6. GitHub Actions will automatically build and attach the APK

## Common Termux Commands

### Repository Management
```bash
# Check status
git status

# Pull latest changes
git pull

# View commit history
git log --oneline -10

# Create a new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Merge branch
git merge feature-name
```

### File Operations
```bash
# Access phone storage (run once, grant permission)
termux-setup-storage

# Navigate to Downloads
cd /storage/emulated/0/Download

# Copy file to repo
cp somefile.txt ~/Universal-File-Repair-Tool/

# Edit files
nano filename.txt
# or install vim: pkg install vim
```

### Viewing GitHub Actions Status
```bash
# List workflow runs
gh run list

# View specific run
gh run view <run-id>

# Watch a run in progress
gh run watch
```

### Download Release APK
```bash
# List releases
gh release list

# Download latest release
gh release download --pattern "*.apk"

# Download specific version
gh release download v3.0.0 --pattern "*.apk"
```

## Troubleshooting

### "Permission denied" errors
```bash
# For storage access
termux-setup-storage

# For gradlew
chmod +x android/gradlew
```

### Git push fails
```bash
# Check remote URL
git remote -v

# Update to use token (if needed)
git remote set-url origin https://github.com/socrtwo/Universal-File-Repair-Tool.git

# Or switch to SSH
git remote set-url origin git@github.com:socrtwo/Universal-File-Repair-Tool.git
```

### Large file issues
```bash
# Check file sizes before commit
find . -size +50M -type f

# If needed, add to .gitignore
echo "*.apk" >> .gitignore
```

## Useful Aliases

Add these to `~/.bashrc` for convenience:
```bash
echo 'alias gs="git status"' >> ~/.bashrc
echo 'alias gp="git pull"' >> ~/.bashrc
echo 'alias gc="git commit -m"' >> ~/.bashrc
echo 'alias gph="git push"' >> ~/.bashrc
echo 'alias gd="git diff"' >> ~/.bashrc
echo 'alias repo="cd ~/Universal-File-Repair-Tool"' >> ~/.bashrc
source ~/.bashrc
```

Then use: `repo` to jump to your project, `gs` for status, etc.
