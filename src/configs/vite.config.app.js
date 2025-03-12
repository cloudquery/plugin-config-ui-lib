import 'dotenv/config';

import react from '@vitejs/plugin-react-swc';
import { minify as htmlMinify } from 'html-minifier-terser';

import monacoEditorVitePlugin from 'vite-plugin-monaco-editor';

const monacoEditorPlugin = monacoEditorVitePlugin.default;

const envVariables = {};

for (const key of Object.keys(process.env)) {
  if (key.startsWith('REACT_APP') && process.env[key] !== undefined) {
    envVariables[key] = process.env[key];
  }
}

console.log('envVariables1', envVariables);

export default {
  base: './',
  build: {
    commonjsOptions: {
      sourceMap: true,
    },
    outDir: 'build',
    rollupOptions: {
      output: {
        manualChunks: {
          'monaco-editor': ['monaco-editor'],
          'monaco-yaml': ['monaco-yaml'],
        },
      },
    },
    sourcemap: true,
  },
  define: {
    'process.env': JSON.stringify(envVariables),
  },
  optimizeDeps: {
    include: ['monaco-editor', 'monaco-yaml'],
  },
  plugins: [
    react(),
    monacoEditorPlugin({
      customWorkers: [
        {
          entry: 'monaco-yaml/yaml.worker',
          label: 'yaml',
        },
      ],
      languageWorkers: ['editorWorkerService'],
    }),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        if (process.env.NODE_ENV === 'production') {
          return htmlMinify(html, {
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
          });
        }

        return html;
      },
    },
  ],
  server: {
    port: 3001,
  },
};
