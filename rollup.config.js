import resolve from "@rollup/plugin-node-resolve";
import babel from '@rollup/plugin-babel';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { terser } from "rollup-plugin-terser";

const commonConfig = {
  external: [
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
}

const componentInputs = [
  'src/components/utils/cloudAppMock.tsx',
];

export default [
  {
    ...commonConfig,
    input: "src/index.ts",
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
  },
  {
    ...commonConfig,
    input: componentInputs,
    output: [
      {
        dir: "dist/components",
        format: "cjs",
        sourcemap: true,
        exports: "named",
        entryFileNames: '[name].cjs.js',
      },
      {
        dir: "dist/components",
        format: "esm",
        sourcemap: true,
        entryFileNames: '[name].esm.js',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        outDir: 'dist/components',
        declarationDir: 'dist/components',
        declaration: true,
        include: componentInputs,
      }),
      babel({
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'bundled',
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          "@babel/preset-react",
          "@babel/preset-flow"
        ],
      }),
      terser({
        format: {
          comments: /webpackIgnore:/,
        },
      }),
    ],
  }
]
