// Mac notarization script (optional - requires Apple Developer account)
// This can be left empty if you don't have Apple notarization set up yet
exports.default = async function notarizing(context) {
  const { electronPlatformName, appOutDir } = context;  
  if (electronPlatformName !== 'darwin') {
    return;
  }

  console.log('Skipping notarization - not configured');
  // To enable notarization, you'll need:
  // 1. Apple Developer account
  // 2. App-specific password
  // 3. electron-notarize package
  // See: https://kilianvalkhof.com/2019/electron/notarizing-your-electron-application/
};
