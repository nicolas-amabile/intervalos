const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production'

  return {
    entry: {
      main: './src/main.js',
      styles: './assets/styles.css',
    },
    output: {
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/, path.resolve(__dirname, 'tests')],
        },
        {
          test: /\.css$/i,
          use: [isProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name].[contenthash][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name].[contenthash][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: 'assets', to: 'assets' },
          { from: 'manifest.json', to: 'manifest.json' },
        ],
      }),
      ...(isProduction
        ? [
            new MiniCssExtractPlugin({
              filename: '[name].[contenthash].css',
            }),
          ]
        : []),
    ],
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      ...(isProduction && {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true,
                drop_debugger: true,
              },
            },
          }),
          new CssMinimizerPlugin(),
        ],
      }),
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      // Exclude test folders from resolution
      alias: {
        '@': path.resolve(__dirname, 'src'),
        // Prevent importing from /tests folder
        tests: false,
      },
    },
    // Exclude test files from the build
    externals: {
      // Add any test libraries you want to exclude
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 3000,
      open: true,
      hot: true,
      liveReload: true,
      compress: true,
    },
    // Performance optimizations
    performance: {
      hints: isProduction ? 'warning' : false,
      maxEntrypointSize: 250000,
      maxAssetSize: 250000,
    },
  }
}
