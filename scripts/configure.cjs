const fs = require('node:fs');
const input = process.env.DAFTAR_URL || 'https://daftar.seif-planner.workers.dev';
if (!input) throw new Error('Set DAFTAR_URL to the HTTPS address of your existing Daftar website.');
const url = new URL(input);
if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
  throw new Error('Use an HTTPS site origin only, without credentials, path, query or fragment.');
}
const config = {
  appId: 'com.daftar.personal.ios',
  appName: 'Daftar',
  webDir: 'www',
  server: { url: url.origin, cleartext: false }
};
fs.writeFileSync('capacitor.config.json', JSON.stringify(config, null, 2) + '\n');
console.log('Configured Daftar iOS. No request was sent to the website.');
