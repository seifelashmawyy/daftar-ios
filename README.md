# Daftar iOS — separate Capacitor wrapper

This folder is a new, independent project. The original Daftar folder was read only. It contains no Cloudflare deployment command, database configuration, account credentials, reader service, or copied user database. The sole copied asset is the public Daftar icon.

The app opens https://daftar.seif-planner.workers.dev in a Capacitor iOS web view. This keeps the existing frontend and relative `/api/` calls on their existing origin, without modifying the website or enabling cross-origin API access. The hosted website must remain available. This is a hosted-site wrapper, not an offline bundle of the frontend/backend. Capacitor documents `server.url` primarily for live reload, not production; this is a deliberate personal-sideloading compromise to preserve the existing web app untouched. Do not treat this package as an App Store submission.

## Your data

- Creating and building this project makes no requests to your Daftar account and does not change the original project, deployment, database, or Safari/PWA storage.
- The native app has separate local storage and requires signing in again. Server-synced data becomes available through the existing account. Unsynced Safari/PWA data does not automatically transfer. Keep your current web app installed.
- Once installed and signed in, using the iOS app can change server data through normal Daftar actions, just as using the website does. It is not a read-only data snapshot.
- iOS web views do not provide the same web-push/PWA capabilities as a Home Screen web app. This wrapper adds no APNs push service. Keep using your existing PWA for its notifications. Voice, attachments/PDF viewing, external links, offline behavior, keyboard/safe areas and login need testing on an actual iPhone; feature parity is not verified.
- Keep the bundle ID `com.daftar.personal.ios` stable for future updates. Avoid deleting the native app if you need its local storage.

## Build for free from Windows

No Mac or paid Apple Developer membership is required for this unsigned build. GitHub's standard hosted runners are free for public repositories. Private repositories use your plan's included allowance; macOS usage can consume it quickly. This tiny wrapper can be public without uploading your original Daftar repository or its secrets.

1. Create a new empty GitHub repository named `daftar-ios`. Leave its README/license options unchecked for the commands below.
2. Open PowerShell in **this separate folder**. With Git installed, run (replace YOUR_USERNAME):

```powershell
git init
git add .
git commit -m "Add separate Daftar Capacitor iOS wrapper"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/daftar-ios.git
git push -u origin main
```

3. On GitHub, open **Actions → Build unsigned Daftar IPA → Run workflow**. Keep the default Daftar URL, then run it. Enable Actions if prompted.
4. Open the successful run. Under **Artifacts**, download **Daftar-unsigned-IPA** while logged into GitHub. Extract that ZIP to get **Daftar-unsigned.ipa**. The artifact expires after seven days; save the IPA locally or rerun the workflow.
5. Transfer the extracted `.ipa` to the iPhone's Files app using iCloud Drive or another file-transfer method. Do not select the outer artifact ZIP in your sideloading app.

No Apple credentials, signing certificate, Cloudflare token, or Daftar password belongs in GitHub Actions. SideStore/AltStore signs the unsigned IPA later using your own Apple Account.

The workflow installs the exact Capacitor versions in package.json, creates the native iOS project using Swift Package Manager, copies web assets, applies the existing icon, compiles an actual-device Release app with code signing disabled, and ZIPs it under `Payload/App.app`. It does not deploy Daftar. Native files are generated afresh on the macOS runner, rather than hand-edited on Windows. A dependency lockfile could not be generated here because registry DNS access is unavailable; the runner resolves transitive dependencies with npm install. Save its generated lockfile for reproducible subsequent builds if desired.

Optional local checks with Node 22+:

```powershell
npm install
npm run configure
# Optional override for a future different site:
$env:DAFTAR_URL = 'https://daftar.seif-planner.workers.dev'
npm run configure
```

To generate/open native files on a Mac with compatible Xcode:

```sh
npm install
npm run configure
npm run ios:add
npm run ios:sync
npx cap open ios
```

## Install using SideStore

1. Follow the official prerequisites and current Windows installation guide: https://docs.sidestore.io/docs/installation/prerequisites and https://docs.sidestore.io/docs/installation/install . Install SideStore with iloader and set up LocalDevVPN/pairing as directed there.
2. Trust the developer profile and enable Developer Mode if required by your iOS version. Connect LocalDevVPN, sign in to SideStore with your Apple Account, and refresh SideStore itself once before adding apps.
3. In SideStore, open **My Apps**, tap **+**, and select `Daftar-unsigned.ipa` from Files. Allow signing/installation to complete.
4. Open Daftar and sign in to your existing Daftar account. Do not use the data-import feature merely to sign in to the same service.
5. With a free Apple Account, refresh both SideStore and Daftar before their seven-day signing expiry. Use the network/VPN setup in the current official guide; background refresh is not guaranteed.

## Install using AltStore Classic

1. Follow https://faq.altstore.io/altstore-classic/how-to-install-altstore-windows . Install AltServer, the required Apple iTunes/iCloud components, connect and trust the iPhone, enable Wi-Fi sync, and install **AltStore Classic** through AltServer.
2. Trust the developer profile and enable Developer Mode where required. Keep AltServer running and reachable from the phone (USB or the supported same-network setup).
3. In AltStore Classic, sign in, open **My Apps → +**, and choose the extracted `Daftar-unsigned.ipa`. Wait for signing and installation.
4. Open Daftar and sign in to the existing account. Refresh AltStore and Daftar before seven days expire with a free Apple Account. Free-account app/App ID limits still apply.

## Validation status

Configuration generation and packaging inputs can be checked on Windows. An actual IPA is produced only when the macOS GitHub Actions workflow succeeds. No workflow has been dispatched from this local folder and no on-device test is claimed. If it fails, send the failing step's log (without credentials) so the build can be corrected.

## Reference documentation

- Capacitor configuration (`server.url` caveat): https://capacitorjs.com/docs/config
- Capacitor environment: https://capacitorjs.com/docs/getting-started/environment-setup
- Swift Package Manager: https://capacitorjs.com/docs/ios/spm
- GitHub hosted runners/free public usage: https://docs.github.com/en/actions/how-tos/write-workflows/choose-where-workflows-run/choose-the-runner-for-a-job
- SideStore: https://docs.sidestore.io/docs/installation/install
- AltStore Classic on Windows: https://faq.altstore.io/altstore-classic/how-to-install-altstore-windows
