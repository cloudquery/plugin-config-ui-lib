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
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'module', // Output as ES modules
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
    'react',
    'react-dom',
    /^@mui\/material.*/,
    /^@mui\/icons-material.*/,
    /^@mui\/lab.*/,
    /^@mui\/system.*/,
    /^@emotion\/react.*/,
    /^@emotion\/styled.*/,
    'yup',
    'humanize-string',
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
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
