const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

// const SRC_DIR = path.join(__dirname, 'src', 'universal');
const OUTPUT_DIR = path.join(__dirname, 'build', 'public');
const vendor = ['react', 'react-dom'];

const themeList = ['paper'].map((theme) => ({
   from: path.join(__dirname, 'src', 'universal', 'assets', theme),
   to: path.join(__dirname, 'build', 'assets', theme)
}));

const config = {
   entry: {
      vendor,
      bundle: ['./src/universal/index.js']
   },
   output: {
      path: OUTPUT_DIR,
      filename: '[name].js'
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: [
                     '@babel/plugin-proposal-optional-chaining',
                     '@babel/plugin-proposal-nullish-coalescing-operator'
                  ],
                  cacheDirectory: true
               }
            },
            exclude: [/node_modules/, /public/]
         },
         {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.(eot|ttf)$/,
            use: 'url-loader?limit=100000'
         }
      ]
   },
   resolve: {
      extensions: [
         '.js',
         '.jsx',
         '.json',
         '.wasm',
         '.mjs',
         '.css',
         '.less',
         '.jpg',
         '.png',
         '.svg'
      ],
      modules: ['node_modules']
   },
   optimization: {
      concatenateModules: true,
      minimizer: [
         new TerserPlugin({
            terserOptions: {
               cache: true,
               parallel: true,
               sourceMap: true,
               output: {
                  comments: false,
                  ecma: 5,
                  ascii_only: true
               },
               compress: {
                  comparisons: false,
                  warnings: false,
                  ecma: 5
               },
               parse: {
                  ecma: 8
               },
               mangle: true,
               safari10: true
            }
         })
      ],
      splitChunks: {
         cacheGroups: {
            vendor: {
               name: 'vendor',
               test: new RegExp(vendor.join(`${path.sep}|${path.sep}`)),
               chunks: 'all'
            }
         }
      }
   },
   stats: {
      children: false
   },
   devServer: {
      contentBase: path.join(__dirname, 'public'),
      compress: true,
      port: 3000,
      proxy: {
         '/': 'http://localhost:4000'
      }
   },
   plugins: [
      new CleanWebpackPlugin(),
      new ManifestPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new CopyPlugin(themeList)
   ],
   devtool: 'cheap-module-source-map'
};

module.exports = config;
