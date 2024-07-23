
import path from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dotenv from 'dotenv'

dotenv.config()

const SRC_DIR = path.resolve(__dirname, './src');
const PUBLIC_DIR = path.resolve(__dirname, './public');
const BUILD_DIR = path.resolve(__dirname, './www',);
export default defineConfig(() => {

  return  {
    plugins: [
      vue({ template: { compilerOptions: { isCustomElement: (tag) => tag.includes('swiper-') } } }),,

    ],
    root: SRC_DIR,
    base: '',
    publicDir: PUBLIC_DIR,
    build: {
      outDir: BUILD_DIR,
      assetsInlineLimit: 0,
      emptyOutDir: true,
      rollupOptions: {
        treeshake: false,
      },
    },
    resolve: {
      alias: {
        '@': SRC_DIR,
      },
    },
    server: {
      host: true,
    },
    optimizeDeps: {
      exclude: ['js-big-decimal']
    },
    define: {
      __AZURE__: `"${process.env.VITE_AZURE_SUBSCRIPTION_KEY}"`,
      __FIREBASE_API_KEY__: `"${process.env.FIREBASE_API_KEY}"`,
      __FIREBASE_AUTH_DOMAIN__: `"${process.env.FIREBASE_AUTH_DOMAIN}"`,
      __FIREBASE_PROJECT_ID__: `"${process.env.FIREBASE_PROJECT_ID}"`,
      __FIREBASE_STORAGE_BUCKET__: `"${process.env.FIREBASE_STORAGE_BUCKET}"`,
      __FIREBASE_MESSAGING_SENDER_ID__: `"${process.env.FIREBASE_MESSAGING_SENDER_ID}"`,
      __FIREBASE_APP_ID__: `"${process.env.FIREBASE_APP_ID}"`,
    }

  };
})
