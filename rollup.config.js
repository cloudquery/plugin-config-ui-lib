// rollup.config.js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts", // Entry point of your library
  output: [
    {
      dir: "dist",
      format: "cjs",
      sourcemap: true,
      exports: "named",
      entryFileNames: '[name].cjs.js',
    },
    {
      dir: "dist",
      format: "esm",
      sourcemap: true,
      entryFileNames: '[name].esm.js',
    },
  ],
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
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", outDir: 'dist' }),
    terser({
      format: {
        comments: /webpackIgnore:/,
      },
    }),
  ],
};
