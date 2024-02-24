import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.delbertina.multi-timer-app',
  appName: 'Multi Timer App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
