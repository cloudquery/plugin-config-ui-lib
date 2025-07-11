import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import terser from "@rollup/plugin-terser";
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json'

const componentInputs = ["src/components/utils/devWrapper.tsx"];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
        exports: "named",
        entryFileNames: "[name].cjs.js",
      },
      {
        dir: "dist",
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].esm.js",
      },
    ],

    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist",
      }),
      terser({
        format: {
          comments: /webpackIgnore:/,
        },
      }),
      copy({
        targets: [
          { src: 'src/scripts', dest: 'dist' },
          { src: 'src/template', dest: 'dist' },
          { src: 'src/configs', dest: 'dist' },
        ]
      })
    ],
  },
  {
    input: componentInputs,
    output: [
      {
        dir: "dist/components",
        format: "cjs",
        sourcemap: true,
        exports: "named",
        entryFileNames: "[name].cjs.js",
      },
      {
        dir: "dist/components",
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].esm.js",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/components",
        declarationDir: "dist/components",
        declaration: true,
        declarationMap: true,
        include: [...componentInputs, "src/components/utils/cloudAppMock.tsx"],
      }),
      terser({
        format: {
          comments: /webpackIgnore:/,
        },
      }),
    ],
  },
  {
    input: "src/e2e-utils/index.ts",
    output: [
      {
        dir: "dist/e2e-utils",
        format: "cjs",
        sourcemap: true,
        exports: "named",
        entryFileNames: "[name].cjs.js",
      },
      {
        dir: "dist/e2e-utils",
        format: "esm",
        sourcemap: true,
        entryFileNames: "[name].esm.js",
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: "dist/e2e-utils",
        declarationDir: "dist/e2e-utils",
        declaration: true,
        declarationMap: true,
        include: "src/e2e-utils/*",
      }),
      terser({
        format: {
          comments: /webpackIgnore:/,
        },
      }),
    ],
  },
];
