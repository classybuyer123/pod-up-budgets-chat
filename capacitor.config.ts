
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6b6f8385323c4f448988d176a3fd1507',
  appName: 'pod-up-budgets-chat',
  webDir: 'dist',
  server: {
    url: 'https://6b6f8385-323c-4f44-8988-d176a3fd1507.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#0f172a',
      showSpinner: false
    }
  }
};

export default config;
