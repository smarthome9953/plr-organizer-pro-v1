# PLR Organizer Pro - Electron Desktop App

## Prerequisites

- Node.js 20+
- npm or bun

## Local Development

```bash
# Install dependencies
npm install

# Run Electron in dev mode (launches Vite + Electron together)
npm run electron:dev
```

## Building for Production

### All Platforms (from respective OS)

```bash
# Build for current platform
npm run electron:build
```

### Platform-Specific

```bash
# Windows (NSIS installer + portable)
npx vite build && npx tsc -p electron/tsconfig.json && npx electron-builder --win

# macOS (DMG + ZIP)
npx vite build && npx tsc -p electron/tsconfig.json && npx electron-builder --mac

# Linux (AppImage + deb)
npx vite build && npx tsc -p electron/tsconfig.json && npx electron-builder --linux
```

### Output

Built files appear in `dist-electron-output/`:

| Platform | Files |
|----------|-------|
| Windows  | `PLROrganizerPro-Setup.exe`, `PLROrganizerPro-Portable.exe` |
| macOS    | `PLROrganizerPro.dmg`, `PLROrganizerPro-mac.zip` |
| Linux    | `PLROrganizerPro.AppImage`, `plr-organizer-pro.deb` |

## CI/CD (GitHub Actions)

The workflow at `.github/workflows/electron-build.yml` automatically:

1. **On tag push** (`v*`): Builds all platforms and creates a draft GitHub Release
2. **Manual trigger**: Build and optionally publish

### Creating a Release

```bash
# Tag and push
git tag v1.0.0
git push origin v1.0.0
```

This triggers the CI to build Windows, macOS, and Linux installers and creates a draft release.

### Required GitHub Secrets (optional, for code signing)

| Secret | Description |
|--------|-------------|
| `MAC_CERTIFICATE` | Base64-encoded macOS signing certificate (.p12) |
| `MAC_CERTIFICATE_PASSWORD` | Password for the .p12 certificate |

## Architecture

```
electron/
├── main/
│   ├── index.ts          # Main process entry point
│   ├── ipcHandlers.ts    # All IPC communication handlers
│   ├── fileWatcher.ts    # Chokidar file system watcher
│   ├── fileOrganizer.ts  # File scanning & organization engine
│   ├── autoUpdater.ts    # electron-updater integration
│   └── menu.ts           # Native application menu
├── preload/
│   └── index.ts          # Secure contextBridge API
├── shared/
│   └── types.ts          # Shared TypeScript types
└── tsconfig.json         # Electron TypeScript config
```

## Auto-Updates

Updates are served from GitHub Releases via `electron-updater`. The app:
- Checks for updates 3 seconds after launch
- Shows update notification in the UI
- Downloads in background with progress
- Installs on restart
