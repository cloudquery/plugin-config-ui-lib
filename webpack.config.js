const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  devtool: 'source-map',
  experiments: {
    outputModule: true,
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module',
    environment: {
      module: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'esnext', // Preserve dynamic imports
            },
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: [
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: (_, comment) => {
              // Preserve webpackIgnore comments
              if (/webpackIgnore:/.test(comment.value)) {
                return true;
              }
              return false;
            },
          },
        },
      }),
    ],
  },
};
