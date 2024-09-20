// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    sourcemap: true,
  },
  external: [
    // Your external dependencies
    /^@emotion\/react.*/,
    /^@emotion\/styled.*/,
    /^@mui\/icons-material.*/,
    /^@mui\/material.*/,
    /^@mui\/lab.*/,
    /^@mui\/system.*/,
    'react',
    'react-dom',
    'yup',
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          module: 'ESNext', // Preserve dynamic imports
        },
      },
    }),
    babel({
      babelHelpers: 'runtime', // Use runtime helpers
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      exclude: /node_modules/,
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true, // Use ES modules helpers
          },
        ],
      ],
    }),
    terser({
      format: {
        comments: /webpackIgnore:/,
      },
    }),
  ],
};
