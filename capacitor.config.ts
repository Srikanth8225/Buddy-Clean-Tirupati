import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.buddyclean.app',
  appName: 'Buddy Clean',
  webDir: 'out',
  server: {
    url: 'https://buddyclean.in',
    cleartext: true
  }
};

export default config;
